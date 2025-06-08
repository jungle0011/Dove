"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Music, X } from "lucide-react"

const audioTracks = [
  {
    id: 1,
    title: "Soaking in His Presence",
    duration: "45:00",
    type: "Soaking Music",
    description: "Deep worship instrumental for intimate prayer time",
  },
  {
    id: 2,
    title: "Prophetic Declarations",
    duration: "25:30",
    type: "Declarations",
    description: "Powerful declarations over your life and destiny",
  },
  {
    id: 3,
    title: "Midnight Prayer Session",
    duration: "60:00",
    type: "Prayer",
    description: "Join the midnight hour of breakthrough prayer",
  },
  {
    id: 4,
    title: "Healing Frequencies",
    duration: "35:15",
    type: "Healing",
    description: "Anointed sounds for physical and emotional healing",
  },
]

interface PropheticAudioRoomProps {
  isOpen: boolean
  onClose: () => void
}

export default function PropheticAudioRoom({ isOpen, onClose }: PropheticAudioRoomProps) {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([70])
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

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

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <Card className="w-full max-w-4xl mx-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border-2 border-purple-200 dark:border-purple-700 shadow-2xl animate-scale-in">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Music className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-2xl text-gray-800 dark:text-white">Prophetic Audio Room</CardTitle>
              <p className="text-gray-600 dark:text-gray-300">Immerse yourself in the presence of God</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Track Display */}
          <div className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {audioTracks[currentTrack].title}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium">{audioTracks[currentTrack].type}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{audioTracks[currentTrack].description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {audioTracks[currentTrack].duration}
                </div>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-center space-x-1 mb-6">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t from-purple-400 to-blue-400 rounded-full transition-all duration-300 ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                  style={{
                    height: `${Math.random() * 40 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <Button
                onClick={togglePlay}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-full w-16 h-16"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center space-x-4">
              <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} className="flex-1" />
              <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="text-sm text-gray-600 dark:text-gray-300 w-12">{volume[0]}%</span>
            </div>
          </div>

          {/* Track List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {audioTracks.map((track, index) => (
              <Card
                key={track.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  currentTrack === index
                    ? "bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-600"
                    : "bg-white/30 dark:bg-slate-800/30 hover:bg-white/50 dark:hover:bg-slate-800/50"
                }`}
                onClick={() => setCurrentTrack(index)}
              >
                <CardContent className="p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{track.title}</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">{track.type}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{track.description}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{track.duration}</span>
                    {currentTrack === index && <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>

        <audio ref={audioRef} preload="auto">
          <source
            src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuR2O/Eeyw="
            type="audio/wav"
          />
        </audio>
      </Card>

      <style jsx>{`
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
