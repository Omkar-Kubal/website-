import { Header } from "@/components/header"
import { OrdersPage } from "@/components/orders-page"
import { Footer } from "@/components/footer"

export default function Orders() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <OrdersPage />
      </main>
      <Footer />
    </div>
  )
}