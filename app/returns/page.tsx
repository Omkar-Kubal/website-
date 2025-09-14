import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, RotateCcw, Clock, CheckCircle, XCircle } from "lucide-react"

export default function ReturnsPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold">Returns & Exchanges</h1>
            <p className="text-muted-foreground">Easy returns and exchanges for your peace of mind</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Return Policy Overview */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <RotateCcw className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">30-Day Return Policy</h2>
              </div>
              <p className="text-muted-foreground">
                We offer free returns within 30 days of purchase. Items must be in original condition with tags
                attached.
              </p>
            </CardContent>
          </Card>

          {/* Return Process */}
          <Card>
            <CardHeader>
              <CardTitle>How to Return Items</CardTitle>
              <CardDescription>Simple steps to return your purchase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Initiate Return</h3>
                    <p className="text-sm text-muted-foreground">
                      Log into your account and go to "Order History" to start a return request, or contact customer
                      service.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Print Return Label</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll email you a prepaid return shipping label. Print it and attach it to your package.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Package & Ship</h3>
                    <p className="text-sm text-muted-foreground">
                      Pack items in original packaging (if available) and drop off at any UPS location or schedule a
                      pickup.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Receive Refund</h3>
                    <p className="text-sm text-muted-foreground">
                      Once we receive and process your return, your refund will be issued to the original payment method
                      within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button asChild>
                  <Link href="/orders">Start a Return</Link>
                </Button>
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Return Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Return Conditions</CardTitle>
              <CardDescription>Items must meet these requirements for returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium text-green-600">Returnable Items</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Items with original tags attached</li>
                    <li>• Unworn and unwashed clothing</li>
                    <li>• Items in original packaging</li>
                    <li>• Accessories in new condition</li>
                    <li>• Items purchased within 30 days</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <h3 className="font-medium text-red-600">Non-Returnable Items</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Intimate apparel and swimwear</li>
                    <li>• Personalized or customized items</li>
                    <li>• Items damaged by customer</li>
                    <li>• Items without tags or packaging</li>
                    <li>• Final sale items</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exchanges */}
          <Card>
            <CardHeader>
              <CardTitle>Exchanges</CardTitle>
              <CardDescription>Size or color exchanges made easy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Size & Color Exchanges</h3>
                  <p className="text-sm text-muted-foreground">
                    Need a different size or color? We offer free exchanges within 30 days. Simply follow the return
                    process and specify that you'd like an exchange.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Exchange Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Exchanges typically take 7-10 business days to process. We'll ship your new item as soon as we
                    receive your return.
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-md p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> If the new item costs more than the original, you'll be charged the difference.
                  If it costs less, we'll refund the difference to your original payment method.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Refund Information */}
          <Card>
            <CardHeader>
              <CardTitle>Refund Information</CardTitle>
              <CardDescription>When and how you'll receive your refund</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Refund Timeline</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Credit cards: 5-7 business days</li>
                      <li>• Debit cards: 5-10 business days</li>
                      <li>• PayPal: 3-5 business days</li>
                      <li>• Store credit: Immediate</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Refund Method</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Refunds issued to original payment method</li>
                      <li>• Store credit available upon request</li>
                      <li>• Gift card purchases refunded as store credit</li>
                      <li>• Shipping costs are non-refundable</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-md p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Processing Time:</strong> Please allow 2-3 business days for us to process your return once
                    we receive it. You'll receive an email confirmation when your refund has been processed.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Returns */}
          <Card>
            <CardHeader>
              <CardTitle>International Returns</CardTitle>
              <CardDescription>Return policy for international customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Return Process</h3>
                  <p className="text-sm text-muted-foreground">
                    International customers are responsible for return shipping costs. Please contact customer service
                    for return instructions and shipping labels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">Extended Timeline</h3>
                  <p className="text-sm text-muted-foreground">
                    International returns may take 2-4 weeks to process due to customs and shipping times. Refunds will
                    be issued once items are received and inspected.
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-md p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Important:</strong> Customers are responsible for any customs duties or taxes on returned
                  items. We recommend using a trackable shipping method for returns.
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
