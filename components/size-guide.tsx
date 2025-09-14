"use client"

import { useState } from "react"
import { Ruler, User, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTryOnStore, type UserMeasurements } from "@/lib/try-on-store"
import { toast } from "@/hooks/use-toast"

interface SizeGuideProps {
  productId: number
  availableSizes: string[]
  onSizeSelect?: (size: string) => void
}

export function SizeGuide({ productId, availableSizes, onSizeSelect }: SizeGuideProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"measurements" | "recommendations">("recommendations")
  const { userMeasurements, setUserMeasurements, getSizeRecommendation } = useTryOnStore()

  const [measurementForm, setMeasurementForm] = useState<UserMeasurements>({
    height: userMeasurements?.height || 170,
    weight: userMeasurements?.weight || 70,
    chest: userMeasurements?.chest || 90,
    waist: userMeasurements?.waist || 80,
    hips: userMeasurements?.hips || 95,
    shoulderWidth: userMeasurements?.shoulderWidth || 45,
    preferredFit: userMeasurements?.preferredFit || "regular",
  })

  const recommendations = getSizeRecommendation(productId, availableSizes)
  const bestRecommendation = recommendations.find((r) => r.fit === "perfect") || recommendations[0]

  const handleSaveMeasurements = () => {
    setUserMeasurements(measurementForm)
    toast({
      title: "Measurements saved!",
      description: "Your measurements have been saved for better size recommendations.",
    })
    setActiveTab("recommendations")
  }

  const handleSizeSelect = (size: string) => {
    onSizeSelect?.(size)
    setIsOpen(false)
    toast({
      title: "Size selected",
      description: `Selected size ${size} based on recommendations.`,
    })
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-600"
    if (confidence >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getFitBadgeVariant = (fit: string) => {
    switch (fit) {
      case "perfect":
        return "default"
      case "tight":
        return "secondary"
      case "loose":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full bg-transparent">
          <Ruler className="h-4 w-4 mr-2" />
          Size Guide & Fit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            Size Guide & Recommendations
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "recommendations"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("recommendations")}
            >
              Size Recommendations
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === "measurements"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("measurements")}
            >
              My Measurements
            </button>
          </div>

          {activeTab === "recommendations" && (
            <div className="space-y-4">
              {!userMeasurements && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Add your measurements for personalized size recommendations
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <Card
                    key={rec.size}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      rec.fit === "perfect" ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleSizeSelect(rec.size)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-lg">Size {rec.size}</span>
                          <Badge variant={getFitBadgeVariant(rec.fit)}>{rec.fit}</Badge>
                          {rec.fit === "perfect" && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${getConfidenceColor(rec.confidence)}`}>
                            {rec.confidence}% match
                          </div>
                          <Progress value={rec.confidence} className="w-20 h-2 mt-1" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        {rec.reasons.map((reason, index) => (
                          <p key={index} className="text-sm text-muted-foreground">
                            • {reason}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {bestRecommendation && (
                <div className="text-center pt-4">
                  <Button onClick={() => handleSizeSelect(bestRecommendation.size)} size="lg">
                    Select Recommended Size {bestRecommendation.size}
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "measurements" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5" />
                    Your Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={measurementForm.height}
                        onChange={(e) => setMeasurementForm({ ...measurementForm, height: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={measurementForm.weight}
                        onChange={(e) => setMeasurementForm({ ...measurementForm, weight: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chest">Chest (cm)</Label>
                      <Input
                        id="chest"
                        type="number"
                        value={measurementForm.chest}
                        onChange={(e) => setMeasurementForm({ ...measurementForm, chest: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waist">Waist (cm)</Label>
                      <Input
                        id="waist"
                        type="number"
                        value={measurementForm.waist}
                        onChange={(e) => setMeasurementForm({ ...measurementForm, waist: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hips">Hips (cm)</Label>
                      <Input
                        id="hips"
                        type="number"
                        value={measurementForm.hips}
                        onChange={(e) => setMeasurementForm({ ...measurementForm, hips: Number(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shoulder">Shoulder Width (cm)</Label>
                      <Input
                        id="shoulder"
                        type="number"
                        value={measurementForm.shoulderWidth}
                        onChange={(e) =>
                          setMeasurementForm({ ...measurementForm, shoulderWidth: Number(e.target.value) })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Fit</Label>
                    <Select
                      value={measurementForm.preferredFit}
                      onValueChange={(value) =>
                        setMeasurementForm({
                          ...measurementForm,
                          preferredFit: value as "tight" | "regular" | "loose",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tight">Tight Fit</SelectItem>
                        <SelectItem value="regular">Regular Fit</SelectItem>
                        <SelectItem value="loose">Loose Fit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleSaveMeasurements} className="w-full">
                    Save Measurements
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">How to Measure</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      • <strong>Chest:</strong> Measure around the fullest part of your chest
                    </p>
                    <p>
                      • <strong>Waist:</strong> Measure around your natural waistline
                    </p>
                    <p>
                      • <strong>Hips:</strong> Measure around the fullest part of your hips
                    </p>
                    <p>
                      • <strong>Shoulder:</strong> Measure from shoulder point to shoulder point
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
