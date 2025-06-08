"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const messages = ["Need prayer? Tap here.", "Looking for guidance?", "Book a healing session", "Peace be with you 🕊️"]

export default function FloatingDove() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
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

  if (!isVisible) return null

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative">
        <div className="bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg border-2 border-blue-200 dark:border-slate-600 hover:border-blue-300 transition-all duration-300 hover:scale-110">
          <div className="text-2xl animate-bounce">🕊️</div>
        </div>

        <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-lg border border-gray-200 dark:border-slate-600 whitespace-nowrap">
          <div className="text-sm text-gray-700 dark:text-gray-300">{messages[currentMessage]}</div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white dark:bg-slate-800 border-l border-b border-gray-200 dark:border-slate-600 rotate-45"></div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
