import React from 'react';
import { Media } from '../types/types';

// Define MediaItem type based on expected structure
type MediaItem = {
  tipo: 'imagen' | 'video' | 'archivo' | 'enlace';
  url: string;
  alt?: string;
  poster?: string;
  nombre?: string;
};

interface MediaContentProps {
  media: Media;
}

const MediaContent: React.FC<MediaContentProps> = ({ media }) => {
  if (media.tipo === "multiple" && media.contenido) {
    return (
      <div className="media-container">
        {media.contenido.map((item, index) => {
          // Map 'image' to 'imagen' to match MediaItem type and ensure tipo is valid
          const tipoMap = {
            image: 'imagen',
            imagen: 'imagen',
            video: 'video',
            archivo: 'archivo',
            enlace: 'enlace'
          } as const;

          const mappedTipo = tipoMap[item.tipo as keyof typeof tipoMap];

          if (!mappedTipo) return null;

          const mappedItem: MediaItem = {
            ...item,
            tipo: mappedTipo
          };

          return <RenderMediaItem key={index} item={mappedItem} />;
        })}
      </div>
    );
  }
  
  return (
    <div className="media-container">
      <RenderMediaItem item={media as unknown as MediaItem} />
    </div>
  );
};

const RenderMediaItem: React.FC<{ item: MediaItem }> = ({ item }) => {
  switch (item.tipo) {
    case "imagen":
      return (
        <a href={item.url} className="chat-file" target="_blank" rel="noopener noreferrer">
          <img src={item.url} alt={item.alt || 'Imagen'} className="chat-media" />
        </a>
      );
    case "video":
      return (
        <video className="chat-video" controls poster={item.poster || ''}>
          <source src={item.url} type="video/mp4" />
          Tu navegador no soporta videos.
        </video>
      );
    case "archivo":
      return (
        <a href={item.url} className="chat-file" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-file"></i> {item.nombre}
        </a>
      );
    case "enlace":
      return (
        <a href={item.url} className="chat-file" target="_blank" rel="noopener noreferrer">
          {item.nombre}
        </a>
      );
    default:
      return null;
  }
};

export default MediaContent;