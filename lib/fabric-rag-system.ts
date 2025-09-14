"use client"

import { searchFabrics, type Fabric } from "./fabric-data"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  fabrics?: Fabric[]
}

export class FabricRAGSystem {
  private conversationHistory: ChatMessage[] = []

  async processQuery(userQuery: string): Promise<ChatMessage> {
    try {
      // Add user message to history
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: userQuery,
        timestamp: new Date(),
      }
      this.conversationHistory.push(userMessage)

      // Search for relevant fabrics
      const relevantFabrics = searchFabrics(userQuery)

      // Generate response based on query type
      const response = this.generateResponse(userQuery, relevantFabrics)

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
        fabrics: relevantFabrics.slice(0, 3), // Limit to top 3 results
      }

      this.conversationHistory.push(assistantMessage)
      return assistantMessage
    } catch (error) {
      console.error("Error processing query:", error)
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      }
      this.conversationHistory.push(errorMessage)
      return errorMessage
    }
  }

  private generateResponse(query: string, fabrics: Fabric[]): string {
    const lowerQuery = query.toLowerCase()

    // Handle specific query types
    if (lowerQuery.includes("summer") || lowerQuery.includes("hot")) {
      const summerFabrics = fabrics.filter((f) => f.season.includes("Summer"))
      if (summerFabrics.length > 0) {
        return 'For summer weather, I recommend these breathable fabrics: ${summerFabrics.map((f) => f.name).join(", ")}. ${summerFabrics[0]?.description}'
      }
    }

    if (lowerQuery.includes("winter") || lowerQuery.includes("cold")) {
      const winterFabrics = fabrics.filter((f) => f.season.includes("Winter"))
      if (winterFabrics.length > 0) {
        return 'For winter weather, these warm fabrics are perfect: ${winterFabrics.map((f) => f.name).join(", ")}. ${winterFabrics[0]?.description}'
      }
    }

    if (lowerQuery.includes("formal") || lowerQuery.includes("office")) {
      const formalFabrics = fabrics.filter(
        (f) =>
          f.bestFor.some((use) => use.toLowerCase().includes("formal")) ||
          f.styles.some((style) => style.toLowerCase().includes("suit")),
      )
      if (formalFabrics.length > 0) {
        return 'For formal occasions, consider these sophisticated fabrics: ${formalFabrics.map((f) => f.name).join(", ")}. They offer professional appearance and comfort.'
      }
    }

    if (lowerQuery.includes("casual") || lowerQuery.includes("everyday")) {
      const casualFabrics = fabrics.filter(
        (f) =>
          f.bestFor.some((use) => use.toLowerCase().includes("everyday")) ||
          f.styles.some((style) => style.toLowerCase().includes("casual")),
      )
      if (casualFabrics.length > 0) {
        return 'For casual wear, these comfortable fabrics are ideal: ${casualFabrics.map((f) => f.name).join(", ")}. They are perfect for daily comfort and style.'
      }
    }

    // General fabric information
    if (fabrics.length > 0) {
      const fabric = fabrics[0]
      return 'I found information about ${fabric.name}! ${fabric.description} Its great for ${fabric.bestFor.join(", ")} and works well in ${fabric.colors.join(", ")} colors.'
    }

    // Fallback response
    return "I'd be happy to help you learn about fabrics! You can ask me about specific fabrics like cotton or silk, or ask for recommendations based on season, occasion, or style preferences."
  }

  getConversationHistory(): ChatMessage[] {
    return this.conversationHistory
  }

  clearHistory(): void {
    this.conversationHistory = []
  }
}