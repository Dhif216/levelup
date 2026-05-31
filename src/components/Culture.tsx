import React from 'react';

const Culture: React.FC = () => {
  return (
    <section className="bg-zinc-950 py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter">SPOTTED ON THE STREETS</h3>
          <p className="text-zinc-500 text-xs mt-1">Tag @LevelUp.Outfit to get featured</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500',
            'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=500',
            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=500',
            'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=500',
          ].map((img, idx) => (
            <div key={idx} className="aspect-square bg-zinc-900 overflow-hidden relative group border border-zinc-800">
              <img
                src={img}
                alt={`Lookbook ${idx + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Culture;
