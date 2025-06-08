"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🕊️</div>
              <span className="text-xl font-light">Dove</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A sacred space for healing, prophetic encounters, and spiritual transformation. Experience divine guidance
              through prayer, counseling, and prophetic ministry.
            </p>
            <div className="text-sm text-gray-500">Upcoming: Spiritual Library - Devotionals & E-books</div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#home" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#sessions" className="hover:text-white transition-colors">
                  Sessions
                </Link>
              </li>
              <li>
                <Link href="#testimonies" className="hover:text-white transition-colors">
                  Testimonies
                </Link>
              </li>
              <li>
                <Link href="#booking" className="hover:text-white transition-colors">
                  Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@dove-ministry.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>WhatsApp: Available 24/7</li>
              <li>Prayer Line: Always Open</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Dove Ministry. All rights reserved.</div>
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
