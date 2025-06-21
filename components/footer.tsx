"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-2xl animate-pulse">🕊️</div>
              <div>
                <span className="text-xl font-serif bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  The Graced Dove
                </span>
                <p className="text-sm text-gray-500">Prophetic Voice</p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              A sanctuary for healing, prophecy, and divine guidance through The Graced Dove Prophetic Voice.
            </p>

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>Phone: +234 702 691 8232</li>
              <li>Email: info@thegraceddove.com</li>
              <li>WhatsApp: Available 24/7</li>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-600 dark:text-gray-300 hover:text-amber-500 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-amber-500 transition-colors">About</a></li>
              <li><a href="/products" className="text-gray-600 dark:text-gray-300 hover:text-amber-500 transition-colors">Products</a></li>
              <li><a href="/#sessions" className="text-gray-600 dark:text-gray-300 hover:text-amber-500 transition-colors">Sessions</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Services</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Prophetic Counseling</li>
              <li>• Healing Sessions</li>
              <li>• Spiritual Products</li>
              <li>• Prayer Requests</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 The Graced Dove Prophetic Voice. All rights reserved.</div>
          <div className="text-gray-400 text-sm">
            Powered by{" "}
            <Link
              href="https://sageverse.vercel.app"
              target="_blank"
              className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sageverse
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
