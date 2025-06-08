"use client"

import Link from "next/link"

export default function EnhancedFooter() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400">
          © 2025 Powered by{" "}
          <Link
            href="https://sageverse.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-400 hover:text-amber-300 transition-colors duration-300 hover:underline"
          >
            Sageverse
          </Link>
        </p>
      </div>
    </footer>
  )
}
