"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getPhotos, deletePhoto } from "@/lib/content-actions"
import { Trash2 } from "lucide-react"
import type { Photo } from "@/lib/types"
import Image from "next/image"

export default function PhotoList() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true)
      const data = await getPhotos()
      setPhotos(data)
      setLoading(false)
    }

    loadPhotos()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta foto?")) {
      await deletePhoto(id)
      setPhotos(photos.filter((photo) => photo.id !== id))
    }
  }

  if (loading) {
    return <div className="text-center p-8 text-black">Cargando fotos...</div>
  }

  if (photos.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-black rounded-lg bg-white">
        No hay fotos. Agrega tu primera foto.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {photos.map((photo) => (
        <Card key={photo.id} className="border-2 border-black overflow-hidden">
          <CardHeader className="p-4 bg-gray-100 border-b border-black">
            <CardTitle className="text-black text-lg">{photo.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-48 w-full">
              <Image
                src={photo.imageUrl || "/placeholder.svg"}
                alt={photo.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-gray-100 border-t border-black p-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">{new Date(photo.createdAt).toLocaleDateString()}</span>
            <Button
              onClick={() => handleDelete(photo.id)}
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-800 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
