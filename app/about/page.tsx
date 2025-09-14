import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Heart, Users, Leaf, Award } from "lucide-react"

export default function AboutPage() {
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
            <h1 className="text-2xl md:text-3xl font-bold">About StyleHub</h1>
            <p className="text-muted-foreground">Discover our story and mission</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Your Destination for Premium Fashion</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  At StyleHub, we believe that fashion is more than just clothing—it's a form of self-expression that
                  empowers you to show the world who you are.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Our Story */}
          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
              <CardDescription>How StyleHub came to be</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Founded in 2020, StyleHub began with a simple vision: to make premium fashion accessible to everyone.
                Our founders, passionate about both style and sustainability, noticed a gap in the market for
                high-quality, ethically-made clothing that didn't compromise on design or affordability.
              </p>
              <p className="text-muted-foreground">
                What started as a small online boutique has grown into a trusted fashion destination, serving customers
                across the globe. We've built our reputation on carefully curated collections, exceptional customer
                service, and a commitment to sustainable practices.
              </p>
              <p className="text-muted-foreground">
                Today, StyleHub continues to evolve, always staying true to our core mission: helping you discover your
                perfect style while making a positive impact on the world.
              </p>
            </CardContent>
          </Card>

          {/* Our Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Quality First</CardTitle>
                    <CardDescription>Premium materials and craftsmanship</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We partner with skilled artisans and trusted manufacturers to ensure every piece meets our high
                  standards for quality, durability, and comfort.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Leaf className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Sustainability</CardTitle>
                    <CardDescription>Responsible fashion for a better future</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We're committed to sustainable practices, from eco-friendly materials to ethical manufacturing
                  processes and minimal packaging.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Customer-Centric</CardTitle>
                    <CardDescription>Your satisfaction is our priority</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  From our easy return policy to personalized styling advice, everything we do is designed to make your
                  shopping experience exceptional.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg">Innovation</CardTitle>
                    <CardDescription>Always evolving and improving</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We embrace new technologies and trends to continuously improve our products, services, and customer
                  experience.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Our Mission */}
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>What drives us every day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-6 text-center">
                <p className="text-lg font-medium mb-4">
                  "To empower individuals to express their unique style through premium, sustainable fashion while
                  building a more conscious and inclusive fashion industry."
                </p>
                <p className="text-sm text-muted-foreground">
                  This mission guides every decision we make, from the brands we partner with to the customer service we
                  provide.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Our Team */}
          <Card>
            <CardHeader>
              <CardTitle>Our Team</CardTitle>
              <CardDescription>The people behind StyleHub</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                StyleHub is powered by a diverse team of fashion enthusiasts, sustainability advocates, and customer
                service experts. From our buyers who travel the world to discover the latest trends, to our customer
                service team who's always ready to help, every team member is passionate about fashion and committed to
                your satisfaction.
              </p>
              <p className="text-muted-foreground">
                We believe that diverse perspectives make us stronger, and we're proud to foster an inclusive workplace
                where creativity and innovation thrive.
              </p>
            </CardContent>
          </Card>

          {/* Sustainability Commitment */}
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Commitment</CardTitle>
              <CardDescription>Our promise to the planet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">50%</div>
                  <p className="text-sm text-muted-foreground">of our products use sustainable materials</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">100%</div>
                  <p className="text-sm text-muted-foreground">plastic-free packaging by 2025</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">25%</div>
                  <p className="text-sm text-muted-foreground">reduction in carbon footprint since 2020</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                We're continuously working to reduce our environmental impact through sustainable sourcing, responsible
                manufacturing, and innovative packaging solutions. Our goal is to prove that fashion can be both
                beautiful and environmentally conscious.
              </p>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card>
            <CardContent className="pt-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-6">
                Have questions about our story, values, or products? We'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
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
