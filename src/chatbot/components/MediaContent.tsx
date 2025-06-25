import React from 'react';
import { Media, MediaItem } from '../types/types';

interface MediaContentProps {
  media: Media;
}

const MediaContent: React.FC<MediaContentProps> = ({ media }) => {
  if (media.tipo === "multiple" && media.contenido) {
    return (
      <div className="media-container">
        {media.contenido.map((item, index) => (
          <RenderMediaItem key={index} item={item} />
        ))}
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