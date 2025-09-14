"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"

export function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Customers</h2>
        <p className="text-muted-foreground">Manage customer accounts and information</p>
      </div>

      <Card>
        <CardContent className="text-center py-16">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h3 className="text-lg font-semibold mb-2">Customer Management Coming Soon</h3>
          <p className="text-muted-foreground">
            Advanced customer management features including customer profiles, order history, and communication tools
            will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
