"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface AdminProduct {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  isOnSale: boolean
  rating: number
  reviews: number
  stock: number
  description: string
  sizes: string[]
  colors: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  customerName: string
  customerEmail: string
  items: Array<{
    productId: number
    productName: string
    quantity: number
    price: number
    size?: string
    color?: string
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

export interface AdminStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  recentOrders: Order[]
  topProducts: AdminProduct[]
  salesData: Array<{ date: string; sales: number }>
}

interface AdminState {
  products: AdminProduct[]
  orders: Order[]
  stats: AdminStats

  // Product management
  addProduct: (product: Omit<AdminProduct, "id" | "createdAt" | "updatedAt">) => void
  updateProduct: (id: number, updates: Partial<AdminProduct>) => void
  deleteProduct: (id: number) => void
  toggleProductStatus: (id: number) => void

  // Order management
  updateOrderStatus: (orderId: string, status: Order["status"]) => void

  // Stats
  refreshStats: () => void
}

// Mock data
const mockProducts: AdminProduct[] = [
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
    stock: 50,
    description: "Premium quality cotton t-shirt with perfect fit and comfort.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy"],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    stock: 25,
    description: "Elegant midi dress perfect for any occasion.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Navy", "Burgundy"],
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "user1",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      {
        productId: 1,
        productName: "Premium Cotton T-Shirt",
        quantity: 2,
        price: 49.99,
        size: "L",
        color: "White",
      },
    ],
    total: 99.98,
    status: "processing",
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      products: mockProducts,
      orders: mockOrders,
      stats: {
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        recentOrders: [],
        topProducts: [],
        salesData: [],
      },

      addProduct: (productData) => {
        const newProduct: AdminProduct = {
          ...productData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set({ products: [...get().products, newProduct] })
        get().refreshStats()
      },

      updateProduct: (id, updates) => {
        set({
          products: get().products.map((product) =>
            product.id === id ? { ...product, ...updates, updatedAt: new Date().toISOString() } : product,
          ),
        })
        get().refreshStats()
      },

      deleteProduct: (id) => {
        set({
          products: get().products.filter((product) => product.id !== id),
        })
        get().refreshStats()
      },

      toggleProductStatus: (id) => {
        set({
          products: get().products.map((product) =>
            product.id === id
              ? { ...product, isActive: !product.isActive, updatedAt: new Date().toISOString() }
              : product,
          ),
        })
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((order) =>
            order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order,
          ),
        })
        get().refreshStats()
      },

      refreshStats: () => {
        const { products, orders } = get()
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
        const recentOrders = orders.slice(-5).reverse()
        const topProducts = products.slice(0, 5)

        // Mock sales data for the last 7 days
        const salesData = Array.from({ length: 7 }, (_, i) => {
          const date = new Date()
          date.setDate(date.getDate() - i)
          return {
            date: date.toISOString().split("T")[0],
            sales: Math.floor(Math.random() * 1000) + 500,
          }
        }).reverse()

        set({
          stats: {
            totalProducts: products.length,
            totalOrders: orders.length,
            totalRevenue,
            totalCustomers: new Set(orders.map((o) => o.userId)).size,
            recentOrders,
            topProducts,
            salesData,
          },
        })
      },
    }),
    {
      name: "admin-store",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.refreshStats()
        }
      },
    },
  ),
)
