"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPlayersByDate, getPlayersByCategory, markMessageSent, getFeeByCategory } from "@/lib/player-actions"
import { MessageSquare, Download, Check } from "lucide-react"
import type { Player, PlayersByDate, PlayersByCategory } from "@/lib/types"
import { useMessageTemplate } from "@/hooks/use-message-template"

export default function PlayerRegistrations() {
  const [playersByDate, setPlayersByDate] = useState<PlayersByDate>({})
  const [playersByCategory, setPlayersByCategory] = useState<PlayersByCategory>({})
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<"date" | "category">("date")
  const { messageTemplate } = useMessageTemplate()

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true)
      const dateData = await getPlayersByDate()
      const categoryData = await getPlayersByCategory()
      setPlayersByDate(dateData)
      setPlayersByCategory(categoryData)
      setLoading(false)
    }

    loadPlayers()
  }, [])

  const getPositionColor = (position: string) => {
    switch (position) {
      case "portero":
        return "bg-red-600 hover:bg-red-700"
      case "defensa":
        return "bg-black hover:bg-black/80"
      case "mediocampista":
        return "bg-red-600 hover:bg-red-700"
      case "delantero":
        return "bg-black hover:bg-black/80"
      default:
        return "bg-gray-500"
    }
  }

  const getPositionName = (position: string) => {
    switch (position) {
      case "portero":
        return "Portero"
      case "defensa":
        return "Defensa"
      case "mediocampista":
        return "Mediocampista"
      case "delantero":
        return "Delantero"
      default:
        return position
    }
  }

  const sendWhatsAppMessage = async (player: Player) => {
    if (!player.phone) {
      alert("No hay número de teléfono registrado para este jugador.")
      return
    }

    const fee = await getFeeByCategory(player.category)

    let message = messageTemplate
    message = message.replace("{nombre}", player.name)
    message = message.replace("{apellido}", player.lastName)
    message = message.replace("{categoria}", player.category)
    message = message.replace("{cuota}", fee)

    const encodedMessage = encodeURIComponent(message)
    const phoneNumber = player.phone.replace(/\D/g, "") || ""

    if (phoneNumber) {
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
      await markMessageSent(player.id)

      // Update local state to reflect the change
      if (activeView === "date") {
        const updatedPlayersByDate = { ...playersByDate }
        Object.keys(updatedPlayersByDate).forEach((date) => {
          updatedPlayersByDate[date] = updatedPlayersByDate[date].map((p) =>
            p.id === player.id ? { ...p, messageSent: true, messageDate: new Date().toISOString() } : p,
          )
        })
        setPlayersByDate(updatedPlayersByDate)
      } else {
        const updatedPlayersByCategory = { ...playersByCategory }
        Object.keys(updatedPlayersByCategory).forEach((category) => {
          updatedPlayersByCategory[category] = updatedPlayersByCategory[category].map((p) =>
            p.id === player.id ? { ...p, messageSent: true, messageDate: new Date().toISOString() } : p,
          )
        })
        setPlayersByCategory(updatedPlayersByCategory)
      }
    } else {
      alert("No hay número de teléfono registrado para este jugador.")
    }
  }

  const exportToCSV = async (title: string, players: Player[]) => {
    const headers = [
      "Nombre",
      "Apellido",
      "Categoría",
      "Cuota",
      "Posición",
      "Equipo Anterior",
      "Teléfono",
      "Notas",
      "Fecha de Registro",
      "Mensaje Enviado",
    ]

    // Create an array of promises for getting fees
    const playerPromises = await Promise.all(
      players.map(async (player) => {
        const fee = await getFeeByCategory(player.category)
        return [
          player.name,
          player.lastName,
          player.category,
          fee,
          getPositionName(player.position),
          player.team || "",
          player.phone || "",
          (player.notes || "").replace(/,/g, ";").replace(/\n/g, " "),
          new Date(player.createdAt).toLocaleString(),
          player.messageSent ? "Sí" : "No",
        ].join(",")
      }),
    )

    const csvRows = [headers.join(","), ...playerPromises]

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `jugadores-${title.replace(/\s+/g, "-").toLowerCase()}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return <div className="text-center p-8 text-black">Cargando registros...</div>
  }

  const dates = Object.keys(playersByDate).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
  const categories = Object.keys(playersByCategory).sort()

  if (dates.length === 0 && categories.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-black rounded-lg bg-white">
        No hay registros de jugadores disponibles.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4 text-black">Historial de Registros</h3>

      <Tabs defaultValue="date" onValueChange={(value) => setActiveView(value as "date" | "category")}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger
            value="date"
            className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Por Fecha
          </TabsTrigger>
          <TabsTrigger
            value="category"
            className="bg-white text-black data-[state=active]:bg-black data-[state=active]:text-white"
          >
            Por Categoría
          </TabsTrigger>
        </TabsList>

        <TabsContent value="date" className="mt-0">
          <Accordion type="single" collapsible className="w-full">
            {dates.map((date) => (
              <AccordionItem key={date} value={date} className="border-2 border-black mb-4">
                <AccordionTrigger className="bg-black text-white px-4 py-2 hover:no-underline hover:bg-black/80">
                  <div className="flex justify-between items-center w-full">
                    <span>
                      {new Date(date).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <Badge className="bg-red-600 ml-2">{playersByDate[date].length} jugadores</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="flex justify-end mb-4">
                    <Button
                      onClick={() => exportToCSV(new Date(date).toLocaleDateString(), playersByDate[date])}
                      className="bg-black hover:bg-black/80 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" /> Exportar a CSV
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {playersByDate[date].map((player) => (
                      <Card
                        key={player.id}
                        className={`border ${player.messageSent ? "border-green-500" : "border-gray-300"} overflow-hidden`}
                      >
                        <CardHeader className={`pb-2 ${player.messageSent ? "bg-green-100" : "bg-gray-100"}`}>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base flex items-center">
                              {player.name} {player.lastName}
                              {player.messageSent && (
                                <Badge className="ml-2 bg-green-600">
                                  <Check className="w-3 h-3 mr-1" /> Mensaje enviado
                                </Badge>
                              )}
                            </CardTitle>
                            <div className="flex gap-2">
                              <Badge className={getPositionColor(player.position)}>
                                {getPositionName(player.position)}
                              </Badge>
                              <Badge variant="outline" className="border-black">
                                {player.category}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Categoría:</span> {player.category}
                            </div>
                            <div>
                              <span className="font-medium">Cuota:</span> {getFeeByCategory(player.category)}
                            </div>
                            {player.team && (
                              <div>
                                <span className="font-medium">Equipo Anterior:</span> {player.team}
                              </div>
                            )}
                            {player.phone && (
                              <div className="flex items-center">
                                <span className="font-medium mr-2">Teléfono:</span> {player.phone}
                                <Button
                                  onClick={() => sendWhatsAppMessage(player)}
                                  variant="ghost"
                                  size="sm"
                                  className={`ml-2 h-6 w-6 p-0 ${
                                    player.messageSent
                                      ? "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                      : "text-green-600 hover:text-green-700 hover:bg-green-50"
                                  }`}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                          {player.notes && (
                            <div className="mt-2 text-sm">
                              <span className="font-medium">Notas:</span>
                              <p className="mt-1 text-gray-700">{player.notes}</p>
                            </div>
                          )}
                          <div className="text-xs text-right mt-2 text-gray-500">
                            Hora: {new Date(player.createdAt).toLocaleTimeString()}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        <TabsContent value="category" className="mt-0">
          <Accordion type="single" collapsible className="w-full">
            {categories.map((category) => (
              <AccordionItem key={category} value={category} className="border-2 border-black mb-4">
                <AccordionTrigger className="bg-black text-white px-4 py-2 hover:no-underline hover:bg-black/80">
                  <div className="flex justify-between items-center w-full">
                    <span>Categoría {category}</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-600">{playersByCategory[category].length} jugadores</Badge>
                      <Badge className="bg-white text-black border border-white">
                        Cuota: {getFeeByCategory(category)}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="flex justify-end mb-4">
                    <Button
                      onClick={() => exportToCSV(`Categoria-${category}`, playersByCategory[category])}
                      className="bg-black hover:bg-black/80 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" /> Exportar a CSV
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {playersByCategory[category].map((player) => (
                      <Card
                        key={player.id}
                        className={`border ${player.messageSent ? "border-green-500" : "border-gray-300"} overflow-hidden`}
                      >
                        <CardHeader className={`pb-2 ${player.messageSent ? "bg-green-100" : "bg-gray-100"}`}>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base flex items-center">
                              {player.name} {player.lastName}
                              {player.messageSent && (
                                <Badge className="ml-2 bg-green-600">
                                  <Check className="w-3 h-3 mr-1" /> Mensaje enviado
                                </Badge>
                              )}
                            </CardTitle>
                            <div className="flex gap-2">
                              <Badge className={getPositionColor(player.position)}>
                                {getPositionName(player.position)}
                              </Badge>
                              <Badge variant="outline" className="border-black">
                                {player.category}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="font-medium">Fecha:</span>{" "}
                              {new Date(player.createdAt).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Cuota:</span> {getFeeByCategory(player.category)}
                            </div>
                            {player.team && (
                              <div>
                                <span className="font-medium">Equipo Anterior:</span> {player.team}
                              </div>
                            )}
                            {player.phone && (
                              <div className="flex items-center">
                                <span className="font-medium mr-2">Teléfono:</span> {player.phone}
                                <Button
                                  onClick={() => sendWhatsAppMessage(player)}
                                  variant="ghost"
                                  size="sm"
                                  className={`ml-2 h-6 w-6 p-0 ${
                                    player.messageSent
                                      ? "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                                      : "text-green-600 hover:text-green-700 hover:bg-green-50"
                                  }`}
                                >
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                          {player.notes && (
                            <div className="mt-2 text-sm">
                              <span className="font-medium">Notas:</span>
                              <p className="mt-1 text-gray-700">{player.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  )
}
