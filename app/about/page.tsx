"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import EnhancedFooter from "@/components/enhanced-footer"
import EnhancedAudioPlayer from "@/components/enhanced-audio-player"
import ScrollAnimations from "@/components/scroll-animations"
import DoveParticles from "@/components/dove-particles"

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem("graced-dove-theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    }
  }, [])

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${isDarkMode ? "dark bg-slate-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}
    >
      <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <EnhancedAudioPlayer />
      <DoveParticles />

      {/* Top Padding */}
      <div className="pt-20"></div>

      {/* Prophetess Profile Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="scroll-reveal-delayed flex flex-col items-center">
            <div className="prophetess-profile relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/30 via-yellow-200/30 to-amber-200/30 rounded-full blur-xl animate-pulse"></div>
              <img
                src="/placeholder.png?height=250&width=250"
                alt="Prophetess Blessing Ngozichukwu"
                className="rounded-xl shadow-lg w-[250px] h-[250px] object-cover relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl z-20 pointer-events-none"></div>
            </div>
            <p className="text-center mt-6 text-xl font-semibold text-gray-800 dark:text-white">
              Prophetess Blessing Ngozichukwu
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center italic mb-4">
              Vessel of Light • Spiritual Guide • Intercessor
            </p>
            <p className="text-center text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
              Prophetess Blessing Ngozichukwu is a vessel of grace with a prophetic mandate to heal, guide, and uplift.
              Through divine calling and anointed ministry, she serves as a bridge between Heaven and Earth, bringing
              hope, healing, and breakthrough to souls worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* About Body Content */}
      <section className="about-body py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Description */}
          <div className="mb-20 scroll-reveal">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-slate-700 shadow-xl">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                The Graced Dove Prophetic Voice is a sanctuary founded by Prophetess Blessing Ngozichukwu, offering a blend of spiritual insight,
                divine healing, and emotional wellness. Through prophetic sessions, healing perfumes, and personal
                counseling, The Graced Dove Prophetic Voice aims to restore peace to souls worldwide under her anointed leadership.
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <div className="mb-20 scroll-reveal">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">Our Mission</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 mx-auto rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 md:p-12 border-2 border-amber-200 dark:border-amber-700">
              <p className="text-xl md:text-2xl text-center text-gray-800 dark:text-white font-light leading-relaxed">
                To be a divine touchpoint for healing, hope, and spiritual clarity through the anointed ministry of
                Prophetess Blessing Ngozichukwu and The Graced Dove Prophetic Voice.
              </p>
            </div>
          </div>

          {/* Our Services */}
          <div className="scroll-reveal">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">Our Services</h3>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-slate-700 shadow-xl">
              <ul className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <span>Prophetic Counseling with Prophetess Blessing Ngozichukwu</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
                  <span>Healing Sessions (Physical, Emotional & Spiritual)</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                  <span>Anointed Spiritual Products</span>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                  <span>Prayer Requests & Intercession</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <EnhancedFooter />
      <ScrollAnimations />
    </div>
  )
}
