"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Heart, Sparkles, CheckCircle } from "lucide-react"
import { sendFormToWhatsApp } from "@/utils/whatsapp-helper"

export default function EnhancedServices() {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [serviceType, setServiceType] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    problem: "",
    sessionType: "",
    additional: "",
  })

  const isFormValid = formData.name && formData.age && formData.problem && formData.sessionType

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) return

    const whatsappData = {
      name: formData.name,
      type: `${formData.sessionType} Session Booking`,
      details: `Age: ${formData.age}\nMain Concern: ${formData.problem}\nSession Type: ${formData.sessionType}`,
      additionalInfo: formData.additional || undefined,
    }

    sendFormToWhatsApp(whatsappData)

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setShowBookingForm(false)
      setFormData({ name: "", age: "", problem: "", sessionType: "", additional: "" })
    }, 3000)
  }

  return (
    <section id="sessions" className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto scroll-reveal">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">Sacred Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience divine guidance through Prophetess Blessing Ngozichukwu's anointed ministry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 scroll-reveal">
          {/* Counseling Service */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-blue-200 dark:border-slate-600 hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Heart className="w-8 h-8 text-blue-500" />
                <div>
                  <CardTitle className="text-xl text-gray-800 dark:text-white">Counseling Service</CardTitle>
                  <CardDescription>Mental & Emotional Guidance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Professional counseling for mental health, emotional healing, and life guidance through biblical
                principles with Prophetess Blessing Ngozichukwu.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <li>• Anxiety & Depression Support</li>
                <li>• Relationship Counseling</li>
                <li>• Life Transitions</li>
                <li>• Grief & Loss Support</li>
              </ul>
              <Button
                onClick={() => {
                  setServiceType("counseling")
                  setFormData((prev) => ({ ...prev, sessionType: "Counseling" }))
                  setShowBookingForm(true)
                }}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Book Counseling with Prophetess Blessing
              </Button>
            </CardContent>
          </Card>

          {/* Spiritual Service */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-2 border-purple-200 dark:border-slate-600 hover:border-purple-300 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Sparkles className="w-8 h-8 text-purple-500" />
                <div>
                  <CardTitle className="text-xl text-gray-800 dark:text-white">Spiritual Service</CardTitle>
                  <CardDescription>Healing, Prophetic & Deliverance</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Spiritual ministry including healing prayers, prophetic words, and deliverance from spiritual bondages
                through Prophetess Blessing Ngozichukwu's anointed ministry.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
                <li>• Divine Healing Prayer</li>
                <li>• Prophetic Ministry</li>
                <li>• Spiritual Deliverance</li>
                <li>• Breakthrough Sessions</li>
              </ul>
              <Button
                onClick={() => {
                  setServiceType("spiritual")
                  setFormData((prev) => ({ ...prev, sessionType: "Spiritual" }))
                  setShowBookingForm(true)
                }}
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                Book Spiritual Session with Prophetess Blessing
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <Card className="w-full max-w-md mx-auto bg-white dark:bg-slate-800 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Book with Prophetess Blessing</span>
                </CardTitle>
                <CardDescription>
                  {serviceType === "counseling" ? "Counseling Service Booking" : "Spiritual Service Booking"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Request Sent! 🔥</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Prophetess Blessing Ngozichukwu will contact you soon via WhatsApp.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="min-h-[44px] text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="problem">Main Concern/Problem *</Label>
                      <Select value={formData.problem} onValueChange={(value) => handleInputChange("problem", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your main concern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="health">Health Issues</SelectItem>
                          <SelectItem value="spiritual">Spiritual Attacks</SelectItem>
                          <SelectItem value="family">Family/Relationship</SelectItem>
                          <SelectItem value="finance">Financial Struggles</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="session-type">Session Type *</Label>
                      <Select
                        value={formData.sessionType}
                        onValueChange={(value) => handleInputChange("sessionType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Counseling">Counseling Session</SelectItem>
                          <SelectItem value="Spiritual">Spiritual Session</SelectItem>
                          <SelectItem value="Prayer">1-on-1 Prayer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="additional">Additional Information</Label>
                      <Textarea
                        id="additional"
                        placeholder="Please share any additional details..."
                        value={formData.additional}
                        onChange={(e) => handleInputChange("additional", e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button type="submit" className="flex-1 min-h-[44px]" disabled={!isFormValid}>
                        Send to Prophetess Blessing
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowBookingForm(false)}
                        className="min-h-[44px]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
