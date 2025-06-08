"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Calendar, Heart } from "lucide-react"

export default function EnhancedFloatingDove() {
  const [isVisible, setIsVisible] = useState(true)
  const [showActions, setShowActions] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const [isDragging, setIsDragging] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setShowActions(false)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 200, e.clientX - offsetX)),
        y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - offsetY)),
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
      setShowActions(!showActions)
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed z-50 transition-all duration-300" style={{ left: position.x, top: position.y }}>
      <div className="relative">
        {/* Main Dove Button */}
        <div
          className={`relative transition-all duration-300 ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${showActions ? "scale-110" : "hover:scale-105"}`}
          onMouseDown={handleMouseDown}
          onClick={handleClick}
        >
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900 dark:to-yellow-900 rounded-full p-4 shadow-2xl border-2 border-amber-200 dark:border-amber-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-300 backdrop-blur-sm">
            <div className="text-3xl animate-wing-flutter">🕊️</div>

            {/* Glowing Outline */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-400/20 blur-lg animate-pulse"></div>
          </div>
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-3 animate-fade-in">
            <Button
              onClick={() => scrollToSection("sessions")}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Session</span>
            </Button>

            <Button
              onClick={() => scrollToSection("prayer-widget")}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 whitespace-nowrap"
            >
              <Heart className="w-4 h-4" />
              <span>Send Prayer</span>
            </Button>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      <style jsx>{`
        @keyframes wing-flutter {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(5deg); }
          75% { transform: rotate(-5deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-wing-flutter {
          animation: wing-flutter 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
