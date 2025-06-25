interface UserMessageProps {
    text: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ text }) => {
    return (
        <p className="user-message">
            <strong>Tú:</strong> {text}
        </p>
    );
};

export default UserMessage;

