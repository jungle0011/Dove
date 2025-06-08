"use client"

import { Button } from "@/components/ui/button"

export default function EnhancedAudioPlayer() {
  return (
    <>
      <div className="fixed top-20 right-4 z-40 flex flex-col space-y-2">
        {/* Audio Room Button - Locked */}
        <Button
          variant="outline"
          size="sm"
          className="bg-gray-100/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-75"
          disabled
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 dark:text-gray-400"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">Audio Room</span>
        </Button>
      </div>
    </>
  )
}
