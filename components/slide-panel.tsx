"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SlidePanelProps {
  children: React.ReactNode
  title: string
  side?: "left" | "right"
}

export default function SlidePanel({ children, title, side = "left" }: SlidePanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-30 transition-transform duration-300 ease-in-out",
        side === "left" ? "left-0" : "right-0",
        isOpen ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full",
      )}
    >
      <div className="bg-white border-2 border-black shadow-lg rounded-r-lg overflow-hidden">
        <div className="p-4 max-w-xs">{children}</div>
      </div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 bg-black hover:bg-black/80 text-white",
          side === "left" ? "-right-10 rounded-l-none" : "-left-10 rounded-r-none",
        )}
      >
        {isOpen ? (
          side === "left" ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )
        ) : (
          <>
            {side === "left" ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            <span className="ml-1 rotate-90 whitespace-nowrap">{title}</span>
          </>
        )}
      </Button>
    </div>
  )
}
