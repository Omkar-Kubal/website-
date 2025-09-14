"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isOnSale: boolean
  rating: number
  reviews: number
  description?: string
  sizes?: string[]
  colors?: string[]
  brand?: string
  material?: string
  careInstructions?: string[]
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface WishlistItem extends Product {}

export interface Review {
  id: string
  productId: number
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
  helpful: number
  verified: boolean
}

export interface Order {
  id: string
  date: Date
  status: string
  items: CartItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    apartment?: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: string
}

interface StoreState {
  // Cart
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void
  removeFromCart: (productId: number) => void
  updateCartItemQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemsCount: () => number

  // Wishlist
  wishlistItems: WishlistItem[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void

  // Keep in Closet
  closetItems: WishlistItem[]
  addToCloset: (product: Product) => void
  removeFromCloset: (productId: number) => void
  isInCloset: (productId: number) => boolean
  clearCloset: () => void

  // Product Comparison
  compareItems: Product[]
  addToCompare: (product: Product) => void
  removeFromCompare: (productId: number) => void
  isInCompare: (productId: number) => boolean
  clearCompare: () => void

  // Reviews
  reviews: Review[]
  addReview: (review: Omit<Review, "id" | "createdAt" | "helpful">) => void
  markReviewHelpful: (reviewId: string) => void
  getProductReviews: (productId: number) => Review[]

  // Recently Viewed
  recentlyViewed: Product[]
  addToRecentlyViewed: (product: Product) => void

  // Search History
  searchHistory: string[]
  addToSearchHistory: (query: string) => void
  clearSearchHistory: () => void

  // Orders
  orders: Order[]
  createOrder: (orderData: Omit<Order, "id" | "date" | "status">) => string
  getOrder: (orderId: string) => Order | undefined
  getAllOrders: () => Order[]
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cartItems: [],

      addToCart: (product, quantity = 1, size, color) => {
        const existingItem = get().cartItems.find(
          (item) => item.id === product.id && item.selectedSize === size && item.selectedColor === color,
        )

        if (existingItem) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === product.id && item.selectedSize === size && item.selectedColor === color
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          })
        } else {
          set({
            cartItems: [...get().cartItems, { ...product, quantity, selectedSize: size, selectedColor: color }],
          })
        }
      },

      removeFromCart: (productId) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== productId),
        })
      },

      updateCartItemQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }

        set({
          cartItems: get().cartItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => set({ cartItems: [] }),

      getCartTotal: () => {
        return get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getCartItemsCount: () => {
        return get().cartItems.reduce((count, item) => count + item.quantity, 0)
      },

      // Wishlist state
      wishlistItems: [],

      addToWishlist: (product) => {
        if (!get().isInWishlist(product.id)) {
          set({
            wishlistItems: [...get().wishlistItems, product],
          })
        }
      },

      removeFromWishlist: (productId) => {
        set({
          wishlistItems: get().wishlistItems.filter((item) => item.id !== productId),
        })
      },

      isInWishlist: (productId) => {
        return get().wishlistItems.some((item) => item.id === productId)
      },

      clearWishlist: () => set({ wishlistItems: [] }),

      // Keep in Closet state
      closetItems: [],

      addToCloset: (product) => {
        if (!get().isInCloset(product.id)) {
          set({
            closetItems: [...get().closetItems, product],
          })
        }
      },

      removeFromCloset: (productId) => {
        set({
          closetItems: get().closetItems.filter((item) => item.id !== productId),
        })
      },

      isInCloset: (productId) => {
        return get().closetItems.some((item) => item.id === productId)
      },

      clearCloset: () => set({ closetItems: [] }),

      // Product Comparison state
      compareItems: [],

      addToCompare: (product) => {
        const currentItems = get().compareItems
        if (currentItems.length >= 4) {
          return // Limit to 4 items for comparison
        }
        if (!get().isInCompare(product.id)) {
          set({
            compareItems: [...currentItems, product],
          })
        }
      },

      removeFromCompare: (productId) => {
        set({
          compareItems: get().compareItems.filter((item) => item.id !== productId),
        })
      },

      isInCompare: (productId) => {
        return get().compareItems.some((item) => item.id === productId)
      },

      clearCompare: () => set({ compareItems: [] }),

      // Reviews state
      reviews: [],

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          helpful: 0,
        }
        set({
          reviews: [...get().reviews, newReview],
        })
      },

      markReviewHelpful: (reviewId) => {
        set({
          reviews: get().reviews.map((review) =>
            review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review,
          ),
        })
      },

      getProductReviews: (productId) => {
        return get().reviews.filter((review) => review.productId === productId)
      },

      // Recently Viewed state
      recentlyViewed: [],

      addToRecentlyViewed: (product) => {
        const currentItems = get().recentlyViewed
        const filteredItems = currentItems.filter((item) => item.id !== product.id)
        const newItems = [product, ...filteredItems].slice(0, 10) // Keep last 10 items
        set({ recentlyViewed: newItems })
      },

      // Search History state
      searchHistory: [],

      addToSearchHistory: (query) => {
        if (!query.trim()) return
        const currentHistory = get().searchHistory
        const filteredHistory = currentHistory.filter((item) => item !== query)
        const newHistory = [query, ...filteredHistory].slice(0, 10) // Keep last 10 searches
        set({ searchHistory: newHistory })
      },

      clearSearchHistory: () => set({ searchHistory: [] }),

      // Orders state
      orders: [],

      createOrder: (orderData) => {
        const orderId = Math.random().toString(36).substr(2, 9);
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          date: new Date(),
          status: "Processing"
        };
        
        set({
          orders: [...get().orders, newOrder],
          cartItems: [] // Clear cart after order is created
        });
        
        return orderId;
      },

      getOrder: (orderId) => {
        return get().orders.find(order => order.id === orderId);
      },

      getAllOrders: () => {
        return get().orders;
      },
    }),
    {
      name: "ecommerce-store",
      partialize: (state) => ({
        cartItems: state.cartItems,
        orders: state.orders,
        wishlistItems: state.wishlistItems,
        closetItems: state.closetItems,
        compareItems: state.compareItems,
        reviews: state.reviews,
        recentlyViewed: state.recentlyViewed,
        searchHistory: state.searchHistory,
      }),
    },
  ),
)
