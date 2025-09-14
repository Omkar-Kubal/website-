"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useStore } from "@/lib/store"

export function WishlistDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { wishlistItems, removeFromWishlist, addToCart, clearWishlist } = useStore()

  const handleAddToCart = (product: any) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {wishlistItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {wishlistItems.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Wishlist ({wishlistItems.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {wishlistItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-4">Save items you love for later</p>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-20 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                          <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                        </Link>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-semibold text-sm">${item.price}</span>
                          {item.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">${item.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" className="flex-1" onClick={() => handleAddToCart(item)}>
                            <ShoppingBag className="h-3 w-3 mr-1" />
                            Add to Cart
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2">
                  <Button asChild className="w-full" onClick={() => setIsOpen(false)}>
                    <Link href="/wishlist">View Full Wishlist</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={clearWishlist}>
                    Clear Wishlist
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
