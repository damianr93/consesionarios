import React, { useState, useRef, useEffect } from 'react';

const images = [
  "/assets/usados/1.jpeg",
  "/assets/usados/2.jpeg",
  "/assets/usados/3.jpeg",
  "/assets/usados/4.jpeg",
  "/assets/usados/5.jpeg",
  "/assets/usados/6.jpeg",
];

const Gallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationState, setAnimationState] = useState<'normal' | 'reverse' | 'paused'>('normal');
  const [offset, setOffset] = useState(0);

  // Manual marquee with requestAnimationFrame
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const totalWidth = container.scrollWidth / 2; // half since images duplicated
    let lastTime: number | null = null;
    const speed = 60; // px per second

    const step = (time: number) => {
      if (lastTime !== null && animationState !== 'paused') {
        const delta = time - lastTime;
        const dir = animationState === 'reverse' ? -1 : 1;
        setOffset(prev => {
          let next = prev + dir * speed * (delta / 1000);
          // wrap-around
          if (next >= totalWidth) next -= totalWidth;
          if (next < 0) next += totalWidth;
          return next;
        });
      }
      lastTime = time;
      requestAnimationFrame(step);
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [animationState]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const { left, width } = container.getBoundingClientRect();
    const x = e.clientX - left;
    if (x < width / 3) setAnimationState('reverse');
    else if (x > (2 * width) / 3) setAnimationState('normal');
    else setAnimationState(prev => (prev === 'paused' ? 'normal' : 'paused'));
  };

  const openImage = (src: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(src, '_blank');
  };

  return (
    <section id="galería" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-heading text-center text-brand mb-12">
          Nuestra Colección
        </h2>
        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-pointer"
          onClick={handleClick}
        >
          <div
            className="flex gap-8 whitespace-nowrap"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {[...images, ...images].map((src, i) => (
              <div
                key={i}
                className="inline-block relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition"
                style={{ width: '320px', flexShrink: 0 }}
                onClick={e => openImage(src, e)}
              >
                <img
                  src={src}
                  alt="Auto destacado"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark/80 to-transparent p-4">
                  <h3 className="text-white text-xl font-heading">Modelo X</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
