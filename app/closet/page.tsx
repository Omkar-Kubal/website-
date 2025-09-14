import { Header } from "@/components/header"
import { ClosetPage } from "@/components/closet-page"
import { Footer } from "@/components/footer"

export default function Closet() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ClosetPage />
      </main>
      <Footer />
    </div>
  )
}
