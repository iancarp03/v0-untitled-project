"use server"

import { revalidatePath } from "next/cache"
import type { Player, PlayersByDate, PlayersByCategory, MessageTemplate } from "./types"

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

  revalidatePath("/")

  return { success: true, player: newPlayer }
}

export async function getPlayers(): Promise<Player[]> {
  // Simulate a delay to mimic a database call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return []
}

export async function getPlayersByDate(): Promise<PlayersByDate> {
  // Simulate a delay to mimic a database call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {}
}

export async function getPlayersByCategory(): Promise<PlayersByCategory> {
  // Simulate a delay to mimic a database call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {}
}

export async function markMessageSent(playerId: string): Promise<{ success: boolean }> {
  return { success: true }
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
