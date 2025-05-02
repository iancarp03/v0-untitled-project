"use server"

import { cookies } from "next/headers"

// En una aplicación real, esto debería estar en una base de datos segura
const USERS = {
  admin: {
    password: "admin123",
    name: "Administrador",
  },
}

export async function login(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  // Verificar credenciales
  if (!username || !password) {
    return { success: false, message: "Usuario y contraseña son requeridos" }
  }

  const user = USERS[username as keyof typeof USERS]
  if (!user || user.password !== password) {
    return { success: false, message: "Usuario o contraseña incorrectos" }
  }

  // Establecer cookie de sesión (en una app real, usar JWT o similar)
  cookies().set("auth", JSON.stringify({ username, name: user.name }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    path: "/",
  })

  return { success: true, message: "Inicio de sesión exitoso" }
}

export async function logout() {
  cookies().delete("auth")
  return { success: true }
}

export async function getSession() {
  const authCookie = cookies().get("auth")
  if (!authCookie) {
    return null
  }

  try {
    return JSON.parse(authCookie.value)
  } catch (e) {
    return null
  }
}

export async function isAuthenticated() {
  const session = await getSession()
  return !!session
}
