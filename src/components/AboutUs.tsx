import React from 'react'

interface Advisor {
  name: string
  phone: string
  role: string
  photo: string
  sendWpp: string
}

const advisors: Advisor[] = [
  {
    name: 'Hernan Gomez',
    phone: '323 2332255',
    role: 'Asesor',
    photo: '/assets/asesor.jpg',
    sendWpp: 'https://api.whatsapp.com/send?phone=0303456&text=Hola'
  },
  {
    name: 'Juan Cruz',
    phone: '323 2332255',
    role: 'Asesor',
    photo: '/assets/asesor.jpg',
    sendWpp: 'https://api.whatsapp.com/send?phone=0303456&text=Hola'
  },
  {
    name: 'Damian Rodriguez',
    phone: '323 2332255',
    role: 'Asesor',
    photo: '/assets/asesor.jpg',
    sendWpp: 'https://api.whatsapp.com/send?phone=0303456&text=Hola'
  },
  {
    name: 'Beltran Rodriguez',
    phone: '323 2332255',
    role: 'Gestoria',
    photo: '/assets/asesor.jpg',
    sendWpp: 'https://api.whatsapp.com/send?phone=0303456&text=Encuesta'
  },
]

const QuienesSomos: React.FC = () => (
  <section id="quienes-somos" className="py-16 bg-dark/90">
    {/* Intro */}
    <div className="max-w-3xl mx-auto px-6 text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
        Quiénes Somos
      </h2>
      <p className="text-lg md:text-xl text-light/80">
        En [Nombre del Concesionario], somos un equipo apasionado por ayudarte a encontrar el auto perfecto. Con experiencia y compromiso, ofrecemos asesoramiento transparente y una selección de vehículos de calidad.

        Nuestro objetivo es brindarte confianza y satisfacción en cada compra, ya sea un auto nuevo o usado. ¡Visítanos y descubre una experiencia automotriz sencilla y confiable!
      </p>
    </div>

    {/* Cards de asesores */}
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {advisors.map((a) => (
        <div
          key={a.name}
          className="bg-light/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center text-center"
        >
          <img
            src={a.photo}
            alt={`Foto de ${a.name}`}
            className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-neon-red"
          />
          <h3 className="text-xl md:text-2xl font-semibold text-light m-1">
            {a.name}
          </h3>
          <h4 className="text-l md:text-l font-semibold text-light mb-2">
            {a.role}
          </h4>
          <a
            href={a.sendWpp}
            target='_blank'
            className="text-lg text-neon-red/90 font-medium hover:underline"
          >
            {a.phone}
          </a>
        </div>
      ))}
    </div>

    {/* Ubicación en Google Maps */}
    <div className="max-w-4xl mx-auto px-6 mt-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-light mb-4">
        Nuestra Ubicación
      </h2>
      <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?q=-33.41,-63.26&z=10&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Ubicación Villa María Automotores"
        />
      </div>
    </div>
  </section>
)

export default QuienesSomos
