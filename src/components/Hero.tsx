import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000',
  ];

  return (
    <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-900 bg-black mt-[98px]">
      {/* Left Text Block */}
      <div className="lg:col-span-5 p-6 sm:p-12 flex flex-col justify-between order-2 lg:order-1 z-20 bg-gradient-to-t from-black via-black/80 to-transparent lg:bg-none">
        <div className="space-y-6">
          <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] uppercase tracking-widest font-bold px-3 py-1 inline-block">
            // VOL. 04 COLLECTION
          </span>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight leading-none text-white">
            WE DON'T<br />BLEND IN.<br />WE <span className="text-neon-green">LEVEL UP</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-sm font-light">
            Premium heavy-drop structures crafted for standard-shattering comfort. Dropping strictly limited batches.
          </p>
        </div>

        <div className="mt-8">
          <a
            href="#shop"
            className="bg-white text-black font-black uppercase text-xs p-5 block text-center hover:bg-neon-green transition-all transform hover:-translate-y-1 shadow-lg"
          >
            BROWSE DROP IMAGES ↓
          </a>
        </div>
      </div>

      {/* Right Image Block with Slideshow */}
      <div className="lg:col-span-7 relative h-[50vh] lg:h-auto min-h-[400px] order-1 lg:order-2 overflow-hidden border-b lg:border-b-0 lg:border-l border-zinc-900">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover object-center brightness-50"
            />
          </div>
        ))}

        <div className="absolute bottom-6 right-6 bg-black/90 border border-zinc-800 p-4 max-w-xs backdrop-blur-md hidden sm:block z-10">
          <span className="text-[9px] text-neon-green font-mono block mb-1">● FEATURED LOOK</span>
          <p className="text-xs uppercase font-bold text-white tracking-wide">Heavy Fleece Signature Box Hoodie</p>
          <span className="text-xs text-zinc-400">€89.00</span>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#shop"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400 hover:text-neon-cyan transition-colors z-20"
      >
        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <span className="text-xs uppercase tracking-wider font-bold">Scroll Down</span>
      </a>
    </section>
  );
};

export default Hero;
