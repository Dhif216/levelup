import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Catalog from './pages/Catalog'
import About from './pages/About'

type CartItem = {
  id: number
  title: string
  price: number
  size: string
  quantity: number
}

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    <Router>
      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-8 md:px-16 py-5 bg-background/40 backdrop-blur-md transition-all duration-300">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
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
          <Link className="relative text-secondary font-mono text-xs tracking-widest uppercase font-bold group/link transition-all duration-300 hover:text-secondary-fixed" to="/about">
            ABOUT
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-secondary-fixed hover:bg-secondary-fixed/20 rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

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
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-20 left-0 w-full bg-background/95 backdrop-blur-md z-30 md:hidden border-b border-secondary-fixed/20">
          <div className="p-6 space-y-4">
            <Link 
              className="block text-secondary font-mono text-sm tracking-widest uppercase font-bold hover:text-secondary-fixed transition-colors py-3 border-b border-white/10" 
              to="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              SHOP
            </Link>
            <Link 
              className="block text-secondary font-mono text-sm tracking-widest uppercase font-bold hover:text-secondary-fixed transition-colors py-3 border-b border-white/10" 
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
            >
              DROPS
            </Link>
            <Link 
              className="block text-secondary font-mono text-sm tracking-widest uppercase font-bold hover:text-secondary-fixed transition-colors py-3" 
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-background to-background/95 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6">
              <h2 className="text-2xl font-mono font-bold text-secondary-fixed uppercase tracking-wide">Cart</h2>
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
                    <div className="text-right text-xs text-on-surface-variant">
                      Subtotal: ${item.price * item.quantity}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-on-surface-variant">Total:</span>
                  <span className="text-xl font-bold text-secondary-fixed">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-secondary-fixed text-black font-bold py-3 rounded-lg hover:bg-white transition-all uppercase tracking-wide text-sm">
                  Checkout
                </button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-secondary-fixed font-mono py-2 rounded-lg hover:bg-secondary-fixed/10 transition-all uppercase tracking-wide text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/catalog" element={<Catalog cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/about" element={<About cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
    </Router>
  )
}

export default App
