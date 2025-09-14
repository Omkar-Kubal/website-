"use client"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Search } from "lucide-react"
import { FilterState } from "@/app/products/page"

interface ProductFiltersProps {
  category?: string
  filters: FilterState
  updateFilters: (filters: Partial<FilterState>) => void
}

export function ProductFilters({ category, filters, updateFilters }: ProductFiltersProps) {
  const categories = [
    { id: "mens-tops", label: "Men's Tops", count: 24 },
    { id: "mens-bottoms", label: "Men's Bottoms", count: 18 },
    { id: "womens-tops", label: "Women's Tops", count: 32 },
    { id: "womens-bottoms", label: "Women's Bottoms", count: 21 },
    { id: "womens-dresses", label: "Women's Dresses", count: 15 },
    { id: "accessories", label: "Accessories", count: 28 },
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Gray", value: "#808080" },
    { name: "Navy", value: "#000080" },
    { name: "Brown", value: "#8B4513" },
    { name: "Beige", value: "#F5F5DC" },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      updateFilters({ selectedCategories: [...filters.selectedCategories, categoryId] })
    } else {
      updateFilters({ 
        selectedCategories: filters.selectedCategories.filter((id) => id !== categoryId) 
      })
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      updateFilters({ selectedSizes: [...filters.selectedSizes, size] })
    } else {
      updateFilters({ 
        selectedSizes: filters.selectedSizes.filter((s) => s !== size) 
      })
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      updateFilters({ selectedColors: [...filters.selectedColors, color] })
    } else {
      updateFilters({ 
        selectedColors: filters.selectedColors.filter((c) => c !== color) 
      })
    }
  }

  const clearFilters = () => {
    updateFilters({
      priceRange: [0, 500],
      selectedCategories: [],
      selectedSizes: [],
      selectedColors: [],
      searchTerm: ""
    })
  }

  return (
    <div className="space-y-6 animate-slide-in-left">
      <div className="flex justify-between items-center p-4 glass rounded-xl backdrop-blur-xl">
        <h2 className="text-lg font-serif font-semibold">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="hover:scale-105 transition-transform duration-200"
        >
          Clear All
        </Button>
      </div>

      {/* Search */}
      <Card className="glass border-white/20 backdrop-blur-xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Search className="h-4 w-4 mr-2" />
            Search Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search products..."
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="glass border-white/20"
          />
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="glass border-white/20 backdrop-blur-xl">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors duration-200">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Price Range
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-4">
                <Slider 
                  value={filters.priceRange} 
                  onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })} 
                  max={500} 
                  step={10} 
                  className="w-full" 
                />
                <div className="flex justify-between text-sm text-muted-foreground font-medium">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Categories */}
      <Card className="glass border-white/20 backdrop-blur-xl">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors duration-200">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Categories
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-2 group">
                    <Checkbox
                      id={cat.id}
                      checked={filters.selectedCategories.includes(cat.id)}
                      onCheckedChange={(checked) => handleCategoryChange(cat.id, checked as boolean)}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <Label htmlFor={cat.id} className="text-sm flex-1 cursor-pointer font-medium">
                      {cat.label}
                    </Label>
                    <span className="text-xs text-muted-foreground">({cat.count})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Sizes */}
      <Card className="glass border-white/20 backdrop-blur-xl">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors duration-200">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Size
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2 group">
                    <Checkbox
                      id={size}
                      checked={filters.selectedSizes.includes(size)}
                      onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <Label htmlFor={size} className="text-sm cursor-pointer font-medium">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Colors */}
      <Card className="glass border-white/20 backdrop-blur-xl">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors duration-200">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                Color
                <ChevronDown className="h-4 w-4 transition-transform duration-200" />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-3">
                {colors.map((color) => (
                  <div key={color.name} className="flex items-center space-x-2 group">
                    <Checkbox
                      id={color.name}
                      checked={filters.selectedColors.includes(color.name)}
                      onCheckedChange={(checked) => handleColorChange(color.name, checked as boolean)}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                    <div
                      className="w-4 h-4 rounded-full border border-border group-hover:scale-110 transition-transform duration-200"
                      style={{ backgroundColor: color.value }}
                    />
                    <Label htmlFor={color.name} className="text-sm flex-1 cursor-pointer font-medium">
                      {color.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  )
}
