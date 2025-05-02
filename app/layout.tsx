import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { MessageTemplateProvider } from "@/hooks/use-message-template"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Club Deportivo Liceo - Sistema de Anotación de Jugadores",
  description: "Sistema para anotar y gestionar jugadores del Club Deportivo Liceo",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <MessageTemplateProvider>{children}</MessageTemplateProvider>
      </body>
    </html>
  )
}
