"use client"

import { useRef } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

function ClothingMesh({ clothingType }: { clothingType: string }) {
  const meshRef = useRef<any>()

  const getClothingGeometry = () => {
    switch (clothingType) {
      case "shirt":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2, 2.5, 0.2]} />
              <meshStandardMaterial color="#4f46e5" roughness={0.3} />
            </mesh>
            <mesh position={[-1.2, 0.5, 0]}>
              <boxGeometry args={[0.8, 1.5, 0.2]} />
              <meshStandardMaterial color="#4f46e5" roughness={0.3} />
            </mesh>
            <mesh position={[1.2, 0.5, 0]}>
              <boxGeometry args={[0.8, 1.5, 0.2]} />
              <meshStandardMaterial color="#4f46e5" roughness={0.3} />
            </mesh>
            <mesh position={[0, 1, 0.1]}>
              <boxGeometry args={[0.8, 0.3, 0.1]} />
              <meshStandardMaterial color="#3730a3" roughness={0.3} />
            </mesh>
          </group>
        )
      case "pants":
        return (
          <group>
            <mesh position={[0, 1, 0]}>
              <boxGeometry args={[1.5, 0.3, 0.2]} />
              <meshStandardMaterial color="#1f2937" roughness={0.6} />
            </mesh>
            <mesh position={[-0.4, -0.5, 0]}>
              <boxGeometry args={[0.6, 2.5, 0.2]} />
              <meshStandardMaterial color="#1f2937" roughness={0.6} />
            </mesh>
            <mesh position={[0.4, -0.5, 0]}>
              <boxGeometry args={[0.6, 2.5, 0.2]} />
              <meshStandardMaterial color="#1f2937" roughness={0.6} />
            </mesh>
          </group>
        )
      case "dress":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <coneGeometry args={[1.5, 3, 8]} />
              <meshStandardMaterial color="#ec4899" roughness={0.2} />
            </mesh>
            <mesh position={[-1, 1, 0]}>
              <sphereGeometry args={[0.3]} />
              <meshStandardMaterial color="#ec4899" roughness={0.2} />
            </mesh>
            <mesh position={[1, 1, 0]}>
              <sphereGeometry args={[0.3]} />
              <meshStandardMaterial color="#ec4899" roughness={0.2} />
            </mesh>
          </group>
        )
      case "jacket":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.2, 2.8, 0.3]} />
              <meshStandardMaterial color="#059669" roughness={0.4} />
            </mesh>
            <mesh position={[-1.3, 0.3, 0]}>
              <boxGeometry args={[0.9, 1.8, 0.3]} />
              <meshStandardMaterial color="#059669" roughness={0.4} />
            </mesh>
            <mesh position={[1.3, 0.3, 0]}>
              <boxGeometry args={[0.9, 1.8, 0.3]} />
              <meshStandardMaterial color="#059669" roughness={0.4} />
            </mesh>
            <mesh position={[0, 1.2, 0.15]}>
              <boxGeometry args={[1, 0.4, 0.1]} />
              <meshStandardMaterial color="#047857" roughness={0.4} />
            </mesh>
          </group>
        )
      case "sweater":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2, 2.3, 0.4]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.8} />
            </mesh>
            <mesh position={[-1.2, 0.2, 0]}>
              <boxGeometry args={[0.8, 1.8, 0.4]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.8} />
            </mesh>
            <mesh position={[1.2, 0.2, 0]}>
              <boxGeometry args={[0.8, 1.8, 0.4]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.8} />
            </mesh>
            {Array.from({ length: 10 }).map((_, i) => (
              <mesh key={i} position={[0, 1 - i * 0.2, 0.21]}>
                <boxGeometry args={[2, 0.05, 0.02]} />
                <meshStandardMaterial color="#d97706" roughness={0.8} />
              </mesh>
            ))}
          </group>
        )
      case "skirt":
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <coneGeometry args={[1.2, 2, 8]} />
              <meshStandardMaterial color="#7c3aed" roughness={0.3} />
            </mesh>
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 0.2]} />
              <meshStandardMaterial color="#5b21b6" roughness={0.3} />
            </mesh>
          </group>
        )
      default:
        return null
    }
  }

  return (
    <group ref={meshRef} rotation={[0, Math.PI / 6, 0]}>
      {getClothingGeometry()}
    </group>
  )
}

