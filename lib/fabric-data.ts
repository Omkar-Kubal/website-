"use client"

export interface Fabric {
  id: string
  name: string
  description: string
  season: string[]
  bestFor: string[]
  styles: string[]
  colors: string[]
  careInstructions: string[]
  weight: "light" | "medium" | "heavy"
  stretch: "none" | "minimal" | "moderate" | "high"
  breathability: "low" | "medium" | "high"
  durability: "low" | "medium" | "high"
}

// Sample fabric data
const fabrics: Fabric[] = [
  {
    id: "cotton",
    name: "Cotton",
    description: "A soft, natural fiber that's breathable and comfortable against the skin.",
    season: ["Spring", "Summer", "Fall"],
    bestFor: ["Everyday wear", "T-shirts", "Underwear"],
    styles: ["Casual", "Sportswear", "Loungewear"],
    colors: ["All colors"],
    careInstructions: ["Machine washable", "Tumble dry low"],
    weight: "medium",
    stretch: "minimal",
    breathability: "high",
    durability: "medium"
  },
  {
    id: "linen",
    name: "Linen",
    description: "A lightweight, breathable fabric made from flax fibers, perfect for hot weather.",
    season: ["Summer"],
    bestFor: ["Summer clothing", "Beach wear", "Warm weather"],
    styles: ["Casual", "Resort wear", "Summer formal"],
    colors: ["Neutrals", "Pastels", "White", "Beige"],
    careInstructions: ["Machine wash gentle", "Air dry", "May wrinkle easily"],
    weight: "light",
    stretch: "none",
    breathability: "high",
    durability: "medium"
  },
  {
    id: "wool",
    name: "Wool",
    description: "A natural insulator that keeps you warm even when wet, ideal for cold weather clothing.",
    season: ["Fall", "Winter"],
    bestFor: ["Sweaters", "Coats", "Cold weather"],
    styles: ["Formal", "Outerwear", "Winter casual"],
    colors: ["Dark colors", "Neutrals", "Earth tones"],
    careInstructions: ["Dry clean recommended", "Hand wash cold", "Lay flat to dry"],
    weight: "heavy",
    stretch: "minimal",
    breathability: "medium",
    durability: "high"
  },
  {
    id: "silk",
    name: "Silk",
    description: "A luxurious, smooth fabric with a beautiful drape and natural sheen.",
    season: ["All seasons"],
    bestFor: ["Formal wear", "Blouses", "Dresses", "Scarves"],
    styles: ["Formal", "Elegant", "Luxury"],
    colors: ["Jewel tones", "Pastels", "Neutrals"],
    careInstructions: ["Dry clean recommended", "Hand wash cold", "Air dry"],
    weight: "light",
    stretch: "none",
    breathability: "medium",
    durability: "low"
  },
  {
    id: "polyester",
    name: "Polyester",
    description: "A durable, wrinkle-resistant synthetic fabric that dries quickly.",
    season: ["All seasons"],
    bestFor: ["Activewear", "Outdoor clothing", "Everyday wear"],
    styles: ["Casual", "Sportswear", "Athleisure"],
    colors: ["All colors", "Bright colors", "Prints"],
    careInstructions: ["Machine washable", "Tumble dry low"],
    weight: "medium",
    stretch: "moderate",
    breathability: "low",
    durability: "high"
  },
  {
    id: "denim",
    name: "Denim",
    description: "A sturdy cotton twill fabric known for its use in jeans and other rugged clothing.",
    season: ["All seasons"],
    bestFor: ["Jeans", "Jackets", "Casual wear"],
    styles: ["Casual", "Workwear", "Americana"],
    colors: ["Blue", "Black", "Gray", "White"],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Wash inside out"],
    weight: "heavy",
    stretch: "minimal",
    breathability: "medium",
    durability: "high"
  }
];

/**
 * Search for fabrics based on a query string
 * @param query The search query
 * @returns Array of matching fabrics
 */
export function searchFabrics(query: string): Fabric[] {
  if (!query || query.trim() === "") {
    return [];
  }
  
  const lowerQuery = query.toLowerCase();
  
  return fabrics.filter(fabric => {
    // Check if query matches any fabric property
    return (
      fabric.name.toLowerCase().includes(lowerQuery) ||
      fabric.description.toLowerCase().includes(lowerQuery) ||
      fabric.season.some(s => s.toLowerCase().includes(lowerQuery)) ||
      fabric.bestFor.some(b => b.toLowerCase().includes(lowerQuery)) ||
      fabric.styles.some(s => s.toLowerCase().includes(lowerQuery)) ||
      fabric.colors.some(c => c.toLowerCase().includes(lowerQuery)) ||
      fabric.weight.toLowerCase().includes(lowerQuery) ||
      fabric.stretch.toLowerCase().includes(lowerQuery) ||
      fabric.breathability.toLowerCase().includes(lowerQuery) ||
      fabric.durability.toLowerCase().includes(lowerQuery)
    );
  });
}