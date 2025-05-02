import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PlayerForm from "@/components/player-form"
import PlayerList from "@/components/player-list"
import PlayerRegistrations from "@/components/player-registrations"
import MessageTemplateEditor from "@/components/message-template-editor"
import SlidePanel from "@/components/slide-panel"
import Image from "next/image"
import { getSession, logout } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { redirect } from "next/navigation"
import PhotoForm from "@/components/photo-form"
import PhotoList from "@/components/photo-list"
import PostForm from "@/components/post-form"
import PostList from "@/components/post-list"

export default async function Dashboard() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen">
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
                priority
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
                unoptimized
              />
            </div>
            <form action={logout}>
              <Button type="submit" variant="ghost" className="text-white hover:text-red-200">
                <LogOut className="w-5 h-5 mr-2" />
                Salir
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container py-8 px-4">
        <div className="flex items-center justify-between mb-8 bg-white/90 p-4 rounded-lg shadow-md border-2 border-black">
          <h2 className="text-2xl font-bold text-black">Panel de Administración</h2>
          <div className="text-sm text-gray-600">
            Bienvenido, <span className="font-semibold">{session.name}</span>
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-lg shadow-lg border-2 border-black">
          <Tabs defaultValue="jugadores" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="jugadores"
                className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Jugadores
              </TabsTrigger>
              <TabsTrigger
                value="fotos"
                className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Fotos
              </TabsTrigger>
              <TabsTrigger
                value="noticias"
                className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white"
              >
                Noticias
              </TabsTrigger>
            </TabsList>

            <TabsContent value="jugadores" className="mt-0">
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
            </TabsContent>

            <TabsContent value="fotos" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-black">Agregar Nueva Foto</h3>
                  <PhotoForm />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-black">Fotos Publicadas</h3>
                  <PhotoList />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="noticias" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-black">Crear Nueva Noticia</h3>
                  <PostForm />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-black">Noticias Publicadas</h3>
                  <PostList />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <SlidePanel title="Plantilla de Mensaje" side="left">
        <MessageTemplateEditor />
      </SlidePanel>

      <footer className="bg-black/95 text-white py-4 border-t-4 border-red-600 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Club Deportivo Liceo - Todos los derechos reservados</p>
        </div>
      </footer>
    </main>
  )
}
