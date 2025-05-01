"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { updateMessageTemplate } from "@/lib/player-actions"
import { useMessageTemplate } from "@/hooks/use-message-template"

export default function MessageTemplateEditor() {
  const { messageTemplate, setMessageTemplate } = useMessageTemplate()
  const [editedTemplate, setEditedTemplate] = useState(messageTemplate)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const result = await updateMessageTemplate(editedTemplate)
      if (result.success) {
        setMessageTemplate(editedTemplate)
        setSaveStatus("success")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } else {
        setSaveStatus("error")
      }
    } catch (error) {
      setSaveStatus("error")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card className="border-2 border-black">
      <CardHeader className="bg-black text-white">
        <CardTitle>Plantilla de Mensaje</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <Label htmlFor="messageTemplate" className="text-black font-semibold block mb-2">
            Personaliza el mensaje de WhatsApp
          </Label>
          <textarea
            id="messageTemplate"
            value={editedTemplate}
            onChange={(e) => setEditedTemplate(e.target.value)}
            className="w-full min-h-[200px] p-2 border-2 border-black rounded-md"
            placeholder="Escribe tu plantilla de mensaje aquí..."
          />
        </div>

        <div className="bg-gray-100 p-3 rounded-md border border-gray-300">
          <h4 className="font-semibold text-sm mb-2">Variables disponibles:</h4>
          <ul className="text-xs space-y-1">
            <li>
              <code className="bg-gray-200 px-1 rounded">{"{nombre}"}</code> - Nombre del jugador
            </li>
            <li>
              <code className="bg-gray-200 px-1 rounded">{"{apellido}"}</code> - Apellido del jugador
            </li>
            <li>
              <code className="bg-gray-200 px-1 rounded">{"{categoria}"}</code> - Categoría del jugador
            </li>
            <li>
              <code className="bg-gray-200 px-1 rounded">{"{cuota}"}</code> - Monto de la cuota
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-100 border-t border-black">
        <Button
          onClick={handleSave}
          className="w-full bg-black hover:bg-black/80 text-white border-2 border-red-600"
          disabled={isSaving}
        >
          {isSaving ? "Guardando..." : "Guardar Plantilla"}
        </Button>

        {saveStatus === "success" && (
          <div className="text-green-600 text-sm mt-2">¡Plantilla guardada correctamente!</div>
        )}

        {saveStatus === "error" && (
          <div className="text-red-600 text-sm mt-2">Error al guardar la plantilla. Intenta nuevamente.</div>
        )}
      </CardFooter>
    </Card>
  )
}
