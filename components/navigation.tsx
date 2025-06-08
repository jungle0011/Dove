"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

interface NavigationProps {
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

export default function Navigation({ isDarkMode, setIsDarkMode }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Sessions", href: "/#sessions" },
    { name: "Testimonies", href: "/#answered-prayers" },
    { name: "Contact", href: "/#contact" },
  ]

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleNavigation = (href: string) => {
    if (href.startsWith("/#")) {
      // Internal scroll on homepage
      if (pathname === "/") {
        const element = document.querySelector(href.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      } else {
        // Navigate to homepage then scroll
        router.push(href)
      }
    } else if (href === "/" && pathname === "/") {
      // Scroll to top on same page
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // Page navigation
      router.push(href)
    }
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDarkMode ? "bg-slate-900/95 backdrop-blur-md" : "bg-white/95 backdrop-blur-md"
      } border-b ${isDarkMode ? "border-slate-700" : "border-gray-200"} shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigation("/")}>
            <div className="text-2xl animate-pulse">🕊️</div>
            <div>
              <span
                className={`text-xl font-serif bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent`}
              >
                Dove
              </span>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Guided by Grace</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`relative transition-all duration-300 hover:text-amber-500 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } group text-sm`}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className={`transition-all duration-500 hover:scale-110 ${isDarkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"}`}
            >
              {isDarkMode ? (
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-yellow-500 animate-pulse" />
                  <span className="hidden sm:inline text-yellow-500 text-xs">Peace</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Moon className="w-4 h-4 text-purple-600" />
                  <span className="hidden sm:inline text-purple-600 text-xs">Power</span>
                </div>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              size="sm"
              className="md:hidden min-h-[44px] min-w-[44px]"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`md:hidden py-4 border-t ${isDarkMode ? "border-slate-700" : "border-gray-200"} animate-fade-in`}
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`block w-full text-left py-3 px-4 transition-colors duration-300 hover:text-amber-500 min-h-[44px] ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </nav>
  )
}
