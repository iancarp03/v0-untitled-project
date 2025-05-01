import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PlayerForm from "@/components/player-form"
import PlayerList from "@/components/player-list"
import PlayerRegistrations from "@/components/player-registrations"
import MessageTemplateEditor from "@/components/message-template-editor"
import Image from "next/image"

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
          <div className="relative w-16 h-16">
            <Image src="/images/afa-shield.png" alt="AFA Shield" width={64} height={64} className="object-contain" />
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-160px)]">
        <aside className="w-80 bg-gray-100 border-r-2 border-black p-4 hidden md:block">
          <MessageTemplateEditor />
        </aside>

        <div className="flex-1 container py-8 px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-black">Sistema de Anotación de Jugadores</h2>

          <Tabs defaultValue="registro" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="registro"
                className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Registro de Jugadores
              </TabsTrigger>
              <TabsTrigger
                value="historial"
                className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Historial de Registros
              </TabsTrigger>
            </TabsList>

            <TabsContent value="registro" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-black">Agregar Jugador Nuevo</h3>
                  <PlayerForm />

                  {/* Mobile version of message template editor */}
                  <div className="block md:hidden mt-8">
                    <MessageTemplateEditor />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-black">Jugadores Anotados</h3>
                  <PlayerList />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="historial" className="mt-0">
              <PlayerRegistrations />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="bg-black text-white py-4 border-t-4 border-red-600">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Club Deportivo Liceo - Todos los derechos reservados</p>
        </div>
      </footer>
    </main>
  )
}
