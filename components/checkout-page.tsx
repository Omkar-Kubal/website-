"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, CreditCard, Truck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"
import { CheckoutSummary } from "@/components/checkout-summary"
import { ShippingForm } from "@/components/shipping-form"
import { PaymentForm } from "@/components/payment-form"

type CheckoutStep = "shipping" | "payment" | "review"

export function CheckoutPage() {
  const router = useRouter()
  const { cartItems, getCartTotal, clearCart } = useStore()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    saveInfo: false,
  })
  const [paymentData, setPaymentData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    sameAsShipping: true,
  })

  // Redirect to cart if cart is empty
  if (cartItems.length === 0) {
    if (typeof window !== "undefined") {
      router.push("/cart")
    }
    return null
  }

  const handleShippingSubmit = (data: typeof shippingData) => {
    setShippingData(data)
    setCurrentStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (data: typeof paymentData) => {
    setPaymentData(data)
    setCurrentStep("review")
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = () => {
    const { cartItems, getCartTotal, createOrder } = useStore.getState()
    const cartTotal = getCartTotal()
    const shipping = cartTotal > 100 ? 0 : 9.99
    const tax = cartTotal * 0.08
    
    // Create the order
    const orderId = createOrder({
      items: cartItems,
      subtotal: cartTotal,
      shipping: shipping,
      tax: tax,
      total: cartTotal + shipping + tax,
      shippingAddress: shippingData,
      paymentMethod: `Card ending in ${paymentData.cardNumber.slice(-4)}`
    })
    
    clearCart()
    // Navigate to success page with order ID
    router.push(`/checkout/success?orderId=${orderId}`)
  }

  const goBack = () => {
    if (currentStep === "payment") {
      setCurrentStep("shipping")
    } else if (currentStep === "review") {
      setCurrentStep("payment")
    }
    window.scrollTo(0, 0)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Checkout Progress */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "shipping" ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`}>
              <Truck className="h-5 w-5" />
            </div>
            <span className="text-sm mt-2">Shipping</span>
          </div>
          <div className="flex-1 flex items-center px-4">
            <div className={`h-1 w-full ${currentStep === "shipping" ? "bg-muted" : "bg-primary"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "payment" ? "bg-primary text-primary-foreground" : currentStep === "shipping" ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary"}`}>
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="text-sm mt-2">Payment</span>
          </div>
          <div className="flex-1 flex items-center px-4">
            <div className={`h-1 w-full ${currentStep === "review" ? "bg-primary" : "bg-muted"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "review" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              <Check className="h-5 w-5" />
            </div>
            <span className="text-sm mt-2">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {currentStep === "shipping" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <ShippingForm 
                  initialData={shippingData} 
                  onSubmit={handleShippingSubmit} 
                />
              </CardContent>
            </Card>
          )}

          {currentStep === "payment" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <PaymentForm 
                  initialData={paymentData} 
                  shippingAddress={shippingData}
                  onSubmit={handlePaymentSubmit} 
                  onBack={goBack}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === "review" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>{shippingData.firstName} {shippingData.lastName}</p>
                      <p>{shippingData.address}</p>
                      {shippingData.apartment && <p>{shippingData.apartment}</p>}
                      <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                      <p>{shippingData.country}</p>
                      <p className="mt-1">{shippingData.email}</p>
                      <p>{shippingData.phone}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Payment Information</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>{paymentData.cardName}</p>
                      <p>Card ending in {paymentData.cardNumber.slice(-4)}</p>
                      <p>Expires {paymentData.expiryDate}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-2">Billing Address</h3>
                    <div className="text-sm text-muted-foreground">
                      {paymentData.sameAsShipping ? (
                        <>
                          <p>{shippingData.firstName} {shippingData.lastName}</p>
                          <p>{shippingData.address}</p>
                          {shippingData.apartment && <p>{shippingData.apartment}</p>}
                          <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                          <p>{shippingData.country}</p>
                        </>
                      ) : (
                        <p>Custom billing address</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={goBack}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder} className="ml-auto">
                    Place Order
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  )
}