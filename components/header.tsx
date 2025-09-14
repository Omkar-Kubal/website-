"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CartDrawer } from "@/components/cart-drawer"
import { WishlistDrawer } from "@/components/wishlist-drawer"
// import { ClosetDrawer } from "@/components/closet-drawer"
import { AuthDialog } from "@/components/auth-dialog"
import { UserMenu } from "@/components/user-menu"
import { AdvancedSearch } from "@/components/advanced-search"
import { useAuthStore } from "@/lib/auth-store"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { isAuthenticated } = useAuthStore()

  return (
    <header 
className="sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur-xl ">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <span className="font-serif font-bold text-xl group-hover:text-primary transition-colors duration-300 text-grey">
              VINCERE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/men"
              className="text-grey hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Men
            </Link>
            <Link
              href="/women"
              className="text-grey hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Women
            </Link>
            <Link
              href="/accessories"
              className="text-grey hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Accessories
            </Link>
             <Link
              href="/explore"
              className="text-grey hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Explore
            </Link>


          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass border-grey/20 focus:border-primary/50 transition-all duration-300 text-grey placeholder:text-grey"
              />
            </div>
            <AdvancedSearch />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? <UserMenu /> : <AuthDialog />}
            <WishlistDrawer />
            {/* <ClosetDrawer /> */}
            <CartDrawer />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:scale-110 transition-transform duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-grey/20 py-4 glass">
            <div className="flex flex-col space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass border-grey/20"
                  />
                </div>
                <AdvancedSearch />
              </div>
              <nav className="flex flex-col space-y-2">
                <Link href="/men" className="text-foreground hover:text-primary transition-colors py-2 font-medium">
                  Men
                </Link>
                <Link href="/women" className="text-foreground hover:text-primary transition-colors py-2 font-medium">
                  Women
                </Link>
                <Link
                  href="/accessories"
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                >
                  Accessories
                </Link>
                <Link
                  href="/explore"
                  className="text-foreground hover:text-primary transition-colors py-2 font-medium"
                >
                  Explore
                </Link>


                <Link href="/account" className="text-foreground hover:text-primary transition-colors py-2 font-medium">
                  My Account
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
