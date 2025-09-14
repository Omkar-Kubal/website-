import { Header } from "@/components/header"
import { OrderDetailPage } from "@/components/order-detail-page"
import { Footer } from "@/components/footer"

export default function OrderDetail({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <OrderDetailPage orderId={params.id} />
      </main>
      <Footer />
    </div>
  )
}