"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"
import { Order } from "@/lib/store"

export default function CheckoutSuccess() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | undefined>()
  
  useEffect(() => {
    if (orderId) {
      const { getOrder } = useStore.getState()
      const foundOrder = getOrder(orderId)
      setOrder(foundOrder)
    }
  }, [orderId])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="border rounded-md p-4 mb-6 inline-block">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-xl font-medium">{orderId || "Unknown"}</p>
          </div>
          {order && (
            <div className="mb-6 text-left border rounded-md p-4">
              <h2 className="font-medium mb-2">Order Summary</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-muted-foreground">Subtotal:</p>
                <p className="text-right">${order.subtotal.toFixed(2)}</p>
                <p className="text-muted-foreground">Shipping:</p>
                <p className="text-right">{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</p>
                <p className="text-muted-foreground">Tax:</p>
                <p className="text-right">${order.tax.toFixed(2)}</p>
                <p className="font-medium">Total:</p>
                <p className="text-right font-medium">${order.total.toFixed(2)}</p>
              </div>
            </div>
          )}
          <p className="mb-8 text-sm text-muted-foreground">
            We've sent a confirmation email to your registered email address with all the details of your order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/orders">View My Orders</Link>
            </Button>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}