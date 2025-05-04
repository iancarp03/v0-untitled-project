"use client"

import { useEffect } from "react"

export default function LocalStorageProvider() {
  useEffect(() => {
    // Función para inicializar los datos en localStorage si no existen
    const initializeLocalStorage = () => {
      if (!localStorage.getItem("players")) {
        localStorage.setItem("players", JSON.stringify([]))
      }
      if (!localStorage.getItem("photos")) {
        localStorage.setItem("photos", JSON.stringify([]))
      }
      if (!localStorage.getItem("posts")) {
        localStorage.setItem("posts", JSON.stringify([]))
      }
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
