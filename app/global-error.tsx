'use client'

import { Button } from '@/components/ui/button'
import { Home, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const handleReset = () => {
    reset()
  }

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-slate-900">
          <div className="text-center px-4">
            <div className="mb-8">
              <div className="text-6xl font-light text-red-300 dark:text-red-700 mb-4">⚠️</div>
              <h1 className="text-3xl font-light text-gray-800 dark:text-white mb-4">
                Something went wrong
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                We encountered an unexpected error. Please try again or return to the home page.
              </p>
            </div>
            
            <div className="space-y-4">
              <Button onClick={handleReset} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <div className="mt-8">
                <Button variant="outline" asChild>
                  <a href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Return Home
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
              <p>The Graced Dove Prophetic Voice</p>
              <p>Prophetess Blessing Ngozichukwu</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 