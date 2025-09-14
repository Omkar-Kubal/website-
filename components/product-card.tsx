"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Star, Shirt, Scale, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { VirtualTryOn } from "@/components/virtual-try-on"
import { useStore } from "@/lib/store"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isOnSale: boolean
  rating: number
  reviews: number
  sizes?: string[]
  colors?: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showTryOn, setShowTryOn] = useState(false)
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCloset,
    removeFromCloset,
    isInCloset,
    addToCompare,
    removeFromCompare,
    isInCompare,
    addToRecentlyViewed,
  } = useStore()

  const isWishlisted = isInWishlist(product.id)
  const isInMyCloset = isInCloset(product.id)
  const isInComparison = isInCompare(product.id)

  // Check if product is suitable for try-on (clothing items)
  const isTryOnCompatible = [
    "Men's Tops",
    "Women's Tops",
    "Women's Dresses",
    "Men's Bottoms",
    "Women's Bottoms",
  ].includes(product.category)

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const handleClosetToggle = () => {
    if (isInMyCloset) {
      removeFromCloset(product.id)
      toast({
        title: "Removed from closet",
        description: `${product.name} has been removed from your closet.`,
      })
    } else {
      addToCloset(product)
      toast({
        title: "Added to closet",
        description: `${product.name} has been added to your closet.`,
      })
    }
  }

  const handleCompareToggle = () => {
    if (isInComparison) {
      removeFromCompare(product.id)
      toast({
        title: "Removed from comparison",
        description: `${product.name} has been removed from comparison.`,
      })
    } else {
      addToCompare(product)
      toast({
        title: "Added to comparison",
        description: `${product.name} has been added to comparison.`,
      })
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleProductClick = () => {
    addToRecentlyViewed(product)
  }

  const handleTryOn = () => {
    setShowTryOn(true)
  }

  return (
    <>
      <Card
        className="group overflow-hidden border-0 glass hover:glass-dark shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <Link href={`/product/${product.id}`} onClick={handleProductClick}>
              <div className="aspect-[3/4] relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>

            {/* Sale Badge */}
            {product.isOnSale && (
              <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground shadow-lg animate-float">
                Sale
              </Badge>
            )}

            {/* Try-On Badge */}
            {isTryOnCompatible && (
              <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground shadow-lg">
                <Camera className="h-3 w-3 mr-1" />
                Try-On
              </Badge>
            )}

            <div className="absolute top-12 right-3 flex flex-col gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={`glass backdrop-blur-xl hover:glass-dark transition-all duration-300 hover:scale-110 shadow-lg ${
                  isWishlisted ? "text-accent" : "text-muted-foreground"
                }`}
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`glass backdrop-blur-xl hover:glass-dark transition-all duration-300 hover:scale-110 shadow-lg ${
                  isInMyCloset ? "text-secondary" : "text-muted-foreground"
                }`}
                onClick={handleClosetToggle}
              >
                <Shirt className={`h-4 w-4 ${isInMyCloset ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`glass backdrop-blur-xl hover:glass-dark transition-all duration-300 hover:scale-110 shadow-lg ${
                  isInComparison ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={handleCompareToggle}
              >
                <Scale className={`h-4 w-4 ${isInComparison ? "fill-current" : ""}`} />
              </Button>
            </div>

            <div
              className={`absolute bottom-3 left-3 right-3 transition-all duration-500 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="flex gap-2">
                {isTryOnCompatible && (
                  <Button
                    onClick={handleTryOn}
                    variant="secondary"
                    size="sm"
                    className="flex-1 glass backdrop-blur-xl hover:glass-dark hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Try On
                  </Button>
                )}
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg"
                  size="sm"
                >
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-b from-transparent to-background/50">
            <p className="text-sm text-muted-foreground mb-1 font-medium">{product.category}</p>
            <Link href={`/product/${product.id}`} onClick={handleProductClick}>
              <h3 className="font-serif font-semibold text-foreground hover:text-primary transition-colors duration-300 line-clamp-2 mb-2">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 transition-colors duration-200 ${
                      i < Math.floor(product.rating) ? "text-accent fill-current" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Virtual Try-On Modal */}
      {showTryOn && (
        <VirtualTryOn
          productId={product.id}
          productName={product.name}
          productImage={product.image}
          selectedSize="M"
          selectedColor="Default"
          isOpen={showTryOn}
          onClose={() => setShowTryOn(false)}
        />
      )}
    </>
  )
}
