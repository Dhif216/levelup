import React from 'react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  isMenuOpen: boolean;
  onMenuClose: () => void;
}

const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  onMenuClick,
  isMenuOpen,
  onMenuClose,
}) => {
  return (
    <>
      {/* Sticky Top Marquee Banner */}
      <div className="bg-neon-green text-black overflow-hidden py-2 border-b-2 border-black sticky top-0 z-50 font-bold uppercase tracking-wider text-xs flex">
        <div className="marquee flex gap-16 shrink-0 items-center animate-scroll">
          <span>⚡ LEVELUP SEASONS DROP LIVE ⚡ CODE: LVLUP10 FOR 10% OFF</span>
          <span>⚡ HEAVYWEIGHT 450GSM COTTON GARMENTS ONLY</span>
          <span>⚡ DESIGNED IN FINLAND FOR THE UNBOUNDED GENERATION</span>
          <span>⚡ FREE SHIPPING OVER €100</span>
          <span>⚡ LEVELUP SEASONS DROP LIVE ⚡ CODE: LVLUP10 FOR 10% OFF</span>
          <span>⚡ HEAVYWEIGHT 450GSM COTTON GARMENTS ONLY</span>
          <span>⚡ DESIGNED IN FINLAND FOR THE UNBOUNDED GENERATION</span>
          <span>⚡ FREE SHIPPING OVER €100</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-black/80 backdrop-blur-md border-b border-zinc-900 sticky top-[34px] z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="flex flex-col justify-around w-6 h-6 group focus:outline-none"
            >
              <span
                className={`h-0.5 w-full bg-white transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : ''
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-white transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                }`}
              ></span>
            </button>
            <a href="#" className="font-bold text-xl tracking-tighter text-white">
              LVL<span className="text-neon-green">UP.</span>
            </a>
          </div>

          <div className="hidden md:flex space-x-8 uppercase text-xs font-bold tracking-widest">
            <a href="#shop" className="text-neon-green underline decoration-2 underline-offset-4">
              New Arrivals
            </a>
            <a href="#shop" className="hover:text-neon-green transition-colors">
              Hoodies
            </a>
            <a href="#shop" className="hover:text-neon-green transition-colors">
              Tracksuits
            </a>
            <a href="#shop" className="hover:text-neon-green transition-colors">
              T-Shirts
            </a>
          </div>

          <button
            onClick={onCartClick}
            className="bg-zinc-900 hover:bg-neon-green hover:text-black text-white p-2 px-3 border border-zinc-800 transition-all font-bold text-xs flex items-center space-x-2"
          >
            <i className="fas fa-bag-shopping"></i>
            <span>{cartCount}</span>
          </button>
        </div>
      </nav>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-30 top-[98px]"
            onClick={onMenuClose}
          ></div>
          <nav className="fixed left-0 top-[98px] w-full max-w-md h-screen bg-card-black border-r border-zinc-900 z-40 p-8 overflow-y-auto">
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase font-bold text-zinc-500 mb-4">Shop</p>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#shop"
                      onClick={onMenuClose}
                      className="text-lg font-bold hover:text-neon-green transition-colors"
                    >
                      New Hoodies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#shop"
                      onClick={onMenuClose}
                      className="text-lg font-bold hover:text-neon-green transition-colors"
                    >
                      Limited Batches
                    </a>
                  </li>
                  <li>
                    <a
                      href="#shop"
                      onClick={onMenuClose}
                      className="text-lg font-bold hover:text-neon-green transition-colors"
                    >
                      Oversize Fits
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-zinc-500 mb-4">Account</p>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-sm hover:text-neon-green transition-colors">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm hover:text-neon-green transition-colors">
                      Track Order
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
