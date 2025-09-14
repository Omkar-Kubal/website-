"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
<section className="relative h-screen flex items-center justify-center overflow-hidden parallax-hero">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-layer"
        style={{
          backgroundImage: `url('/bgmain.jpg')`,
          transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
      </div>

<div className="relative z-10 text-center text-white w-full px-0">
  <div>
    <h1 className="text-[8rem] md:text-[12rem] font-serif font-bold mb-6 text-balance animate-fade-in-up text-white drop-shadow-[2px_2px_2px_rgba(0,0,0,1)] whitespace-nowrap overflow-x-auto">
      RIVERA
    </h1>
  </div>
</div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  )
}
