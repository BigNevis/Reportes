import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard de Reportes',
  description: 'Dashboard para visualización de reportes de proyectos',
  keywords: ['dashboard', 'reportes', 'proyectos', 'siniestros', 'ART Producción'],
  authors: [{ name: 'Your Company Name' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

