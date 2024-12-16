'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Pencil, Filter } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

interface Bug {
  issue: string
  summary: string
  status: string
  "Issue Type": string
  "Project Key": string
  epic: string
  "Epic name": string
  "Parent link": string
  assignee: string
  creator: string
  prioridad: number | null
  comentarios: string | null
  estimacion: number | null
  comentarios_qa: string | null
}

type SortConfig = {
  key: keyof Bug
  direction: 'asc' | 'desc'
}

type FilterConfig = {
  [K in keyof Bug]?: string[]
}

const ITEMS_PER_PAGE = 7

const createJiraLink = (issueKey: string) => `https://fpatronal.atlassian.net/browse/${issueKey}`;

const columnMappings: { [key: string]: string } = {
  issue: "Incidencia",
  summary: "Resumen",
  status: "Estado",
  "Issue Type": "Tipo de Incidencia",
  "Project Key": "Proyecto",
  epic: "Épica",
  "Epic name": "Nombre de Épica",
  "Parent link": "Enlace Padre",
  assignee: "Asignado a",
  creator: "Creador",
  prioridad: "Prioridad",
  comentarios: "Comentarios",
  estimacion: "Estimación",
  comentarios_qa: "Comentarios QA"
}

const columnOrder: (keyof Bug)[] = [
  "issue",
  "status",
  "Issue Type",
  "prioridad",
  "summary",
  "Project Key",
  "epic",
  "Epic name",
  "Parent link",
  "assignee",
  "creator",
  "comentarios",
  "estimacion",
  "comentarios_qa"
]

