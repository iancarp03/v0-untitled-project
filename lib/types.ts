export interface Player {
  id: string
  name: string
  lastName: string
  category: string
  position: string
  team?: string
  phone?: string
  notes?: string
  createdAt: string
  messageSent?: boolean
  messageDate?: string
}

export interface PlayersByDate {
  [date: string]: Player[]
}

export interface PlayersByCategory {
  [category: string]: Player[]
}

export interface MessageTemplate {
  template: string
}
