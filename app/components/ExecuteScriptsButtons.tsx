'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

export function ExecuteScriptsButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/execute-scripts', { method: 'POST' })
      const data = await response.json()
      if (data.success) {
        alert('Scripts ejecutados con éxito. Los datos han sido actualizados en la base de datos reportes_local.')
      } else {
        alert(`Error al ejecutar los scripts: ${data.error}. Por favor, verifica la conexión a la base de datos reportes_local.`)
      }
    } catch (error) {
      alert('Error al ejecutar los scripts. Por favor, verifica la conexión al servidor y a la base de datos reportes_local.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Actualizando datos...' : 'Actualizar Datos'}
    </Button>
  )
}

