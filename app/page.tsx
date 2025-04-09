import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Conexão Saudável</h1>
        <p className="mb-8">Gerencie seu tempo digital de forma inteligente</p>
        <Link
          href="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Acessar Dashboard
        </Link>
      </div>
    </main>
  )
}