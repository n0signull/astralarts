"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Artist } from "@/lib/types"

interface ArtistContextType {
  selectedArtist: Artist | null
  setSelectedArtist: (artist: Artist | null) => void
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined)

export function ArtistProvider({ children }: { children: ReactNode }) {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null)

  return <ArtistContext.Provider value={{ selectedArtist, setSelectedArtist }}>{children}</ArtistContext.Provider>
}

export function useArtist() {
  const context = useContext(ArtistContext)
  if (context === undefined) {
    throw new Error("useArtist must be used within an ArtistProvider")
  }
  return context
}

