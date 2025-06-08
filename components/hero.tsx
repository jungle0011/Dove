"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Heart } from "lucide-react"

export default function Hero() {
  const handleBookingClick = () => {
    const phoneNumber = "+15551234567" // Replace with the actual business phone number
    const message = "I would like to book a session with Prophetess Blessing."
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappURL, "_blank")
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mb-6">
            <div className="text-6xl animate-pulse">🕊️</div>
          </div>

          <h1 className="text-4xl md:text-6xl font-light text-gray-800 dark:text-white mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-normal">
              Dove
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            A sacred space for healing, prophetic encounters, and spiritual transformation. Experience divine guidance
            through prayer, counseling, and prophetic ministry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={handleBookingClick}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book with Prophetess Blessing
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full transition-all duration-300"
          >
            <Heart className="w-5 h-5 mr-2" />
            Prayer Request
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl mb-4">🙏</div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Healing Prayer</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Experience divine healing through powerful prayer sessions
            </p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Prophetic Counseling</h3>
            <p className="text-gray-600 dark:text-gray-300">Receive divine guidance for life's challenges</p>
          </div>

          <div className="text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-3xl mb-4">💫</div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Spiritual Deliverance</h3>
            <p className="text-gray-600 dark:text-gray-300">Find freedom from spiritual bondages</p>
          </div>
        </div>
      </div>
    </section>
  )
}
