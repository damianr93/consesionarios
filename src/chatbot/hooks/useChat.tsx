import { useState } from 'react'
import {
  ButtonOption,
  FormData,
  FormState,
  Media,
  Message
} from '../types/types'
import { toast } from 'react-toastify'

type MarcasAutos = {
  [key: string]: string
}

const prepararYEnviarCorreo = async (formData: FormData, tipoFormulario: string) => {
  // Preparar el asunto según el tipo de formulario
  let asunto = ''
  switch (tipoFormulario) {
    case 'cero_kilometro':
      asunto = `Consulta Auto 0KM ${formData.marca} - ${formData.nombreCliente}`
      break
    case 'usado':
      asunto = `Consulta Auto Usado ${formData.marca} - ${formData.nombreCliente}`
      break
    case 'asesor':
      asunto = `Solicitud de contacto con asesor - ${formData.nombreCliente}`
      break
    default:
      asunto = `Nueva consulta - ${formData.nombreCliente}`
  }

  try {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}sendMailerChatBot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, asunto }),
    })

    if (!respuesta.ok) {
      throw new Error('Error al enviar el correo')
    }

    toast.success('Solicitud enviada correctamente', {
      position: 'bottom-right',
    })

    return {
      success: true,
      message: 'Solicitud enviada correctamente'
    }
  } catch (error) {
    console.error('Error al enviar correo:', error)
    toast.error('Error al enviar la solicitud', {
      position: 'bottom-right',
    })

    return {
      success: false,
      message: 'Error al enviar la solicitud'
    }
  }
}

