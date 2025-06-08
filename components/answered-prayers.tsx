"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const answeredPrayers = [
  {
    id: 1,
    text: "I received healing after joining the prophetic hour — Glory to God!",
    name: "Sarah M.",
    location: "Texas, USA",
    category: "Healing",
  },
  {
    id: 2,
    text: "The oil I got broke generational curses. I'm speechless.",
    name: "David K.",
    location: "Lagos, Nigeria",
    category: "Deliverance",
  },
  {
    id: 3,
    text: "After Prophetess prayed over my business, sales exploded. I'm in awe.",
    name: "Maria L.",
    location: "São Paulo, Brazil",
    category: "Breakthrough",
  },
  {
    id: 4,
    text: "The prophetic word about my marriage came to pass exactly as spoken!",
    name: "John R.",
    location: "London, UK",
    category: "Prophecy",
  },
  {
    id: 5,
    text: "My depression lifted completely after the healing session. Praise God!",
    name: "Grace T.",
    location: "Nairobi, Kenya",
    category: "Healing",
  },
  {
    id: 6,
    text: "The midnight prayer broke every chain. I'm walking in freedom now!",
    name: "Michael P.",
    location: "Sydney, Australia",
    category: "Freedom",
  },
]

export default function AnsweredPrayers() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  // Add touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextPrayer()
    }
    if (isRightSwipe) {
      prevPrayer()
    }
  }

  useEffect(() => {
    // Create floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % answeredPrayers.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextPrayer = () => {
    setCurrentIndex((prev) => (prev + 1) % answeredPrayers.length)
  }

  const prevPrayer = () => {
    setCurrentIndex((prev) => (prev - 1 + answeredPrayers.length) % answeredPrayers.length)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Healing: "from-green-400 to-emerald-400",
      Deliverance: "from-purple-400 to-violet-400",
      Breakthrough: "from-amber-400 to-yellow-400",
      Prophecy: "from-blue-400 to-cyan-400",
      Freedom: "from-pink-400 to-rose-400",
    }
    return colors[category as keyof typeof colors] || "from-gray-400 to-slate-400"
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-full animate-float opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">
            Answered Prayers & Testimonies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Witness the miraculous power of God through these testimonies
          </p>
        </div>

        <div className="relative">
          {/* Main Testimony Card */}
          <Card
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-amber-200 dark:border-amber-700 shadow-2xl overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <CardContent className="p-8 md:p-12 text-center relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-yellow-400/10 to-amber-400/10 animate-pulse" />

              <div className="relative z-10">
                {/* Category Badge */}
                <div className="inline-flex items-center space-x-2 mb-6">
                  <div
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor(
                      answeredPrayers[currentIndex].category,
                    )} text-white text-sm font-medium`}
                  >
                    {answeredPrayers[currentIndex].category}
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-amber-400 fill-current" />
                  ))}
                </div>

                {/* Testimony Text */}
                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed">
                  "{answeredPrayers[currentIndex].text}"
                </blockquote>

                {/* Attribution */}
                <div className="space-y-2">
                  <cite className="text-lg font-semibold text-gray-800 dark:text-white block">
                    — {answeredPrayers[currentIndex].name}
                  </cite>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{answeredPrayers[currentIndex].location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <button
            onClick={prevPrayer}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 rounded-full p-2 sm:p-3 shadow-lg hover:scale-110 transition-all duration-300 min-h-[44px] min-w-[44px]"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <button
            onClick={nextPrayer}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {answeredPrayers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-amber-500 scale-125" : "bg-gray-300 dark:bg-gray-600 hover:bg-amber-300"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          25% { transform: translateY(-20px) rotate(90deg); opacity: 1; }
          50% { transform: translateY(-10px) rotate(180deg); opacity: 0.8; }
          75% { transform: translateY(-30px) rotate(270deg); opacity: 0.9; }
        }

        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </section>
  )
}
