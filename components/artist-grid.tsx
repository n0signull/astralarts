"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import ArtistCard from "./artist-card"
import ArtistModal from "./artist-modal"
import { useArtist } from "./artist-context"
import { artists } from "@/lib/data"

export default function ArtistGrid() {
  const { selectedArtist, setSelectedArtist } = useArtist()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedArtist) {
        setSelectedArtist(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedArtist, setSelectedArtist])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </motion.div>

      <ArtistModal isOpen={!!selectedArtist} onClose={() => setSelectedArtist(null)} />
    </>
  )
}

