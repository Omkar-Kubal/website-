"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

interface ProductFiltersProps {
  category?: string
}

export function ProductFilters({ category }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

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
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

  const clearFilters = () => {
    setPriceRange([0, 500])
    setSelectedCategories([])
    setSelectedSizes([])
    setSelectedColors([])
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
                <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground font-medium">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
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
                      checked={selectedCategories.includes(cat.id)}
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
                      checked={selectedSizes.includes(size)}
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
                      checked={selectedColors.includes(color.name)}
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
