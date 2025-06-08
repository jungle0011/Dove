"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed top-20 right-4 z-40">
      <Button
        onClick={togglePlay}
        variant="outline"
        size="sm"
        className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-amber-200 dark:border-amber-600 hover:border-amber-300 transition-all duration-500 hover:scale-110 ${
          isPlaying ? "animate-bounce-gentle" : ""
        }`}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-500 animate-pulse" />
        ) : (
          <VolumeX className="w-4 h-4 text-gray-500" />
        )}
        <span className="ml-2 text-xs font-medium">{isPlaying ? "Ambient On" : "Ambient Off"}</span>

        {/* Glow Effect when playing */}
        {isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-md blur-lg animate-pulse"></div>
        )}
      </Button>

      <audio ref={audioRef} preload="auto">
        <source
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuR2O/Eeyw="
          type="audio/wav"
        />
        Your browser does not support the audio element.
      </audio>

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
