import { Header } from "@/components/header"
import { AccountPage } from "@/components/account-page"
import { Footer } from "@/components/footer"

export default function Account() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AccountPage />
      </main>
      <Footer />
    </div>
  )
}
