import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-lg text-gray-600">Last updated: December 2024</p>
          </div>

          <div className="space-y-8">
            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  By accessing and using StyleHub's website and services, you accept and agree to be bound by the terms
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Use License</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Permission is granted to temporarily download one copy of the materials on StyleHub's website for
                  personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                  title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We strive to provide accurate product information, including descriptions, prices, and availability.
                  However, we do not warrant that product descriptions or other content is accurate, complete, reliable,
                  current, or error-free. Colors may vary due to monitor settings and lighting conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Orders and Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  By placing an order, you represent that you are authorized to use the payment method and that all
                  information provided is accurate. We reserve the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Refuse or cancel any order for any reason</li>
                  <li>Limit quantities available for purchase</li>
                  <li>Verify payment information before processing orders</li>
                  <li>Modify or discontinue products without notice</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Shipping and Returns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Shipping times and costs vary by location and shipping method selected. Please refer to our shipping
                  and returns policy for detailed information about delivery times, costs, and return procedures.
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  In no event shall StyleHub or its suppliers be liable for any damages (including, without limitation,
                  damages for loss of data or profit, or due to business interruption) arising out of the use or
                  inability to use the materials on StyleHub's website, even if StyleHub or an authorized representative
                  has been notified orally or in writing of the possibility of such damage.
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm bg-white/80 border-white/20">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  If you have any questions about these Terms and Conditions, please contact us at legal@stylehub.com or
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
