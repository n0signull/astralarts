export interface Artist {
  id: string
  name: string
  specialty: string
  description: string
  fullDescription?: string
  image: string
  rating: number
  services: string[]
  testimonials: Testimonial[]
  availability: string
  location: string
}

export interface Testimonial {
  author: string
  text: string
}

