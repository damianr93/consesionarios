import { ButtonOption } from '../types/types';

interface ChatButtonsProps {
    buttons: ButtonOption[];
    onButtonClick: (value: string, text: string) => void;
}

const ChatButtons: React.FC<ChatButtonsProps> = ({ buttons, onButtonClick }) => {
    return (
        <div className="chat-buttons">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    className="chat-button"
                    onClick={() => onButtonClick(button.valor, button.texto)}
                >
                    {button.texto}
                </button>
            ))}
        </div>
    );
};

export default ChatButtons;