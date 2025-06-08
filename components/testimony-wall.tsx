"use client"

import { useEffect, useState } from "react"

const testimonies = [
  {
    name: "Sarah M.",
    text: "The prophetic word I received changed my entire perspective on life. I found peace I never knew was possible.",
    rating: 5,
  },
  {
    name: "David K.",
    text: "After years of struggling with anxiety, the healing prayer session brought me complete freedom. Praise God!",
    rating: 5,
  },
  {
    name: "Maria L.",
    text: "The counseling sessions helped me navigate through my darkest season. I'm forever grateful for this ministry.",
    rating: 5,
  },
  {
    name: "John R.",
    text: "I experienced a breakthrough in my finances after the spiritual deliverance session. God is faithful!",
    rating: 5,
  },
]

export default function TestimonyWall() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonies.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return null
}
