import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We collect information you provide directly to us, such as when you create an account, make a
                  purchase, or contact us for support. This may include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Payment information (credit card details, billing address)</li>
                  <li>Shipping information (delivery address)</li>
                  <li>Account preferences and settings</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about your account and orders</li>
                  <li>Provide customer support</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Improve our products and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your
                  consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>With service providers who assist us in operating our website and conducting business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                  is 100% secure.
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your personal information</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  If you have any questions about this Privacy Policy, please contact us at privacy@stylehub.com or
                  through our contact page.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
