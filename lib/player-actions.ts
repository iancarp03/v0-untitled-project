"use server"

import { revalidatePath } from "next/cache"
import type { Player, PlayersByDate, PlayersByCategory, MessageTemplate } from "./types"

// Simulated database - in a real app, you would use a database
const players: Player[] = []

// Default message template
const messageTemplate: MessageTemplate = {
  template:
    "¡Hola {nombre} {apellido}! Bienvenido/a al Club Deportivo Liceo. Te confirmamos tu registro en la categoría {categoria}. La cuota mensual es de {cuota}. Nos pondremos en contacto contigo pronto para más información.",
}

export async function addPlayer(formData: FormData) {
  const name = formData.get("name") as string
  const lastName = formData.get("lastName") as string
  const category = formData.get("category") as string
  const position = formData.get("position") as string
  const team = formData.get("team") as string
  const phone = formData.get("phone") as string
  const notes = formData.get("notes") as string

  const newPlayer: Player = {
    id: Date.now().toString(),
    name,
    lastName,
    category,
    position,
    team,
    phone,
    notes,
    createdAt: new Date().toISOString(),
    messageSent: false,
  }

  players.push(newPlayer)
  revalidatePath("/")

  return { success: true }
}

export async function getPlayers(): Promise<Player[]> {
  // Simulate a delay to mimic a database call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return a copy of the players array sorted by creation date (newest first)
  return [...players].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getPlayersByDate(): Promise<PlayersByDate> {
  // Simulate a delay to mimic a database call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Group players by date (YYYY-MM-DD)
  const playersByDate: PlayersByDate = {}

  players.forEach((player) => {
    const date = new Date(player.createdAt).toISOString().split("T")[0]
    if (!playersByDate[date]) {
      playersByDate[date] = []
    }
    playersByDate[date].push(player)
  })

  // Sort players within each date by creation time
  Object.keys(playersByDate).forEach((date) => {
    playersByDate[date].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  })

  return playersByDate
}

export async function getPlayersByCategory(): Promise<PlayersByCategory> {
  // Simulate a delay to mimic a database call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Group players by category
  const playersByCategory: PlayersByCategory = {}

  players.forEach((player) => {
    if (!playersByCategory[player.category]) {
      playersByCategory[player.category] = []
    }
    playersByCategory[player.category].push(player)
  })

  // Sort players within each category by name
  Object.keys(playersByCategory).forEach((category) => {
    playersByCategory[category].sort((a, b) => a.lastName.localeCompare(b.lastName))
  })

  return playersByCategory
}

export async function markMessageSent(playerId: string): Promise<{ success: boolean }> {
  const playerIndex = players.findIndex((p) => p.id === playerId)

  if (playerIndex !== -1) {
    players[playerIndex].messageSent = true
    players[playerIndex].messageDate = new Date().toISOString()
    revalidatePath("/")
    return { success: true }
  }

  return { success: false }
}

export async function getMessageTemplate(): Promise<MessageTemplate> {
  return messageTemplate
}

export async function updateMessageTemplate(template: string): Promise<{ success: boolean }> {
  messageTemplate.template = template
  revalidatePath("/")
  return { success: true }
}

export async function getFeeByCategory(category: string): Promise<string> {
  // Convert category to number for comparison
  const categoryYear = Number.parseInt(category, 10)

  // Check if it's a valid year between 2012 and 2021
  if (!isNaN(categoryYear) && categoryYear >= 2012 && categoryYear <= 2021) {
    return "$15.000"
  }

  // For all other categories
  return "$25.000"
}
