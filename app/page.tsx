import Image from "next/image"
import Link from "next/link"
import { Instagram, Phone } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-black text-white py-4 border-b-4 border-red-600">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src="/images/club-shield.png"
                alt="Club Deportivo Liceo Shield"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold">Club Deportivo Liceo</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src="/images/afa-shield.png"
                alt="AFA Shield"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/clubliceoficial"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/1126700138"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 transition-colors"
              >
                <Phone className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Club Deportivo Liceo</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-700">
            Formando jugadores y personas desde 2019. Somos una institución comprometida con el desarrollo deportivo y
            humano.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl border-2 border-black">
              <Image src="/images/club-shield.png" alt="Club Deportivo Liceo" fill className="object-contain" />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-black">Nuestra Historia</h2>
              <p className="text-gray-700">
                El Club Deportivo Liceo fue fundado el 3 de noviembre de 2019 con la misión de formar jugadores con
                valores y excelencia deportiva. Nuestros fundadores, Juan Carlos Alegre (Presidente), Ian Alegre (Vice
                Presidente) y Norma Fanelli (Secretaria), establecieron las bases de lo que hoy es una institución de
                referencia en el fútbol formativo.
              </p>
              <p className="text-gray-700">
                Competimos en diversas ligas como Metropolitana, Amateur Platense, Liga Luján AFA, Liga Argentina, Liga
                Santander y San Vicente de AFA, tanto en fútbol once como en futsal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Querés probarte en nuestro club?</h2>
            <p className="text-xl mb-8">
              Tenemos lugar para jugadores en todas las categorías, tanto para AFA como para ligas locales. ¡No pierdas
              la oportunidad de formar parte de nuestra familia!
            </p>
            <div className="bg-red-600 p-6 rounded-lg inline-block">
              <p className="text-2xl font-bold mb-2">Contactanos</p>
              <p className="text-xl mb-4">WhatsApp: 11-2670-0138</p>
              <a
                href="https://wa.me/1126700138"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
              >
                Enviar mensaje
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8 border-t-4 border-red-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Club Deportivo Liceo</h3>
              <p>Fundado el 3 de noviembre de 2019</p>
              <div className="flex items-center mt-4 space-x-4">
                <a
                  href="https://www.instagram.com/clubliceoficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://wa.me/1126700138"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors"
                >
                  <Phone className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Ligas</h3>
              <ul className="space-y-2">
                <li>Liga Metropolitana</li>
                <li>Amateur Platense</li>
                <li>Liga Luján AFA</li>
                <li>Liga Argentina</li>
                <li>Liga Santander</li>
                <li>San Vicente de AFA</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p>WhatsApp: 11-2670-0138</p>
              <p>Instagram: @clubliceoficial</p>
              <div className="mt-4">
                <Link href="/login" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Acceso administrativo
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-4 border-t border-gray-800">
            <p>© {new Date().getFullYear()} Club Deportivo Liceo - Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
