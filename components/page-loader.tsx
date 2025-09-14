"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z- bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <span className="block w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
          <span className="block w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '.2s' }}></span>
          <span className="block w-3 h-3 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '.4s' }}></span>
        </div>
        <p className="text-sm text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  )
}