export function BugsTable() {
  const [bugs, setBugs] = useState<Bug[]>([])
  const [filteredBugs, setFilteredBugs] = useState<Bug[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'issue', direction: 'asc' })
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProject, setSelectedProject] = useState<string>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterSearchTerm, setFilterSearchTerm] = useState<string>('')
  const [activeFilterColumn, setActiveFilterColumn] = useState<keyof Bug | null>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await fetch('/api/bugs')
        if (!response.ok) {
          throw new Error('Failed to fetch bugs')
        }
        const data = await response.json()
        setBugs(data)
        setFilteredBugs(data)
      } catch (error) {
        console.error('Error fetching bugs:', error)
      }
    }

    fetchBugs()
  }, [])

  const projects = useMemo(() => {
    const projectSet = new Set(bugs.map(bug => bug["Project Key"]))
    return ['all', ...Array.from(projectSet)]
  }, [bugs])

  useEffect(() => {
    let filtered = bugs
    if (selectedProject !== 'all') {
      filtered = filtered.filter(bug => bug["Project Key"] === selectedProject)
    }
    filtered = filtered.filter(bug =>
      Object.values(bug).some(value =>
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    // Apply column filters
    Object.entries(filterConfig).forEach(([key, values]) => {
      if (values && values.length > 0) {
        filtered = filtered.filter(bug => values.includes(String(bug[key as keyof Bug])))
      }
    })
    setFilteredBugs(filtered)
    setCurrentPage(1)
  }, [searchTerm, bugs, selectedProject, filterConfig])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSort = (key: keyof Bug) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })

    const sortedBugs = [...filteredBugs].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
    setFilteredBugs(sortedBugs)
  }

  const getSortIcon = (key: keyof Bug) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
    }
    return null
  }

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = async (id: string) => {
    const bugToUpdate = bugs.find(bug => bug.issue === id);
    if (!bugToUpdate) return;

    const updatedFields = {
      prioridad: bugToUpdate.prioridad,
      comentarios: bugToUpdate.comentarios,
      estimacion: bugToUpdate.estimacion,
      comentarios_qa: bugToUpdate.comentarios_qa
    };

    try {
      const response = await fetch(`/api/bugs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error('Failed to update/create bug');
      }

      const updatedBug = await response.json();
      const updatedBugs = bugs.map(bug =>
        bug.issue === id ? { ...bug, ...updatedBug } : bug
      );
      setBugs(updatedBugs);
      setFilteredBugs(updatedBugs);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating/creating bug:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleChange = (id: string, key: keyof Bug, value: string) => {
    const updatedBugs = bugs.map(bug => {
      if (bug.issue === id) {
        let updatedValue: string | number | null = value;
        if (key === 'prioridad' || key === 'estimacion') {
          updatedValue = value === '' ? null : Number(value);
        }
        return { ...bug, [key]: updatedValue };
      }
      return bug;
    });
    setBugs(updatedBugs);
    setFilteredBugs(updatedBugs);
  };

  const handleFilter = (key: keyof Bug, value: string) => {
    setFilterConfig(prevConfig => {
      const currentValues = prevConfig[key] || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      return { ...prevConfig, [key]: newValues }
    })
  }

  const getUniqueValues = (key: keyof Bug) => {
    return Array.from(new Set(bugs.map(bug => String(bug[key]))))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b))
  }

  const handleFilterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSearchTerm(e.target.value)
  }

  const filteredValues = (key: keyof Bug) => {
    return getUniqueValues(key).filter(value => 
      value.toLowerCase().includes(filterSearchTerm.toLowerCase())
    )
  }

  const totalPages = Math.ceil(filteredBugs.length / ITEMS_PER_PAGE)
  const paginatedBugs = filteredBugs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  useEffect(() => {
    const table = tableRef.current
    if (!table) return

    const resizableGrid = (table: HTMLTableElement) => {
      const cols = table.querySelectorAll('th')
      const tableHeight = table.offsetHeight

      cols.forEach((col) => {
        const resizer = document.createElement('div')
        resizer.classList.add('resizer')
        resizer.style.height = `${tableHeight}px`
        col.appendChild(resizer)
        createResizableColumn(col, resizer)
      })
    }

    const createResizableColumn = (col: HTMLTableCellElement, resizer: HTMLDivElement) => {
      let x = 0
      let w = 0

      const mouseDownHandler = (e: MouseEvent) => {
        x = e.clientX
        const styles = window.getComputedStyle(col)
        w = parseInt(styles.width, 10)

        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)

        resizer.classList.add('resizing')
      }

      const mouseMoveHandler = (e: MouseEvent) => {
        const dx = e.clientX - x
        col.style.width = `${w + dx}px`
      }

      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
        resizer.classList.remove('resizing')
      }

      resizer.addEventListener('mousedown', mouseDownHandler)
    }

    resizableGrid(table)

    return () => {
      // Clean up any event listeners if necessary
    }
  }, [])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Buscar bugs..."
            value={searchTerm}
            onChange={handleSearch}
            className="max-w-sm bg-white/5 text-white border-white/20"
          />
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[180px] bg-white/5 text-white border-white/20">
              <SelectValue placeholder="Seleccionar proyecto" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project} value={project}>
                  {project === 'all' ? 'Todos los proyectos' : project}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => router.push('/epics')} className="bg-white/10 text-white hover:bg-white/20">
            Ver Épicas
          </Button>
          <Button onClick={() => router.push('/roadmap')} className="bg-white/10 text-white hover:bg-white/20">
            Ver Roadmap
          </Button>
        </div>
      </div>
      {paginatedBugs.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <Table ref={tableRef}>
              <TableHeader>
                <TableRow>
                  {columnOrder.map((key) => (
                    <TableHead key={key} className="text-white relative">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort(key)}
                          className="text-white hover:text-white/80"
                        >
                          {columnMappings[key] || key}
                          {getSortIcon(key)}
                        </Button>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="ghost" 
                              className="p-0 h-8 w-8 ml-1"
                              onClick={() => {
                                setActiveFilterColumn(key)
                                setFilterSearchTerm('')
                              }}
                            >
                              <Filter className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-4">
                              <h4 className="font-medium leading-none">Filtrar por {columnMappings[key] || key}</h4>
                              <Input
                                placeholder="Buscar..."
                                value={filterSearchTerm}
                                onChange={handleFilterSearch}
                                className="mb-2"
                              />
                              <ScrollArea className="h-[200px]">
                                <div className="grid gap-2">
                                  {filteredValues(key).map((value) => (
                                    <div key={value} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`${key}-${value}`}
                                        checked={(filterConfig[key] || []).includes(value)}
                                        onCheckedChange={() => handleFilter(key, value)}
                                      />
                                      <Label htmlFor={`${key}-${value}`}>{value}</Label>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </TableHead>
                  ))}
                  <TableHead className="text-white sticky right-0 bg-violet-900">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBugs.map((bug) => (
                  <TableRow key={bug.issue} className="hover:bg-white/5">
                    {columnOrder.map((key) => (
                      <TableCell key={key} className="text-white/80">
                        {editingId === bug.issue && ['prioridad', 'comentarios', 'estimacion', 'comentarios_qa'].includes(key) ? (
                          <Input
                            value={bug[key]?.toString() || ''}
                            onChange={(e) => handleChange(bug.issue, key, e.target.value)}
                            className="bg-white/5 text-white border-white/20"
                            type={key === 'prioridad' ||key === 'estimacion' ? 'number' : 'text'}
                          />
                        ) : ['issue', 'epic', 'Parent link'].includes(key) ? (
                          <a
                            href={createJiraLink(bug[key]?.toString() || '')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            {bug[key]?.toString() || '-'}
                          </a>
                        ) : ['comentarios', 'comentarios_qa'].includes(key) ? (
                          <div className="max-w-xs overflow-hidden text-ellipsis">
                            {bug[key]?.toString() || '-'}
                          </div>
                        ) : (
                          bug[key]?.toString() || '-'
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-white/80 sticky right-0 bg-violet-900">
                      {editingId === bug.issue ? (
                        <Button onClick={() => handleSave(bug.issue)} className="bg-green-600 hover:bg-green-700">
                          Guardar
                        </Button>
                      ) : (
                        <Button onClick={() => handleEdit(bug.issue)} className="bg-white/10 hover:bg-white/20">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-white">
              Página {currentPage} de {totalPages}
            </div>
            <div className="space-x-2">
              <Button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white text-center py-4">No hay bugs disponibles.</div>
      )}
    </div>
  )
}

