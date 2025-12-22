import { useState, useRef, useEffect } from 'react';
import { Send, MoreVertical, User } from 'lucide-react';
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
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    const handleViewProfile = () => {
        // TODO: Navigate to profile page
        console.log('View profile:', conversation?.participant.id);
        setShowMenu(false);
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
                    <span className="chat-user-name">{conversation.participant.name}</span>
                </div>
                <div className="chat-menu-wrapper" ref={menuRef}>
                    <button className="chat-action-btn" onClick={() => setShowMenu(!showMenu)}>
                        <MoreVertical size={20} />
                    </button>
                    {showMenu && (
                        <div className="chat-dropdown">
                            <button className="dropdown-item" onClick={handleViewProfile}>
                                <User size={16} />
                                <span>View Profile</span>
                            </button>
                        </div>
                    )}
                </div>
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
