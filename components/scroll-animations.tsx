"use client"

import { useEffect } from "react"

export default function ScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")

          // Add glow effect to buttons when they come into view
          if (entry.target.classList.contains("glow-on-scroll")) {
            entry.target.classList.add("animate-gentle-pulse")
          }
        }
      })
    }, observerOptions)

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll(".scroll-reveal, .scroll-reveal-delayed")
    scrollElements.forEach((el) => observer.observe(el))

    // Observe glow elements
    const glowElements = document.querySelectorAll(".glow-on-scroll")
    glowElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
