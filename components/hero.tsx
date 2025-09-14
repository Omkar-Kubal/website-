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
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden parallax-hero">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-layer"
        style={{
          backgroundImage: `url('/modern-fashion-hero-image-with-elegant-clothing-di.jpg')`,
          transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div
          className="glass-dark rounded-3xl p-8 md:p-12 backdrop-blur-xl"
          style={{
            transform: `translateY(${scrollY * -0.2}px)`,
          }}
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance animate-fade-in-up">
            Elevate Your Style
          </h1>
          <p
            className="text-lg md:text-xl mb-8 text-balance opacity-90 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Discover premium fashion that defines your unique aesthetic. From timeless classics to contemporary trends.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/women">Shop Women</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white hover:text-black bg-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/men">Shop Men</Link>
            </Button>
          </div>
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
