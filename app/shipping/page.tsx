import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Truck, Clock, MapPin, Package } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Shipping Information</h1>
            <p className="text-muted-foreground">Everything you need to know about our shipping options</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Free Shipping Banner */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Truck className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Free Shipping</h2>
              </div>
              <p className="text-muted-foreground">
                Enjoy free standard shipping on all orders over $100. No code needed - discount applied automatically at
                checkout.
              </p>
            </CardContent>
          </Card>

          {/* Shipping Options */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Options</CardTitle>
              <CardDescription>Choose the delivery speed that works best for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Standard Shipping</h3>
                      <p className="text-sm text-muted-foreground">5-7 business days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$9.99</p>
                    <Badge variant="secondary" className="text-xs">
                      Free over $100
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Express Shipping</h3>
                      <p className="text-sm text-muted-foreground">2-3 business days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$19.99</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Next Day Delivery</h3>
                      <p className="text-sm text-muted-foreground">1 business day</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">$29.99</p>
                    <p className="text-xs text-muted-foreground">Order by 2 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Time */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Time</CardTitle>
              <CardDescription>When your order will be shipped</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Standard Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Most orders are processed within 1-2 business days. You'll receive a tracking number once your order
                    ships.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Order Cutoff Times</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Standard & Express: Order by 11:59 PM EST</li>
                    <li>• Next Day Delivery: Order by 2:00 PM EST</li>
                    <li>• Weekend orders process on the next business day</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Locations */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Locations</CardTitle>
              <CardDescription>Where we ship and delivery times</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Domestic Shipping (US)</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All 50 states</li>
                    <li>• Washington D.C.</li>
                    <li>• Puerto Rico</li>
                    <li>• US Virgin Islands</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">International Shipping</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Canada (7-14 business days)</li>
                    <li>• United Kingdom (10-15 business days)</li>
                    <li>• European Union (10-15 business days)</li>
                    <li>• Australia (15-20 business days)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 rounded-md p-4 mt-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> International orders may be subject to customs duties and taxes, which are the
                  responsibility of the customer. Delivery times may vary due to customs processing.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
              <CardDescription>Stay updated on your order status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Tracking Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Once your order ships, you'll receive an email with tracking information. You can also track your
                    order in your account under "Order History."
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button asChild>
                  <Link href="/orders">Track Your Order</Link>
                </Button>
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Issues */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Issues</CardTitle>
              <CardDescription>What to do if there's a problem with your delivery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">Damaged Package</h4>
                  <p className="text-sm text-muted-foreground">
                    If your package arrives damaged, please contact us within 48 hours with photos of the damage.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm">Lost Package</h4>
                  <p className="text-sm text-muted-foreground">
                    If your package shows as delivered but you haven't received it, please check with neighbors and
                    contact us within 7 days.
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-sm">Delayed Delivery</h4>
                  <p className="text-sm text-muted-foreground">
                    If your order is significantly delayed beyond the estimated delivery date, we'll work with the
                    carrier to resolve the issue.
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-md p-4">
                <p className="text-sm text-muted-foreground">
                  For any shipping-related issues, please contact our customer service team at{" "}
                  <strong>support@stylehub.com</strong> or call <strong>+1 (555) 123-4567</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
