import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, HelpCircle } from "lucide-react"

export default function FAQPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">Find answers to common questions about StyleHub</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Search Help */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Can't find what you're looking for?</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                If you don't see your question answered below, our customer service team is here to help.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/support">Visit Support Center</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Sections */}
          <div className="space-y-6">
            {/* Orders & Shipping */}
            <Card>
              <CardHeader>
                <CardTitle>Orders & Shipping</CardTitle>
                <CardDescription>Questions about placing orders and delivery</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="shipping-time">
                    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                    <AccordionContent>
                      We offer several shipping options: Standard shipping (5-7 business days, free over $100), Express
                      shipping (2-3 business days, $19.99), and Next Day delivery (1 business day, $29.99). Orders are
                      typically processed within 1-2 business days before shipping.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="free-shipping">
                    <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
                    <AccordionContent>
                      Yes! We offer free standard shipping on all orders over $100. The discount is automatically
                      applied at checkout - no code needed.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="track-order">
                    <AccordionTrigger>How can I track my order?</AccordionTrigger>
                    <AccordionContent>
                      Once your order ships, you'll receive an email with tracking information. You can also track your
                      order by logging into your account and visiting the "Order History" section.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="international-shipping">
                    <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we ship to Canada, the United Kingdom, European Union, and Australia. International shipping
                      times vary from 7-20 business days depending on the destination. Please note that international
                      orders may be subject to customs duties and taxes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="change-address">
                    <AccordionTrigger>Can I change my shipping address after placing an order?</AccordionTrigger>
                    <AccordionContent>
                      If your order hasn't shipped yet, we may be able to update your shipping address. Please contact
                      customer service as soon as possible at support@stylehub.com or +1 (555) 123-4567.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Returns & Exchanges */}
            <Card>
              <CardHeader>
                <CardTitle>Returns & Exchanges</CardTitle>
                <CardDescription>Information about our return policy</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="return-policy">
                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                    <AccordionContent>
                      We offer free returns within 30 days of purchase. Items must be in original condition with tags
                      attached, unworn, and unwashed. We provide prepaid return shipping labels for your convenience.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="return-process">
                    <AccordionTrigger>How do I return an item?</AccordionTrigger>
                    <AccordionContent>
                      To return an item, log into your account and go to "Order History" to start a return request.
                      We'll email you a prepaid return shipping label. Pack the items and drop them off at any UPS
                      location or schedule a pickup.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="exchange-items">
                    <AccordionTrigger>Can I exchange items for a different size or color?</AccordionTrigger>
                    <AccordionContent>
                      Yes! We offer free exchanges within 30 days. Follow the return process and specify that you'd like
                      an exchange. Exchanges typically take 7-10 business days to process.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="refund-time">
                    <AccordionTrigger>How long does it take to receive a refund?</AccordionTrigger>
                    <AccordionContent>
                      Once we receive and process your return (2-3 business days), refunds are issued to your original
                      payment method. Credit cards take 5-7 business days, debit cards 5-10 business days, and PayPal
                      3-5 business days.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="non-returnable">
                    <AccordionTrigger>What items cannot be returned?</AccordionTrigger>
                    <AccordionContent>
                      We cannot accept returns on intimate apparel, swimwear, personalized items, items damaged by the
                      customer, items without tags, and final sale items. All other items can be returned within 30 days
                      in original condition.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Sizing & Fit */}
            <Card>
              <CardHeader>
                <CardTitle>Sizing & Fit</CardTitle>
                <CardDescription>Help with finding the right size</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="size-guide">
                    <AccordionTrigger>Where can I find size charts?</AccordionTrigger>
                    <AccordionContent>
                      You can find comprehensive size charts for men's, women's, and accessories on our Size Guide page.
                      Each product page also includes specific sizing information and fit details.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="between-sizes">
                    <AccordionTrigger>What if I'm between sizes?</AccordionTrigger>
                    <AccordionContent>
                      If you're between sizes, we generally recommend sizing up for a more comfortable fit. You can also
                      check the product reviews for fit feedback from other customers, or contact our customer service
                      for personalized sizing advice.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fit-questions">
                    <AccordionTrigger>How do I know if an item will fit me?</AccordionTrigger>
                    <AccordionContent>
                      Each product page includes detailed measurements and fit information. We also provide size charts
                      and customer reviews that often mention fit. If you're unsure, our customer service team can help
                      with sizing recommendations.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="size-exchange">
                    <AccordionTrigger>Can I exchange for a different size if it doesn't fit?</AccordionTrigger>
                    <AccordionContent>
                      We offer free size exchanges within 30 days. The item must be in original condition with tags
                      attached. Simply follow our return process and specify that you'd like a size exchange.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Account & Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Account & Payment</CardTitle>
                <CardDescription>Questions about your account and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="create-account">
                    <AccordionTrigger>Do I need an account to place an order?</AccordionTrigger>
                    <AccordionContent>
                      While you can checkout as a guest, creating an account allows you to track orders, save items to
                      your wishlist, manage returns, and enjoy a faster checkout experience for future purchases.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="payment-methods">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple
                      Pay, Google Pay, and StyleHub gift cards. All payments are processed securely through encrypted
                      connections.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="forgot-password">
                    <AccordionTrigger>I forgot my password. How can I reset it?</AccordionTrigger>
                    <AccordionContent>
                      On the login page, click "Forgot Password" and enter your email address. We'll send you a link to
                      reset your password. If you don't receive the email within a few minutes, check your spam folder.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="update-info">
                    <AccordionTrigger>How do I update my account information?</AccordionTrigger>
                    <AccordionContent>
                      Log into your account and go to "Profile" to update your personal information, shipping addresses,
                      and payment methods. Changes are saved automatically when you click "Save Changes."
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="gift-cards">
                    <AccordionTrigger>Do you offer gift cards?</AccordionTrigger>
                    <AccordionContent>
                      Yes! StyleHub gift cards are available in various denominations and can be purchased online. They
                      never expire and can be used for any purchase on our website. Gift cards are delivered via email.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
                <CardDescription>Questions about our products and quality</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="product-care">
                    <AccordionTrigger>How should I care for my StyleHub items?</AccordionTrigger>
                    <AccordionContent>
                      Care instructions are included on the product tags and in the product description. Generally, we
                      recommend following the care label instructions. For specific care questions, you can contact our
                      customer service team.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="product-quality">
                    <AccordionTrigger>What is your quality guarantee?</AccordionTrigger>
                    <AccordionContent>
                      We stand behind the quality of our products. If you receive a defective item or one that doesn't
                      meet our quality standards, we'll gladly replace it or provide a full refund within 30 days of
                      purchase.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="restock">
                    <AccordionTrigger>When will out-of-stock items be restocked?</AccordionTrigger>
                    <AccordionContent>
                      Restock dates vary by item. You can sign up for restock notifications on the product page to be
                      notified when an item becomes available again. Popular items are typically restocked within 2-4
                      weeks.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="product-materials">
                    <AccordionTrigger>What materials are your products made from?</AccordionTrigger>
                    <AccordionContent>
                      Material information is listed in each product description. We use high-quality fabrics including
                      cotton, silk, wool, and sustainable materials. If you have specific material questions or
                      allergies, please contact customer service.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Still Need Help */}
          <Card>
            <CardContent className="pt-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our customer service team is available to help with any questions not covered here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" className="bg-transparent" asChild>
                  <Link href="/support">Visit Support Center</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
