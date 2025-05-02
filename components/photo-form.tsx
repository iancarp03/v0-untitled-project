"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addPhoto } from "@/lib/content-actions"

export default function PhotoForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

      await addPhoto(formDataObj)

      // Reset form
      setFormData({
        title: "",
        imageUrl: "",
      })

      router.refresh()
    } catch (error) {
      console.error("Error al guardar la foto:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border-2 border-black rounded-lg bg-white shadow-md">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-black">
          Título de la Foto
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border-black"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl" className="text-black">
          URL de la Imagen
        </Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="border-black"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        <p className="text-xs text-gray-500">Sube tu imagen a un servicio como Imgur o ImgBB y pega la URL aquí</p>
      </div>

      <Button
        type="submit"
        className="w-full bg-black hover:bg-black/80 text-white border-2 border-red-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Guardar Foto"}
      </Button>
    </form>
  )
}
