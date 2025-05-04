"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Download, Upload, Save } from "lucide-react"

export default function DataBackup() {
  const [backupStatus, setBackupStatus] = useState<string | null>(null)
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null)

  const handleBackup = () => {
    try {
      // Obtener todos los datos del localStorage
      const players = localStorage.getItem("players") || "[]"
      const messageTemplate = localStorage.getItem("messageTemplate") || "{}"
      const photos = localStorage.getItem("photos") || "[]"
      const posts = localStorage.getItem("posts") || "[]"

      // Crear un objeto con todos los datos
      const backupData = {
        players,
        messageTemplate,
        photos,
        posts,
        timestamp: new Date().toISOString(),
      }

      // Convertir a JSON y crear un blob
      const jsonData = JSON.stringify(backupData)
      const blob = new Blob([jsonData], { type: "application/json" })
      const url = URL.createObjectURL(blob)

      // Crear un enlace de descarga y hacer clic en él
      const a = document.createElement("a")
      a.href = url
      a.download = `club-liceo-backup-${new Date().toLocaleDateString().replace(/\//g, "-")}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      setBackupStatus("Copia de seguridad creada correctamente")
      setTimeout(() => setBackupStatus(null), 3000)
    } catch (error) {
      console.error("Error al crear la copia de seguridad:", error)
      setBackupStatus("Error al crear la copia de seguridad")
      setTimeout(() => setBackupStatus(null), 3000)
    }
  }

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const backupData = JSON.parse(content)

        // Restaurar los datos
        if (backupData.players) localStorage.setItem("players", backupData.players)
        if (backupData.messageTemplate) localStorage.setItem("messageTemplate", backupData.messageTemplate)
        if (backupData.photos) localStorage.setItem("photos", backupData.photos)
        if (backupData.posts) localStorage.setItem("posts", backupData.posts)

        // Disparar evento para actualizar los componentes
        window.dispatchEvent(new Event("storage"))

        setRestoreStatus("Datos restaurados correctamente. Recargando página...")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } catch (error) {
        console.error("Error al restaurar los datos:", error)
        setRestoreStatus("Error al restaurar los datos")
        setTimeout(() => setRestoreStatus(null), 3000)
      }
    }
    reader.readAsText(file)
  }

  return (
    <Card className="border-2 border-black">
      <CardHeader className="bg-black text-white">
        <CardTitle>Respaldo de Datos</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            Los datos se guardan localmente en tu navegador. Para acceder desde otra computadora o conservarlos a largo
            plazo, crea una copia de seguridad.
          </p>

          <div className="flex flex-col gap-4 mt-4">
            <Button
              onClick={handleBackup}
              className="bg-black hover:bg-black/80 text-white border-2 border-red-600 flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Crear copia de seguridad
            </Button>

            <div className="relative">
              <Button
                className="bg-black hover:bg-black/80 text-white border-2 border-red-600 w-full flex items-center gap-2"
                onClick={() => document.getElementById("restore-file")?.click()}
              >
                <Upload className="w-4 h-4" /> Restaurar copia de seguridad
              </Button>
              <input type="file" id="restore-file" accept=".json" className="hidden" onChange={handleRestore} />
            </div>
          </div>

          {backupStatus && <div className="mt-2 p-2 bg-green-100 text-green-700 rounded text-sm">{backupStatus}</div>}

          {restoreStatus && <div className="mt-2 p-2 bg-green-100 text-green-700 rounded text-sm">{restoreStatus}</div>}
        </div>
      </CardContent>
      <CardFooter className="bg-gray-100 border-t border-black p-3">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Save className="w-3 h-3" />
          Recuerda hacer copias de seguridad regularmente para no perder tus datos.
        </div>
      </CardFooter>
    </Card>
  )
}
