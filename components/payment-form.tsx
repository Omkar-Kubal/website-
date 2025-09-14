"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface PaymentFormProps {
  initialData: {
    cardName: string
    cardNumber: string
    expiryDate: string
    cvv: string
    sameAsShipping: boolean
  }
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    apartment: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  onSubmit: (data: PaymentFormProps["initialData"]) => void
  onBack: () => void
}

export function PaymentForm({ initialData, shippingAddress, onSubmit, onBack }: PaymentFormProps) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim()
      formattedValue = formattedValue.substring(0, 19) // Limit to 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "")
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.substring(0, 2)}/${formattedValue.substring(2, 4)}`
      }
    }

    // Limit CVV to 3-4 digits
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4)
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // Required fields
    const requiredFields = [
      { name: "cardName", label: "Name on card" },
      { name: "cardNumber", label: "Card number" },
      { name: "expiryDate", label: "Expiry date" },
      { name: "cvv", label: "CVV" },
    ]
    
    requiredFields.forEach(field => {
      if (!formData[field.name as keyof typeof formData]) {
        newErrors[field.name] = `${field.label} is required`
      }
    })
    
    // Card number validation (simplified)
    if (formData.cardNumber && formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Please enter a valid card number"
    }
    
    // Expiry date validation
    if (formData.expiryDate) {
      const [month, year] = formData.expiryDate.split("/")
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear() % 100 // Get last 2 digits of year
      const currentMonth = currentDate.getMonth() + 1 // Months are 0-indexed
      
      const expiryMonth = parseInt(month, 10)
      const expiryYear = parseInt(year, 10)
      
      if (isNaN(expiryMonth) || isNaN(expiryYear) || expiryMonth < 1 || expiryMonth > 12) {
        newErrors.expiryDate = "Please enter a valid expiry date"
      } else if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
        newErrors.expiryDate = "Card has expired"
      }
    }
    
    // CVV validation
    if (formData.cvv && (formData.cvv.length < 3 || formData.cvv.length > 4)) {
      newErrors.cvv = "CVV must be 3 or 4 digits"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cardName">Name on Card</Label>
        <Input
          id="cardName"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
          className={errors.cardName ? "border-destructive" : ""}
          placeholder="John Doe"
        />
        {errors.cardName && (
          <p className="text-sm text-destructive">{errors.cardName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          className={errors.cardNumber ? "border-destructive" : ""}
          placeholder="1234 5678 9012 3456"
        />
        {errors.cardNumber && (
          <p className="text-sm text-destructive">{errors.cardNumber}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className={errors.expiryDate ? "border-destructive" : ""}
            placeholder="MM/YY"
          />
          {errors.expiryDate && (
            <p className="text-sm text-destructive">{errors.expiryDate}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            name="cvv"
            type="password"
            value={formData.cvv}
            onChange={handleChange}
            className={errors.cvv ? "border-destructive" : ""}
            placeholder="123"
          />
          {errors.cvv && (
            <p className="text-sm text-destructive">{errors.cvv}</p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <h3 className="font-medium mb-4">Billing Address</h3>
        
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="sameAsShipping" 
            checked={formData.sameAsShipping}
            onCheckedChange={(checked) => handleCheckboxChange("sameAsShipping", checked === true)}
          />
          <Label htmlFor="sameAsShipping" className="text-sm font-normal">
            Same as shipping address
          </Label>
        </div>
        
        {formData.sameAsShipping && (
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
            <p>{shippingAddress.address}</p>
            {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
            <p>
              {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
            </p>
            <p>{shippingAddress.country}</p>
          </div>
        )}
        
        {!formData.sameAsShipping && (
          <p className="text-sm text-muted-foreground">
            Please enter your billing address (not implemented in this demo)
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button type="submit" className="ml-auto">
          Review Order
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </form>
  )
}