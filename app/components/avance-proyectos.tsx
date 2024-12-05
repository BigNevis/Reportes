'use client'

import { useEffect, useState } from 'react'

interface AvanceProyectosProps {
  titulo: string
  projectKey: 'MAART' | 'MASIN'
  className?: string
}

interface ProyectoData {
  total_issues: number
  completed_issues: number
  completion_percentage: number
}

interface ProjectsData {
  MAART: ProyectoData
  MASIN: ProyectoData
}

export function AvanceProyectos({ titulo, projectKey, className = "" }: AvanceProyectosProps) {
  const [data, setData] = useState<ProyectoData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/avance-proyecto')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result: ProjectsData = await response.json()
        setData(result[projectKey])
      } catch (err) {
        setError('Error al cargar los datos')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [projectKey])

  return (
    <div className={`rounded-2xl p-6 shadow-lg ${className}`} aria-label={`Avance del proyecto ${titulo}`}>
      <div className="flex flex-col items-center justify-center text-white">
        {isLoading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : data ? (
          <>
            <div className="text-5xl font-bold mb-2">
              {data.completion_percentage.toFixed(2)}%
            </div>
            <div className="text-xl opacity-90">
              {titulo}
            </div>
            <div className="text-sm mt-2">
              {data.completed_issues} de {data.total_issues} tareas completadas
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

