"use client"

import { useState } from "react"
import { Gift, FileText, ImageIcon, Heart } from "lucide-react"

const blessings = [
  {
    id: 1,
    title: "Prophetic Declarations",
    description: "Powerful declarations to speak over your life daily",
    type: "PDF",
    icon: FileText,
    available: true,
    downloads: 1247,
  },
  {
    id: 2,
    title: "Healing Wallpapers",
    description: "Beautiful prophetic wallpapers for your devices",
    type: "Images",
    icon: ImageIcon,
    available: true,
    downloads: 892,
  },
  {
    id: 3,
    title: "Prayer Cards",
    description: "Printable prayer cards for different situations",
    type: "PDF",
    icon: Heart,
    available: true,
    downloads: 634,
  },
  {
    id: 4,
    title: "Worship Playlist",
    description: "Curated worship songs for your spiritual journey",
    type: "Audio",
    icon: Gift,
    available: false,
    downloads: 0,
  },
  {
    id: 5,
    title: "Fasting Guide",
    description: "Complete guide for spiritual fasting and breakthrough",
    type: "PDF",
    icon: FileText,
    available: false,
    downloads: 0,
  },
  {
    id: 6,
    title: "Prophetic Journal",
    description: "Template for recording prophetic words and dreams",
    type: "PDF",
    icon: Heart,
    available: false,
    downloads: 0,
  },
]

export default function BlessingBox() {
  const [downloadedItems, setDownloadedItems] = useState<number[]>([])

  const handleDownload = (id: number, title: string) => {
    // Simulate download
    setDownloadedItems((prev) => [...prev, id])

    // Create a dummy download
    const element = document.createElement("a")
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent(`${title} - Downloaded from Dove Ministry`)
    element.download = `${title.replace(/\s+/g, "_")}.txt`
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const getTypeColor = (type: string) => {
    const colors = {
      PDF: "from-red-400 to-pink-400",
      Images: "from-blue-400 to-purple-400",
      Audio: "from-green-400 to-emerald-400",
    }
    return colors[type as keyof typeof colors] || "from-gray-400 to-slate-400"
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 scroll-reveal">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30">
              <Gift className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">Blessing Box</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Free spiritual resources to strengthen your faith journey
          </p>
        </div>

        {/* Locked Section */}
        <div className="bg-gray-100/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-12 text-center border border-gray-200 dark:border-slate-700">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-gray-200 dark:bg-slate-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500 dark:text-gray-400"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">Blessing Box Coming Soon</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
            Our spiritual resources library is being prepared with blessed materials, prophetic declarations, and divine
            downloads for your journey.
          </p>
          <button className="bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed">
            Preparing Blessings
          </button>
        </div>
      </div>
    </section>
  )
}
