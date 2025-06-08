"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 })
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 60, e.clientX - offsetX)),
        y: Math.max(0, Math.min(window.innerHeight - 60, e.clientY - offsetY)),
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleClick = () => {
    if (!isDragging) {
      window.open("https://wa.me/+2347026918232?text=Hello, I would like to book a session", "_blank")
    }
  }

  return (
    <div
      title="Chat with Prophetess Blessing"
      className={`fixed z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </div>
  )
}
