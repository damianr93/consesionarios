import React, { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { Link } from 'react-scroll'

const sections = [
  { label: 'Inicio', to: 'hero' },
  { label: 'Galería', to: 'galería' },
  { label: 'Contacto', to: 'contacto' },
]

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-dark/70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo con texto integrado */}
        <div className="flex flex-col items-center">
          <img
            src="/assets/logo.png"
            alt="Logo VMA"
            className="h-16 w-20 object-contain"
          />
          <span className="text-light text-xs font-medium tracking-wide ">
            Nombre consecionario
          </span>
        </div>

        {/* Links desktop */}
        <div className="hidden md:flex space-x-6 text-light">
          {sections.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              smooth
              duration={500}
              offset={-80} // ajusta altura navbar
              className="cursor-pointer font-medium hover:text-neon-red text-sm md:text-base"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Botón hamburguesa */}
        <button
          onClick={() => setOpen(prev => !prev)}
          className="md:hidden text-xl text-light focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-dark/90 backdrop-blur-sm overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          open ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-2 text-lg text-light">
          {sections.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              smooth
              duration={500}
              offset={-80}
              className="cursor-pointer font-medium hover:text-neon-red"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar