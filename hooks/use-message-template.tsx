"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getMessageTemplate } from "@/lib/player-actions"

interface MessageTemplateContextType {
  messageTemplate: string
  setMessageTemplate: (template: string) => void
}

const defaultTemplate =
  "¡Hola {nombre} {apellido}! Bienvenido/a al Club Deportivo Liceo. Te confirmamos tu registro en la categoría {categoria}. La cuota mensual es de {cuota}. Nos pondremos en contacto contigo pronto para más información."

const MessageTemplateContext = createContext<MessageTemplateContextType>({
  messageTemplate: defaultTemplate,
  setMessageTemplate: () => {},
})

export function MessageTemplateProvider({ children }: { children: ReactNode }) {
  const [messageTemplate, setMessageTemplateState] = useState(defaultTemplate)

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        // Intentar cargar desde localStorage
        const storedTemplate = localStorage.getItem("messageTemplate")
        if (storedTemplate) {
          const parsedTemplate = JSON.parse(storedTemplate)
          setMessageTemplateState(parsedTemplate.template || defaultTemplate)
        } else {
          // Si no hay en localStorage, usar el de la API
          const template = await getMessageTemplate()
          setMessageTemplateState(template.template)
          // Guardar en localStorage
          localStorage.setItem("messageTemplate", JSON.stringify({ template: template.template }))
        }
      } catch (error) {
        console.error("Error fetching message template:", error)
      }
    }

    fetchTemplate()
  }, [])

  const setMessageTemplate = (template: string) => {
    setMessageTemplateState(template)
    // Guardar en localStorage
    localStorage.setItem("messageTemplate", JSON.stringify({ template }))
  }

  return (
    <MessageTemplateContext.Provider value={{ messageTemplate, setMessageTemplate }}>
      {children}
    </MessageTemplateContext.Provider>
  )
}

export function useMessageTemplate() {
  return useContext(MessageTemplateContext)
}
