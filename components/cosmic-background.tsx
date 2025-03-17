"use client"

import { useEffect, useRef } from "react"

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars
    const stars: Star[] = []
    const numStars = Math.floor((canvas.width * canvas.height) / 1000)

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: 0.05 + Math.random() * 0.1,
      })
    }

    // Create nebulas
    const nebulas: Nebula[] = []
    const numNebulas = 3

    for (let i = 0; i < numNebulas; i++) {
      nebulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 100 + Math.random() * 200,
        color: getRandomColor(),
        opacity: 0.05 + Math.random() * 0.1,
      })
    }

    function getRandomColor() {
      const colors = [
        "rgba(16, 24, 64, 0.4)", // deep night blue
        "rgba(64, 0, 128, 0.2)", // deep space purple
        "rgba(0, 32, 96, 0.3)", // midnight blue
        "rgba(128, 0, 128, 0.15)", // subtle purple
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation loop
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(8, 8, 24, 1)") // deep night sky
      gradient.addColorStop(0.5, "rgba(16, 16, 32, 1)") // midnight blue
      gradient.addColorStop(1, "rgba(24, 16, 40, 0.95)") // deep space
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebulas
      nebulas.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius)
        gradient.addColorStop(0, nebula.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.globalAlpha = nebula.opacity
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw stars
      ctx.globalAlpha = 1
      stars.forEach((star) => {
        // Update star position
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        // Draw star with subtle twinkling effect
        const twinkle = 0.7 + Math.sin(Date.now() * 0.001 + star.x) * 0.3
        const starOpacity = star.opacity * twinkle

        // Choose star color (mostly white with occasional blue or gold tint)
        const colorRand = Math.random()
        let starColor
        if (colorRand > 0.9) {
          starColor = `rgba(200, 220, 255, ${starOpacity})` // blue-white
        } else if (colorRand > 0.8) {
          starColor = `rgba(255, 240, 220, ${starOpacity})` // gold-white
        } else {
          starColor = `rgba(255, 255, 255, ${starOpacity})` // pure white
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = starColor
        ctx.fill()

        // Add subtle glow to larger stars
        if (star.radius > 1) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2)
          ctx.fillStyle = starColor.replace(")", ", 0.1)")
          ctx.fill()
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" style={{ background: "black" }} />
}

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
}

interface Nebula {
  x: number
  y: number
  radius: number
  color: string
  opacity: number
}

