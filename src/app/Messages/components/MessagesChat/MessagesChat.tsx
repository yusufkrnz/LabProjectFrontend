import { useState } from 'react';
import { Send, MoreVertical } from 'lucide-react';
import type { Conversation } from '../../Messages';
import './MessagesChat.css';

type MessagesChatProps = {
    conversation: Conversation | undefined;
    currentUserId: string;
    onSendMessage: (content: string) => void;
};

export default function MessagesChat({
    conversation,
    currentUserId,
    onSendMessage,
}: MessagesChatProps) {
    const [messageInput, setMessageInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageInput.trim()) {
            onSendMessage(messageInput);
            setMessageInput('');
        }
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (!conversation) {
        return (
            <div className="chat-container">
                <div className="chat-empty">
                    <div className="empty-icon">💬</div>
                    <h3>Welcome to Messages</h3>
                    <p>Once you connect with a client, you'll be able to chat and collaborate here</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-container">
            {/* Chat Header */}
            <div className="chat-header">
                <div className="chat-user">
                    <img src={conversation.participant.avatar} alt={conversation.participant.name} />
                    <div className="chat-user-info">
                        <span className="chat-user-name">{conversation.participant.name}</span>
                        <span className={`chat-user-status ${conversation.participant.isOnline ? 'online' : ''}`}>
                            {conversation.participant.isOnline ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
                <button className="chat-action-btn">
                    <MoreVertical size={20} />
                </button>
            </div>

            {/* Messages Area */}
            <div className="chat-messages">
                {conversation.messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
                    >
                        <div className="message-bubble">
                            <p className="message-content">{message.content}</p>
                            <span className="message-time">{formatTime(message.timestamp)}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Message Input */}
            <form className="chat-input-form" onSubmit={handleSubmit}>
                <div className="chat-input-wrapper">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button type="submit" className="send-btn" disabled={!messageInput.trim()}>
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
}
