"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Flame, CheckCircle, CandlestickChartIcon as Candle } from "lucide-react"
import { sendFormToWhatsApp } from "@/utils/whatsapp-helper"

export default function EnhancedPrayerWidget() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showCandle, setShowCandle] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    prayerRequest: "",
  })

  const isFormValid = formData.prayerRequest.trim() !== ""

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid || isSubmitting) return

    setIsSubmitting(true)

    try {
      const whatsappData = {
        name: isAnonymous ? "Anonymous" : formData.name || "Anonymous",
        type: "Prayer Request",
        details: formData.prayerRequest,
      }

      sendFormToWhatsApp(whatsappData)

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", prayerRequest: "" })
        setIsAnonymous(false)
        setIsSubmitting(false)
      }, 4000)
    } catch (error) {
      setIsSubmitting(false)
      // Handle error gracefully
    }
  }

  const lightCandle = () => {
    setShowCandle(true)
    setTimeout(() => {
      setShowCandle(false)
    }, 5000)
  }

  return (
    <section
      id="prayer-widget"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-50 to-red-50 dark:from-slate-800 dark:to-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-orange-100 dark:bg-slate-700">
              <Flame className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">Prayer Request Wall</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Share your heart with Prophetess Blessing Ngozichukwu and our prayer community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prayer Request Form */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span>Submit Prayer Request</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Prayer Sent! 🔥</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your request has been sent to Prophetess Blessing Ngozichukwu.
                  </p>
                  <Button onClick={lightCandle} variant="outline" className="flex items-center space-x-2">
                    <Candle className="w-4 h-4" />
                    <span>Light a Virtual Candle</span>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="prayer-name">Name (Optional)</Label>
                    <Input
                      id="prayer-name"
                      placeholder={isAnonymous ? "Anonymous" : "Your name"}
                      disabled={isAnonymous}
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="anonymous" 
                      checked={isAnonymous} 
                      onCheckedChange={(checked) => setIsAnonymous(checked === true)} 
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      Submit anonymously
                    </Label>
                  </div>

                  <div>
                    <Label htmlFor="prayer-request">Prayer Request *</Label>
                    <Textarea
                      id="prayer-request"
                      placeholder="Share your prayer request here..."
                      required
                      rows={4}
                      value={formData.prayerRequest}
                      onChange={(e) => handleInputChange("prayerRequest", e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600" 
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send to Prophetess Blessing"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Virtual Candle */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Candle className="w-5 h-5 text-yellow-500" />
                <span>Light a Candle</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="py-8">
                {showCandle ? (
                  <div className="animate-pulse">
                    <div className="text-6xl mb-4">🕯️</div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Your candle is lit</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      A symbol of hope and prayer ascending to Heaven
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-6xl mb-4 opacity-50">🕯️</div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Light a virtual candle as a symbol of your prayers
                    </p>
                    <Button onClick={lightCandle} variant="outline">
                      Light Candle
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
