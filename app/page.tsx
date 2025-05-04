import Image from "next/image"
import Link from "next/link"
import { Instagram, Phone, Calendar, Trophy, Users, MapPin, CheckCircle, Clock, Navigation, Info } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="bg-black text-white py-4 border-b-4 border-red-600">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <Image
                src="/images/club-shield.png"
                alt="Club Deportivo Liceo Shield"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold">Club Deportivo Liceo</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <Image
                src="/images/afa-shield.png"
                alt="AFA Shield"
                width={80}
                height={80}
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

      <section className="py-20 bg-gradient-to-b from-gray-100/80 to-white/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">Club Deportivo Liceo</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-700">
            Formando jugadores y personas desde 2019. Somos una institución comprometida con el desarrollo deportivo y
            humano.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-red-600" />
              <span className="font-semibold">Fundado en 2019</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-red-600" />
              <span className="font-semibold">Múltiples Ligas</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-red-600" />
              <span className="font-semibold">Formación Integral</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-red-600" />
              <span className="font-semibold">Florencio Varela</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl border-2 border-black bg-white/90">
              <Image src="/images/team-photo.jpg" alt="Club Deportivo Liceo" fill className="object-cover" />
            </div>
            <div className="space-y-6 bg-white/90 p-6 rounded-lg shadow-lg border-2 border-black">
              <h2 className="text-3xl font-bold text-black">Nuestra Historia</h2>
              <p className="text-gray-700">
                El Club Deportivo Liceo fue fundado el 3 de noviembre de 2019 con la misión de formar jugadores con
                valores y excelencia deportiva. Nuestros fundadores, Juan Carlos Alegre (Presidente), Ian Alegre (Vice
                Presidente), Norma Fanelli (Secretaria) y Aylen Alegre (Vocal), establecieron las bases de lo que hoy es
                una institución de referencia en el fútbol formativo.
              </p>
              <p className="text-gray-700">
                Competimos en diversas ligas como Metropolitana, Amateur Platense, Liga Luján AFA, Liga Argentina, Liga
                Santander y San Vicente de AFA, tanto en fútbol once como en futsal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white/90">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestras Instalaciones</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700">
                Contamos con instalaciones de primer nivel para el desarrollo óptimo de nuestros jugadores:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Cancha oficial alambrada</strong> y autorizada por AFA y APREVIDE, cumpliendo con todos los
                    requisitos de seguridad.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Vestuarios completos</strong> con baños y duchas para mayor comodidad de nuestros jugadores.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Predio auxiliar</strong> para entrenamientos específicos y preparación física.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Entrenamientos de alto rendimiento</strong> evaluados y preparados por profesionales para la
                    formación integral de jugadores.
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative h-[350px] rounded-lg overflow-hidden shadow-xl border-2 border-black">
              <Image
                src="/images/cancha-alambrada.jpg"
                alt="Cancha alambrada del Club Deportivo Liceo"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-sm">
                Cancha oficial alambrada y autorizada por AFA y APREVIDE
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Horarios y Ubicación</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-black border-b-2 border-red-600 pb-2">
                <Clock className="w-5 h-5 text-red-600" /> Horarios de Entrenamiento
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    AM
                  </div>
                  <div>
                    <h4 className="font-semibold">Turno Mañana</h4>
                    <p className="text-gray-700">09:00 hs - Todas las categorías</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    PM
                  </div>
                  <div>
                    <h4 className="font-semibold">Turno Tarde</h4>
                    <p className="text-gray-700">17:00 hs - Todas las categorías</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    PM
                  </div>
                  <div>
                    <h4 className="font-semibold">Turno Noche</h4>
                    <p className="text-gray-700">20:00 hs - Categorías mayores</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
                  <Info className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Días de prueba:</span> Para consultar disponibilidad y coordinar una
                    prueba, por favor contactarse al número de WhatsApp que figura en esta página.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-black border-b-2 border-red-600 pb-2">
                <Navigation className="w-5 h-5 text-red-600" /> Ubicación
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Dirección</h4>
                    <p className="text-gray-700">Los Inmigrantes 4305, Florencio Varela</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Búsqueda en Google Maps</h4>
                    <p className="text-gray-700">Buscar como: "Club Deportivo Liceo"</p>
                  </div>
                </div>

                <div className="mt-4">
                  <a
                    href="https://maps.app.goo.gl/search/Club+Deportivo+Liceo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full bg-black text-white px-4 py-3 rounded-md text-center font-semibold hover:bg-black/80 transition-colors border-2 border-red-600"
                  >
                    Ver en Google Maps
                  </a>
                </div>

                <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
                  <h4 className="font-semibold mb-2">Contacto</h4>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-red-600" />
                    <a
                      href="https://wa.me/1126700138"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-red-600 transition-colors"
                    >
                      WhatsApp: 11-2670-0138
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Instagram className="w-4 h-4 text-red-600" />
                    <a
                      href="https://www.instagram.com/clubliceoficial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-red-600 transition-colors"
                    >
                      @clubliceoficial
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Querés probarte en nuestro club?</h2>
            <p className="text-xl mb-8">
              Tenemos lugar para jugadores en todas las categorías, tanto para AFA como para ligas locales. ¡No pierdas
              la oportunidad de formar parte de nuestra familia!
            </p>
            <div className="bg-red-600 p-6 rounded-lg inline-block shadow-lg">
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Galería de Fotos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg border-2 border-black hover-scale">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <Image src="/images/gallery-1.jpg" alt="Entrenamiento con jóvenes" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-bold">Formación de Jóvenes</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg border-2 border-black hover-scale">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <Image src="/images/gallery-2.jpg" alt="Charla técnica" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-bold">Charla Técnica</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg border-2 border-black hover-scale">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              <Image src="/images/gallery-3.jpg" alt="Equipo juvenil" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-bold">Equipo Juvenil</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestras Categorías</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-4 text-black border-b-2 border-red-600 pb-2">Liga Argentina</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Categoría 2006/2007</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Categoría 2008</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Categoría 2009/2010/2011</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-4 text-black border-b-2 border-red-600 pb-2">Liga Santander</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Primera (Edad libre)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Reserva (Edad libre)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-4 text-black border-b-2 border-red-600 pb-2">AFA San Vicente</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Primera (Edad libre)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Cuarta División</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Quinta División</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Sexta División</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-4 text-black border-b-2 border-red-600 pb-2">Futsal AFA</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Senior</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Primera (Edad libre)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Reserva (Edad libre)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Cuarta, Quinta y Sexta División</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-4 text-black border-b-2 border-red-600 pb-2">
                Futsal AFA Infantiles
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2012</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2013</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2014</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2015</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2016</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2017</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2018</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2019</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2020</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>Categoría 2021</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-2 border-black">
              <h3 className="text-xl font-bold mb-4 text-black border-b-2 border-red-600 pb-2">Fútbol Femenino</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Primera (Edad libre)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  <span>Sub 17</span>
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-block bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-black/80 transition-colors border-2 border-red-600"
                >
                  ¡Inscribite ahora!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black/95 text-white py-8 border-t-4 border-red-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Club Deportivo Liceo</h3>
              <p>Fundado el 3 de noviembre de 2019</p>
              <p className="mt-2">Los Inmigrantes 4305, Florencio Varela</p>
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
              <h3 className="text-xl font-bold mb-4">Horarios</h3>
              <ul className="space-y-2">
                <li>Mañana: 09:00 hs (todas las categorías)</li>
                <li>Tarde: 17:00 hs (todas las categorías)</li>
                <li>Noche: 20:00 hs (mayores)</li>
              </ul>
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
