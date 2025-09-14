"use client"

import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"

export function CheckoutSummary() {
  const { cartItems, getCartTotal } = useStore()
  const cartTotal = getCartTotal()
  const shipping = cartTotal > 100 ? 0 : 9.99
  const tax = cartTotal * 0.08
  const finalTotal = cartTotal + shipping + tax

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        <div className="max-h-80 overflow-y-auto mb-4 pr-2">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3 mb-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <div className="flex text-xs text-muted-foreground">
                  <p>Qty: {item.quantity}</p>
                  {item.selectedSize && <p className="ml-2">Size: {item.selectedSize}</p>}
                  {item.selectedColor && <p className="ml-2">Color: {item.selectedColor}</p>}
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                {item.originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    ${(item.originalPrice * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        {cartTotal < 100 && (
          <p className="text-sm text-muted-foreground mt-4">
            Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
          </p>
        )}
      </CardContent>
    </Card>
  )
}