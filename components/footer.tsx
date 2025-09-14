import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">V</span>
              </div>
              <span className="font-bold text-xl">VINCERE</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Premium fashion for the modern lifestyle. Discover quality, style, and elegance in every piece.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="font-semibold">Shop</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/men" className="text-muted-foreground hover:text-foreground transition-colors">
                Men's Collection
              </Link>
              <Link href="/women" className="text-muted-foreground hover:text-foreground transition-colors">
                Women's Collection
              </Link>
              <Link href="/accessories" className="text-muted-foreground hover:text-foreground transition-colors">
                Accessories
              </Link>
              <Link href="/sale" className="text-muted-foreground hover:text-foreground transition-colors">
                Sale
              </Link>
              <Link href="/new-arrivals" className="text-muted-foreground hover:text-foreground transition-colors">
                New Arrivals
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link href="/size-guide" className="text-muted-foreground hover:text-foreground transition-colors">
                Size Guide
              </Link>
              <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                Returns
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* company*/}
         <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
             
      
              <Link href="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 VINCERE. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            
          </div>
        </div>
      </div>
    </footer>
  )
}
