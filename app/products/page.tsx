"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import EnhancedFooter from "@/components/enhanced-footer"
import EnhancedAudioPlayer from "@/components/enhanced-audio-player"
import ScrollAnimations from "@/components/scroll-animations"
import DoveParticles from "@/components/dove-particles"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Shield, Moon, MessageCircle } from "lucide-react"
import { sendFormToWhatsApp } from "@/utils/whatsapp-helper"

const products = [
  {
    id: 1,
    name: "Healing Perfume",
    description: "Infused with prayers & herbs to soothe the soul.",
    icon: Sparkles,
    price: "$45",
    image: "/placeholder.svg?height=300&width=300",
    available: true,
  },
  {
    id: 2,
    name: "Deliverance Oil",
    description: "Anointed oil for spiritual protection and cleansing.",
    icon: Shield,
    price: "$35",
    image: "/placeholder.svg?height=300&width=300",
    available: true,
  },
  {
    id: 3,
    name: "Dream Clarity Balm",
    description: "Helps with dream recall and spiritual revelation.",
    icon: Moon,
    price: "$40",
    image: "/placeholder.svg?height=300&width=300",
    available: true,
  },
  {
    id: 4,
    name: "Prophetic Incense",
    description: "Sacred incense for meditation and prayer.",
    icon: Sparkles,
    price: "Coming Soon",
    image: "/placeholder.svg?height=300&width=300",
    available: false,
  },
]

export default function ProductsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Load theme preference
    const savedTheme = localStorage.getItem("dove-theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    }
  }, [])

  const handleOrder = (productName: string, price: string) => {
    const whatsappData = {
      type: "Product Inquiry",
      details: `I'm interested in ordering the ${productName} (${price}). Could you please provide more details about availability and ordering process?`,
    }
    sendFormToWhatsApp(whatsappData)
  }

  const handleGeneralInquiry = () => {
    const whatsappData = {
      type: "Spiritual Guidance Inquiry",
      details:
        "I would like spiritual guidance for personalized product recommendations and custom orders from Prophetess Blessing Ngozichukwu.",
    }
    sendFormToWhatsApp(whatsappData)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${isDarkMode ? "dark bg-slate-900" : "bg-gradient-to-br from-blue-50 via-white to-purple-50"}`}
    >
      <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <EnhancedAudioPlayer />
      <DoveParticles />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/20 via-blue-100/10 to-purple-100/20 dark:from-amber-900/10 dark:via-blue-900/5 dark:to-purple-900/10"></div>
        </div>

        <div
          className={`relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 transition-all duration-2000 ${isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8"}`}
        >
          <h1 className="text-5xl md:text-7xl font-light text-gray-800 dark:text-white mb-6 leading-tight">
            Spiritual{" "}
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 bg-clip-text text-transparent font-normal">
              Store
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light mb-4">
            Sacred items blessed by Prophetess Blessing Ngozichukwu
          </p>
          <p className="text-lg text-amber-600 dark:text-amber-400">Anointed for your spiritual journey</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon
              return (
                <Card
                  key={product.id}
                  className={`group bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-gray-200 dark:border-slate-600 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl scroll-reveal ${
                    !product.available ? "opacity-75" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {!product.available && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                          <Badge variant="secondary" className="text-lg px-4 py-2">
                            Coming Soon
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                        <Icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>

                    <CardTitle className="text-xl text-gray-800 dark:text-white mb-2">{product.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="text-center">
                    <div className="mb-6">
                      <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{product.price}</span>
                    </div>

                    <div className="space-y-3">
                      {product.available ? (
                        <>
                          <Button
                            onClick={() => handleOrder(product.name, product.price)}
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Order from Prophetess Blessing
                          </Button>
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </>
                      ) : (
                        <Button disabled className="w-full">
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 scroll-reveal">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-slate-700">
              <h3 className="text-2xl md:text-3xl font-light text-gray-800 dark:text-white mb-6">
                Need Spiritual Guidance?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Our spiritual products are blessed and prayed over by Prophetess Blessing Ngozichukwu. For personalized
                recommendations or custom orders, reach out to us directly.
              </p>
              <Button
                onClick={handleGeneralInquiry}
                size="lg"
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600 text-white px-10 py-4 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl text-lg font-medium"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Contact Prophetess Blessing
              </Button>
            </div>
          </div>
        </div>
      </section>

      <EnhancedFooter />
      <ScrollAnimations />
    </div>
  )
}
