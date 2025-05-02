import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { MessageTemplateProvider } from "@/hooks/use-message-template"
// Eliminamos la importación de AfaShieldFix que estaba causando problemas
// import AfaShieldFix from "./afa-shield-fix"

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
        {/* Eliminamos el componente AfaShieldFix que estaba causando problemas */}
        <MessageTemplateProvider>{children}</MessageTemplateProvider>
      </body>
    </html>
  )
}
