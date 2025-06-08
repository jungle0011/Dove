"use client"

import { useEffect, useState } from "react"

export default function PremiumLogo() {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Animated Golden Dove */}
      <div
        className={`relative transition-all duration-2000 ${isAnimated ? "opacity-100 transform scale-100" : "opacity-0 transform scale-75"}`}
      >
        <div className="relative">
          {/* Sunburst Background */}
          <div className="absolute inset-0 w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 rounded-full opacity-30 animate-ping"></div>
          </div>

          {/* Golden Dove */}
          <div className="relative z-10 w-32 h-32 flex items-center justify-center">
            <div className="text-6xl animate-float filter drop-shadow-lg">🕊️</div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>

          {/* Aura Rings */}
          <div className="absolute inset-0 w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-2 border-amber-300/30 rounded-full animate-ping"></div>
            <div className="absolute inset-4 border border-yellow-200/40 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Logo Text */}
      <div
        className={`text-center transition-all duration-2000 delay-500 ${isAnimated ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}
      >
        <h1 className="text-4xl md:text-5xl font-serif bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent mb-2 tracking-wide">
          Dove
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light tracking-widest">
          Guided by Grace
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          50% { transform: translateY(-4px) rotate(-1deg); }
          75% { transform: translateY(-12px) rotate(1deg); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
