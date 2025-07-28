"use client"

import { useState, useCallback, memo } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

const NavItem = memo(({ item, isActive, onClick }: { item: { name: string, href: string }, isActive: boolean, onClick: () => void }) => (
  <li>
    <Button
      variant="ghost"
      className={`w-full justify-start text-lg ${isActive ? 'bg-accent' : ''}`}
      onClick={onClick}
    >
      {item.name}
    </Button>
  </li>
));

NavItem.displayName = 'NavItem';

interface NavigationProps {
  isDarkMode: boolean
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const Navigation = ({ isDarkMode, setIsDarkMode }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Divine Inspirations", href: "/divine-inspirations" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Sessions", href: "/#sessions" },
    { name: "Testimonies", href: "/#answered-prayers" }
  ];

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev: boolean) => !prev);
  }, [setIsDarkMode]);

  const handleNavigation = useCallback((href: string) => {
    setIsMenuOpen(false);
    
    if (href.startsWith("/#")) {
      if (pathname === "/") {
        const element = document.querySelector(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Store the hash for the homepage to scroll to after navigation
        sessionStorage.setItem('scrollTo', href.substring(1));
        router.push(`/${href}`);
      }
    } else if (href === "/" && pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push(href);
    }
  }, [pathname, router]);

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
                The Graced Dove
              </span>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Prophetic Voice</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavItem 
                key={item.name}
                item={item}
                isActive={pathname === item.href.split("#")[0]}
                onClick={() => handleNavigation(item.href)}
              />
            ))}
          </ul>

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
  );
};

export default Navigation;
