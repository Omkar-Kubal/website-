"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"

export function ProductComparison() {
  const [isOpen, setIsOpen] = useState(false)
  const { compareItems, removeFromCompare, clearCompare, addToCart } = useStore()

  if (compareItems.length === 0) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4 z-50 bg-transparent">
          <Scale className="h-4 w-4 mr-2" />
          Compare ({compareItems.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-4xl">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Product Comparison
            </span>
            <Button variant="ghost" size="sm" onClick={clearCompare}>
              Clear All
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {compareItems.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="relative">
                    <div className="aspect-square relative mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={() => removeFromCompare(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.category}</p>

                    <div className="flex items-center gap-2">
                      <span className="font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                      {product.isOnSale && <Badge className="text-xs">Sale</Badge>}
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <span>
                          {product.rating}/5 ({product.reviews} reviews)
                        </span>
                      </div>
                      {product.brand && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Brand:</span>
                          <span>{product.brand}</span>
                        </div>
                      )}
                      {product.material && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Material:</span>
                          <span>{product.material}</span>
                        </div>
                      )}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sizes:</span>
                          <span>{product.sizes.join(", ")}</span>
                        </div>
                      )}
                    </div>

                    <Button size="sm" className="w-full mt-4" onClick={() => addToCart(product)}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
