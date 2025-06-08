"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scroll } from "lucide-react"

export default function PropheticWord() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 border-2 border-amber-200 dark:border-slate-600">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-slate-700">
                <Scroll className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-light text-gray-800 dark:text-white">
              Prophetic Word of the Week
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic mb-4">
                "Fear not, for I am with you always. The season of breakthrough you have been praying for is at hand.
                Trust in My timing, for what I have promised, I will surely bring to pass."
              </p>
              <cite className="text-amber-600 dark:text-amber-400 font-medium">— Prophetic Word for January 2025</cite>
            </div>

            <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-6 backdrop-blur-sm">
              <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Scripture Foundation</h4>
              <blockquote className="text-gray-600 dark:text-gray-300 italic">
                "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to
                give you hope and a future."
              </blockquote>
              <cite className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">— Jeremiah 29:11</cite>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
