"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, X } from "lucide-react"

const dailyWords = [
  {
    word: "Peace",
    scripture: "Peace I leave with you; my peace I give you.",
    reference: "John 14:27",
    message: "In the midst of chaos, God's peace surpasses all understanding.",
  },
  {
    word: "Hope",
    scripture: "For I know the plans I have for you, plans to prosper you and not to harm you.",
    reference: "Jeremiah 29:11",
    message: "Your future is bright in God's hands. Trust His perfect timing.",
  },
  {
    word: "Strength",
    scripture: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
    message: "God's strength is made perfect in your weakness. You are more than a conqueror.",
  },
  {
    word: "Love",
    scripture: "See what great love the Father has lavished on us.",
    reference: "1 John 3:1",
    message: "You are deeply loved by the Creator of the universe. Let this truth fill your heart.",
  },
]

export default function DailyLightDrop() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentWord, setCurrentWord] = useState(0)
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    // Rotate daily word based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    setCurrentWord(dayOfYear % dailyWords.length)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    setHasOpened(true)
  }

  return (
    <>
      {/* Floating Light Drop Icon */}
      <div className="fixed bottom-20 left-4 z-40">
        <button
          onClick={handleOpen}
          className={`group relative bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 rounded-full p-4 shadow-2xl transition-all duration-500 hover:scale-110 ${
            !hasOpened ? "animate-bounce" : ""
          }`}
        >
          <Sparkles className="w-6 h-6 text-white group-hover:animate-spin" />

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/30 to-amber-400/30 blur-xl animate-pulse"></div>

          {/* Tooltip */}
          {!hasOpened && (
            <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-800 rounded-lg px-3 py-2 shadow-lg border border-gray-200 dark:border-slate-600 whitespace-nowrap animate-fade-in">
              <div className="text-sm text-gray-700 dark:text-gray-300">Daily Light Drop ✨</div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-white dark:bg-slate-800 border-l border-b border-gray-200 dark:border-slate-600 rotate-45"></div>
            </div>
          )}
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-slate-800 dark:to-slate-900 border-2 border-amber-200 dark:border-amber-700 shadow-2xl animate-scale-in">
            <CardContent className="p-8 text-center relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Light Drop Animation */}
              <div className="mb-6">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white animate-spin" />
                  </div>
                </div>
              </div>

              {/* Daily Word */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-300 mb-2">
                  Today's Light: {dailyWords[currentWord].word}
                </h3>

                <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-3">
                  "{dailyWords[currentWord].scripture}"
                </blockquote>

                <cite className="text-amber-600 dark:text-amber-400 font-medium block mb-4">
                  — {dailyWords[currentWord].reference}
                </cite>

                <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
                  <p className="text-gray-600 dark:text-gray-300">{dailyWords[currentWord].message}</p>
                </div>
              </div>

              {/* Blessing */}
              <div className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                May this light illuminate your path today 🌟
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </>
  )
}
