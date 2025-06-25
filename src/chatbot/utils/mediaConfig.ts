import { MediaItem } from '../types/types'

export const MEDIA_CONFIG: Record<string, MediaItem[]> = {
    // Productos PIPO
    'bloque-melaza-bovino-proteico': [
        { tipo: 'imagen', url: '/img/bloque-melaza-bovinos.jpg', alt: 'Bloque Melaza PIPO Bovino' },
        { tipo: 'video', url: '/video/pipo_a_campo.mp4', poster: '/media-bot/poster_bloque-melaza-bovino.jpg' },
        { tipo: 'archivo', url: '/file/ficha-bloque-melaza-bovino-proteico.pdf', nombre: 'Ficha Bovino Proteico' },
    ],
    'bloque-melaza-bovino-magnesiado': [
        { tipo: 'imagen', url: '/img/bloque-melaza-bovinos.jpg', alt: 'Bloque Melaza PIPO Bovino' },
        { tipo: 'video', url: '/video/pipo_a_campo.mp4', poster: '/media-bot/poster_bloque-melaza-bovino.jpg' },
        { tipo: 'archivo', url: '/file/ficha-bloque-melaza-bovino-magnesiado.pdf', nombre: 'Ficha Bovino Magnesiado' },
    ],
    'bloque-melaza-ovino': [
        { tipo: 'imagen', url: '/img/bloque-melaza-ovinos.jpg', alt: 'Bloque Melaza PIPO Ovino' },
        { tipo: 'video', url: '/video/video_bloque-melaza-ovino.mp4', poster: '/media-bot/poster_bloque-melaza-bovino.jpg' },
        { tipo: 'archivo', url: '/file/ficha-bloque-melaza-ovino.pdf', nombre: 'Ficha Bovino Ovino' },
    ],
    'bloque-melaza-equino': [
        { tipo: 'imagen', url: '/img/bloque-melaza-equino.jpg', alt: 'Bloque Melaza PIPO Equino' },
    ],

    // Otros productos
    levadura: [
        { tipo: 'archivo', url: '/file/Ficha-Tecnica-Tulev-Esp.pdf', nombre: 'Ficha Técnica Levadura Tulev' }
    ],
    proteina: [
        { tipo: 'archivo', url: '/file/ficha-proteina-soja.pdf', nombre: 'Ficha Técnica Proteína Soja' }
    ],
    'fosforo-vegetal': [
        { tipo: 'archivo', url: '/file/ficha-fosforo-vegetal.pdf', nombre: 'Ficha Técnica Fósforo Vegetal' }
    ],

    // Subproductos líquidos
    'cerveza-lev': [
        { tipo: 'enlace', url: '/catalogo?item=levadura-tulev', nombre: 'Levadura de Cerveza' }
    ],
    solubles: [
        { tipo: 'enlace', url: '/catalogo?item=solubles-destileria', nombre: 'Solubles de Destilería' }
    ],
    melaza: [
        { tipo: 'enlace', url: '/catalogo?item=melaza-cania', nombre: 'Melaza de Caña' }
    ],

    // Subproductos húmedos
    'gluten-feed': [
        { tipo: 'enlace', url: '/catalogo?item=gluten-feed', nombre: 'Gluten feed' }
    ],
    burlanda: [
        { tipo: 'enlace', url: '/catalogo?item=burlanda-maiz', nombre: 'Burlanda humeda' }
    ],
    malta: [
        { tipo: 'enlace', url: '/catalogo?item=malta-humeda', nombre: 'Malta humeda' }
    ],
    citrus: [
        { tipo: 'enlace', url: '/catalogo?item=cascara-citrus', nombre: 'Cascara citrus' }
    ],

    // Subproductos secos
    germen: [
        { tipo: 'enlace', url: '/catalogo?item=germen-maiz', nombre: 'Germen de maiz' }
    ],
    'gluten-pellet': [
        { tipo: 'enlace', url: '/catalogo?item=gluten-feed-pellet', nombre: 'Gluten pellet' }
    ],
    'burlanda-seca': [
        { tipo: 'enlace', url: '/catalogo?item=seco-burlanda-maiz', nombre: 'Burlanda seca' }
    ],
    'lex-maiz-pellet': [
        { tipo: 'enlace', url: '/catalogo?item=lex-maiz-pellet', nombre: 'Lex de maiz pellet' }
    ],
    'trigo-pellet': [
        { tipo: 'enlace', url: '/catalogo?item=trigo-pellet', nombre: 'Trigo pellet' }
    ],
}