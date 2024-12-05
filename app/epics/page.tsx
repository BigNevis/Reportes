import EpicsTable from '@/app/components/EpicsTable'

export default function EpicsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 to-violet-800 p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Tabla de Épicas</h1>
      <EpicsTable />
    </div>
  )
}

