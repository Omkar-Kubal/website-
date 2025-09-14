"use client"

import { useState } from "react"
import { Search, Filter, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"

interface SearchFilters {
  query: string
  category: string
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  brands: string[]
  rating: number
  onSale: boolean
  sortBy: string
}

export function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const { searchHistory, addToSearchHistory, clearSearchHistory } = useStore()
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "All Categories",
    priceRange: [0, 500],
    sizes: [],
    colors: [],
    brands: [],
    rating: 0,
    onSale: false,
    sortBy: "relevance",
  })

  const categories = [
    "Men's Tops",
    "Men's Bottoms",
    "Women's Tops",
    "Women's Bottoms",
    "Women's Dresses",
    "Accessories",
  ]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = ["Black", "White", "Gray", "Navy", "Brown", "Beige", "Red", "Blue", "Green"]
  const brands = ["Nike", "Adidas", "Zara", "H&M", "Uniqlo", "Gap"]

  const handleSearch = () => {
    if (filters.query.trim()) {
      addToSearchHistory(filters.query)
    }
    // Implement search logic here
    setIsOpen(false)
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleArrayFilterToggle = (key: "sizes" | "colors" | "brands", value: string) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    handleFilterChange(key, newArray)
  }

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "All Categories",
      priceRange: [0, 500],
      sizes: [],
      colors: [],
      brands: [],
      rating: 0,
      onSale: false,
      sortBy: "relevance",
    })
  }

  const activeFiltersCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === "query" || key === "sortBy") return count
    if (key === "priceRange" && (value[0] !== 0 || value[1] !== 500)) return count + 1
    if (Array.isArray(value) && value.length > 0) return count + 1
    if (typeof value === "boolean" && value) return count + 1
    if (typeof value === "string" && value) return count + 1
    if (typeof value === "number" && value > 0) return count + 1
    return count
  }, 0)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <Filter className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-black text-white">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Advanced Search
            </span>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Query */}
          <div className="space-y-2">
            <Label htmlFor="search-query">Search</Label>
            <Input
              id="search-query"
              placeholder="Search products..."
              value={filters.query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
            />
            {searchHistory.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Recent searches
                  </span>
                  <Button variant="ghost" size="sm" onClick={clearSearchHistory}>
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {searchHistory.map((query, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleFilterChange("query", query)}
                    >
                      {query}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Categories">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange("priceRange", value)}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <Label>Sizes</Label>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onCheckedChange={() => handleArrayFilterToggle("sizes", size)}
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <Label>Colors</Label>
            <div className="grid grid-cols-3 gap-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={() => handleArrayFilterToggle("colors", color)}
                  />
                  <Label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-2">
            <Label>Brands</Label>
            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => handleArrayFilterToggle("brands", brand)}
                  />
                  <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Minimum Rating</Label>
            <Select
              value={filters.rating.toString()}
              onValueChange={(value) => handleFilterChange("rating", Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Any rating</SelectItem>
                <SelectItem value="1">1+ stars</SelectItem>
                <SelectItem value="2">2+ stars</SelectItem>
                <SelectItem value="3">3+ stars</SelectItem>
                <SelectItem value="4">4+ stars</SelectItem>
                <SelectItem value="5">5 stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* On Sale */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={filters.onSale}
              onCheckedChange={(checked) => handleFilterChange("onSale", checked)}
            />
            <Label htmlFor="on-sale" className="cursor-pointer">
              On Sale Only
            </Label>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSearch} className="flex-1">
            Search Products
          </Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
