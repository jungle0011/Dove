"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Heart, ChevronDown, Shield, Star, Clock } from "lucide-react"
import PremiumLogo from "@/components/premium-logo"
import FloatingDove3D from "@/components/floating-dove-3d"
import { openWhatsAppChat } from "@/utils/whatsapp-helper"

export default function EnhancedHero() {
  const [isBooking, setIsBooking] = useState(false)
  const [isPraying, setIsPraying] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const handleBookSession = async () => {
    setIsBooking(true)
    openWhatsAppChat(
      "Hello Prophetess Blessing Ngozichukwu, I would like to book a sacred session through The Graced Dove Prophetic Voice Platform.",
    )
    setTimeout(() => setIsBooking(false), 2000)
  }

  const handlePrayerRequest = async () => {
    setIsPraying(true)
    openWhatsAppChat(
      "Hello Prophetess Blessing Ngozichukwu, I would like to submit a prayer request through The Graced Dove Prophetic Voice Platform.",
    )
    setTimeout(() => setIsPraying(false), 2000)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Enhanced Background with Video/Image */}
      <div className="absolute inset-0 z-0">
        {/* Remote Video Background */}
        {!videoError && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none"
            onLoadStart={() => setVideoLoaded(false)}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
          >
            <source src="https://www.coverr.co/s3/mp4/Golden-Light-Rays.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Animated Fallback Background (shows when video fails or is loading) */}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-blue-100 to-purple-100 dark:from-amber-900 dark:via-blue-900 dark:to-purple-900">
            {/* Animated Light Rays */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="light-ray ray-1"></div>
              <div className="light-ray ray-2"></div>
              <div className="light-ray ray-3"></div>
              <div className="light-ray ray-4"></div>
              <div className="light-ray ray-5"></div>
            </div>
            
            {/* Floating Particles */}
            <div className="absolute inset-0">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
              <div className="particle particle-6"></div>
              <div className="particle particle-7"></div>
              <div className="particle particle-8"></div>
            </div>
            
            {/* Pulsing Spiritual Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1)_0%,transparent_70%)] animate-pulse"></div>
            
            {/* Floating Spiritual Symbols */}
            <div className="absolute inset-0">
              <div className="floating-symbol symbol-1">🕊️</div>
              <div className="floating-symbol symbol-2">✨</div>
              <div className="floating-symbol symbol-3">🌿</div>
              <div className="floating-symbol symbol-4">⭐</div>
            </div>
          </div>
        )}
        
        {/* Spiritual Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-amber-100/40 via-blue-100/30 to-purple-100/40 dark:from-amber-900/30 dark:via-blue-900/20 dark:to-purple-900/30"></div>
          {/* Sacred Geometry Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1)_0%,transparent_50%)]"></div>
        </div>

        {/* Animated Clouds */}
        <div className="absolute inset-0">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
          <div className="cloud cloud-4"></div>
        </div>

        {/* Floating Spiritual Symbols */}
        <div className="absolute inset-0">
          <div className="floating-symbol symbol-1">🕊️</div>
          <div className="floating-symbol symbol-2">🌿</div>
          <div className="floating-symbol symbol-3">✨</div>
          <div className="floating-symbol symbol-4">🕊️</div>
          <div className="floating-symbol symbol-5">⭐</div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 dark:from-black/30 dark:via-transparent dark:to-black/40"></div>
      </div>

      {/* 3D Floating Dove */}
      <FloatingDove3D />

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Premium Logo */}
        <div className="mb-8 sm:mb-12">
          <PremiumLogo />
        </div>

        {/* Main Heading */}
        <div className="mb-6 sm:mb-8 relative">
          <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"></div>
          <h1 className="relative text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 dark:text-white mb-4 sm:mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent font-normal glow-text">
              The Graced Dove Prophetic Voice
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 mb-3 sm:mb-4 max-w-4xl mx-auto leading-relaxed font-light">
            A sanctuary for healing, prophecy, and divine guidance
          </p>

          <p className="text-base sm:text-lg md:text-xl text-amber-600 dark:text-amber-400 font-medium">
            Led by Prophetess Blessing Ngozichukwu
          </p>
        </div>

        {/* Social Proof */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl">🙏</span>
            <span>500+ Prayers Answered</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl">✨</span>
            <span>1000+ Lives Transformed</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl">🕊️</span>
            <span>Divine Ministry</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1 trust-badge">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Secure & Confidential</span>
          </div>
          <div className="flex items-center space-x-1 trust-badge">
            <Star className="w-4 h-4 text-amber-500" />
            <span>Divine Anointing</span>
          </div>
          <div className="flex items-center space-x-1 trust-badge">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>Available 24/7</span>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
          <Button
            onClick={handleBookSession}
            disabled={isBooking}
            size="lg"
            className="group cta-button bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-600 hover:via-yellow-600 hover:to-amber-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 text-sm sm:text-base lg:text-lg font-medium glow-on-scroll animate-gentle-pulse w-full sm:w-auto min-h-[48px] order-1 sm:order-none"
          >
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-pulse" />
            {isBooking ? "Connecting..." : "Book with Prophetess Blessing"}
            <span className="ml-2 text-xs opacity-75 hidden sm:inline">Available 24/7</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-yellow-400/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          </Button>

          <Button
            onClick={handlePrayerRequest}
            disabled={isPraying}
            variant="outline"
            size="lg"
            className="group cta-button border-2 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-xl text-sm sm:text-base lg:text-lg font-medium backdrop-blur-sm bg-white/10 dark:bg-slate-800/10 glow-on-scroll animate-gentle-pulse w-full sm:w-auto order-2 sm:order-none"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:animate-pulse" />
            {isPraying ? "Sending..." : "Send Prayer Request"}
          </Button>
        </div>

        {/* Enhanced Service Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20">
          <div className="group text-center p-6 sm:p-8 rounded-3xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-slate-700/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/30 dark:hover:bg-slate-800/30 hover:shadow-2xl">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:animate-bounce">🙏</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">Divine Healing</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Experience miraculous healing through powerful prayer and divine intervention
            </p>
            <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 text-xs sm:text-sm">
              Learn More →
            </Button>
          </div>

          <div className="group text-center p-6 sm:p-8 rounded-3xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-slate-700/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/30 dark:hover:bg-slate-800/30 hover:shadow-2xl">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:animate-bounce">✨</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">Prophetic Guidance</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Receive divine revelations and prophetic words for your life's journey
            </p>
            <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 text-xs sm:text-sm">
              Learn More →
            </Button>
          </div>

          <div className="group text-center p-6 sm:p-8 rounded-3xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-md border border-white/30 dark:border-slate-700/30 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/30 dark:hover:bg-slate-800/30 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
            <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:animate-bounce">💫</div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">Spiritual Freedom</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Break free from spiritual bondages and walk in divine liberty
            </p>
            <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 text-xs sm:text-sm">
              Learn More →
            </Button>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-1 sm:space-y-2">
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 dark:text-amber-400 animate-bounce" />
          </div>
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
        
        @keyframes symbolFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          25% { transform: translateY(-30px) rotate(90deg); opacity: 0.8; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 0.4; }
          75% { transform: translateY(-45px) rotate(270deg); opacity: 0.9; }
        }

        /* Glow Text Effect */
        .glow-text {
          text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
          animation: textGlow 3s ease-in-out infinite alternate;
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

        .animate-gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }

        /* Enhanced Text Glow Animation */
        @keyframes textGlow {
          0% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
          100% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.3); }
        }

        /* Floating Animation for Trust Badges */
        .trust-badge {
          animation: trustFloat 4s ease-in-out infinite;
        }

        @keyframes trustFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        /* Enhanced Button Hover Effects */
        .cta-button {
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }
      `}</style>
    </section>
  )
}
