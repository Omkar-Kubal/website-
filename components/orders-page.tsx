"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Package, Search, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { Order } from "@/lib/store"

// Default mock orders in case there are no real orders yet
const defaultOrders = [
  {
    id: "ORD123456",
    date: new Date("2023-11-15"),
    total: 129.99,
    status: "Delivered",
    items: [
      { name: "Classic White T-Shirt", quantity: 2, price: 29.99, id: 1, image: "/placeholder.svg" },
      { name: "Slim Fit Jeans", quantity: 1, price: 69.99, id: 2, image: "/placeholder.svg" },
    ],
    subtotal: 129.97,
    shipping: 0,
    tax: 10.40,
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "555-123-4567",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      country: "USA"
    },
    paymentMethod: "Credit Card ending in 1234"
  }
]

export function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Get orders from store
  useEffect(() => {
    const { getAllOrders } = useStore.getState()
    const userOrders = getAllOrders()
    
    // Use real orders if available, otherwise use default mock orders
    setOrders(userOrders.length > 0 ? userOrders : defaultOrders)
  }, [])

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (mockOrders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-2xl font-bold mb-4">No orders yet</h1>
        <p className="text-muted-foreground mb-8">Start shopping to see your orders here</p>
        <Button asChild size="lg">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders by ID or product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No orders found matching your search</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-muted p-4 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{order.id}</h3>
                      <Badge variant={order.status === "Delivered" ? "outline" : "secondary"}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ordered on {format(order.date, "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total.toFixed(2)}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs flex items-center gap-1"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      {expandedOrders.includes(order.id) ? (
                        <>
                          Hide Details
                          <ChevronUp className="h-3 w-3" />
                        </>
                      ) : (
                        <>
                          View Details
                          <ChevronDown className="h-3 w-3" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {expandedOrders.includes(order.id) && (
                  <div className="p-4">
                    <h4 className="font-medium mb-3">Order Items</h4>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium">{item.name}</h5>
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <p>Qty: {item.quantity}</p>
                              {item.size && <p>Size: {item.size}</p>}
                              {item.color && <p>Color: {item.color}</p>}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${item.price.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/order/${order.id}`}>View Order Details</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/contact">Need Help?</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}