import type { Conversation } from '../../Messages';
import './MessagesSidebar.css';

type MessagesSidebarProps = {
    conversations: Conversation[];
    activeConversationId: string | null;
    onSelectConversation: (id: string) => void;
    isLoading: boolean;
};

export default function MessagesSidebar({
    conversations,
    activeConversationId,
    onSelectConversation,
    isLoading,
}: MessagesSidebarProps) {
    return (
        <aside className="messages-sidebar">
            {/* Header */}
            <div className="sidebar-header">
                <h2>Messages</h2>
            </div>

            {/* Conversations List */}
            <div className="conversations-list">
                {isLoading ? (
                    <div className="empty-state">
                        <p>Loading...</p>
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-text">Conversations will appear here</p>
                    </div>
                ) : (
                    conversations.map((conversation) => (
                        <button
                            key={conversation.id}
                            className={`conversation-item ${activeConversationId === conversation.id ? 'active' : ''}`}
                            onClick={() => onSelectConversation(conversation.id)}
                        >
                            <div className="conversation-avatar">
                                <img src={conversation.participant.avatar} alt={conversation.participant.name} />
                                {conversation.participant.isOnline && <span className="online-indicator" />}
                            </div>
                            <div className="conversation-info">
                                <div className="conversation-top">
                                    <span className="conversation-name">{conversation.participant.name}</span>
                                    <span className="conversation-time">{conversation.lastMessageTime}</span>
                                </div>
                                <div className="conversation-bottom">
                                    <span className="conversation-preview">{conversation.lastMessage}</span>
                                    {conversation.unreadCount > 0 && (
                                        <span className="unread-badge">{conversation.unreadCount}</span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </aside>
    );
}
