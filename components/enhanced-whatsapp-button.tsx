"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { openWhatsAppChat } from "@/utils/whatsapp-helper"

export default function EnhancedWhatsAppButton() {
  const [position, setPosition] = useState({
    x: typeof window !== "undefined" ? Math.max(20, window.innerWidth - 80) : 20,
    y: typeof window !== "undefined" ? Math.max(20, window.innerHeight - 80) : 20,
  })
  const [isDragging, setIsDragging] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setShowTooltip(false)
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

  // Improve touch handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setShowTooltip(false)
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = touch.clientX - rect.left
    const offsetY = touch.clientY - rect.top

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 60, touch.clientX - offsetX)),
        y: Math.max(0, Math.min(window.innerHeight - 60, touch.clientY - offsetY)),
      })
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleTouchEnd)
    }

    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleTouchEnd)
  }

  const handleClick = () => {
    if (!isDragging) {
      openWhatsAppChat()
    }
  }

  return (
    <div className="fixed z-50">
      <div
        className={`w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ left: position.x, top: position.y }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <MessageCircle className="w-8 h-8 text-white" />

        {/* Tooltip */}
        {showTooltip && !isDragging && (
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
            Chat with Prophetess Blessing
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        )}
      </div>
    </div>
  )
}
