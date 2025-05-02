import Link from "next/link"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/90 rounded-lg shadow-lg border-2 border-black text-center">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <Image src="/images/club-shield.png" alt="Club Deportivo Liceo Shield" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-center">Club Deportivo Liceo</h1>
          <h2 className="text-xl font-bold text-red-600 mt-4">Página no encontrada</h2>
        </div>

        <p className="text-gray-700">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-block bg-black hover:bg-black/80 text-white px-6 py-3 rounded-lg font-bold border-2 border-red-600"
          >
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  )
}
