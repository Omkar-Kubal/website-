// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Camera, CameraOff, RotateCcw, Download, Heart, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Slider } from "@/components/ui/slider"
// import { Label } from "@/components/ui/label"
// import { useTryOnStore } from "@/lib/try-on-store"
// import { useStore } from "@/lib/store"
// import { toast } from "@/hooks/use-toast"

// interface VirtualTryOnProps {
//   productId: number
//   productName: string
//   productImage: string
//   selectedSize: string
//   selectedColor: string
//   isOpen: boolean
//   onClose: () => void
// }

// export function VirtualTryOn({
//   productId,
//   productName,
//   productImage,
//   selectedSize,
//   selectedColor,
//   isOpen,
//   onClose,
// }: VirtualTryOnProps) {
//   const [isCameraActive, setIsCameraActive] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [opacity, setOpacity] = useState([70])
//   const [scale, setScale] = useState([100])
//   const [position, setPosition] = useState({ x: 50, y: 50 })
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const streamRef = useRef<MediaStream | null>(null)

//   const { addTryOnSession, setARActive, setCurrentTryOnProduct } = useTryOnStore()
//   const { addToWishlist } = useStore()

//   useEffect(() => {
//     if (isOpen) {
//       setARActive(true)
//       setCurrentTryOnProduct(productId)
//     } else {
//       setARActive(false)
//       setCurrentTryOnProduct(null)
//       stopCamera()
//     }

//     return () => {
//       stopCamera()
//     }
//   }, [isOpen, productId, setARActive, setCurrentTryOnProduct])

//   const startCamera = async () => {
//     try {
//       setIsLoading(true)
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user", width: 640, height: 480 },
//         audio: false,
//       })

//       if (videoRef.current) {
//         videoRef.current.srcObject = stream
//         streamRef.current = stream
//         setIsCameraActive(true)
//       }
//     } catch (error) {
//       console.error("Error accessing camera:", error)
//       toast({
//         title: "Camera Error",
//         description: "Unable to access camera. Please check permissions.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop())
//       streamRef.current = null
//     }
//     setIsCameraActive(false)
//   }

//   const capturePhoto = () => {
//     if (!videoRef.current || !canvasRef.current) return

//     const canvas = canvasRef.current
//     const video = videoRef.current
//     const ctx = canvas.getContext("2d")

//     if (ctx) {
//       canvas.width = video.videoWidth
//       canvas.height = video.videoHeight
//       ctx.drawImage(video, 0, 0)

//       // Add the product overlay
//       const img = new Image()
//       img.crossOrigin = "anonymous"
//       img.onload = () => {
//         ctx.globalAlpha = opacity[0] / 100
//         const scaleFactor = scale[0] / 100
//         const imgWidth = canvas.width * 0.3 * scaleFactor
//         const imgHeight = (img.height / img.width) * imgWidth
//         const x = (canvas.width * position.x) / 100 - imgWidth / 2
//         const y = (canvas.height * position.y) / 100 - imgHeight / 2

//         ctx.drawImage(img, x, y, imgWidth, imgHeight)

//         // Download the image
//         const link = document.createElement("a")
//         link.download = `try-on-${productName}-${Date.now()}.png`
//         link.href = canvas.toDataURL()
//         link.click()

//         toast({
//           title: "Photo captured!",
//           description: "Your try-on photo has been saved.",
//         })
//       }
//       img.src = productImage
//     }
//   }

//   const saveTryOnSession = (liked: boolean) => {
//     addTryOnSession({
//       productId,
//       selectedSize,
//       selectedColor,
//       liked,
//       notes: liked ? "Liked this look!" : undefined,
//     })

//     if (liked) {
//       addToWishlist({
//         id: productId,
//         name: productName,
//         price: 0, // This would come from product data
//         image: productImage,
//         category: "",
//         isOnSale: false,
//         rating: 0,
//         reviews: 0,
//       })
//     }

