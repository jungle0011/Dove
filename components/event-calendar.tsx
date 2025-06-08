"use client"

import { useState } from "react"
import { Calendar, Users, Video } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Healing Night",
    date: "2025-01-15",
    time: "7:00 PM",
    type: "In-Person",
    description: "Join us for a powerful night of divine healing and miracles",
    attendees: 45,
    maxAttendees: 100,
    status: "upcoming",
  },
  {
    id: 2,
    title: "3-Day Fasting & Prayer",
    date: "2025-01-20",
    time: "6:00 AM",
    type: "Hybrid",
    description: "Consecration period for breakthrough and spiritual elevation",
    attendees: 78,
    maxAttendees: 150,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Zoom Prayer Session",
    date: "2025-01-12",
    time: "9:00 PM",
    type: "Online",
    description: "Global prayer meeting for unity and intercession",
    attendees: 234,
    maxAttendees: 500,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Prophetic Conference",
    date: "2025-02-01",
    time: "10:00 AM",
    type: "In-Person",
    description: "Two-day conference with prophetic ministry and teachings",
    attendees: 12,
    maxAttendees: 200,
    status: "upcoming",
  },
]

export default function EventCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  const getEventTypeColor = (type: string) => {
    const colors = {
      "In-Person": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      Online: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      Hybrid: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getEventIcon = (type: string) => {
    if (type === "Online") return <Video className="w-4 h-4" />
    if (type === "Hybrid") return <Users className="w-4 h-4" />
    return <Calendar className="w-4 h-4" />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCountdown = (dateString: string, time: string) => {
    const eventDate = new Date(`${dateString} ${time}`)
    const now = new Date()
    const diff = eventDate.getTime() - now.getTime()

    if (diff <= 0) return "Event Started"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days}d ${hours}h`
    return `${hours}h`
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">
            Upcoming Events & Gatherings
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Join us for powerful times of worship, prayer, and spiritual breakthrough
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
          <h3 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">Events Coming Soon</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
            Our upcoming events calendar is currently being updated with new prophetic gatherings and spiritual
            sessions.
          </p>
          <button className="bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-6 py-3 rounded-lg font-medium cursor-not-allowed">
            Check Back Later
          </button>
        </div>
      </div>
    </section>
  )
}