const clothingItems = [
  {
    id: 1,
    type: "shirt",
    name: "Premium Cotton Shirt",
    price: "$89",
    originalPrice: "$120",
    rating: 4.8,
    reviews: 124,
    description:
      "Crafted from 100% organic cotton with a modern slim fit. Perfect for both casual and professional settings.",
    features: ["100% Organic Cotton", "Wrinkle Resistant", "Moisture Wicking", "Easy Care"],
    colors: ["Blue", "White", "Black", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    sustainability: "Made with sustainable practices and eco-friendly dyes",
    category: "Men's Shirts",
    imageUrl: "https://image.hm.com/assets/hm/f1/54/f1549b8f527a77d3c501f31d4d3b27780ba82823.jpg?imwidth=384",
  },
  {
    id: 2,
    type: "pants",
    name: "Tailored Chino Pants",
    price: "$95",
    originalPrice: "$130",
    rating: 4.6,
    reviews: 89,
    description:
      "Classic chino pants with a contemporary fit. Made from premium cotton blend for comfort and durability.",
    features: ["Cotton Blend", "Stretch Fabric", "Reinforced Seams", "Fade Resistant"],
    colors: ["Khaki", "Navy", "Black", "Olive"],
    sizes: ["28", "30", "32", "34", "36", "38", "40"],
    sustainability: "Responsibly sourced materials with water-saving production",
    category: "Men's Pants",
    imageUrl: "https://image.hm.com/assets/hm/5c/36/5c3681d04de50dbc60a801bc9eb37614e06fff76.jpg?imwidth=384",
  },
  {
    id: 3,
    type: "dress",
    name: "Elegant Midi Dress",
    price: "$145",
    originalPrice: "$195",
    rating: 4.9,
    reviews: 156,
    description:
      "Sophisticated midi dress perfect for special occasions. Features a flattering silhouette and premium fabric.",
    features: ["Premium Silk Blend", "Lined Interior", "Hidden Zipper", "Dry Clean Only"],
    colors: ["Rose", "Navy", "Black", "Emerald"],
    sizes: ["XS", "S", "M", "L", "XL"],
    sustainability: "Ethically made with sustainable silk production",
    category: "Women's Dresses",
    imageUrl: "https://image.hm.com/assets/hm/5b/ae/5baecce65aa694198e61e9ace2514e0e0f497079.jpg?imwidth=384",
  },
  {
    id: 4,
    type: "jacket",
    name: "Versatile Blazer Jacket",
    price: "$185",
    originalPrice: "$250",
    rating: 4.7,
    reviews: 92,
    description: "A versatile blazer that transitions seamlessly from office to evening. Tailored for a perfect fit.",
    features: ["Wool Blend", "Structured Shoulders", "Interior Pockets", "Professional Fit"],
    colors: ["Forest Green", "Navy", "Charcoal", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    sustainability: "Made from responsibly sourced wool with ethical manufacturing",
    category: "Women's Jackets",
    imageUrl: "https://image.hm.com/assets/hm/b3/ab/b3abf117b289954eb77743de13b759ba30a5f143.jpg?imwidth=384",
  },
//   {
//     id: 5,
//     type: "sweater",
//     name: "Cozy Knit Sweater",
//     price: "$75",
//     originalPrice: "$105",
//     rating: 4.5,
//     reviews: 203,
//     description: "Ultra-soft knit sweater perfect for layering. Made from sustainable materials for ultimate comfort.",
//     features: ["Merino Wool Blend", "Machine Washable", "Pill Resistant", "Soft Touch"],
//     colors: ["Mustard", "Cream", "Forest", "Burgundy"],
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     sustainability: "Made from ethically sourced merino wool",
//     category: "Unisex Sweaters",
//     imageUrl: "/images/knit-sweater.jpg",
//   },
//   {
//     id: 6,
//     type: "skirt",
//     name: "A-Line Midi Skirt",
//     price: "$68",
//     originalPrice: "$95",
//     rating: 4.4,
//     reviews: 78,
//     description: "Classic A-line midi skirt with a modern twist. Perfect for both casual and formal occasions.",
//     features: ["Stretch Waistband", "Side Pockets", "Wrinkle Free", "Easy Care"],
//     colors: ["Purple", "Black", "Navy", "Camel"],
//     sizes: ["XS", "S", "M", "L", "XL"],
//     sustainability: "Made with recycled polyester and sustainable practices",
//     category: "Women's Skirts",
//     imageUrl: "/images/midi-skirt.jpg",
//   },
]

export default function ExplorePage() {
  const [selectedItem, setSelectedItem] = useState(clothingItems[0])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium clothing collection featuring high-quality materials, sustainable practices, and
            timeless designs.
          </p>
        </div>

        <div className="space-y-8">
          {clothingItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left side: Clothing Image */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="h-80 w-full overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Right side: Product Information */}
                <div className="p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                          <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {item.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">🌱 Sustainability</h4>
                      <p className="text-sm text-green-700">{item.sustainability}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}