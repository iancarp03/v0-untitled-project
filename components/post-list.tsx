"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getPosts, deletePost } from "@/lib/content-actions"
import { Trash2 } from "lucide-react"
import type { Post } from "@/lib/types"
import Image from "next/image"

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      const data = await getPosts()
      setPosts(data)
      setLoading(false)
    }

    loadPosts()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta noticia?")) {
      await deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    }
  }

  if (loading) {
    return <div className="text-center p-8 text-black">Cargando noticias...</div>
  }

  if (posts.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-black rounded-lg bg-white">
        No hay noticias. Agrega tu primera noticia.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <Card key={post.id} className="border-2 border-black overflow-hidden">
          <CardHeader className="p-4 bg-gray-100 border-b border-black">
            <CardTitle className="text-black text-lg">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {post.imageUrl && (
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={post.imageUrl || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </CardContent>
          <CardFooter className="bg-gray-100 border-t border-black p-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
            <Button
              onClick={() => handleDelete(post.id)}
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
