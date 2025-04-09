import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conexão Saudável',
  description: 'Gerencie seu tempo digital de forma inteligente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}