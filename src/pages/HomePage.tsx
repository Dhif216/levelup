import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type CartItem = {
  id: number
  title: string
  price: number
  size: string
  quantity: number
}

type HomePageProps = {
  cartItems: CartItem[]
  setCartItems: (items: CartItem[]) => void
}

type ProductSlide = {
  image: string
  title: string
  description: string
  angle: string
}

const PRODUCT_SLIDES: ProductSlide[] = [
  {
    image: 'https://p16-oec-general-useast5.ttcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/703e012f2e2843728df387388660e8ea~tplv-fhlh96nyum-resize-webp:800:800.webp?dr=12190&t=555f072d&ps=933b5bde&shp=8dbd94bf&shcp=948674b7&idc=useast5&from=2378011839',
    title: 'Full Product Shot',
    description: 'Complete front view showcasing the premium fit and silhouette',
    angle: 'FRONT'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcxN7ltVeTdcxsTN4eN5vnnY2B_GfDElyYh4KGnDF3q_Shr2v8kHbog-qOW03LzP15QVkXj4A3wSJM5IF8h-PasL6nU0Z5cmjTkmqUmyw-dbIM61cCb83AeHWOMHda3j4o4r-I8qLu4zELollGEfaD1EyKImX13MQnQ_ihlQobLM1aM0AYz0Ah5xFXTeeOyfSsGcQXGGdw-Sfyawt43zLBoX1DwKw-GqAfw2yd_D1sCzRI4OOXb7qCR8FvGErohdE_NdB2pAeGew',
    title: 'Fabric Detail',
    description: 'Up close look at the 450GSM French terry texture & stitching',
    angle: 'DETAIL'
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhazFO-L1lG_3PpoYNePRCneGXvwy2GUzMtdNOBhoGV_-JaUjtlqbptX73Zg9hsjDaBDw26XlCFId8uG61XOjKcy7wEBRqmU4HG9yIREQOawqoGHMhphoYj-mo3JUgi3NT6LSQ9DXrfBikpb9pf8F4K7S78ledmFzEQ_xa5lqNvQLYsfQ0_V_N4EaGy1UuYhlRkC3B2YxewaMgjwrMxWKQAd0ZV-7sFJBpBWydPv-Q71j4Q1skI7ER5XIDWtCGGaCvcJYiqtw9aw',
    title: 'Authentic Wear',
    description: 'Real skater in action—see how the hoodie performs on the streets',
    angle: 'ACTION'
  }
]

