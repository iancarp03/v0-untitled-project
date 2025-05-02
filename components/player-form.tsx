"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addPlayer } from "@/lib/player-actions"

// Define initial form state
const initialFormState = {
  name: "",
  lastName: "",
  category: "",
  position: "",
  team: "",
  phone: "",
  notes: "",
}

export default function PlayerForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState(initialFormState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePositionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, position: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData object manually
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataObj.append(key, value)
      })

      await addPlayer(formDataObj)

      // Reset form by setting state back to initial values
      setFormData(initialFormState)

      router.refresh()
    } catch (error) {
      console.error("Error al guardar el jugador:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border-2 border-black rounded-lg bg-white shadow-md">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-black">
            Nombre
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border-black"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-black">
            Apellido
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="border-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-black">
            Categoría (Año)
          </Label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border-black"
            placeholder="Ej: 2010, 2015, etc."
          />
          <p className="text-xs text-gray-500">Categorías 2012-2021: $15.000 | Resto: $25.000</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="position" className="text-black">
            Posición
          </Label>
          <Select name="position" value={formData.position} onValueChange={handlePositionChange} required>
            <SelectTrigger className="border-black">
              <SelectValue placeholder="Seleccionar posición" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portero">Portero</SelectItem>
              <SelectItem value="defensa">Defensa</SelectItem>
              <SelectItem value="mediocampista">Mediocampista</SelectItem>
              <SelectItem value="delantero">Delantero</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team" className="text-black">
          Equipo Anterior
        </Label>
        <Input id="team" name="team" value={formData.team} onChange={handleChange} className="border-black" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-black">
          Teléfono (WhatsApp)
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Ej: 1155667788"
          className="border-black"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-black">
          Notas
        </Label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full min-h-[100px] p-2 border-2 border-black rounded-md"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-black hover:bg-black/80 text-white border-2 border-red-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Guardar Jugador"}
      </Button>
    </form>
  )
}
