"use client"

import { useEffect } from "react"

export default function LocalStorageProvider() {
  useEffect(() => {
    // Función para inicializar los datos en localStorage si no existen
    const initializeLocalStorage = () => {
      try {
        // Verificar si localStorage está disponible
        if (typeof window !== "undefined" && window.localStorage) {
          // Inicializar players si no existe
          if (!localStorage.getItem("players")) {
            localStorage.setItem("players", JSON.stringify([]))
          } else {
            // Verificar que el formato sea correcto
            try {
              const players = JSON.parse(localStorage.getItem("players") || "[]")
              if (!Array.isArray(players)) {
                console.warn("El formato de players no es correcto, reinicializando")
                localStorage.setItem("players", JSON.stringify([]))
              }
            } catch (e) {
              console.warn("Error al parsear players, reinicializando")
              localStorage.setItem("players", JSON.stringify([]))
            }
          }

          // Inicializar photos si no existe
          if (!localStorage.getItem("photos")) {
            localStorage.setItem("photos", JSON.stringify([]))
          }

          // Inicializar posts si no existe
          if (!localStorage.getItem("posts")) {
            localStorage.setItem("posts", JSON.stringify([]))
          }

          // Inicializar messageTemplate si no existe
          if (!localStorage.getItem("messageTemplate")) {
            localStorage.setItem(
              "messageTemplate",
              JSON.stringify({
                template:
                  "¡Hola {nombre} {apellido}! Bienvenido/a al Club Deportivo Liceo. Te confirmamos tu registro en la categoría {categoria}. La cuota mensual es de {cuota}. Nos pondremos en contacto contigo pronto para más información.",
              }),
            )
          }
        }
      } catch (error) {
        console.error("Error al inicializar localStorage:", error)
      }
    }

    initializeLocalStorage()

    // Función para sincronizar datos entre pestañas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "players" || e.key === "photos" || e.key === "posts" || e.key === "messageTemplate") {
        // Disparar un evento personalizado para que los componentes se actualicen
        window.dispatchEvent(new Event("storage"))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return null
}
