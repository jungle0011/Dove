"use client"

import { useState } from "react"

const milestones = [
  {
    id: 1,
    title: "Bought Spiritual Oil",
    description: "Received anointed oil for breakthrough",
    completed: true,
    points: 10,
  },
  {
    id: 2,
    title: "Joined Midnight Prayer",
    description: "Participated in the midnight hour of power",
    completed: true,
    points: 15,
  },
  {
    id: 3,
    title: "Received Word from Prophetess",
    description: "Got personal prophetic word and guidance",
    completed: true,
    points: 20,
  },
  {
    id: 4,
    title: "Attended Healing Night",
    description: "Experienced divine healing ministry",
    completed: false,
    points: 25,
  },
  {
    id: 5,
    title: "Completed 3-Day Fast",
    description: "Consecrated through fasting and prayer",
    completed: false,
    points: 30,
  },
  {
    id: 6,
    title: "Shared Testimony",
    description: "Testified of God's goodness and miracles",
    completed: false,
    points: 20,
  },
]

export default function AnointingTracker() {
  const [userMilestones, setUserMilestones] = useState(milestones)

  const completedCount = userMilestones.filter((m) => m.completed).length
  const totalPoints = userMilestones.filter((m) => m.completed).reduce((sum, m) => sum + m.points, 0)
  const progressPercentage = (completedCount / userMilestones.length) * 100

  const toggleMilestone = (id: number) => {
    setUserMilestones((prev) =>
      prev.map((milestone) => (milestone.id === id ? { ...milestone, completed: !milestone.completed } : milestone)),
    )
  }

  const getLevel = (points: number) => {
    if (points >= 100) return { name: "Anointed Vessel", color: "from-purple-400 to-pink-400" }
    if (points >= 75) return { name: "Faithful Intercessor", color: "from-blue-400 to-purple-400" }
    if (points >= 50) return { name: "Growing Believer", color: "from-green-400 to-blue-400" }
    if (points >= 25) return { name: "Seeking Soul", color: "from-yellow-400 to-green-400" }
    return { name: "New Journey", color: "from-gray-400 to-yellow-400" }
  }

  const currentLevel = getLevel(totalPoints)

  return null
}
