"use server"

import { revalidatePath } from "next/cache"
import type { Photo, Post } from "./types"

// Simulated database - in a real app, you would use a database
const photos: Photo[] = []
const posts: Post[] = []

export async function addPhoto(formData: FormData) {
  const title = formData.get("title") as string
  const imageUrl = formData.get("imageUrl") as string

  const newPhoto: Photo = {
    id: Date.now().toString(),
    title,
    imageUrl,
    createdAt: new Date().toISOString(),
  }

  photos.push(newPhoto)
  revalidatePath("/")
  revalidatePath("/dashboard")

  return { success: true }
}

export async function getPhotos(): Promise<Photo[]> {
  // Simulate a delay to mimic a database call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return a copy of the photos array sorted by creation date (newest first)
  return [...photos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function deletePhoto(photoId: string): Promise<{ success: boolean }> {
  const photoIndex = photos.findIndex((p) => p.id === photoId)

  if (photoIndex !== -1) {
    photos.splice(photoIndex, 1)
    revalidatePath("/")
    revalidatePath("/dashboard")
    return { success: true }
  }

  return { success: false }
}

export async function addPost(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("imageUrl") as string

  const newPost: Post = {
    id: Date.now().toString(),
    title,
    content,
    imageUrl,
    createdAt: new Date().toISOString(),
  }

  posts.push(newPost)
  revalidatePath("/")
  revalidatePath("/dashboard")

  return { success: true }
}

export async function getPosts(): Promise<Post[]> {
  // Simulate a delay to mimic a database call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return a copy of the posts array sorted by creation date (newest first)
  return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function deletePost(postId: string): Promise<{ success: boolean }> {
  const postIndex = posts.findIndex((p) => p.id === postId)

  if (postIndex !== -1) {
    posts.splice(postIndex, 1)
    revalidatePath("/")
    revalidatePath("/dashboard")
    return { success: true }
  }

  return { success: false }
}
