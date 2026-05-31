import { useState } from 'react'
import { Link } from 'react-router-dom'
import skaPng from '../assets/png ska.png'
import heroPng from '../assets/hero1.png'

type CartItem = {
  id: number
  title: string
  price: number
  size: string
  quantity: number
}

type AboutProps = {
  cartItems: CartItem[]
  setCartItems: (items: CartItem[]) => void
}

export default function About({ cartItems, setCartItems }: AboutProps) {
  const [cartOpen, setCartOpen] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showZoom, setShowZoom] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index)
    } else {
      const updated = [...cartItems]
      updated[index].quantity = quantity
      setCartItems(updated)
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* Global Navbar - Synced with App */}
      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-8 md:px-16 py-5 transition-all duration-300">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-2 h-2 bg-secondary-fixed rounded-full"></div>
          <div className="text-lg md:text-xl font-mono font-bold tracking-widest text-secondary uppercase">LEVELUP</div>
        </Link>
        
        <div className="hidden md:flex items-center gap-12">
          <Link className="relative text-secondary font-mono text-xs tracking-widest uppercase font-bold group/link transition-all duration-300 hover:text-secondary-fixed" to="/">
            SHOP
          </Link>
          <Link className="relative text-secondary font-mono text-xs tracking-widest uppercase font-bold group/link transition-all duration-300 hover:text-secondary-fixed" to="/catalog">
            DROPS
          </Link>
          <Link className="relative text-secondary-fixed font-mono text-xs tracking-widest uppercase font-bold group/link transition-all duration-300 border-b border-secondary-fixed pb-1" to="/about">
            ABOUT
          </Link>
        </div>

        <button
          onClick={() => setCartOpen(!cartOpen)}
          className="relative p-3 rounded-lg hover:bg-secondary-fixed/20 transition-all text-secondary-fixed outline-none ring-0 border-none overflow-visible"
        >
          <span className="material-symbols-outlined text-2xl">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary-fixed text-black text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center outline-none ring-0 border-none shadow-lg">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-30 flex justify-end">
          <div onClick={() => setCartOpen(false)} className="absolute inset-0 bg-black/40"></div>
          <div className="relative bg-background w-full max-w-md h-full overflow-hidden shadow-2xl flex flex-col rounded-l-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="font-mono font-bold text-secondary-fixed uppercase text-lg">CART</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-secondary-fixed/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-5xl text-secondary-fixed/30 mb-4">shopping_bag</span>
                  <p className="text-on-surface-variant text-sm">Your cart is empty</p>
                  <p className="text-on-surface-variant/60 text-xs mt-1">Add items from catalog</p>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="bg-background/50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-mono text-sm font-bold text-secondary uppercase line-clamp-2">{item.title}</h3>
                        <p className="text-xs text-on-surface-variant mt-1">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-on-surface-variant hover:text-secondary-fixed transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">close</span>
                      </button>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-secondary-fixed font-bold">${item.price}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          className="w-6 h-6 rounded hover:bg-secondary-fixed/20 flex items-center justify-center text-xs border border-secondary-fixed/40"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          className="w-6 h-6 rounded hover:bg-secondary-fixed/20 flex items-center justify-center text-xs border border-secondary-fixed/40"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-3">
                <div className="flex justify-between items-center py-3">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="text-secondary-fixed font-bold text-lg">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-secondary-fixed hover:bg-secondary text-black font-bold py-3 rounded-lg transition-colors uppercase font-mono text-xs tracking-wider">
                  CHECKOUT
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full border border-secondary-fixed text-secondary-fixed hover:bg-secondary-fixed/10 font-bold py-3 rounded-lg transition-colors uppercase font-mono text-xs tracking-wider"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <main>
        {/* Hero Section with Background Image */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroPng} 
              alt="LEVELUP Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50"></div>
          </div>
          <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-7xl mx-auto">
            <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest font-bold mb-4 block">Our Story</span>
            <h1 className="font-graffiti-clean text-6xl md:text-7xl lg:text-8xl text-secondary-fixed uppercase leading-tight mb-6">LEVELUP</h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
              Born from the streets, crafted for the culture. LEVELUP is more than streetwear—it's a movement for those who refuse to blend in.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link 
                to="/catalog" 
                className="px-8 py-4 bg-secondary-fixed text-black font-graffiti-clean text-lg uppercase rounded-lg hover:bg-secondary-fixed/80 transition-all duration-300 shadow-lg hover:shadow-secondary-fixed/40 border-2 border-secondary-fixed"
              >
                Shop Now
              </Link>
              <Link 
                to="/catalog" 
                className="px-8 py-4 border-2 border-secondary-fixed text-secondary-fixed font-graffiti-clean text-lg uppercase rounded-lg hover:bg-secondary-fixed/10 transition-all duration-300 shadow-lg"
              >
                Check Drops
              </Link>
            </div>
          </div>
        </section>

        {/* Story Section with Image */}
        <section className="px-8 md:px-16 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative overflow-visible">
            <div className="space-y-6">
              <h2 className="font-graffiti-clean text-5xl md:text-6xl text-secondary-fixed uppercase">The Beginning</h2>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                LEVELUP started in 2020 as a passion project from a group of streetwear enthusiasts who wanted to create pieces that tell a story. Every hoodie, every design is crafted with intention and respect for the culture.
              </p>
              <p className="text-on-surface-variant leading-relaxed text-lg">
                We source premium materials, work with local artists, and push boundaries in design. Quality isn't a compromise—it's our foundation.
              </p>
              <div className="pt-4">
                <span className="inline-block bg-secondary-fixed text-black font-mono text-xs font-bold px-4 py-2 rounded-lg tracking-wider">EST. 2020</span>
              </div>
            </div>
            <div className="relative h-96 md:h-full rounded-2xl overflow-visible shadow-2xl group/image">
              <img 
                src={skaPng} 
                alt="LEVELUP Origin"
                className="w-full h-full object-cover cursor-zoom-in rounded-2xl"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = ((e.clientX - rect.left) / rect.width) * 100
                  const y = ((e.clientY - rect.top) / rect.height) * 100
                  setZoomPosition({ x, y })
                  setMousePos({ x: e.clientX, y: e.clientY })
                }}
              />
              
              {/* Zoom Crosshair on Image */}
              {showZoom && (
                <div 
                  className="absolute w-20 h-20 border-3 border-secondary-fixed pointer-events-none rounded-lg"
                  style={{
                    left: `${zoomPosition.x}%`,
                    top: `${zoomPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 25px rgba(195, 244, 0, 0.8), inset 0 0 15px rgba(195, 244, 0, 0.4)'
                  }}
                ></div>
              )}
            </div>
            
            {/* Zoom Preview Box - Follows Mouse */}
            {showZoom && (
              <div 
                className="fixed w-80 h-80 rounded-xl border-4 border-secondary-fixed overflow-hidden shadow-2xl bg-black z-50"
                style={{
                  left: `${mousePos.x + 20}px`,
                  top: `${mousePos.y - 160}px`,
                  pointerEvents: 'none'
                }}
              >
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${skaPng})`,
                    backgroundSize: '400%',
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
                <div className="absolute inset-0 border-2 border-secondary-fixed/60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border-2 border-secondary-fixed/40 rounded-lg pointer-events-none"></div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Values Section */}
        <section className="px-8 md:px-16 py-20 max-w-7xl mx-auto">
          <h2 className="font-graffiti-clean text-5xl md:text-6xl text-secondary-fixed uppercase mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="group relative overflow-hidden rounded-2xl h-80 border-2 border-secondary-fixed/30 hover:border-secondary-fixed transition-all duration-300 shadow-lg">
              <img 
                src="https://picsum.photos/500/500?random=40" 
                alt="Quality"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-graffiti-clean text-3xl text-secondary-fixed uppercase mb-3">Quality</h3>
                <p className="text-gray-200 leading-relaxed text-sm">
                  Premium 450GSM French terry and heavyweight fabrics. We don't cut corners because our community deserves better.
                </p>
              </div>
            </div>

            {/* Culture */}
            <div className="group relative overflow-hidden rounded-2xl h-80 border-2 border-secondary-fixed/30 hover:border-secondary-fixed transition-all duration-300 shadow-lg">
              <img 
                src="https://picsum.photos/500/500?random=41" 
                alt="Culture"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-graffiti-clean text-3xl text-secondary-fixed uppercase mb-3">Culture</h3>
                <p className="text-gray-200 leading-relaxed text-sm">
                  We celebrate street art, skateboarding, and the voices that shape modern culture. This is for the creators.
                </p>
              </div>
            </div>

            {/* Community */}
            <div className="group relative overflow-hidden rounded-2xl h-80 border-2 border-secondary-fixed/30 hover:border-secondary-fixed transition-all duration-300 shadow-lg">
              <img 
                src="https://picsum.photos/500/500?random=42" 
                alt="Community"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-graffiti-clean text-3xl text-secondary-fixed uppercase mb-3">Community</h3>
                <p className="text-gray-200 leading-relaxed text-sm">
                  LEVELUP is built by the community, for the community. Every piece carries the energy of those who wear it.
                </p>
              </div>
            </div>

            {/* Innovation */}
            <div className="group relative overflow-hidden rounded-2xl h-80 border-2 border-secondary-fixed/30 hover:border-secondary-fixed transition-all duration-300 shadow-lg">
              <img 
                src="https://picsum.photos/500/500?random=43" 
                alt="Innovation"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-graffiti-clean text-3xl text-secondary-fixed uppercase mb-3">Innovation</h3>
                <p className="text-gray-200 leading-relaxed text-sm">
                  We constantly push design boundaries and experiment with new technologies to create groundbreaking streetwear.
                </p>
              </div>
            </div>

            {/* Authenticity */}
            <div className="group relative overflow-hidden rounded-2xl h-80 border-2 border-secondary-fixed/30 hover:border-secondary-fixed transition-all duration-300 shadow-lg">
              <img 
                src="https://picsum.photos/500/500?random=44" 
                alt="Authenticity"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-graffiti-clean text-3xl text-secondary-fixed uppercase mb-3">Authenticity</h3>
                <p className="text-gray-200 leading-relaxed text-sm">
                  Every piece tells a real story. We stay true to our roots and never compromise our vision for trends.
                </p>
              </div>
            </div>

            {/* Sustainability */}
            <div className="group relative overflow-hidden rounded-2xl h-80 border-2 border-secondary-fixed/30 hover:border-secondary-fixed transition-all duration-300 shadow-lg">
              <img 
                src="https://picsum.photos/500/500?random=45" 
                alt="Sustainability"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/0"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="font-graffiti-clean text-3xl text-secondary-fixed uppercase mb-3">Sustainability</h3>
                <p className="text-gray-200 leading-relaxed text-sm">
                  We're committed to ethical production and environmentally responsible practices for a better future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section with Real Images */}
        <section className="px-8 md:px-16 py-20 max-w-7xl mx-auto">
          <h2 className="font-graffiti-clean text-5xl md:text-6xl text-secondary-fixed uppercase mb-16">The Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Alex', role: 'Founder & Design', id: 32 },
              { name: 'Jordan', role: 'Production', id: 33 },
              { name: 'Sam', role: 'Community', id: 34 },
              { name: 'Casey', role: 'Visuals', id: 35 }
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg mb-4 border border-secondary-fixed/30 group-hover:border-secondary-fixed/80 transition-all duration-300">
                  <img 
                    src={`https://picsum.photos/400/400?random=${member.id}`} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="font-mono font-bold text-secondary-fixed uppercase mb-2 text-lg">{member.name}</h3>
                <p className="text-on-surface-variant text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section with Background */}
        <section className="relative px-8 md:px-16 py-24 max-w-7xl mx-auto text-center">
          <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden">
            <img 
              src="https://picsum.photos/1200/600?random=36" 
              alt="Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-fixed/5 to-primary/5"></div>
          </div>
          <h2 className="font-graffiti-clean text-5xl md:text-6xl text-secondary-fixed uppercase mb-6">Join The Movement</h2>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-8">
            LEVELUP isn't just clothing. It's a community of creators, artists, and individuals who push boundaries.
          </p>
          <Link to="/catalog" className="inline-block bg-secondary-fixed hover:bg-secondary text-black font-bold px-12 py-4 rounded-lg transition-all duration-300 uppercase font-mono text-sm tracking-widest shadow-lg hover:shadow-xl hover:shadow-secondary-fixed/40">
            Shop Collection
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-secondary-fixed/20 mt-20">
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
