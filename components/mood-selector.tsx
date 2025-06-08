"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Sun } from "lucide-react"

const moodScriptures = {
  anxious: {
    scripture:
      "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    reference: "Philippians 4:6",
    message: "God sees your worries and wants to carry them for you. Release your burdens to Him.",
  },
  sad: {
    scripture: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
    reference: "Psalm 34:18",
    message: "Your tears are precious to God. He is near to you in this moment of sorrow.",
  },
  thankful: {
    scripture: "Give thanks to the Lord, for he is good; his love endures forever.",
    reference: "Psalm 107:1",
    message: "Your grateful heart brings joy to Heaven. Continue to praise Him in all seasons.",
  },
  angry: {
    scripture: "In your anger do not sin: Do not let the sun go down while you are still angry.",
    reference: "Ephesians 4:26",
    message: "God understands your anger. Let Him transform it into righteous passion for His purposes.",
  },
  confused: {
    scripture: "Trust in the Lord with all your heart and lean not on your own understanding.",
    reference: "Proverbs 3:5",
    message: "When the path seems unclear, God's wisdom will guide your steps. Trust His leading.",
  },
}

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState("")
  const [showMessage, setShowMessage] = useState(false)

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    setShowMessage(true)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-slate-700">
              <Heart className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 dark:text-white mb-4">
            Scripture for Your Soul
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            How are you feeling today? Let God's Word speak to your heart.
          </p>
        </div>

        <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-xl text-gray-800 dark:text-white">
              Select Your Current Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Select onValueChange={handleMoodSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="How are you feeling?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anxious">Anxious</SelectItem>
                  <SelectItem value="sad">Sad</SelectItem>
                  <SelectItem value="thankful">Thankful</SelectItem>
                  <SelectItem value="angry">Angry</SelectItem>
                  <SelectItem value="confused">Confused</SelectItem>
                </SelectContent>
              </Select>

              {showMessage && selectedMood && (
                <div className="transition-all duration-1000 transform translate-y-0 opacity-100">
                  <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-800 border-2 border-blue-200 dark:border-slate-600">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <Sun className="w-8 h-8 text-yellow-500 animate-pulse" />
                      </div>

                      <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
                        "{moodScriptures[selectedMood as keyof typeof moodScriptures].scripture}"
                      </blockquote>

                      <cite className="text-blue-600 dark:text-blue-400 font-medium block mb-4">
                        — {moodScriptures[selectedMood as keyof typeof moodScriptures].reference}
                      </cite>

                      <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                          {moodScriptures[selectedMood as keyof typeof moodScriptures].message}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
