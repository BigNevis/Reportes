'use client'

import { useState, useEffect, useMemo } from 'react'
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
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Pencil } from 'lucide-react'

interface Epic {
  id: string
  clave: string
  "Current Assignee: Name": string | null
  resumen: string
  "Project Name": string
  "Oracle Form": string
  "Fecha Estiada Discovery": string
  "Fecha fin discovery": string
  "Fecha Inicio Estimada": string
  "Fecha de inicio": string
  "Fecha Estiada en DEV": string
  "Fecha imp. En Dev": string
  "Fecha Estimada en TEST": string
  "Fecha imp. En TEST": string
  "Fecha Estimada en UAT": string
  "Fecha UAT": string
  "Fecha Estimada en PROD": string
  "Fecha PROD": string
  estado: string
  motivo: string
  bloqueado_por: string
}

type SortConfig = {
  key: keyof Epic
  direction: 'asc' | 'desc'
}

const ITEMS_PER_PAGE = 7

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

const columnMappings: { [key: string]: string } = {
  clave: "Epica",
  "Current Assignee: Name": "Asignado a",
  resumen: "Descripcion",
  "Project Name": "Proyecto",
  estado: "Estado",
  motivo: "Motivo",
  bloqueado_por: "Bloqueado Por"
}

const columnOrder: (keyof Epic)[] = [
  "clave",
  "estado",
  "bloqueado_por",
  "motivo",
  "Current Assignee: Name",
  "resumen",
  "Project Name",
  "Oracle Form",
  "Fecha Estiada Discovery",
  "Fecha fin discovery",
  "Fecha Inicio Estimada",
  "Fecha de inicio",
  "Fecha Estiada en DEV",
  "Fecha imp. En Dev",
  "Fecha Estimada en TEST",
  "Fecha imp. En TEST",
  "Fecha Estimada en UAT",
  "Fecha UAT",
  "Fecha Estimada en PROD",
  "Fecha PROD"
]

export default function EpicsTable() {
  const [epics, setEpics] = useState<Epic[]>([])
  const [filteredEpics, setFilteredEpics] = useState<Epic[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'clave', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedProject, setSelectedProject] = useState<string>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchEpics = async () => {
      try {
        const response = await fetch('/api/epics')
        if (!response.ok) {
          throw new Error('Failed to fetch epics')
        }
        const data = await response.json()
        setEpics(data)
        setFilteredEpics(data)
      } catch (error) {
        console.error('Error fetching epics:', error)
      }
    }

    fetchEpics()
  }, [])

  const projects = useMemo(() => {
    const projectSet = new Set(epics.map(epic => epic["Project Name"]))
    return ['all', ...Array.from(projectSet)]
  }, [epics])

  useEffect(() => {
    let filtered = epics
    if (selectedProject !== 'all') {
      filtered = filtered.filter(epic => epic["Project Name"] === selectedProject)
    }
    filtered = filtered.filter(epic =>
      Object.values(epic).some(value => 
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setFilteredEpics(filtered)
    setCurrentPage(1)
  }, [searchTerm, epics, selectedProject])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSort = (key: keyof Epic) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })

    const sortedEpics = [...filteredEpics].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })
    setFilteredEpics(sortedEpics)
  }

  const getSortIcon = (key: keyof Epic) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
    }
    return null
  }

  const handleEdit = (id: string) => {
    setEditingId(id)
  }

  const handleSave = async (id: string) => {
    // Implement save logic here
    // For now, we'll just exit edit mode
    setEditingId(null)
  }

  const handleChange = (id: string, key: keyof Epic, value: string) => {
    const updatedEpics = epics.map(epic => 
      epic.id === id ? { ...epic, [key]: value } : epic
    )
    setEpics(updatedEpics)
    setFilteredEpics(updatedEpics)
  }

  const totalPages = Math.ceil(filteredEpics.length / ITEMS_PER_PAGE)
  const paginatedEpics = filteredEpics.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Buscar épicas..."
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
        <Button onClick={() => router.push('/roadmap')} className="bg-white/10 text-white hover:bg-white/20">Ver Roadmap</Button>
      </div>
      {paginatedEpics.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columnOrder.map((key) => (
                    key !== 'id' && (
                      <TableHead key={key} className="text-white">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort(key)}
                          className="text-white hover:text-white/80"
                        >
                          {columnMappings[key] || key}
                          {getSortIcon(key)}
                        </Button>
                      </TableHead>
                    )
                  ))}
                  <TableHead className="text-white sticky right-0 bg-violet-900">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEpics.map((epic) => (
                  <TableRow key={epic.id} className="hover:bg-white/5">
                    {columnOrder.map((key) => (
                      key !== 'id' && (
                        <TableCell key={key} className="text-white/80">
                          {editingId === epic.id ? (
                            <Input
                              value={epic[key]?.toString() || ''}
                              onChange={(e) => handleChange(epic.id, key, e.target.value)}
                              className="bg-white/5 text-white border-white/20"
                            />
                          ) : (
                            key === 'resumen' 
                              ? truncateText(epic[key]?.toString() || '', 50) 
                              : epic[key]?.toString() || '-'
                          )}
                        </TableCell>
                      )
                    ))}
                    <TableCell className="text-white/80 sticky right-0 bg-violet-900">
                      {editingId === epic.id ? (
                        <Button onClick={() => handleSave(epic.id)} className="bg-green-600 hover:bg-green-700">
                          Guardar
                        </Button>
                      ) : (
                        <Button onClick={() => handleEdit(epic.id)} className="bg-white/10 hover:bg-white/20">
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
        <div className="text-white text-center py-4">No hay épicas disponibles.</div>
      )}
    </div>
  )
}

