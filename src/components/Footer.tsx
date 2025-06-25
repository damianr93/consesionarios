import React from 'react'

const Footer: React.FC = () => (
  <footer className="bg-brand-dark text-brand-light py-8">
    <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
      <img
        src="/assets/logo.png"
        alt="Villa María Automotores"
        className="mx-auto h-20"
      />
      <p className="text-sm">
        © {new Date().getFullYear()} Consecionario X Automotores
      </p>

      <div className="space-x-6">
        {['Facebook', 'Instagram', 'Twitter'].map((net) => (
          <a
            key={net}
            href="#"
            className="text-brand-light/70 hover:text-brand-light transition"
            aria-label={net}
          >
            {net}
          </a>
        ))}
      </div>

      {/* Crédito con logo */}
      <p className="text-xs text-brand-light/60 flex items-center justify-center space-x-2">
        <span>Desarrollado por</span>
        <a
          href="https://ducksolutions.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center hover:opacity-80"
        >
          <img
            src="/assets/logo-ds.png"
            alt="DuckSolutions"
            className="h-4 w-4 rounded-full"
          />
          <span className="ml-1">DuckSolutions</span>
        </a>
      </p>
    </div>
  </footer>
)

export default Footer
