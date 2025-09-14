"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ShippingFormProps {
  initialData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    apartment: string
    city: string
    state: string
    zipCode: string
    country: string
    saveInfo: boolean
  }
  onSubmit: (data: ShippingFormProps["initialData"]) => void
}

export function ShippingForm({ initialData, onSubmit }: ShippingFormProps) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
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
      { name: "firstName", label: "First name" },
      { name: "lastName", label: "Last name" },
      { name: "email", label: "Email" },
      { name: "phone", label: "Phone" },
      { name: "address", label: "Address" },
      { name: "city", label: "City" },
      { name: "state", label: "State" },
      { name: "zipCode", label: "ZIP code" },
    ]
    
    requiredFields.forEach(field => {
      if (!formData[field.name as keyof typeof formData]) {
        newErrors[field.name] = `${field.label} is required`
      }
    })
    
    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    // Phone validation
    if (formData.phone && !/^[\d\s\-\(\)\+]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }
    
    // ZIP code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? "border-destructive" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? "border-destructive" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "border-destructive" : ""}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? "border-destructive" : ""}
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
        <Input
          id="apartment"
          name="apartment"
          value={formData.apartment}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? "border-destructive" : ""}
          />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select 
            value={formData.state} 
            onValueChange={(value) => handleSelectChange("state", value)}
          >
            <SelectTrigger className={errors.state ? "border-destructive" : ""}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AL">Alabama</SelectItem>
              <SelectItem value="AK">Alaska</SelectItem>
              <SelectItem value="AZ">Arizona</SelectItem>
              <SelectItem value="AR">Arkansas</SelectItem>
              <SelectItem value="CA">California</SelectItem>
              <SelectItem value="CO">Colorado</SelectItem>
              <SelectItem value="CT">Connecticut</SelectItem>
              <SelectItem value="DE">Delaware</SelectItem>
              <SelectItem value="FL">Florida</SelectItem>
              <SelectItem value="GA">Georgia</SelectItem>
              <SelectItem value="HI">Hawaii</SelectItem>
              <SelectItem value="ID">Idaho</SelectItem>
              <SelectItem value="IL">Illinois</SelectItem>
              <SelectItem value="IN">Indiana</SelectItem>
              <SelectItem value="IA">Iowa</SelectItem>
              <SelectItem value="KS">Kansas</SelectItem>
              <SelectItem value="KY">Kentucky</SelectItem>
              <SelectItem value="LA">Louisiana</SelectItem>
              <SelectItem value="ME">Maine</SelectItem>
              <SelectItem value="MD">Maryland</SelectItem>
              <SelectItem value="MA">Massachusetts</SelectItem>
              <SelectItem value="MI">Michigan</SelectItem>
              <SelectItem value="MN">Minnesota</SelectItem>
              <SelectItem value="MS">Mississippi</SelectItem>
              <SelectItem value="MO">Missouri</SelectItem>
              <SelectItem value="MT">Montana</SelectItem>
              <SelectItem value="NE">Nebraska</SelectItem>
              <SelectItem value="NV">Nevada</SelectItem>
              <SelectItem value="NH">New Hampshire</SelectItem>
              <SelectItem value="NJ">New Jersey</SelectItem>
              <SelectItem value="NM">New Mexico</SelectItem>
              <SelectItem value="NY">New York</SelectItem>
              <SelectItem value="NC">North Carolina</SelectItem>
              <SelectItem value="ND">North Dakota</SelectItem>
              <SelectItem value="OH">Ohio</SelectItem>
              <SelectItem value="OK">Oklahoma</SelectItem>
              <SelectItem value="OR">Oregon</SelectItem>
              <SelectItem value="PA">Pennsylvania</SelectItem>
              <SelectItem value="RI">Rhode Island</SelectItem>
              <SelectItem value="SC">South Carolina</SelectItem>
              <SelectItem value="SD">South Dakota</SelectItem>
              <SelectItem value="TN">Tennessee</SelectItem>
              <SelectItem value="TX">Texas</SelectItem>
              <SelectItem value="UT">Utah</SelectItem>
              <SelectItem value="VT">Vermont</SelectItem>
              <SelectItem value="VA">Virginia</SelectItem>
              <SelectItem value="WA">Washington</SelectItem>
              <SelectItem value="WV">West Virginia</SelectItem>
              <SelectItem value="WI">Wisconsin</SelectItem>
              <SelectItem value="WY">Wyoming</SelectItem>
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-sm text-destructive">{errors.state}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className={errors.zipCode ? "border-destructive" : ""}
          />
          {errors.zipCode && (
            <p className="text-sm text-destructive">{errors.zipCode}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Select 
          value={formData.country} 
          onValueChange={(value) => handleSelectChange("country", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="saveInfo" 
          checked={formData.saveInfo}
          onCheckedChange={(checked) => handleCheckboxChange("saveInfo", checked === true)}
        />
        <Label htmlFor="saveInfo" className="text-sm font-normal">
          Save this information for next time
        </Label>
      </div>

      <Button type="submit" className="w-full md:w-auto md:ml-auto">
        Continue to Payment
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </form>
  )
}