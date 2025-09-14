"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock product data - in a real app, this would come from an API
const allProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    originalPrice: 69.99,
    image: "/premium-white-cotton-t-shirt-on-model.jpg",
    category: "Men's Tops",
    isOnSale: true,
    rating: 4.8,
    reviews: 124,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Gray"],
  },
  {
    id: 2,
    name: "Elegant Midi Dress",
    price: 129.99,
    image: "/elegant-black-midi-dress-on-model.jpg",
    category: "Women's Dresses",
    isOnSale: false,
    rating: 4.9,
    reviews: 89,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy"],
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: 89.99,
    image: "/classic-blue-denim-jacket-on-model.jpg",
    category: "Men's Tops",
    isOnSale: false,
    rating: 4.7,
    reviews: 156,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Blue", "Black"],
  },
  {
    id: 4,
    name: "Silk Blouse",
    price: 79.99,
    originalPrice: 99.99,
    image: "/elegant-silk-blouse-on-model.jpg",
    category: "Women's Tops",
    isOnSale: true,
    rating: 4.6,
    reviews: 73,
    sizes: ["XS", "S", "M"],
    colors: ["White", "Beige"],
  },
  {
    id: 5,
    name: "Leather Handbag",
    price: 199.99,
    image: "/luxury-leather-handbag.jpg",
    category: "Accessories",
    isOnSale: false,
    rating: 4.8,
    reviews: 92,
    sizes: [],
    colors: ["Brown", "Black"],
  },
  {
    id: 6,
    name: "Wool Sweater",
    price: 89.99,
    image: "/cozy-wool-sweater-on-model.jpg",
    category: "Women's Tops",
    isOnSale: false,
    rating: 4.5,
    reviews: 67,
    sizes: ["S", "M", "L"],
    colors: ["Gray", "Navy", "Beige"],
  },
]

import { FilterState } from "@/app/products/page"

interface ProductGridProps {
  category?: string
  filters: FilterState
  updateFilters: (filters: Partial<FilterState>) => void
}

export function ProductGrid({ category, filters, updateFilters }: ProductGridProps) {
  const [products] = useState(allProducts)

  // Apply all filters
  let filteredProducts = products
  
  // Filter by search term
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase()
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) || 
      product.category.toLowerCase().includes(searchLower)
    )
  }
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter((product) => {
      if (category === "men") return product.category.toLowerCase().includes("men")
      if (category === "women") return product.category.toLowerCase().includes("women")
      if (category === "accessories") return product.category.toLowerCase().includes("accessories")
      return true
    })
  }
  
  // Filter by selected categories
  if (filters.selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      // Map product categories to match the filter categories format
      const productCategoryId = product.category.toLowerCase().replace(/[^a-z0-9]/g, '-')
      return filters.selectedCategories.some(cat => {
        // Check if the category matches or is a parent category
        if (cat === 'mens-tops' || cat === 'mens-bottoms') {
          return product.category.toLowerCase().includes('men')
        }
        if (cat === 'womens-tops' || cat === 'womens-bottoms' || cat === 'womens-dresses') {
          return product.category.toLowerCase().includes('women')
        }
        return productCategoryId.includes(cat)
      })
    })
  }
  
  // Filter by price range
  filteredProducts = filteredProducts.filter(product => 
    product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
  )
  
  // Filter by sizes
  if (filters.selectedSizes.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      // If the product has sizes, check if any of the selected sizes match
      product.sizes && product.sizes.some(size => filters.selectedSizes.includes(size))
    )
  }
  
  // Filter by colors
  if (filters.selectedColors.length > 0) {
    filteredProducts = filteredProducts.filter(product => 
      // If the product has colors, check if any of the selected colors match
      product.colors && product.colors.some(color => filters.selectedColors.includes(color))
    )
  }
  
  // Apply sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        // In a real app, you would sort by date
        return b.id - a.id
      default: // featured
        return 0
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8 p-4 glass rounded-xl backdrop-blur-xl">
        <p className="text-muted-foreground font-medium">Showing {filteredProducts.length} products</p>
        <Select 
          value={filters.sortBy} 
          onValueChange={(value) => updateFilters({ sortBy: value })}
        >
          <SelectTrigger className="w-48 glass border-white/20">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="glass backdrop-blur-xl">
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => (
          <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <Button
          variant="outline"
          size="lg"
          className="glass border-white/20 hover:glass-dark hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl px-8 py-3 bg-transparent"
        >
          Load More Products
        </Button>
      </div>
    </div>
  )
}
