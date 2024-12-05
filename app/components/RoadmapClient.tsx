'use client'

import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/Badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/Collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, ChevronDown, ChevronRight, Home, FileText } from 'lucide-react'
import Link from 'next/link'

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

interface TeamData {
  name: string
  epics: Epic[]
}

interface GroupedEpics {
  [paquete: string]: Epic[]
}

const environments = ['Discovery', 'DEV', 'TEST', 'UAT', 'PROD']

export default function RoadmapClient() {
  const [teams, setTeams] = useState<TeamData[]>([])
  const [activeTeam, setActiveTeam] = useState<string>('')
  const [activeEnvironment, setActiveEnvironment] = useState<string>('Discovery')
  const [openPaquetes, setOpenPaquetes] = useState<{ [key: string]: boolean }>({})
  const [error, setError] = useState<string | null>(null)
  const [isExecutiveSummaryOpen, setIsExecutiveSummaryOpen] = useState(false)

  const fetchEpics = useCallback(async () => {
    try {
      const response = await fetch('/api/epics');
      if (!response.ok) {
        throw new Error('Failed to fetch epics');
      }
      const epics: Epic[] = await response.json();
      const projectMap: { [key: string]: Epic[] } = {};
      epics.forEach(epic => {
        if (!projectMap[epic["Project Name"]]) {
          projectMap[epic["Project Name"]] = [];
        }
        projectMap[epic["Project Name"]].push(epic);
      });
      const teamData: TeamData[] = [
        { name: 'All Teams', epics },
        ...Object.entries(projectMap).map(([name, epics]) => ({ name, epics }))
      ];
      setTeams(teamData);
      setActiveTeam('All Teams');
    } catch (err) {
      console.error("Error fetching epics:", err);
      setError("Error al cargar los datos de épicas. Por favor, inténtelo de nuevo más tarde.");
    }
  }, []);

  useEffect(() => {
    fetchEpics()
  }, [fetchEpics])

  const getEpicsForEnvironment = useCallback((epics: Epic[], environment: string) => {
    switch (environment) {
      case 'Discovery':
        return epics.filter(epic => epic["Fecha fin discovery"] && epic["Fecha fin discovery"] !== 'NA')
      case 'DEV':
        return epics.filter(epic => epic["Fecha imp. En Dev"] && epic["Fecha imp. En Dev"] !== 'NA')
      case 'TEST':
        return epics.filter(epic => epic["Fecha imp. En TEST"] && epic["Fecha imp. En TEST"] !== 'NA')
      case 'UAT':
        return epics.filter(epic => epic["Fecha UAT"] && epic["Fecha UAT"] !== 'NA')
      case 'PROD':
        return epics.filter(epic => epic["Fecha PROD"] && epic["Fecha PROD"] !== 'NA')
      default:
        return epics
    }
  }, [])

  const getDateFieldForEnvironment = (environment: string): keyof Epic => {
    switch (environment) {
      case 'Discovery':
        return 'Fecha Estiada Discovery'
      case 'DEV':
        return 'Fecha Estiada en DEV'
      case 'TEST':
        return 'Fecha Estimada en TEST'
      case 'UAT':
        return 'Fecha Estimada en UAT'
      case 'PROD':
        return 'Fecha Estimada en PROD'
      default:
        return 'Fecha Estimada en UAT'
    }
  }

  const groupEpicsByDate = useCallback((epics: Epic[], dateField: keyof Epic): GroupedEpics => {
    const grouped = epics.reduce((acc, epic) => {
      const date = epic[dateField] as string
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(epic)
      return acc
    }, {} as { [key: string]: Epic[] })

    return Object.entries(grouped)
      .sort(([dateA], [dateB]) => {
        const sprintA = parseInt(dateA.split(' ')[1])
        const sprintB = parseInt(dateB.split(' ')[1])
        return sprintA - sprintB
      })
      .reduce((acc, [date, epics], index) => {
        acc[`Paquete ${index + 1} - ${date}`] = epics
        return acc
      }, {} as GroupedEpics)
  }, [])

  const groupedEpics = useMemo(() => {
    const epics = teams.find(t => t.name === activeTeam)?.epics || []
    const filteredEpics = getEpicsForEnvironment(epics, activeEnvironment)
    const dateField = getDateFieldForEnvironment(activeEnvironment)
    return groupEpicsByDate(filteredEpics, dateField)
  }, [teams, activeTeam, activeEnvironment, getEpicsForEnvironment, groupEpicsByDate, getDateFieldForEnvironment])

  const getStatusColor = (status: string | null | undefined) => {
    if (!status) return 'bg-gray-300'
    switch (status.toLowerCase()) {
      case 'no iniciado':
        return 'bg-gray-500'
      case 'en progreso':
        return 'bg-blue-500'
      case 'imp. dev':
        return 'bg-cyan-500'
      case 'qa dev':
        return 'bg-teal-500'
      case 'imp test':
        return 'bg-green-500'
      case 'qa test':
        return 'bg-lime-500'
      case 'pendiente uat':
        return 'bg-yellow-500'
      case 'pendiente aprobacion uat':
        return 'bg-amber-500'
      case 'pendiente implementar prod':
        return 'bg-orange-500'
      case 'implementado en prod':
        return 'bg-green-700'
      case 'bloqueado por bug':
        return 'bg-red-500'
      default:
        return 'bg-purple-500'
    }
  }

  const getDateDifference = (estimated: string, actual: string) => {
    if (!estimated || !actual || estimated === 'NA' || actual === 'NA') return 0
    const estimatedSprint = parseInt(estimated.split(' ')[1])
    const actualSprint = parseInt(actual.split(' ')[1])
    return actualSprint - estimatedSprint
  }

  const getEnvironmentDates = (epic: Epic, env: string) => {
    switch (env) {
      case 'Discovery':
        return {
          estimated: epic["Fecha Estiada Discovery"],
          actual: epic["Fecha fin discovery"]
        }
      case 'DEV':
        return {
          estimated: epic["Fecha Estiada en DEV"],
          actual: epic["Fecha imp. En Dev"]
        }
      case 'TEST':
        return {
          estimated: epic["Fecha Estimada en TEST"],
          actual: epic["Fecha imp. En TEST"]
        }
      case 'UAT':
        return {
          estimated: epic["Fecha Estimada en UAT"],
          actual: epic["Fecha UAT"]
        }
      case 'PROD':
        return {
          estimated: epic["Fecha Estimada en PROD"],
          actual: epic["Fecha PROD"]
        }
      default:
        return { estimated: '', actual: '' }
    }
  }

  const togglePaquete = (paquete: string) => {
    setOpenPaquetes(prev => ({
      ...prev,
      [paquete]: !prev[paquete]
    }))
  }

  const getBadgeVariant = (difference: number) => {
    return difference > 0 ? "destructive" : "secondary"
  }

  const getBadgeStyle = (difference: number) => {
    return difference <= 0 ? { backgroundColor: 'rgb(34 197 94)', color: 'white' } : {}
  }

  const calculateExecutiveSummary = useCallback(() => {
    const allEpics = teams.flatMap(team => team.epics)
    const totalEpics = allEpics.length
    const completedEpics = allEpics.filter(epic => epic["Fecha PROD"] && epic["Fecha PROD"] !== 'NA').length
    const delayedEpics = allEpics.filter(epic => {
      const dates = getEnvironmentDates(epic, 'PROD')
      return getDateDifference(dates.estimated, dates.actual) > 0
    }).length

    return {
      totalEpics,
      completedEpics,
      delayedEpics,
      completionRate: totalEpics > 0 ? (completedEpics / totalEpics * 100).toFixed(2) : '0',
      delayRate: totalEpics > 0 ? (delayedEpics / totalEpics * 100).toFixed(2) : '0'
    }
  }, [teams, getEnvironmentDates, getDateDifference])

  const executiveSummary = useMemo(() => calculateExecutiveSummary(), [calculateExecutiveSummary])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-4 md:p-8">
      <Card className="w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-md border-none shadow-2xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              asChild
            >
              <Link href="/">
                <Home className="h-6 w-6" />
                <span className="sr-only">Volver al inicio</span>
              </Link>
            </Button>
            <CardTitle className="text-2xl md:text-3xl font-bold text-center text-white">
              Roadmap del Proyecto
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsExecutiveSummaryOpen(true)}
            >
              <FileText className="h-6 w-6" />
              <span className="sr-only">Resumen Ejecutivo</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-4">
              {error}
            </div>
          )}

          {teams.length > 0 && (
            <>
              <div className="mb-6 flex space-x-4">
                <Select value={activeTeam} onValueChange={setActiveTeam}>
                  <SelectTrigger className="bg-white/5 text-white border-white/20">
                    <SelectValue placeholder="Seleccionar equipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map(team => (
                      <SelectItem key={team.name} value={team.name}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Tabs value={activeEnvironment} onValueChange={setActiveEnvironment}>
                <TabsList className="grid w-full grid-cols-5 mb-4">
                  {environments.map((env) => (
                    <TabsTrigger
                      key={env}
                      value={env}
                      className="data-[state=active]:bg-purple-500/50"
                    >
                      {env}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {environments.map((env) => (
                  <TabsContent key={env} value={env}>
                    <ScrollArea className="h-[calc(100vh-400px)] pr-4">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${activeTeam}-${env}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-white/20" />

                          <div className="space-y-8">
                            {Object.entries(groupedEpics).map(([paquete, epics], paqueteIndex) => (
                              <Collapsible
                                key={paquete}
                                open={openPaquetes[paquete]}
                                onOpenChange={() => togglePaquete(paquete)}
                              >
                                <CollapsibleTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-between text-white hover:bg-white/10"
                                  >
                                    <span className="text-xl font-semibold">{paquete}</span>
                                    {openPaquetes[paquete] ? <ChevronDown className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-4 space-y-4">
                                  {epics.map((epic, epicIndex) => (
                                    <motion.div
                                      key={epic.clave}
                                      initial={{ opacity: 0, y: 50 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.5, delay: epicIndex * 0.1 }}
                                      className="relative flex gap-4"
                                    >
                                      <div className="relative z-10 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 shadow-lg">
                                        <span className="text-lg md:text-xl font-bold text-white">{paqueteIndex + 1}.{epicIndex + 1}</span>
                                      </div>

                                      <div className="flex-1 pt-1 md:pt-2">
                                        <div className="flex items-center justify-between mb-2">
                                          <h3 className="text-lg md:text-xl font-semibold text-white flex items-center gap-2">
                                            <Badge
                                              variant="secondary"
                                              className={`${getStatusColor(epic.estado)} text-white`}
                                            >
                                              {epic.estado}
                                            </Badge>
                                            - {epic.clave}
                                          </h3>
                                        </div>
                                        <Card className="bg-white/5 border-none">
                                          <CardContent className="p-4 space-y-4">
                                            <div className="flex items-center gap-2 group">
                                              <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="bg-purple-500/20 text-purple-200 border-purple-400/50">
                                                  {epic["Oracle Form"]}
                                                </Badge>
                                                <span className="text-white/90 group-hover:text-white transition-colors">
                                                  {epic.resumen}
                                                </span>
                                              </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className="text-white/70">Motivos:</span>
                                              <span className="text-white/90">{epic.motivo || 'No especificado'}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                              <TooltipProvider>
                                                <Tooltip>
                                                  <TooltipTrigger asChild>
                                                    <div className="flex items-center gap-2">
                                                      <span className="text-white/70">Estimado:</span>
                                                      <Badge variant="secondary">{getEnvironmentDates(epic, env).estimated}</Badge>
                                                    </div>
                                                  </TooltipTrigger>
                                                  <TooltipContent side="top">
                                                    <p>Fecha estimada de {env === 'Discovery' ? 'finalización' : 'implementación'}</p>
                                                  </TooltipContent>
                                                </Tooltip>
                                              </TooltipProvider>
                                              <TooltipProvider>
                                                <Tooltip>
                                                  <TooltipTrigger asChild>
                                                    <div className="flex items-center gap-2">
                                                      <span className="text-white/70">{env === 'Discovery' ? 'Finalizado:' : 'Implementado:'}</span>
                                                      <Badge variant="secondary">{getEnvironmentDates(epic, env).actual}</Badge>
                                                    </div>
                                                  </TooltipTrigger>
                                                  <TooltipContent side="top">
                                                    <p>Fecha real de {env === 'Discovery' ? 'finalización' : 'implementación'}</p>
                                                  </TooltipContent>
                                                </Tooltip>
                                              </TooltipProvider>
                                            </div>
                                            <div className="flex items-center gap-2">
                                              <span className="text-white/70">Diferencia:</span>
                                              <Badge
                                                variant={getBadgeVariant(getDateDifference(getEnvironmentDates(epic, env).estimated, getEnvironmentDates(epic, env).actual))}
                                                style={getBadgeStyle(getDateDifference(getEnvironmentDates(epic, env).estimated, getEnvironmentDates(epic, env).actual))}
                                              >
                                                {getDateDifference(getEnvironmentDates(epic, env).estimated, getEnvironmentDates(epic, env).actual)} sprint(s)
                                              </Badge>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </motion.div>
                                  ))}
                                </CollapsibleContent>
                              </Collapsible>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={isExecutiveSummaryOpen} onOpenChange={setIsExecutiveSummaryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resumen Ejecutivo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p><strong>Total de épicas:</strong> {executiveSummary.totalEpics}</p>
            <p><strong>Épicas completadas:</strong> {executiveSummary.completedEpics}</p>
            <p><strong>Tasa de finalización:</strong> {executiveSummary.completionRate}%</p>
            <p><strong>Épicas retrasadas:</strong> {executiveSummary.delayedEpics}</p>
            <p><strong>Tasa de retraso:</strong> {executiveSummary.delayRate}%</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

