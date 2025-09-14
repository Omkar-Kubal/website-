"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const simpleFabricResponses: Record<string, string> = {
  cotton:
    "Cotton is a natural, breathable fiber perfect for everyday wear and hot weather. It's soft, hypoallergenic, and great for people with sensitive skin. Widely used in casual and formal garments such as t-shirts, shirts, dresses, and denim. It blends well with polyester for durability and wrinkle resistance. Wikipedia: [https://en.wikipedia.org/wiki/Cotton](https://en.wikipedia.org/wiki/Cotton). Best paired with linen for summer styles or denim for casual looks.",
    
  silk:
    "Silk is a luxurious natural fiber known for its smooth texture and beautiful sheen. Common in special occasion wear like blouses, dresses, ties, and scarves. It drapes elegantly and provides moderate warmth. Wikipedia: [https://en.wikipedia.org/wiki/Silk](https://en.wikipedia.org/wiki/Silk). Often paired with chiffon or satin for layered formal outfits, it suits elegant styles well.",

  wool:
    "Wool is a natural fiber from sheep with excellent insulation and moisture-wicking properties. Used widely for warm winter clothing including suits, sweaters, coats, and scarves. Naturally wrinkle-resistant but can be itchy if untreated. Wikipedia: [https://en.wikipedia.org/wiki/Wool](https://en.wikipedia.org/wiki/Wool). Best paired with cashmere or silk linings for luxurious layered winter styles.",

  linen:
    "Linen, made from flax fibers, is a highly breathable fabric ideal for hot, humid climates. It features a distinct texture and relaxed casual aesthetic, often in shirts, dresses, trousers, and suits. Prone to wrinkles which add to its casual charm. Wikipedia: [https://en.wikipedia.org/wiki/Linen](https://en.wikipedia.org/wiki/Linen). Pairs well with cotton or lightweight wool for smart summer layering.",

  polyester:
    "Polyester is a synthetic fabric known for its durability, wrinkle resistance, and quick drying. Widely used in activewear, outerwear, and blends to improve fabric strength. Not very breathable but highly stain-resistant and easy to care for. Wikipedia: [https://en.wikipedia.org/wiki/Polyester](https://en.wikipedia.org/wiki/Polyester). Often blended with cotton to combine comfort with durability.",

  denim:
    "Denim is a sturdy cotton twill fabric characterized by its diagonal ribbing and durability. Primarily used for jeans, jackets, and casual wear. It softens with wear and washing, becoming more comfortable over time. Wikipedia: [https://en.wikipedia.org/wiki/Denim](https://en.wikipedia.org/wiki/Denim). Best paired with cotton tees and knits for classic casual looks.",

  velvet:
    "Velvet is a soft, luxurious fabric with a distinctive pile, often made from silk, cotton, or synthetic fibers. Ideal for evening wear, jackets, upholstery, and accessories due to its elegant texture and warmth. Wikipedia: [https://en.wikipedia.org/wiki/Velvet](https://en.wikipedia.org/wiki/Velvet). Pairs beautifully with silk and satin in formal attire.",

  spandex:
    "Spandex (also called Lycra or elastane) is a highly elastic synthetic fiber used primarily to provide stretch and recovery in garments. Common in activewear, swimwear, and fitted clothing, it enhances comfort and fit. Wikipedia: [https://en.wikipedia.org/wiki/Spandex](https://en.wikipedia.org/wiki/Spandex). Often blended in small amounts (up to 15%) with cotton or polyester for flexibility.",

  summer:
    "For summer, breathable and lightweight fabrics such as cotton, linen, chiffon, and seersucker keep you cool and comfortable. Popular summer styles include sundresses, shorts, light skirts, and breathable shirts. Pair these with sandals, wide-brim hats, and lightweight accessories for a fresh look.",

  winter:
    "Winter fabrics like wool, velvet, fleece, and heavier cotton blends provide warmth and insulation. Styles include coats, sweaters, scarves, and tailored suits. Pair thicker fabrics with insulated layers, leather boots, and warm accessories for maximum comfort and style.",

  formal:
    "Formal attire uses high-quality fabrics such as silk, wool suiting, satin, velvet, and fine cotton. Common garments include tailored suits, evening gowns, dress shirts, and ties. These fabrics offer elegant drape and a polished appearance. Pair with leather shoes, cufflinks, and fine accessories.",

  casual:
    "Casual wear favors comfortable, durable fabrics like cotton, denim, jersey knits, and fleece. These are used in jeans, t-shirts, hoodies, casual dresses, and lounge wear. Focus on layering soft knits with denim or cotton pants. Pair casual fabrics with sneakers and relaxed fits for everyday comfort.",
}


function generateSimpleResponse(query: string): string {
  const lowerQuery = query.toLowerCase()
  for (const [key, response] of Object.entries(simpleFabricResponses)) {
    if (lowerQuery.includes(key)) {
      return response
    }
  }
  return "I'd be happy to help you learn about fabrics! You can ask me about cotton, silk, wool, linen, or get recommendations for summer, winter, formal, or casual wear."
}

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm your fabric expert assistant. Ask me about cotton, silk, wool, linen, or get recommendations for different seasons and occasions!",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [messages.length])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return
    const userInput = inputValue.trim()
    setInputValue("")
    setIsLoading(true)
    try {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: userInput,
        timestamp: new Date(),
      }
      const responseContent = generateSimpleResponse(userInput)
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      }
      setTimeout(() => {
        setMessages((prev) => [...prev, userMessage, assistantMessage])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-background border rounded-lg shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-primary/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <h3 className="font-semibold">Fabric Assistant</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-8 w-8 p-0" aria-label="Close Chat">
          <X className="w-4 h-4" />
        </Button>
      </div>
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef} style={{ minHeight: 0 }}>{/* Ensures child resizes */}
        {messages.map((message) => {
          const isUser = message.role === "user"
          return (
            <div
              key={message.id}
              className={cn("flex gap-3 mb-4", isUser ? "justify-end" : "justify-start")}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-3 break-words whitespace-pre-line", // Ensures wrapping, preserves newlines
                  isUser ? "bg-primary text-primary-foreground" : "bg-muted"
                )}
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  hyphens: "auto",
                }}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {isUser && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          )
        })}
        {isLoading && (
          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-muted rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Input */}
      <div className="p-4 border-t bg-primary/5">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about fabrics..."
            disabled={isLoading}
            className="flex-1"
            aria-label="Chat input"
            style={{ overflowWrap: "break-word" }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className="px-3"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}