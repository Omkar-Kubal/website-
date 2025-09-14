import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { AIAssistantWidget } from "@/components/ai-assistant-widget"

export default function WomenPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 parallax-hero">
          <div className="container mx-auto text-center parallax-layer">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">Women's Collection</h1>
            <p
              className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Elegant designs and timeless pieces for the confident woman
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent -z-10"></div>
        </section>

        {/* Products Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-64 animate-slide-in-left">
                <ProductFilters category="women" />
              </aside>
              <div className="flex-1 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <ProductGrid category="women" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistantWidget />
    </div>
  )
}
