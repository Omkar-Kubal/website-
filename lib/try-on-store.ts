"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface UserMeasurements {
  height: number // in cm
  weight: number // in kg
  chest: number // in cm
  waist: number // in cm
  hips: number // in cm
  shoulderWidth: number // in cm
  preferredFit: "tight" | "regular" | "loose"
}

export interface SizeRecommendation {
  size: string
  confidence: number // 0-100
  fit: "tight" | "perfect" | "loose"
  reasons: string[]
}

export interface TryOnSession {
  id: string
  productId: number
  selectedSize: string
  selectedColor: string
  timestamp: string
  liked: boolean
  notes?: string
}

interface TryOnState {
  // User measurements
  userMeasurements: UserMeasurements | null
  setUserMeasurements: (measurements: UserMeasurements) => void

  // Size recommendations
  getSizeRecommendation: (productId: number, sizes: string[]) => SizeRecommendation[]

  // Try-on sessions
  tryOnSessions: TryOnSession[]
  addTryOnSession: (session: Omit<TryOnSession, "id" | "timestamp">) => void
  updateTryOnSession: (sessionId: string, updates: Partial<TryOnSession>) => void
  getTryOnHistory: (productId?: number) => TryOnSession[]

  // AR/Virtual try-on state
  isARActive: boolean
  setARActive: (active: boolean) => void
  currentTryOnProduct: number | null
  setCurrentTryOnProduct: (productId: number | null) => void
}

export const useTryOnStore = create<TryOnState>()(
  persist(
    (set, get) => ({
      // User measurements
      userMeasurements: null,
      setUserMeasurements: (measurements) => set({ userMeasurements: measurements }),

      // Size recommendations
      getSizeRecommendation: (productId, sizes) => {
        const measurements = get().userMeasurements
        if (!measurements) {
          return sizes.map((size) => ({
            size,
            confidence: 50,
            fit: "regular" as const,
            reasons: ["Complete your measurements for better recommendations"],
          }))
        }

        // Mock size recommendation algorithm
        return sizes.map((size, index) => {
          const confidence = Math.max(60, 100 - Math.abs(index - 2) * 15)
          const fit = index === 2 ? "perfect" : index < 2 ? "tight" : "loose"
          const reasons = [
            fit === "perfect" ? "Best fit based on your measurements" : `May be ${fit} based on your measurements`,
            `${confidence}% confidence match`,
          ]

          return {
            size,
            confidence,
            fit: fit as "tight" | "perfect" | "loose",
            reasons,
          }
        })
      },

      // Try-on sessions
      tryOnSessions: [],
      addTryOnSession: (sessionData) => {
        const newSession: TryOnSession = {
          ...sessionData,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toISOString(),
        }
        set({ tryOnSessions: [...get().tryOnSessions, newSession] })
      },

      updateTryOnSession: (sessionId, updates) => {
        set({
          tryOnSessions: get().tryOnSessions.map((session) =>
            session.id === sessionId ? { ...session, ...updates } : session,
          ),
        })
      },

      getTryOnHistory: (productId) => {
        const sessions = get().tryOnSessions
        return productId ? sessions.filter((s) => s.productId === productId) : sessions
      },

      // AR/Virtual try-on state
      isARActive: false,
      setARActive: (active) => set({ isARActive: active }),
      currentTryOnProduct: null,
      setCurrentTryOnProduct: (productId) => set({ currentTryOnProduct: productId }),
    }),
    {
      name: "try-on-store",
      partialize: (state) => ({
        userMeasurements: state.userMeasurements,
        tryOnSessions: state.tryOnSessions,
      }),
    },
  ),
)
