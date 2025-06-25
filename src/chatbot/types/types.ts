// types/types.ts

export interface ButtonOption {
    texto: string
    valor: string
}

export interface Media {
    tipo: 'image' | 'video' | 'multiple'
    url?: string
    contenido?: Array<{
        tipo: 'image' | 'video'
        url: string
        titulo?: string
        descripcion?: string
    }>
}

export interface Message {
    type: 'user' | 'bot'
    text: string
    buttons?: ButtonOption[]
    media?: Media
}

export interface FormData {
    marca: string
    modelos: string
    autoVisto: string
    telefono: string
    nombreCliente: string
    tipoConsulta: string // 'cero_km', 'usado', 'asesor'
}

export interface FormState {
    activo: boolean
    campoActual: string
    tipoConsulta: string // 'cero_km', 'usado', 'asesor'
    modoIA: boolean
}