"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, Sparkles, Calendar } from "lucide-react"

const stats = [
  { icon: Users, label: "Souls Helped", target: 1247, color: "text-blue-500" },
  { icon: Heart, label: "Prayers Answered", target: 3891, color: "text-red-500" },
  { icon: Sparkles, label: "Sessions Held", target: 892, color: "text-purple-500" },
  { icon: Calendar, label: "Years of Ministry", target: 12, color: "text-green-500" },
]

export default function GloryCounter() {
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("glory-counter")
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000
        const steps = 60
        const increment = stat.target / steps
        let current = 0

        const timer = setInterval(() => {
          current += increment
          if (current >= stat.target) {
            current = stat.target
            clearInterval(timer)
          }

          setCounts((prev) => {
            const newCounts = [...prev]
            newCounts[index] = Math.floor(current)
            return newCounts
          })
        }, duration / steps)
      })
    }
  }, [isVisible])

  return (
    <section id="glory-counter" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">
            God's Faithfulness in Numbers
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Celebrating the impact of His love through this ministry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-gray-100 dark:bg-slate-700">
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>

                  <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">
                    {counts[index].toLocaleString()}
                    {stat.target > 1000 && "+"}
                  </div>

                  <div className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
