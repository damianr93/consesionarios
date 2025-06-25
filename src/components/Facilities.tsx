import React, { useState, useEffect } from 'react'

const images = [
  '/assets/frente1.jpeg',
  '/assets/interior-cons.jpeg',
  '/assets/interior.jpeg',
]

const Facilities: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }, 3000) // Cambia cada 3 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="facilities" className="py-16 bg-dark/90">
      <div className="max-w-3xl mx-auto px-6 text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-light">
          Nuestras Instalaciones
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto overflow-hidden rounded-2xl h-64 md:h-96">
        {/* Contenedor horizontal */}
        <div
          className="flex w-full h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Instalación ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Facilities