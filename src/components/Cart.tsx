import React from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  img: string;
  quantity: number;
  size?: string;
}

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number, size?: string) => void;
  onRemove: (id: number, size?: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onClose, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/80 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l-2 border-neon-green shadow-2xl z-50 flex flex-col transform transition-transform duration-300">
        {/* Header */}
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
          <span className="font-black uppercase text-white">BAG ITEMS</span>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-neon-green p-2 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <p className="text-zinc-600 text-xs font-mono tracking-wide text-center py-16 uppercase">
              // EMPTY BAG // NO GRAILS DETECTED
            </p>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-12 h-16 object-cover bg-zinc-900 border border-zinc-800"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-tight max-w-[180px] truncate">
                      {item.title}
                    </h4>
                    <span className="text-xs text-neon-green font-mono block mt-1">
                      €{item.price.toFixed(2)}
                    </span>
                    {item.size && (
                      <span className="text-xs text-zinc-500 block mt-1">Size: {item.size}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 border border-zinc-800 bg-zinc-950 p-1">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.size)}
                    className="text-zinc-400 hover:text-white px-1 text-xs"
                  >
                    −
                  </button>
                  <span className="text-xs text-white px-2 font-mono">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.size)}
                    className="text-zinc-400 hover:text-white px-1 text-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-900 bg-zinc-950 space-y-4">
          <div className="flex justify-between font-bold text-white uppercase text-sm tracking-wider">
            <span>TOTAL PRICE</span>
            <span className="text-neon-green">€{total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-neon-green text-black py-4 font-black text-xs uppercase tracking-widest hover:bg-white transition-colors">
            SECURE CHECKOUT →
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
