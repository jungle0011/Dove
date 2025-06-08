"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Heart, ChevronDown } from "lucide-react"
import PremiumLogo from "@/components/premium-logo"
import FloatingDove3D from "@/components/floating-dove-3d"

export default function MajesticHero() {
  const [titleVisible, setTitleVisible] = useState(false)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timers = [
      setTimeout(() => setTitleVisible(true), 500),
      setTimeout(() => setSubtitleVisible(true), 1500),
      setTimeout(() => setButtonsVisible(true), 2500),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleWhatsAppClick = (message: string) => {
    const whatsappUrl = `https://wa.me/15551234567?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Divine Sky Background */}
      <div className="absolute inset-0 z-0">
        {/* Heavenly Realm Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/30 via-blue-100/20 to-purple-100/30 dark:from-amber-900/20 dark:via-blue-900/10 dark:to-purple-900/20"></div>

        {/* Animated Clouds */}
        <div className="absolute inset-0">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
        </div>

        {/* Golden Light Rays */}
        <div className="absolute inset-0">
          <div className="light-ray ray-1"></div>
          <div className="light-ray ray-2"></div>
          <div className="light-ray ray-3"></div>
        </div>

        {/* Floating Spiritual Symbols */}
        <div className="absolute inset-0">
          <div className="floating-symbol symbol-1">🕊️</div>
          <div className="floating-symbol symbol-2">🌿</div>
          <div className="floating-symbol symbol-3">✨</div>
          <div className="floating-symbol symbol-4">🕊️</div>
          <div className="floating-symbol symbol-5">⭐</div>
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 dark:from-black/30 dark:via-transparent dark:to-black/40"></div>
      </div>

      {/* 3D Floating Dove */}
      <FloatingDove3D />

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Premium Logo */}
        <div className="mb-12">
          <PremiumLogo />
        </div>

        {/* Main Heading with Typewriter Effect */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"></div>
          <h1
            className={`relative text-4xl md:text-7xl font-light text-gray-800 dark:text-white mb-6 leading-tight transition-all duration-2000 ${
              titleVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
          >
            <span className="typewriter-text">Welcome to </span>
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent font-normal glow-text">
              Dove
            </span>
          </h1>

          <p
            className={`text-xl md:text-3xl text-gray-700 dark:text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed font-light transition-all duration-2000 delay-1000 ${
              subtitleVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
            }`}
          >
            A sanctuary for healing, prophecy, and divine guidance
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-2000 delay-2000 ${
            buttonsVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
          }`}
        >
          <Button
            onClick={() => handleWhatsAppClick("I would like to book a session with Prophetess Blessing.")}
            size="lg"
            className="group bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 text-white px-10 py-4 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 text-lg font-medium glow-on-scroll animate-gentle-pulse"
          >
            <Calendar className="w-6 h-6 mr-3 group-hover:animate-pulse" />
            Book with Prophetess Blessing
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-400/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          </Button>

          <Button
            onClick={() => handleWhatsAppClick("I would like to submit a prayer request.")}
            variant="outline"
            size="lg"
            className="group border-2 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-10 py-4 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-xl text-lg font-medium backdrop-blur-sm bg-white/10 dark:bg-slate-800/10 glow-on-scroll animate-gentle-pulse"
          >
            <Heart className="w-6 h-6 mr-3 group-hover:animate-pulse" />
            Send Prayer Request
          </Button>
        </div>

        {/* Service Preview Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 transition-all duration-2000 delay-3000 ${
            buttonsVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"
          }`}
        >
          <div className="group text-center p-8 rounded-3xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-slate-700/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/30 dark:hover:bg-slate-800/30 hover:shadow-2xl">
            <div className="text-5xl mb-6 group-hover:animate-bounce">🙏</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Divine Healing</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Experience miraculous healing through powerful prayer and divine intervention
            </p>
          </div>

          <div className="group text-center p-8 rounded-3xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-slate-700/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/30 dark:hover:bg-slate-800/30 hover:shadow-2xl">
            <div className="text-5xl mb-6 group-hover:animate-bounce">✨</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Prophetic Guidance</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Receive divine revelations and prophetic words for your life's journey
            </p>
          </div>

          <div className="group text-center p-8 rounded-3xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-slate-700/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/30 dark:hover:bg-slate-800/30 hover:shadow-2xl">
            <div className="text-5xl mb-6 group-hover:animate-bounce">💫</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Spiritual Freedom</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Break free from spiritual bondages and walk in divine liberty
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-amber-600 dark:text-amber-400 animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        /* Cloud Animations */
        .cloud {
          position: absolute;
          background: radial-gradient(ellipse, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 20s ease-in-out infinite;
        }
        
        .cloud-1 {
          width: 200px;
          height: 100px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .cloud-2 {
          width: 300px;
          height: 150px;
          top: 20%;
          right: 15%;
          animation-delay: -5s;
        }
        
        .cloud-3 {
          width: 250px;
          height: 125px;
          bottom: 30%;
          left: 20%;
          animation-delay: -10s;
        }
        
        .cloud-4 {
          width: 180px;
          height: 90px;
          bottom: 20%;
          right: 25%;
          animation-delay: -15s;
        }

        /* Light Ray Animations */
        .light-ray {
          position: absolute;
          background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.1), transparent);
          transform-origin: top;
          animation: rayShine 15s ease-in-out infinite;
        }
        
        .ray-1 {
          width: 2px;
          height: 100%;
          top: 0;
          left: 20%;
          animation-delay: 0s;
        }
        
        .ray-2 {
          width: 3px;
          height: 100%;
          top: 0;
          left: 50%;
          animation-delay: -5s;
        }
        
        .ray-3 {
          width: 2px;
          height: 100%;
          top: 0;
          right: 30%;
          animation-delay: -10s;
        }

        /* Floating Symbols */
        .floating-symbol {
          position: absolute;
          font-size: 1.5rem;
          opacity: 0.6;
          animation: symbolFloat 25s ease-in-out infinite;
        }
        
        .symbol-1 {
          top: 15%;
          left: 15%;
          animation-delay: 0s;
        }
        
        .symbol-2 {
          top: 25%;
          right: 20%;
          animation-delay: -5s;
        }
        
        .symbol-3 {
          bottom: 35%;
          left: 25%;
          animation-delay: -10s;
        }
        
        .symbol-4 {
          bottom: 25%;
          right: 15%;
          animation-delay: -15s;
        }
        
        .symbol-5 {
          top: 40%;
          left: 50%;
          animation-delay: -20s;
        }

        /* Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        
        @keyframes rayShine {
          0%, 100% { opacity: 0.1; transform: scaleY(1); }
          50% { opacity: 0.3; transform: scaleY(1.1); }
        }
        
        @keyframes symbolFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          25% { transform: translateY(-30px) rotate(90deg); opacity: 0.8; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 0.4; }
          75% { transform: translateY(-45px) rotate(270deg); opacity: 0.9; }
        }

        /* Glow Text Effect */
        .glow-text {
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
        }

        /* Typewriter Effect */
        .typewriter-text {
          overflow: hidden;
          border-right: 2px solid rgba(255, 215, 0, 0.7);
          white-space: nowrap;
          animation: typewriter 2s steps(12) 1s both, blink 1s step-end infinite;
        }

        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        /* Radial Gradient */
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .glow-on-scroll {
          transition: all 0.3s ease;
        }

        .glow-on-scroll:hover {
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.4);
        }

        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .animate-gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
