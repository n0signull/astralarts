"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, MessageCircle, Share2 } from "lucide-react"
import { useArtist } from "./artist-context"
import { Button } from "@/components/ui/button"

interface ArtistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ArtistModal({ isOpen, onClose }: ArtistModalProps) {
  const { selectedArtist } = useArtist()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!selectedArtist) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl bg-gradient-to-br from-blue-950/90 to-indigo-950/90 backdrop-blur-md border border-blue-500/20 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white/80 backdrop-blur-md transition-colors hover:bg-black/40 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-64 sm:h-80">
              <Image
                src={selectedArtist.image || "/placeholder.svg"}
                alt={selectedArtist.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {selectedArtist.name}
                </h2>
                <p className="mt-2 text-lg font-medium text-purple-200">{selectedArtist.specialty}</p>
              </div>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-3">
              <div className="sm:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">About</h3>
                  <p className="mt-2 text-gray-300">{selectedArtist.fullDescription || selectedArtist.description}</p>
                </div>

                {selectedArtist.services && selectedArtist.services.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white">Services</h3>
                    <ul className="mt-2 space-y-2">
                      {selectedArtist.services.map((service, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-purple-400" />
                          <span className="text-gray-300">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedArtist.testimonials && selectedArtist.testimonials.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white">Testimonials</h3>
                    <div className="mt-2 space-y-4">
                      {selectedArtist.testimonials.map((testimonial, index) => (
                        <div key={index} className="rounded-lg bg-blue-900/10 p-4">
                          <p className="italic text-blue-200">"{testimonial.text}"</p>
                          <p className="mt-2 text-sm font-medium text-indigo-300">— {testimonial.author}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="rounded-lg bg-blue-900/10 p-4">
                  <h3 className="text-lg font-semibold text-white">Book a Session</h3>
                  <p className="mt-1 text-sm text-blue-300">
                    Connect with {selectedArtist.name} for a transformative experience
                  </p>

                  <div className="mt-4 space-y-3">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Session
                    </Button>

                    <Button variant="outline" className="w-full border-blue-500/30 text-blue-200 hover:bg-blue-500/20">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Message
                    </Button>

                    <Button variant="ghost" className="w-full text-blue-200 hover:bg-blue-500/20">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share Profile
                    </Button>
                  </div>
                </div>

                {selectedArtist.availability && (
                  <div className="rounded-lg bg-blue-900/10 p-4">
                    <h3 className="text-lg font-semibold text-white">Availability</h3>
                    <p className="mt-1 text-sm text-blue-300">{selectedArtist.availability}</p>
                  </div>
                )}

                {selectedArtist.location && (
                  <div className="rounded-lg bg-blue-900/10 p-4">
                    <h3 className="text-lg font-semibold text-white">Location</h3>
                    <p className="mt-1 text-sm text-blue-300">{selectedArtist.location}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

