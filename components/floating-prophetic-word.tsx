"use client"

import { useEffect, useState } from "react"

const propheticWords = [
  "This is your season of restoration.",
  "The Lord shall go before you and make the crooked paths straight.",
  "Fear not, for I have called you by name; you are mine.",
  "Weeping may endure for a night, but joy comes in the morning.",
  "I will restore to you the years that the locust has eaten.",
  "Be still and know that I am God.",
  "Your breakthrough is closer than you think.",
  "The Lord your God is with you, mighty to save.",
]

export default function FloatingPropheticWord() {
  const [currentWord, setCurrentWord] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const rotateWords = () => {
      setIsTyping(true)
      setDisplayText("")

      const word = propheticWords[currentWord]
      let index = 0

      const typeWriter = setInterval(() => {
        if (index < word.length) {
          setDisplayText(word.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeWriter)
          setIsTyping(false)
          setTimeout(() => {
            setCurrentWord((prev) => (prev + 1) % propheticWords.length)
          }, 4000)
        }
      }, 100)

      return () => clearInterval(typeWriter)
    }

    const timer = setTimeout(rotateWords, 1000)
    return () => clearTimeout(timer)
  }, [currentWord])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 max-w-md mx-4">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-yellow-400/30 to-amber-400/30 rounded-2xl blur-xl animate-pulse" />

        {/* Main Card */}
        <div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-amber-200 dark:border-amber-700">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            ✕
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="text-2xl animate-pulse">🕊️</div>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Prophetic Word</span>
          </div>

          <p className="text-gray-800 dark:text-white font-medium leading-relaxed">
            {displayText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>

          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer pointer-events-none rounded-2xl" />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
