import { useState } from 'react'
import { Link } from 'react-router-dom'

type CartItem = {
  id: number
  title: string
  price: number
  size: string
  quantity: number
}

type CatalogProps = {
  cartItems: CartItem[]
  setCartItems: (items: CartItem[]) => void
}

const HoloAdStyle = `
  @keyframes holoFloat {
    0%, 100% { transform: translateY(0px) rotateX(0deg); }
    50% { transform: translateY(-10px) rotateX(2deg); }
  }
  @keyframes pokemonShine {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); opacity: 0; }
    25% { opacity: 0.3; }
    50% { opacity: 0.5; }
    75% { opacity: 0.3; }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); opacity: 0; }
  }
  .holo-container {
    perspective: 1200px;
    animation: holoFloat 6s ease-in-out infinite;
  }
  .holo-inner {
    position: relative;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(2px);
  }
  .holo-inner::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%);
    animation: pokemonShine 5s infinite;
    pointer-events: none;
    opacity: 0.5;
  }
  .holo-inner::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }
`

type Product = {
  id: number
  title: string
  color: string
  price: number
  image: string
  category: 'hoodies' | 'caps' | 'tees' | 'accessories'
  isNew?: boolean
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: '450GSM HEAVYWEIGHT HOODIE',
    color: 'JET BLACK',
    price: 120,
    image: 'https://picsum.photos/400/500?random=1',
    category: 'hoodies',
    isNew: true
  },
  {
    id: 2,
    title: 'PREMIUM FRENCH TERRY HOODIE',
    color: 'CHARCOAL',
    price: 110,
    image: 'https://picsum.photos/400/500?random=2',
    category: 'hoodies'
  },
  {
    id: 3,
    title: 'OVERSIZED SKATE HOODIE',
    color: 'MIDNIGHT',
    price: 115,
    image: 'https://picsum.photos/400/500?random=3',
    category: 'hoodies'
  },
  {
    id: 4,
    title: 'ULTRA-HEAVYWEIGHT HOODIE',
    color: 'SLATE',
    price: 125,
    image: 'https://picsum.photos/400/500?random=4',
    category: 'hoodies'
  },
  {
    id: 5,
    title: 'CLASSIC PULLOVER HOODIE',
    color: 'OBSIDIAN',
    price: 100,
    image: 'https://picsum.photos/400/500?random=5',
    category: 'hoodies'
  },
  {
    id: 6,
    title: 'PREMIUM DOUBLE-LINED HOODIE',
    color: 'EBONY',
    price: 130,
    image: 'https://picsum.photos/400/500?random=6',
    category: 'hoodies'
  },
  {
    id: 7,
    title: 'STREET SNAPBACK CAP',
    color: 'JET BLACK',
    price: 35,
    image: 'https://picsum.photos/400/500?random=7',
    category: 'caps',
    isNew: true
  },
  {
    id: 8,
    title: 'CLASSIC DAD CAP',
    color: 'LIME GREEN',
    price: 32,
    image: 'https://picsum.photos/400/500?random=8',
    category: 'caps'
  },
  {
    id: 9,
    title: 'TRUCKER CAP',
    color: 'CHARCOAL',
    price: 38,
    image: 'https://picsum.photos/400/500?random=9',
    category: 'caps'
  },
  {
    id: 10,
    title: 'GRAPHIC TEE',
    color: 'WHITE',
    price: 25,
    image: 'https://picsum.photos/400/500?random=10',
    category: 'tees',
    isNew: true
  },
  {
    id: 11,
    title: 'OVERSIZED TEE',
    color: 'JET BLACK',
    price: 28,
    image: 'https://picsum.photos/400/500?random=11',
    category: 'tees'
  },
  {
    id: 12,
    title: 'PREMIUM COTTON TEE',
    color: 'CHARCOAL',
    price: 30,
    image: 'https://picsum.photos/400/500?random=12',
    category: 'tees'
  },
  {
    id: 13,
    title: 'STREETWEAR SOCKS PACK',
    color: 'ASSORTED',
    price: 15,
    image: 'https://picsum.photos/400/500?random=13',
    category: 'accessories'
  },
  {
    id: 14,
    title: 'CHAIN NECKLACE',
    color: 'SILVER',
    price: 45,
    image: 'https://picsum.photos/400/500?random=14',
    category: 'accessories'
  }
]

