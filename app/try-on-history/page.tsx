import { Header } from "@/components/header"
import { TryOnHistoryPage } from "@/components/try-on-history-page"
import { Footer } from "@/components/footer"

export default function TryOnHistory() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TryOnHistoryPage />
      </main>
      <Footer />
    </div>
  )
}
