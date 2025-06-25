import React from 'react';
import { ButtonOption, Media } from '../types/types';
import MediaContent from './MediaContent';
import ChatButtons from './ChatButtons';

interface BotMessageProps {
    text: string;
    buttons?: ButtonOption[];
    media?: Media;
    onButtonClick: (value: string, text: string) => void;
}

const BotMessage: React.FC<BotMessageProps> = ({ text, buttons, media, onButtonClick }) => {
    return (
        <div className="bot-message">
            <strong>Consecionario:</strong> <span dangerouslySetInnerHTML={{ __html: text }} />

            {media && <MediaContent media={media} />}

            {buttons && buttons.length > 0 && (
                <ChatButtons buttons={buttons} onButtonClick={onButtonClick} />
            )}
        </div>
    );
};

export default BotMessage;