"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useArtist } from "./artist-context"
import type { Artist } from "@/lib/types"

interface ArtistCardProps {
  artist: Artist
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { setSelectedArtist } = useArtist()

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/30 to-indigo-950/40 backdrop-blur-sm border border-blue-500/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        boxShadow: "0 0 20px rgba(147, 197, 253, 0.3)",
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setSelectedArtist(artist)}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={artist.image || "/placeholder.svg"}
          alt={artist.name}
          fill
          className="object-cover transition-transform duration-700 ease-in-out"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            filter: isHovered ? "brightness(1.1)" : "brightness(1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent" />
      </div>

      <div className="relative p-5">
        <div className="absolute -top-10 right-5 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 opacity-20 blur-xl" />

        <h2 className="font-serif text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
          {artist.name}
        </h2>

        <p className="mt-1 text-sm font-medium text-blue-200">{artist.specialty}</p>

        <p className="mt-3 text-sm text-gray-300">{artist.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < artist.rating ? "text-yellow-400" : "text-gray-500"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <motion.button
            className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </div>
      </div>

      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 to-indigo-500/50 opacity-70" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/50 to-blue-500/50 opacity-70" />
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500/50 to-indigo-500/50 opacity-70" />
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-indigo-500/50 to-blue-500/50 opacity-70" />
        </div>
      )}
    </motion.div>
  )
}

