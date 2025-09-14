"use client"

type VirtualTryOnProps = {
  productId: number
  productName: string
  productImage: string
  productPrice?: number
  selectedSize: string
  selectedColor: string
  isOpen: boolean
  onClose: () => void
}

export default function VirtualTryOn({
  productId,
  productName,
  productImage,
  productPrice,
  selectedSize,
  selectedColor,
  isOpen,
  onClose,
}: VirtualTryOnProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{productName}</h2>
        <img src={productImage} alt={productName} className="w-40 h-40 mx-auto mb-4 object-cover" />
        <p className="text-gray-700">Size: {selectedSize}</p>
        <p className="text-gray-700">Color: {selectedColor}</p>
        {productPrice && <p className="text-gray-900 font-semibold">₹{productPrice}</p>}

        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  )
}