//     toast({
//       title: liked ? "Added to wishlist!" : "Try-on saved",
//       description: liked ? "This look has been saved to your wishlist." : "Your try-on session has been recorded.",
//     })
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//         <DialogHeader>
//           <DialogTitle className="flex items-center justify-between">
//             <span>Virtual Try-On - {productName}</span>
//             <Button variant="ghost" size="icon" onClick={onClose}>
//               <X className="h-4 w-4" />
//             </Button>
//           </DialogTitle>
//         </DialogHeader>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Camera/Try-On Area */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardContent className="p-4">
//                 <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
//                   {isCameraActive ? (
//                     <>
//                       <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
//                       {/* Product Overlay */}
//                       <div
//                         className="absolute pointer-events-none"
//                         style={{
//                           left: `${position.x}%`,
//                           top: `${position.y}%`,
//                           transform: `translate(-50%, -50%) scale(${scale[0] / 100})`,
//                           opacity: opacity[0] / 100,
//                         }}
//                       >
//                         <img
//                           src={productImage || "/placeholder.svg"}
//                           alt={productName}
//                           className="w-32 h-auto drop-shadow-lg"
//                           draggable={false}
//                         />
//                       </div>
//                       {/* Size and Color Info */}
//                       <div className="absolute top-4 left-4 flex gap-2">
//                         <Badge>{selectedSize}</Badge>
//                         <Badge variant="outline">{selectedColor}</Badge>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="flex items-center justify-center h-full">
//                       <div className="text-center">
//                         <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold mb-2">Start Virtual Try-On</h3>
//                         <p className="text-muted-foreground mb-4">Use your camera to see how this item looks on you</p>
//                         <Button onClick={startCamera} disabled={isLoading}>
//                           {isLoading ? "Starting Camera..." : "Start Camera"}
//                         </Button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Camera Controls */}
//                 {isCameraActive && (
//                   <div className="flex justify-center gap-2 mt-4">
//                     <Button variant="outline" onClick={stopCamera}>
//                       <CameraOff className="h-4 w-4 mr-2" />
//                       Stop Camera
//                     </Button>
//                     <Button onClick={capturePhoto}>
//                       <Download className="h-4 w-4 mr-2" />
//                       Capture Photo
//                     </Button>
//                     <Button onClick={() => saveTryOnSession(true)}>
//                       <Heart className="h-4 w-4 mr-2" />
//                       Love This Look
//                     </Button>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Controls Panel */}
//           <div className="space-y-4">
//             <Card>
//               <CardContent className="p-4">
//                 <h3 className="font-semibold mb-4">Adjustment Controls</h3>

//                 <div className="space-y-4">
//                   <div>
//                     <Label className="text-sm font-medium">Opacity</Label>
//                     <Slider value={opacity} onValueChange={setOpacity} max={100} min={20} step={5} className="mt-2" />
//                     <div className="text-xs text-muted-foreground mt-1">{opacity[0]}%</div>
//                   </div>

//                   <div>
//                     <Label className="text-sm font-medium">Size</Label>
//                     <Slider value={scale} onValueChange={setScale} max={150} min={50} step={5} className="mt-2" />
//                     <div className="text-xs text-muted-foreground mt-1">{scale[0]}%</div>
//                   </div>

//                   <div>
//                     <Label className="text-sm font-medium">Position</Label>
//                     <div className="grid grid-cols-2 gap-2 mt-2">
//                       <div>
//                         <Label className="text-xs">Horizontal</Label>
//                         <Slider
//                           value={[position.x]}
//                           onValueChange={(value) => setPosition((prev) => ({ ...prev, x: value[0] }))}
//                           max={100}
//                           min={0}
//                           step={1}
//                         />
//                       </div>
//                       <div>
//                         <Label className="text-xs">Vertical</Label>
//                         <Slider
//                           value={[position.y]}
//                           onValueChange={(value) => setPosition((prev) => ({ ...prev, y: value[0] }))}
//                           max={100}
//                           min={0}
//                           step={1}
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <Button
//                     variant="outline"
//                     className="w-full bg-transparent"
//                     onClick={() => {
//                       setOpacity([70])
//                       setScale([100])
//                       setPosition({ x: 50, y: 50 })
//                     }}
//                   >
//                     <RotateCcw className="h-4 w-4 mr-2" />
//                     Reset
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardContent className="p-4">
//                 <h3 className="font-semibold mb-4">Quick Actions</h3>
//                 <div className="space-y-2">
//                   <Button
//                     variant="outline"
//                     className="w-full bg-transparent"
//                     onClick={() => saveTryOnSession(true)}
//                     disabled={!isCameraActive}
//                   >
//                     <Heart className="h-4 w-4 mr-2" />
//                     Love This Look
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full bg-transparent"
//                     onClick={() => saveTryOnSession(false)}
//                     disabled={!isCameraActive}
//                   >
//                     Save Try-On
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Hidden canvas for photo capture */}
//         <canvas ref={canvasRef} className="hidden" />
//       </DialogContent>
//     </Dialog>
//   )
// }
