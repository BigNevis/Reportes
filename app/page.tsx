import { Card, CardContent } from "@/components/ui/card"
import { AvanceProyectos } from "./components/avance-proyectos"
import { IncidenciasPorEpica } from "./components/incidencias-por-epica"
import { TablaAvance } from "./components/tabla-avance"
import { ExecuteScriptsButton } from "./components/ExecuteScriptsButton"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-900 to-violet-800">
      <div className="container mx-auto p-8">
        <h1 className="sr-only">Dashboard de Reportes</h1>
        <div className="mb-8 flex justify-end space-x-4">
          <ExecuteScriptsButton />
          <Button asChild>
            <Link href="/epics">Ver Épicas</Link>
          </Button>
          <Button asChild>
            <Link href="/roadmap">Roadmap</Link>
          </Button>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" aria-label="Resumen de avance de proyectos">
          <AvanceProyectos 
            titulo="ART Producción" 
            projectKey="MAART"
            className="bg-gradient-to-br from-violet-600 to-violet-700"
          />
          <AvanceProyectos 
            titulo="Siniestros" 
            projectKey="MASIN"
            className="bg-gradient-to-br from-violet-700 to-violet-800"
          />
        </section>

        <Card className="mb-8 bg-gradient-to-br from-violet-800 to-violet-900">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Avance de Épicas por Incidencias
            </h2>
            <IncidenciasPorEpica />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-800 to-violet-900">
          <CardContent className="p-6">
            <TablaAvance />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

