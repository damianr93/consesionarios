import React, { useState } from 'react'

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`¡Gracias, ${form.name}! Nos pondremos en contacto.`)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section
      id="contacto"
      className="relative py-24 bg-brand-dark bg-[url('/assets/llave-logo.jpeg')] bg-cover bg-center md:bg-none"
    >
      {/* Overlay para legibilidad en móvil */}
      <div className="absolute inset-0 bg-brand-dark/80 md:hidden" />

      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-heading text-white md:text-black text-center mb-12">
          Contáctanos
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Imagen lateral en desktop */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="/assets/llave-logo.jpeg"
              alt="Llave y logo Villa María Automotores"
              className="w-full h-auto rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 space-y-6 md:bg-brand-light/5 md:backdrop-blur-sm p-8 rounded-2xl shadow-lg z-10"
          >
            {['name', 'email'].map(field => (
              <input
                key={field}
                type={field}
                name={field}
                value={form[field as 'name' | 'email']}
                onChange={handleChange}
                placeholder={
                  field === 'name'
                    ? 'Tu nombre completo'
                    : 'Tu correo electrónico'
                }
                required
                className="w-full px-4 py-3 bg-brand-light/10 border border-brand-light/30 rounded-lg placeholder-black md:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-white md:text-black"
              />
            ))}

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tu mensaje"
              rows={5}
              required
              className="w-full px-4 py-3 bg-brand-light/10 border border-brand-light/30 rounded-lg placeholder-black md:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-white md:text-black"
            />

            <button
              type="submit"
              className="w-full bg-neon-red text-white font-semibold py-3 rounded-full hover:bg-neon-red/90 transition shadow-md"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact