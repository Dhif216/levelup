import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  tag: string;
  img: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "FEARLESS SOUL - HOODIE",
    price: 89.00,
    tag: "450GSM BOXY",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "FAITH OVER FEAR - HOODIE",
    price: 89.00,
    tag: "450GSM BOXY",
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "LEVELUP GENERATION - TEE",
    price: 37.00,
    tag: "305GSM OVERSIZED",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "STAY HUMBLE - OVERSIZED TEE",
    price: 37.00,
    tag: "305GSM OVERSIZED",
    img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "HN SIGNATURE OVERSIZED SET",
    price: 160.00,
    tag: "PREMIUM DROPSET",
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "VICTORY TRUCKER CAP",
    price: 27.50,
    tag: "EDITION 04",
    img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800"
  }
];

interface ShopProps {
  onAddToCart: (product: Product, size: string) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [selectedSizes, setSelectedSizes] = React.useState<{ [key: number]: string }>({});

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: Product) => {
    const size = selectedSizes[product.id] || 'M';
    onAddToCart(product, size);
  };

  return (
    <section id="shop" className="py-20 max-w-7xl mx-auto px-4">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-neon-green text-xs font-mono mb-2">// RELAXED CROP FITS / 450GSM BOXY HEAVYWEIGHT</div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">THE OVERSIZED CUTS</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs uppercase font-bold tracking-wider">
          <button className="bg-neon-green text-black px-4 py-2">All Grails</button>
          <button className="bg-zinc-900 text-zinc-400 hover:text-white px-4 py-2 border border-zinc-800">Hoodies</button>
          <button className="bg-zinc-900 text-zinc-400 hover:text-white px-4 py-2 border border-zinc-800">Tees</button>
          <button className="bg-zinc-900 text-zinc-400 hover:text-white px-4 py-2 border border-zinc-800">Sets</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="group border-2 border-zinc-900 bg-black hover:border-neon-pink hover:shadow-lg transition-all duration-300 flex flex-col relative">
            <div className="aspect-[4/5] bg-zinc-950 overflow-hidden relative border-b-2 border-zinc-900">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-black border border-zinc-800 text-white font-mono text-[9px] uppercase px-2 py-1 tracking-wider z-10">
                {product.tag}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between bg-black">
              <div>
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wide text-white group-hover:text-neon-green transition-colors leading-tight">
                  {product.title}
                </h3>
                <div className="text-sm font-mono mt-1 text-zinc-400">€{product.price.toFixed(2)}</div>
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-900">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-2">Select Fit Size:</span>
                <div className="flex gap-2 text-[10px] font-mono font-bold">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(product.id, size)}
                      className={`w-7 h-7 flex items-center justify-center border transition-colors ${
                        selectedSizes[product.id] === size
                          ? 'bg-neon-green text-black border-neon-green'
                          : 'bg-zinc-900 hover:bg-neon-green hover:text-black text-white border-zinc-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-white text-black py-3 font-black text-[10px] uppercase tracking-wider hover:bg-neon-green transition-colors"
                >
                  GRAB PIECE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Shop;
