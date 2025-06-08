"use client"

import { useEffect, useState } from "react"

export default function FloatingDove3D() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.001
      setPosition({
        x: Math.sin(time * 0.5) * 100,
        y: Math.cos(time * 0.3) * 50,
      })
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute top-1/4 right-1/4 z-5 pointer-events-none hidden lg:block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="relative">
        {/* 3D Dove Effect */}
        <div className="relative transform-gpu">
          <div className="text-8xl opacity-90 animate-gentle-fly filter drop-shadow-2xl">🕊️</div>

          {/* Wing Trail Effect */}
          <div className="absolute inset-0 text-8xl opacity-30 animate-wing-trail">🕊️</div>

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent rounded-full blur-xl"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gentle-fly {
          0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
          25% { transform: rotateY(15deg) rotateX(5deg); }
          50% { transform: rotateY(0deg) rotateX(-5deg); }
          75% { transform: rotateY(-15deg) rotateX(5deg); }
        }

        @keyframes wing-trail {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: scale(1.1) rotate(5deg); opacity: 0.1; }
        }

        .animate-gentle-fly {
          animation: gentle-fly 8s ease-in-out infinite;
        }

        .animate-wing-trail {
          animation: wing-trail 4s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}
