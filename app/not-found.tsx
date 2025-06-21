import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-slate-900">
      <div className="text-center px-4">
        <div className="mb-8">
          <div className="text-8xl font-light text-gray-300 dark:text-gray-700 mb-4">404</div>
          <h1 className="text-3xl font-light text-gray-800 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist. Let's get you back to the spiritual sanctuary.
          </p>
        </div>
        <Link href="/" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded shadow hover:from-amber-600 hover:to-yellow-600">
          <Home className="w-4 h-4 mr-2" />
          Return Home
        </Link>
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>The Graced Dove Prophetic Voice</p>
          <p>Prophetess Blessing Ngozichukwu</p>
        </div>
      </div>
    </div>
  )
} 