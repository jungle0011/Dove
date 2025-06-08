"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(0)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 transition-opacity duration-1000"
      style={{ opacity }}
    >
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
              <div className="text-3xl animate-bounce animate-wing-flap">🕊️</div>
            </div>
          </div>
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-30 animate-ping"></div>
        </div>

        <h1 className="text-2xl font-light text-gray-700 mb-2 animate-fade-in">Welcome to Dove</h1>
        <p className="text-gray-500 animate-fade-in-delay">A Space for Healing & Prophetic Encounters</p>

        <div className="mt-8 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 1s both;
        }

        @keyframes wing-flap {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.1); }
        }

        .animate-wing-flap {
          animation: wing-flap 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
