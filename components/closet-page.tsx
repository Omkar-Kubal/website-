"use client"

import { Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useStore } from "@/lib/store"
import Link from "next/link"

export function ClosetPage() {
  const { closetItems, clearCloset } = useStore()

  if (closetItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Shirt className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4">Your closet is empty</h1>
        <p className="text-muted-foreground mb-8">Keep items in your closet for future consideration</p>
        <Button asChild size="lg">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Closet</h1>
          <p className="text-muted-foreground">{closetItems.length} items in your closet</p>
        </div>
        <Button variant="outline" onClick={clearCloset}>
          Clear Closet
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {closetItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