export function useChat() {
  // Estado de mensajes, formulario y flujo
  const [messages, setMessages] = useState<Message[]>([])
  const [formData, setFormData] = useState<FormData>({
    marca: '',
    modelos: '',
    autoVisto: '',
    telefono: '',
    nombreCliente: '',
    tipoConsulta: '' // 'cero_km', 'usado', 'asesor'
  })
  const [formState, setFormState] = useState<FormState>({
    activo: false,
    campoActual: '',
    tipoConsulta: '', // 'cero_km', 'usado', 'asesor'
    modoIA: false
  })

  // Base de datos de marcas de autos
  const MARCAS_AUTOS: MarcasAutos = {
    'toyota': 'Toyota',
    'ford': 'Ford',
    'chevrolet': 'Chevrolet',
    'volkswagen': 'Volkswagen',
    'fiat': 'Fiat',
    'renault': 'Renault',
    'peugeot': 'Peugeot',
    'honda': 'Honda',
    'nissan': 'Nissan',
    'hyundai': 'Hyundai',
    'citroen': 'Citroën',
    'jeep': 'Jeep'
  }

  /** Añade un mensaje del bot */
  const addBotMessage = (text: string, buttons?: ButtonOption[], media?: Media) =>
    setMessages(m => [...m, { type: 'bot', text, buttons, media }])

  /** Añade un mensaje del usuario */
  const addUserMessage = (text: string) =>
    setMessages(m => [...m, { type: 'user', text }])

  /** Resetea formulario y flujo */
  const resetForm = () => {
    setFormData({
      marca: '',
      modelos: '',
      autoVisto: '',
      telefono: '',
      nombreCliente: '',
      tipoConsulta: ''
    })
    setFormState({
      activo: false,
      campoActual: '',
      tipoConsulta: '',
      modoIA: false
    })
  }

  /** Limpia todo el chat */
  const resetChat = () => {
    setMessages([])
    resetForm()
  }

  /** Muestra el menú principal */
  const mostrarMenuPrincipal = () => {
    addBotMessage('¡Hola! ¿En qué te puedo ayudar hoy?', [
      { texto: 'Autos 0 KM', valor: 'cero_km' },
      { texto: 'Autos Usados', valor: 'usado' },
      { texto: 'Hablar con un asesor', valor: 'asesor' }
    ])
  }

  /** Muestra las marcas disponibles */
  const mostrarMarcas = () => {
    const botones = Object.entries(MARCAS_AUTOS).map(([key, label]) => ({
      texto: label,
      valor: `marca_${key}`
    }))
    addBotMessage('¿Qué marca te interesa?', botones)
  }

  /** Inicia el flujo según el tipo de consulta */
  const iniciarFlujo = (tipoConsulta: string) => {
    setFormData(d => ({ ...d, tipoConsulta }))
    setFormState({
      activo: true,
      campoActual: tipoConsulta === 'asesor' ? 'nombreCliente' : 'marca',
      tipoConsulta,
      modoIA: false
    })

    if (tipoConsulta === 'asesor') {
      addBotMessage('Para que un asesor te contacte, por favor ingresa tu nombre:', [])
    } else {
      mostrarMarcas()
    }
  }

  /** Valida que un teléfono tenga al menos 10 dígitos */
  const validarTelefono = (tel: string) =>
    tel.replace(/\D/g, '').length >= 10

  /** Procesa cada paso del formulario */
  const procesarEntradaFormulario = (entrada: string) => {
    const campo = formState.campoActual
    const tipoConsulta = formState.tipoConsulta
    let siguienteCampo = ''
    let pregunta = ''

    // Validación de teléfono
    if (campo === 'telefono' && !validarTelefono(entrada)) {
      addBotMessage('El teléfono debe tener al menos 10 dígitos. Intenta de nuevo:', [])
      return
    }

    // Guardar respuesta
    setFormData(d => ({ ...d, [campo]: entrada }))

    // Flujo para solicitar asesor general
    if (tipoConsulta === 'asesor') {
      if (campo === 'nombreCliente') {
        siguienteCampo = 'telefono'
        pregunta = `Gracias ${entrada}. Ahora ingresa tu teléfono:`
      } else if (campo === 'telefono') {
        // Finalizar flujo de asesor
        setFormState(s => ({ ...s, activo: false }))

        prepararYEnviarCorreo({ ...formData, telefono: entrada }, 'asesor')
          .then(resultado => console.log('Resultado del envío:', resultado))
          .catch(error => console.error('Error al enviar correo:', error))

        addBotMessage(`¡Perfecto ${formData.nombreCliente}! Un asesor te llamará al ${entrada} a la brevedad.`, [
          { texto: 'Volver al inicio', valor: 'inicio' }
        ])
        return
      }
    }
    // Flujo para autos 0 KM
    else if (tipoConsulta === 'cero_km') {
      if (campo === 'nombreCliente') {
        siguienteCampo = 'telefono'
        pregunta = `Gracias ${entrada}. Ingresa tu teléfono:`
      } else if (campo === 'telefono') {
        // Finalizar flujo 0 KM
        setFormState(s => ({ ...s, activo: false }))

        prepararYEnviarCorreo({ ...formData, telefono: entrada }, 'cero_kilometro')
          .then(resultado => console.log('Resultado del envío:', resultado))
          .catch(error => console.error('Error al enviar correo:', error))

        addBotMessage(`¡Excelente ${formData.nombreCliente}! Un especialista en 0 KM te contactará al ${entrada} para mostrarte las opciones de ${formData.marca}.`, [
          { texto: 'Volver al inicio', valor: 'inicio' }
        ])
        return
      }
    }
    // Flujo para autos usados
    else if (tipoConsulta === 'usado') {
      if (campo === 'modelos') {
        siguienteCampo = 'autoVisto'
        pregunta = '¿Viste algún auto específico en nuestra galería que te interese? (Si no viste ninguno, escribe "ninguno")'
      } else if (campo === 'autoVisto') {
        siguienteCampo = 'nombreCliente'
        pregunta = 'Perfecto. Ahora ingresa tu nombre:'
      } else if (campo === 'nombreCliente') {
        siguienteCampo = 'telefono'
        pregunta = `Gracias ${entrada}. Por último, tu teléfono:`
      } else if (campo === 'telefono') {
        // Finalizar flujo usado
        setFormState(s => ({ ...s, activo: false }))

        prepararYEnviarCorreo({ ...formData, telefono: entrada }, 'usado')
          .then(resultado => console.log('Resultado del envío:', resultado))
          .catch(error => console.error('Error al enviar correo:', error))

        const mensajeAuto = formData.autoVisto && formData.autoVisto.toLowerCase() !== 'ninguno'
          ? ` Te contactaremos sobre el ${formData.autoVisto} y otros modelos ${formData.marca}.`
          : ` Te mostraremos las mejores opciones de ${formData.marca} ${formData.modelos}.`

        addBotMessage(`¡Gracias ${formData.nombreCliente}! Un asesor te llamará al ${entrada}.${mensajeAuto}`, [
          { texto: 'Volver al inicio', valor: 'inicio' }
        ])
        return
      }
    }

    // Avanzar al siguiente campo
    setFormState(s => ({ ...s, campoActual: siguienteCampo }))
    addBotMessage(pregunta, [])
  }

  /** Procesa clicks en los botones del chat */
  const handleButtonClick = (valor: string, texto: string) => {
    addUserMessage(texto)

    // Comandos de control
    if (valor === 'inicio') {
      resetForm()
      mostrarMenuPrincipal()
      return
    }

    // Tipos de consulta
    if (valor === 'cero_km' || valor === 'usado' || valor === 'asesor') {
      iniciarFlujo(valor)
      return
    }

    // Selección de marca
    if (valor.startsWith('marca_')) {
      const marcaCodigo = valor.replace('marca_', '')
      const marcaNombre = MARCAS_AUTOS[marcaCodigo]

      setFormData(d => ({ ...d, marca: marcaNombre }))

      if (formState.tipoConsulta === 'cero_km') {
        // Para 0 KM, después de marca pedimos nombre
        setFormState(s => ({ ...s, campoActual: 'nombreCliente' }))
        addBotMessage(`Excelente elección, ${marcaNombre} tiene modelos increíbles 0 KM. Para que un especialista te contacte, ingresa tu nombre:`, [])
      } else if (formState.tipoConsulta === 'usado') {
        // Para usados, después de marca pedimos modelos
        setFormState(s => ({ ...s, campoActual: 'modelos' }))
        addBotMessage(`Perfecto, ${marcaNombre} es una gran marca. ¿Qué modelos te interesan aproximadamente? (ej: Corolla, Civic, etc.)`, [])
      }
      return
    }
  }

  /** Recibe un mensaje libre del usuario */
  const sendMessage = async (text: string) => {
    addUserMessage(text)

    // Si estamos en un formulario activo, procesar entrada
    if (formState.activo) {
      procesarEntradaFormulario(text)
      return
    }

    // Procesamiento de texto libre
    const lower = text.toLowerCase()

    if (lower.includes('hola') || lower.includes('inicio') || lower.includes('empezar')) {
      mostrarMenuPrincipal()
    }
    else if (lower.includes('0') || lower.includes('cero') || lower.includes('nuevo')) {
      iniciarFlujo('cero_km')
    }
    else if (lower.includes('usado') || lower.includes('segunda mano')) {
      iniciarFlujo('usado')
    }
    else if (lower.includes('asesor') || lower.includes('vendedor')) {
      iniciarFlujo('asesor')
    }
    else {
      addBotMessage('No entendí tu mensaje. ¿Te interesa alguna de estas opciones?', [
        { texto: 'Autos 0 KM', valor: 'cero_km' },
        { texto: 'Autos Usados', valor: 'usado' },
        { texto: 'Hablar con un asesor', valor: 'asesor' }
      ])
    }
  }

  return {
    messages,
    sendMessage,
    handleButtonClick,
    resetChat,
    mostrarMenuPrincipal
  }
}