export default function Catalog({ cartItems, setCartItems }: CatalogProps) {
  const [sortBy, setSortBy] = useState('newest')
  const [selectedSize, setSelectedSize] = useState<{ [key: number]: string }>({})
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hoodies' | 'caps' | 'tees' | 'accessories'>('all')
  const [showCategoryMenu, setShowCategoryMenu] = useState(false)

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory)

  const addToCart = (product: Product) => {
    const size = selectedSize[product.id] || 'M'
    const existingItem = cartItems.find(item => item.id === product.id && item.size === size)
    
    if (existingItem) {
      const updatedItems = cartItems.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      setCartItems(updatedItems)
    } else {
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        size,
        quantity: 1
      }
      setCartItems([...cartItems, newItem])
    }
    // Reset size selection after adding
    setSelectedSize({ ...selectedSize, [product.id]: '' })
  }

  return (
    <div className="bg-background text-on-background min-h-screen pt-20">
      {/* Full-Screen Hero Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <img 
          src="https://files.cdn.printful.com/o/upload/bfl-image/fa/25611_l_Bold,%20vibrant%20colors.jpg"
          alt="Street Skater Hoodie Collection"
          className="w-full h-full object-cover absolute inset-0"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-20 gap-8 max-w-4xl z-10">
          <div>
            <span className="font-mono text-sm text-secondary-fixed uppercase tracking-widest font-bold block mb-4">🛹 Street Skate Culture</span>
            <h2 className="font-graffiti-clean text-6xl md:text-8xl text-secondary-fixed uppercase leading-tight">FRESH DROPS</h2>
          </div>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl font-light">
            Discover our latest collection of heavyweight hoodies inspired by street skate culture. Limited quantities available. Exclusive designs dropping now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button className="bg-secondary-fixed hover:bg-white text-black font-bold px-12 py-5 rounded-lg transition-all hover:scale-105 uppercase font-mono text-base tracking-wider shadow-lg">
              Shop Collection
            </button>
            <button className="border-2 border-secondary-fixed text-secondary-fixed hover:bg-secondary-fixed/10 font-bold px-12 py-5 rounded-lg transition-all uppercase font-mono text-base tracking-wider">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Catalog Header */}
        <header className="py-16 md:py-24 border-b border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest font-bold mb-3 block">SPRING / SUMMER 2024</span>
              <h1 className="font-headline-xl text-6xl md:text-7xl uppercase text-secondary font-black">THE CATALOG</h1>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-on-surface-variant uppercase tracking-widest">
              <span className="text-secondary text-lg font-bold">{filteredProducts.length}</span>
              <span>ITEMS AVAILABLE</span>
            </div>
          </div>
        </header>

        {/* Filter/Sort Bar */}
        <section className="sticky top-20 z-40 bg-background py-4 flex flex-wrap items-center justify-between gap-6 border-b border-white/10 mb-12">
          <div className="flex flex-wrap items-center gap-6">
            {/* Category Filter */}
            <div className="relative">
              <button 
                onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                className="flex items-center gap-2 font-mono text-xs text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest"
              >
                CATEGORY <span className={`material-symbols-outlined text-sm transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`}>keyboard_arrow_down</span>
              </button>
              {showCategoryMenu && (
                <div className="absolute top-full left-0 mt-2 bg-surface-container border border-white/10 rounded-lg shadow-lg z-50 min-w-48">
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setShowCategoryMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                      selectedCategory === 'all' ? 'bg-secondary-fixed/20 text-secondary-fixed' : 'text-on-surface-variant hover:text-secondary-fixed hover:bg-white/5'
                    }`}
                  >
                    ALL ITEMS
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('hoodies')
                      setShowCategoryMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                      selectedCategory === 'hoodies' ? 'bg-secondary-fixed/20 text-secondary-fixed' : 'text-on-surface-variant hover:text-secondary-fixed hover:bg-white/5'
                    }`}
                  >
                    HOODIES
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('caps')
                      setShowCategoryMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                      selectedCategory === 'caps' ? 'bg-secondary-fixed/20 text-secondary-fixed' : 'text-on-surface-variant hover:text-secondary-fixed hover:bg-white/5'
                    }`}
                  >
                    CAPS
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('tees')
                      setShowCategoryMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                      selectedCategory === 'tees' ? 'bg-secondary-fixed/20 text-secondary-fixed' : 'text-on-surface-variant hover:text-secondary-fixed hover:bg-white/5'
                    }`}
                  >
                    T-SHIRTS
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory('accessories')
                      setShowCategoryMenu(false)
                    }}
                    className={`w-full text-left px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                      selectedCategory === 'accessories' ? 'bg-secondary-fixed/20 text-secondary-fixed' : 'text-on-surface-variant hover:text-secondary-fixed hover:bg-white/5'
                    }`}
                  >
                    ACCESSORIES
                  </button>
                </div>
              )}
            </div>
            {/* Size Filter */}
            <div className="group relative">
              <button className="flex items-center gap-2 font-mono text-xs text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest">
                SIZE <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </button>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface-container-low border border-white/10 text-secondary font-mono text-xs px-3 py-2 rounded-lg focus:border-secondary-fixed outline-none uppercase tracking-widest"
            >
              <option value="newest">SORT: NEWEST</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col gap-2">
              <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden rounded-lg shadow-lg">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                  src={product.image}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm p-4">
                  <div className="flex gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize({ ...selectedSize, [product.id]: size })}
                        className={`px-3 py-1 rounded text-sm font-mono font-bold transition-all ${
                          selectedSize[product.id] === size
                            ? 'bg-secondary-fixed text-black'
                            : 'bg-white/20 text-white hover:bg-white/40'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-secondary-fixed text-black font-mono text-xs px-8 py-3 uppercase font-bold tracking-wider hover:bg-white transition-colors active:scale-95"
                  >
                    ADD TO CART
                  </button>
                </div>
                {/* Badge */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 border border-white/20 bg-black/60 px-3 py-1.5 backdrop-blur-md rounded-lg">
                    <span className="font-mono text-[10px] text-white uppercase font-bold tracking-wider">NEW DROP</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-mono text-sm text-secondary font-bold uppercase tracking-wider leading-tight">
                    {product.title}
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mt-1">
                    {product.color}
                  </p>
                </div>
                <span className="font-mono text-lg text-secondary-fixed font-bold whitespace-nowrap">
                  ${product.price}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* 3D Holographic Ad Hero Section */}
        <section className="py-20 border-t border-white/10 mt-12">
          <style>{HoloAdStyle}</style>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
            <div>
                <span className="font-mono text-xs text-white/60 uppercase tracking-widest font-bold">✨ Holographic Collection</span>
                <h2 className="font-graffiti-clean text-5xl md:text-6xl text-white uppercase mt-4 leading-tight">REVERSE EDITION</h2>
              </div>
              <p className="text-lg text-white/70 leading-relaxed max-w-md">
                Experience the future of streetwear. Limited edition collection featuring holographic finishes and iridescent depth perception technology.
              </p>
              <button className="bg-white text-black font-bold px-10 py-5 rounded-lg hover:scale-105 transition-transform uppercase font-mono text-sm tracking-wider shadow-xl hover:shadow-2xl">
                Explore Collection
              </button>
            </div>
            
            {/* Right: 3D Holographic Image */}
            <div className="holo-container h-[500px] flex items-center justify-center">
              <div className="holo-inner w-full h-full rounded-xl overflow-hidden relative">
                <img 
                  src="/pic.png"
                  alt="Holographic Edition"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary-fixed/20 via-transparent to-transparent mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-20 border-t border-white/10 text-center flex flex-col items-center gap-8">
          <h2 className="font-headline-lg text-4xl md:text-5xl uppercase text-secondary font-black max-w-2xl">
            NEVER MISS A DROP. JOIN THE INNER CIRCLE.
          </h2>
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
            <input
              className="flex-1 bg-surface-container-low border-b-2 border-white/10 focus:border-secondary-fixed outline-none px-4 py-3 text-secondary font-mono text-xs placeholder:text-on-surface-variant/40 uppercase tracking-widest transition-all rounded-lg focus:ring-2 focus:ring-secondary-fixed/20"
              placeholder="EMAIL ADDRESS"
              type="email"
            />
            <button className="bg-white hover:bg-secondary-fixed text-black font-mono text-xs px-8 py-3 uppercase font-bold tracking-wider transition-colors active:scale-95 whitespace-nowrap rounded-lg">
              SUBSCRIBE
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-white/10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary-fixed rounded-full"></div>
              <h2 className="text-2xl font-graffiti-clean text-secondary-fixed uppercase">LEVELUP</h2>
            </div>
            <p className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">© 2024 LEVELUP CLOTHING GROUP</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:justify-items-end">
            <div className="flex flex-col gap-3">
              <a className="font-mono text-xs text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest" href="#privacy">
                PRIVACY
              </a>
              <a className="font-mono text-xs text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest" href="#terms">
                TERMS
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a className="font-mono text-xs text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest" href="#shipping">
                SHIPPING
              </a>
              <a className="font-mono text-xs text-on-surface-variant hover:text-secondary-fixed transition-colors uppercase tracking-widest" href="#contact">
                CONTACT
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
