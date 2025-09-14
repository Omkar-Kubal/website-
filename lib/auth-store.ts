"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  role: "user" | "admin"
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  isAdmin: () => boolean
}

// Mock authentication - in a real app, this would connect to your backend
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      loginWithGoogle: async () => {
        set({ isLoading: true });
        try {
          const { auth } = await import("./firebase");
          const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
          
          // Check if Firebase is properly initialized
          if (!auth) {
            console.error("Firebase auth is not initialized");
            set({ isLoading: false });
            return false;
          }
          
          const provider = new GoogleAuthProvider();
          
          // Add client ID from environment variables
          const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
          if (clientId) {
            provider.setCustomParameters({
              'client_id': clientId
            });
          } else {
            console.warn("Google Client ID not found in environment variables");
          }
          
          // Add scopes for better user profile access
          provider.addScope('email');
          provider.addScope('profile');
          
          console.log("Attempting Google sign-in with configured client ID...");
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          
          console.log("Google sign-in successful", user.uid);
          set({
            user: {
              id: user.uid,
              email: user.email || "",
              name: user.displayName || "",
              avatar: user.photoURL || undefined,
              createdAt: user.metadata.creationTime || new Date().toISOString(),
              role: "user",
            },
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (error: any) {
          // Log detailed error information
          console.error("Google sign-in error:", error);
          console.error("Error code:", error.code);
          console.error("Error message:", error.message);
          
          // Check for specific error types
          if (error.code === 'auth/popup-blocked') {
            console.error("Popup was blocked by the browser");
          } else if (error.code === 'auth/popup-closed-by-user') {
            console.error("Popup was closed by the user");
          } else if (error.code === 'auth/cancelled-popup-request') {
            console.error("Popup request was cancelled");
          } else if (error.code === 'auth/network-request-failed') {
            console.error("Network request failed");
          } else if (error.code === 'auth/configuration-not-found') {
            console.error("Firebase OAuth configuration is missing or incorrect");
          }
          
          set({ isLoading: false });
          return false;
        }
      },
      login: async (email: string, password: string) => {
        set({ isLoading: true })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock validation - in real app, validate against backend
        if (email && password.length >= 6) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split("@")[0],
            createdAt: new Date().toISOString(),
            role: email === "admin@example.com" ? "admin" : "user",
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }

        set({ isLoading: false })
        return false
      },

      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true })

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock validation
        if (name && email && password.length >= 6) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            createdAt: new Date().toISOString(),
            role: "user",
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          })
          return true
        }

        set({ isLoading: false })
        return false
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      updateProfile: (updates: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          })
        }
      },

      isAdmin: () => {
        const user = get().user
        return user?.role === "admin"
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
