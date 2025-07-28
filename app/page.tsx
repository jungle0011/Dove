"use client"

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/loading-screen"
import Navigation from "@/components/navigation"
import EnhancedHero from "@/components/enhanced-hero"
import EnhancedServices from "@/components/enhanced-services"
import AnsweredPrayers from "@/components/answered-prayers"
import PropheticWord from "@/components/prophetic-word"
import MoodSelector from "@/components/mood-selector"
import GloryCounter from "@/components/glory-counter"
import EnhancedPrayerWidget from "@/components/enhanced-prayer-widget"
import EnhancedFloatingDove from "@/components/enhanced-floating-dove"
import EnhancedWhatsAppButton from "@/components/enhanced-whatsapp-button"
import EnhancedFooter from "@/components/enhanced-footer"
import EnhancedAudioPlayer from "@/components/enhanced-audio-player"
import DailyLightDrop from "@/components/daily-light-drop"
import HealingRain from "@/components/healing-rain"
import ScrollAnimations from "@/components/scroll-animations"
import DoveParticles from "@/components/dove-particles"
import FloatingPropheticWord from "@/components/floating-prophetic-word"
import PostsCarouselWrapper from "@/components/posts-carousel-wrapper"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Show loading screen on every page load
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Save theme preference
    localStorage.setItem("graced-dove-theme", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem("graced-dove-theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    }
  }, [])

  useEffect(() => {
    // Optimize for mobile performance
    if (typeof window !== "undefined") {
      // Disable zoom on mobile for better UX
      const viewport = document.querySelector("meta[name=viewport]")
      if (viewport) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no")
      }

      // Preload critical resources
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = "/placeholder.png?height=250&width=250"
      document.head.appendChild(link)
    }
  }, [])

  // Add performance optimization for scroll animations
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Throttle scroll events for better performance
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${isDarkMode ? "dark bg-slate-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}
    >
      <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <EnhancedAudioPlayer />
      <HealingRain />
      <DoveParticles />
      <FloatingPropheticWord />

      <main className="relative">
        <EnhancedHero />
        <div className="scroll-reveal">
          <PostsCarouselWrapper />
        </div>
        <div className="scroll-reveal">
          <EnhancedServices />
        </div>
        <div className="scroll-reveal">
          <AnsweredPrayers />
        </div>
        <div className="scroll-reveal">
          <PropheticWord />
        </div>
        <div className="scroll-reveal">
          <MoodSelector />
        </div>
        <div className="scroll-reveal">
          <GloryCounter />
        </div>
        <div className="scroll-reveal">
          <EnhancedPrayerWidget />
        </div>
      </main>

      <EnhancedFooter />
      <EnhancedFloatingDove />
      <EnhancedWhatsAppButton />
      <DailyLightDrop />
      <ScrollAnimations />
    </div>
  )
}
