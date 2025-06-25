import React from 'react'
import { motion } from 'framer-motion'
import LogoLine from '../../public/assets/logo.png'

const Hero: React.FC = () => (
<section
  id="hero"
  className="
    relative h-screen
    bg-showroom-night 
    bg-[length:140%_140%]
    bg-[position:50%_-110px]  
    sm:bg-center              
    sm:bg-cover
    sm:bg-center
  "
>
    {/* Overlay degradado opcional */}
    {/* <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-neon-purple/40 to-transparent z-0" /> */}

    <motion.div
      className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 space-y-6 sm:space-y-8 md:space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Logo redimensionado y centrado */}
      <img
        src={LogoLine}
        alt="Villa María Automotores logo line"
        className="w-48 sm:w-64 md:w-80 lg:w-96"
      />

      {/* Título semántico */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-light drop-shadow-lg">
        Nombre de tu Concesionaria
      </h1>

      {/* Párrafo resaltado */}
      <p className="max-w-xl text-base sm:text-lg md:text-2xl text-light/90">
        Tu concesionaria de confianza, donde tu próximo auto te está esperando.
      </p>

      <a
        href="#contacto"
        className="mt-4 inline-block bg-neon-red text-light font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-neon-red/90"
      >
        Cotizar Ahora
      </a>
    </motion.div>
  </section>
)

export default Hero
