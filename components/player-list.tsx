"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getFeeByCategory } from "@/lib/player-actions"
import { MessageSquare, Check } from "lucide-react"
import type { Player } from "@/lib/types"
import { useMessageTemplate } from "@/hooks/use-message-template"

export default function PlayerList() {
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const { messageTemplate } = useMessageTemplate()

  useEffect(() => {
    const loadPlayers = async () => {
      setLoading(true)
      try {
        // Cargar desde localStorage
        const storedPlayers = localStorage.getItem("players")
        console.log("Stored players:", storedPlayers)

        if (storedPlayers) {
          try {
            const parsedPlayers = JSON.parse(storedPlayers)
            if (Array.isArray(parsedPlayers)) {
              setPlayers(
                parsedPlayers.sort(
                  (a: Player, b: Player) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                ),
              )
            } else {
              console.error("El formato de los datos almacenados no es un array:", parsedPlayers)
              setPlayers([])
            }
          } catch (parseError) {
            console.error("Error parsing players:", parseError)
            setPlayers([])
          }
        } else {
          setPlayers([])
        }
      } catch (error) {
        console.error("Error loading players:", error)
        setPlayers([])
      } finally {
        setLoading(false)
      }
    }

    loadPlayers()

    // Agregar un event listener para actualizar la lista cuando cambie el localStorage
    const handleStorageChange = () => {
      loadPlayers()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
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

      // Update local state to reflect the change
      const updatedPlayers = players.map((p) =>
        p.id === player.id ? { ...p, messageSent: true, messageDate: new Date().toISOString() } : p,
      )
      setPlayers(updatedPlayers)

      // Actualizar localStorage
      localStorage.setItem("players", JSON.stringify(updatedPlayers))

      // Disparar un evento de storage para que otros componentes se actualicen
      window.dispatchEvent(new Event("storage"))
    } else {
      alert("No hay número de teléfono registrado para este jugador.")
    }
  }

  if (loading) {
    return <div className="text-center p-8 text-black">Cargando jugadores...</div>
  }

  if (players.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-black rounded-lg bg-white">
        No hay jugadores anotados. Agrega tu primer jugador.
      </div>
    )
  }

  // Group players by category
  const playersByCategory: Record<string, Player[]> = {}
  players.forEach((player) => {
    if (!playersByCategory[player.category]) {
      playersByCategory[player.category] = []
    }
    playersByCategory[player.category].push(player)
  })

  // Sort categories
  const sortedCategories = Object.keys(playersByCategory).sort()

  return (
    <div className="space-y-6">
      {sortedCategories.map((category) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center justify-between bg-black text-white p-2 rounded-t-lg">
            <h3 className="font-semibold">Categoría {category}</h3>
            <Badge className="bg-red-600">{playersByCategory[category].length} jugadores</Badge>
          </div>

          {playersByCategory[category].map((player) => (
            <Card key={player.id} className="border-2 border-black overflow-hidden">
              <CardHeader className={`pb-2 ${player.messageSent ? "bg-green-100" : "bg-white"} border-b border-black`}>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-black">
                    {player.name} {player.lastName}
                    {player.messageSent && (
                      <Badge className="ml-2 bg-green-600">
                        <Check className="w-3 h-3 mr-1" /> Mensaje enviado
                      </Badge>
                    )}
                  </CardTitle>
                  <Badge className={getPositionColor(player.position)}>{getPositionName(player.position)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="bg-white text-black pt-3">
                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
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
                    <div>
                      <span className="font-medium">Teléfono:</span> {player.phone}
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
                  Registrado: {new Date(player.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-100 border-t border-black">
                <Button
                  onClick={() => sendWhatsAppMessage(player)}
                  className={`w-full ${
                    player.messageSent ? "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                  disabled={!player.phone}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {player.messageSent ? "Reenviar WhatsApp" : "Enviar WhatsApp"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ))}
    </div>
  )
}
