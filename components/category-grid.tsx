import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Men's Collection",
    href: "/men",
    image: "/men-s-fashion-collection-with-suits-and-casual-wea.jpg",
    description: "Sophisticated styles for the modern gentleman",
  },
  {
    name: "Women's Collection",
    href: "/women",
    image: "/women-s-fashion-collection-with-dresses-and-elegan.jpg",
    description: "Elegant designs for every occasion",
  },
  {
    name: "Accessories",
    href: "/accessories",
    image: "/luxury-fashion-accessories-bags-watches-jewelry.jpg",
    description: "Complete your look with premium accessories",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our carefully curated collections designed for your lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href}>
              <Card
                className="group overflow-hidden border-0 glass hover:glass-dark shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${category.image}')` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 group-hover:from-black/40 group-hover:via-black/20 group-hover:to-transparent transition-all duration-500" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
                      <div className="glass-dark rounded-2xl p-6 backdrop-blur-xl transform group-hover:scale-105 transition-all duration-500">
                        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-balance">{category.name}</h3>
                        <p className="text-sm md:text-base opacity-90 leading-relaxed">{category.description}</p>
                        <div className="mt-4 inline-block px-4 py-2 bg-primary/20 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20">
                          Explore Collection
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
