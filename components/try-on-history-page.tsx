"use client"

import { Camera, Heart, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTryOnStore } from "@/lib/try-on-store"
import Link from "next/link"

export function TryOnHistoryPage() {
  const { tryOnSessions } = useTryOnStore()

  if (tryOnSessions.length === 0) {
    return (
      <div className="text-center py-16">
        <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4">No try-on history</h1>
        <p className="text-muted-foreground mb-8">Start trying on products to see your history here</p>
        <Button asChild size="lg">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Try-On History</h1>
        <p className="text-muted-foreground">{tryOnSessions.length} try-on sessions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tryOnSessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(session.timestamp).toLocaleDateString()}
                  </span>
                </div>
                {session.liked && (
                  <Badge className="bg-red-100 text-red-800">
                    <Heart className="h-3 w-3 mr-1 fill-current" />
                    Loved
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Product #{session.productId}</h3>
                <div className="flex gap-2">
                  <Badge variant="outline">Size {session.selectedSize}</Badge>
                  <Badge variant="outline">{session.selectedColor}</Badge>
                </div>
                {session.notes && <p className="text-sm text-muted-foreground italic">"{session.notes}"</p>}
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Camera className="h-3 w-3 mr-1" />
                  Try Again
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
