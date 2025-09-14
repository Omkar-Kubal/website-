"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Footer } from "@/components/footer"

export interface FilterState {
  priceRange: [number, number]
  selectedCategories: string[]
  selectedSizes: string[]
  selectedColors: string[]
  searchTerm: string
  sortBy: string
}

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    selectedCategories: [],
    selectedSizes: [],
    selectedColors: [],
    searchTerm: "",
    sortBy: "featured"
  })

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-muted-foreground">Discover our complete collection of premium fashion</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters 
              filters={filters} 
              updateFilters={updateFilters} 
            />
          </aside>
          <div className="flex-1">
            <ProductGrid 
              filters={filters}
              updateFilters={updateFilters}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
