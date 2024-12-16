import { BugsTable } from "./components/BugsTable"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-900 to-violet-800">
      <div className="container mx-auto p-8">
        <h1 className="sr-only">Tabla de Bugs</h1>
        <BugsTable />
      </div>
    </main>
  )
}