export default function HomePage({ cartItems, setCartItems }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroImgRef = useRef<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Canvas spray logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * devicePixelRatio
    canvas.height = window.innerHeight * devicePixelRatio
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`
    context.scale(devicePixelRatio, devicePixelRatio)

    let isUserSpraying = false
    let mousePosition = { x: 0, y: 0 }
    let currentHue = 0
    let animationFrameId = 0
    const activeParticles: any[] = []

    class PaintSplatter {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      alpha: number
      spawnTime: number
      lifespan: number
      fadeSpeed: number
      stretchX: number
      stretchY: number
      rotation: number
      jaggedPoints: number[]
      numPoints: number
      isDrip: boolean
      dripDistance: number
      currentDrip: number

      constructor(x: number, y: number, vx: number, vy: number, radius: number, color: string) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.radius = radius
        this.color = color
        this.alpha = 1
        this.spawnTime = Date.now()
        this.lifespan = 5000
        this.fadeSpeed = 0.015
        this.stretchX = 0.8 + Math.random() * 0.4
        this.stretchY = 0.8 + Math.random() * 0.4
        this.rotation = Math.random() * Math.PI * 2
        this.numPoints = 6 + Math.floor(Math.random() * 6)
        this.jaggedPoints = []
        for (let i = 0; i < this.numPoints; i++) {
          this.jaggedPoints.push(0.85 + Math.random() * 0.3)
        }
        this.isDrip = Math.random() > 0.93
        this.dripDistance = Math.random() * 50 + 10
        this.currentDrip = 0
      }

      update() {
        this.vx *= 0.88
        this.vy *= 0.88
        this.x += this.vx
        this.y += this.vy
        if (Date.now() - this.spawnTime > this.lifespan) {
          this.alpha -= this.fadeSpeed
        }
      }

      draw(drawContext: CanvasRenderingContext2D) {
        if (this.alpha <= 0) return
        drawContext.save()
        drawContext.globalAlpha = this.alpha
        drawContext.fillStyle = this.color
        drawContext.translate(this.x, this.y)
        drawContext.rotate(this.rotation)
        drawContext.scale(this.stretchX, this.stretchY)
        drawContext.beginPath()
        for (let i = 0; i < this.numPoints; i++) {
          const angle = (i / this.numPoints) * Math.PI * 2
          const dynamicRadius = this.radius * this.jaggedPoints[i]
          const pointX = Math.cos(angle) * dynamicRadius
          const pointY = Math.sin(angle) * dynamicRadius
          if (i === 0) drawContext.moveTo(pointX, pointY)
          else drawContext.lineTo(pointX, pointY)
        }
        drawContext.closePath()
        drawContext.fill()
        drawContext.restore()

        if (this.isDrip && Math.abs(this.vx) < 0.15 && this.currentDrip < this.dripDistance) {
          this.currentDrip += Math.random() * 0.8
          drawContext.save()
          drawContext.globalAlpha = this.alpha
          drawContext.fillStyle = this.color
          const dripWidth = this.radius * 0.5 * (1 - (this.currentDrip / this.dripDistance) * 0.4)
          drawContext.fillRect(this.x - dripWidth / 2, this.y, dripWidth, this.currentDrip)
          drawContext.restore()
        }
      }
    }

    const injectSprayBurst = (originX: number, originY: number, density: number, baseSpeed: number, paintColor: string) => {
      for (let i = 0; i < density; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.pow(Math.random(), 1.8) * baseSpeed
        const radius = Math.random() > 0.85 ? Math.random() * 14 + 6 : Math.random() * 4 + 0.8
        activeParticles.push(
          new PaintSplatter(originX, originY, Math.cos(angle) * speed, Math.sin(angle) * speed, radius, paintColor),
        )
      }
    }

    const getCanvasCoordinates = (event: MouseEvent | TouchEvent) => {
      const touch = (event as TouchEvent).touches?.[0]
      const clientX = touch?.clientX ?? (event as MouseEvent).clientX
      const clientY = touch?.clientY ?? (event as MouseEvent).clientY
      return { x: clientX, y: clientY }
    }

    const startSpraying = (e: MouseEvent | TouchEvent) => {
      isUserSpraying = true
      mousePosition = getCanvasCoordinates(e)
    }

    const updateSprayPosition = (e: MouseEvent | TouchEvent) => {
      if (!isUserSpraying) return
      if ('cancelable' in e && e.cancelable) e.preventDefault()
      mousePosition = getCanvasCoordinates(e)
    }

    const stopSpraying = () => {
      isUserSpraying = false
    }

    const frameUpdate = () => {
      if (isUserSpraying) {
        currentHue = (currentHue + 3) % 360
        injectSprayBurst(mousePosition.x, mousePosition.y, 3, 8, `hsl(${currentHue}, 100%, 55%)`)
      }

      context.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (activeParticles.length > 500) {
        activeParticles.splice(0, activeParticles.findIndex((p) => p.alpha > 0.01))
      }
      activeParticles.forEach((particle) => {
        particle.update()
        particle.draw(context)
      })
      animationFrameId = window.requestAnimationFrame(frameUpdate)
    }

    const handleResize = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * devicePixelRatio
      canvas.height = window.innerHeight * devicePixelRatio
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.scale(devicePixelRatio, devicePixelRatio)
    }

    canvas.addEventListener('mousedown', startSpraying)
    canvas.addEventListener('mousemove', updateSprayPosition)
    canvas.addEventListener('mouseup', stopSpraying)
    canvas.addEventListener('touchstart', startSpraying, { passive: false })
    canvas.addEventListener('touchmove', updateSprayPosition, { passive: false })
    canvas.addEventListener('touchend', stopSpraying)
    window.addEventListener('resize', handleResize)

    animationFrameId = window.requestAnimationFrame(frameUpdate)

    return () => {
      canvas.removeEventListener('mousedown', startSpraying)
      canvas.removeEventListener('mousemove', updateSprayPosition)
      canvas.removeEventListener('mouseup', stopSpraying)
      canvas.removeEventListener('touchstart', startSpraying)
      canvas.removeEventListener('touchmove', updateSprayPosition)
      canvas.removeEventListener('touchend', stopSpraying)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroImgRef.current) {
        const scroll = window.pageYOffset
        heroImgRef.current.style.transform = `translateY(${scroll * 0.4}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % PRODUCT_SLIDES.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-background text-on-background selection:bg-secondary-fixed selection:text-black">
      {/* Hero Section */}
      <header className="relative w-full flex items-center overflow-hidden" style={{ minHeight: '100vh' }} id="shop">
        <div className="absolute inset-0 z-0">
          <img
            ref={heroImgRef}
            alt="Hero background"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZsT_6WQe__B3vb3UumVockM0iNef3HkeT6EYQ8SjAWOr8-WtqQZDtQI1wKUV5rdI1eNCOQhhIxG8h_qyJXAtb8J1tufBFijZFJks-Ni0OPg9dCb2psews9nRt8OvZuxGq0VvPHdgHOO8PguQKByCZy5sUBNeVOuW7d_YTUWCulB3orzFgsUM0isCGmVxiRm8kzGptCe0W9R5rEZHH4nWUvvxYrnkmQvh5PNjRPQ70iC1WROxVjqm2uiMHmYAEimg0fezaMCCiMg"
          />
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full px-8 md:px-16 max-w-6xl mx-auto space-y-10">
          <div className="max-w-2xl space-y-8">
            <div>
              <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest font-bold mb-4 block">Drop 01</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl text-secondary uppercase leading-tight tracking-tight font-graffiti-clean mb-6">
                HEAVYWEIGHT<br />COMFORT.<br />MADE FOR<br />THE STREETS.
              </h1>
            </div>
          </div>
          <div className="absolute top-1/2 right-8 md:right-16 transform -translate-y-1/2 max-w-xs">
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
              Premium 450GSM French terry. Built for durability. Designed for skaters who demand quality that lasts.
            </p>
          </div>
        </div>

        {/* Canvas overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 cursor-crosshair w-full h-full pointer-events-auto"
          id="spray-canvas"
          style={{ touchAction: 'none' }}
        ></canvas>

        {/* CTA Buttons */}
        <div className="absolute bottom-12 left-8 md:left-16 z-50 flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <Link to="/catalog" className="group relative bg-secondary-fixed text-black font-button-text text-button-text py-5 px-12 uppercase transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 font-bold tracking-widest shadow-xl hover:shadow-2xl overflow-hidden rounded-lg pointer-events-auto inline-block text-center">
            <span className="relative z-10">SHOP THE DROP</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-0"></div>
          </Link>
          <button className="group border-2 border-secondary text-secondary font-button-text text-button-text py-5 px-12 uppercase transition-all duration-300 hover:bg-secondary/20 hover:border-secondary-fixed hover:text-secondary-fixed active:scale-95 font-bold tracking-widest backdrop-blur-sm rounded-lg pointer-events-auto">
            EXPLORE LOOKBOOK
          </button>
        </div>
      </header>

      {/* Details Section */}
      <section className="px-8 md:px-16 py-24 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-graffiti-clean text-5xl md:text-6xl text-secondary uppercase mb-8">DETAILS MATTER</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
                Premium materials. Expert craftsmanship. Built for those who demand quality.
              </p>
              <Link to="/catalog" className="bg-secondary-fixed text-black font-bold py-3 px-8 rounded-lg hover:bg-white transition-colors inline-block">
                VIEW COLLECTION
              </Link>
            </div>
            <div className="bg-surface-container aspect-video rounded-lg flex items-center justify-center">
              <img
                key={currentSlide}
                alt={PRODUCT_SLIDES[currentSlide].title}
                className="w-full h-full object-cover rounded-lg animate-fadeIn"
                src={PRODUCT_SLIDES[currentSlide].image}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-surface-container-low border-t border-white/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-secondary-fixed rounded-full"></div>
                <h3 className="font-graffiti-clean text-2xl text-secondary-fixed uppercase tracking-wide">LEVELUP</h3>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Premium streetwear for the culture. Built by skaters, for skaters.
              </p>
            </div>
            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-secondary-fixed uppercase tracking-widest font-bold">SHOP</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-on-surface-variant hover:text-secondary-fixed transition-colors">Home</a></li>
                <li><a href="/catalog" className="text-on-surface-variant hover:text-secondary-fixed transition-colors">Catalog</a></li>
                <li><a href="/about" className="text-on-surface-variant hover:text-secondary-fixed transition-colors">About Us</a></li>
              </ul>
            </div>
            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-secondary-fixed uppercase tracking-widest font-bold">SUPPORT</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-on-surface-variant hover:text-secondary-fixed transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-on-surface-variant hover:text-secondary-fixed transition-colors">Shipping Info</a></li>
                <li><a href="#" className="text-on-surface-variant hover:text-secondary-fixed transition-colors">Returns</a></li>
              </ul>
            </div>
            {/* Social */}
            <div className="space-y-4">
              <h4 className="font-mono text-xs text-secondary-fixed uppercase tracking-widest font-bold">CONNECT</h4>
              <div className="flex gap-4">
                <a href="#" className="text-on-surface-variant hover:text-secondary-fixed transition-colors">
                  <span className="material-symbols-outlined">public</span>
                </a>
                <a href="#" className="text-on-surface-variant hover:text-secondary-fixed transition-colors">
                  <span className="material-symbols-outlined">mail</span>
                </a>
                <a href="#" className="text-on-surface-variant hover:text-secondary-fixed transition-colors">
                  <span className="material-symbols-outlined">phone</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
            <p>&copy; 2024 LEVELUP. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-secondary-fixed transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary-fixed transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-secondary-fixed transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
