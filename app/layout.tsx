import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ProductComparison } from "@/components/product-comparison"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import { Suspense } from "react"
import { PageLoader } from "@/components/page-loader"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "EliteStyle - Premium Fashion E-commerce",
  description:
    "Discover premium fashion with advanced features like virtual closet, product comparison, and personalized recommendations.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${playfair.variable} antialiased`}>
        <Suspense fallback={null}>
          {children}
          <ProductComparison />
             <PageLoader />
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
