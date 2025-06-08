"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Heart, Sparkles, CheckCircle } from "lucide-react"

export default function Services() {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [serviceType, setServiceType] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [concern, setConcern] = useState("")
  const [session, setSession] = useState("")
  const [additional, setAdditional] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)

  const prophetessNumber = "+13477098229"
  const prophetessName = "Prophetess Berbel"

  useEffect(() => {
    setIsFormValid(name !== "" && age !== "" && concern !== "" && session !== "")
  }, [name, age, concern, session])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const message = `New Booking Request:\n\nName: ${name}\nAge: ${age}\nConcern: ${concern}\nSession Type: ${session}\nAdditional Info: ${additional}`

    const whatsappLink = `https://wa.me/${prophetessNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappLink, "_blank")

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setShowBookingForm(false)
      setName("")
      setAge("")
      setConcern("")
      setSession("")
      setAdditional("")
    }, 3000)
  }

  return (
    <section id="sessions" className="pt-40 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto scroll-reveal">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">Our Sacred Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the path that resonates with your spiritual needs
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
                principles.
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
                  setShowBookingForm(true)
                }}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Book Counseling Session with {prophetessName}
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
                Spiritual ministry including healing prayers, prophetic words, and deliverance from spiritual bondages.
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
                  setShowBookingForm(true)
                }}
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
                Book Spiritual Session with {prophetessName}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Card className="w-full max-w-md mx-4 bg-white dark:bg-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Book Your Session</span>
                </CardTitle>
                <CardDescription>
                  {serviceType === "counseling" ? "Counseling Service Booking" : "Spiritual Service Booking"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Booking Submitted! 🔥</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We'll contact you soon to confirm your appointment.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" required value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <div>
                      <Label htmlFor="problem">Main Concern/Problem</Label>
                      <Select onValueChange={(value) => setConcern(value)}>
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
                      <Label htmlFor="session-type">Session Type</Label>
                      <Select value={session} onValueChange={(value) => setSession(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Session Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="counseling">Counseling Session</SelectItem>
                          <SelectItem value="spiritual">Spiritual Session</SelectItem>
                          <SelectItem value="prayer">1-on-1 Prayer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="additional">Additional Information</Label>
                      <Textarea
                        id="additional"
                        placeholder="Please share any additional details..."
                        value={additional}
                        onChange={(e) => setAdditional(e.target.value)}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button type="submit" className="flex-1" disabled={!isFormValid}>
                        Submit Booking
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowBookingForm(false)}>
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
