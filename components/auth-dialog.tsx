"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/lib/auth-store"
import { toast } from "@/hooks/use-toast"
import { Loader2, User } from "lucide-react"

const GoogleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" {...props}>
    <g>
      <path fill="#EA4335" d="M12 5.5c1.53 0 2.91.59 3.97 1.55l2.87-2.87C17.07 2.5 14.7 1.5 12 1.5c-3.86 0-7.2 2.25-8.79 5.5l3.35 2.6C7.39 7.1 9.54 5.5 12 5.5z"/>
      <path fill="#4285F4" d="M23.5 12.5c0-.93-.15-1.82-.42-2.67H12v4.5h6.48c-.29 1.54-1.14 2.85-2.4 3.72l3.12 2.4c1.81-1.69 2.8-4.17 2.8-7.95z"/>
      <path fill="#FBBC05" d="M6.56 14.6l-3.35 2.6C4.71 20.5 8.05 22.5 12 22.5c2.7 0 5.07-1 6.8-2.7l-3.12-2.4c-.86.58-1.97.9-3.68.9-2.46 0-4.61-1.6-5.44-3.7z"/>
      <path fill="#34A853" d="M12 22.5c3.86 0 7.2-2 8.79-5.3l-3.35-2.6c-.83 2.1-2.98 3.7-5.44 3.7-2.46 0-4.61-1.6-5.44-3.7l-3.35 2.6C4.8 20.5 8.14 22.5 12 22.5z"/>
    </g>
  </svg>
)

export function AuthDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })
  const { login, signup, loginWithGoogle, isLoading } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    const success = await login(loginForm.email, loginForm.password)

    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      })
      setIsOpen(false)
      setLoginForm({ email: "", password: "" })
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      })
      return
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }

    if (signupForm.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    const success = await signup(signupForm.name, signupForm.email, signupForm.password)

    if (success) {
      toast({
        title: "Account created!",
        description: "Welcome to EliteStyle! You have been automatically logged in.",
      })
      setIsOpen(false)
      setSignupForm({ name: "", email: "", password: "", confirmPassword: "" })
    } else {
      toast({
        title: "Signup failed",
        description: "Unable to create account. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
                <div className="mt-4">
                  <Button
                    type="button"
                    className="w-full bg-white hover:bg-gray-100 text-black border border-gray-300 flex items-center justify-center"
                    disabled={isLoading}
                    onClick={async () => {
                      const success = await loginWithGoogle();
                      if (success) {
                        toast({
                          title: "Welcome!",
                          description: "You have been logged in with Google.",
                        });
                        setIsOpen(false);
                      } else {
                        toast({
                          title: "Google Login Failed",
                          description: "Unable to sign in with Google.",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    <GoogleIcon className="mr-2 h-5 w-5" />
                    Login with Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create account</CardTitle>
                <CardDescription>Join EliteStyle to start shopping</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
                <div className="mt-4">
                  <Button
                    type="button"
                    className="w-full bg-white hover:bg-gray-100 text-black border border-gray-300 flex items-center justify-center"
                    disabled={isLoading}
                    onClick={async () => {
                      const success = await loginWithGoogle();
                      if (success) {
                        toast({
                          title: "Welcome!",
                          description: "Your account has been created with Google.",
                        });
                        setIsOpen(false);
                      } else {
                        toast({
                          title: "Google Signup Failed",
                          description: "Unable to sign up with Google.",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    <GoogleIcon className="mr-2 h-5 w-5" />
                    Sign Up with Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
