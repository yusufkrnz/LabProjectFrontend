import { useState } from 'react';
import { Search } from 'lucide-react';
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
    const [searchQuery, setSearchQuery] = useState('');

    // Filter conversations by participant name
    const filteredConversations = conversations.filter(conv =>
        conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <aside className="messages-sidebar">
            {/* Header */}
            <div className="sidebar-header">
                <h2>Messages</h2>
            </div>

            {/* Search */}
            <div className="sidebar-search">
                <Search size={16} />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Conversations List */}
            <div className="conversations-list">
                {isLoading ? (
                    <div className="empty-state">
                        <p>Loading...</p>
                    </div>
                ) : filteredConversations.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-text">
                            {searchQuery ? 'No results found' : 'Conversations will appear here'}
                        </p>
                    </div>
                ) : (
                    filteredConversations.map((conversation) => (
                        <button
                            key={conversation.id}
                            className={`conversation-item ${activeConversationId === conversation.id ? 'active' : ''}`}
                            onClick={() => onSelectConversation(conversation.id)}
                        >
                            <div className="conversation-avatar">
                                <img src={conversation.participant.avatar} alt={conversation.participant.name} />
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
