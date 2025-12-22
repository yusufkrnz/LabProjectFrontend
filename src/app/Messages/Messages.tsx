import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import MessagesSidebar from './components/MessagesSidebar/MessagesSidebar';
import MessagesChat from './components/MessagesChat/MessagesChat';
import './Messages.css';

// Types for backend data
export type User = {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
};

export type Message = {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
    isRead: boolean;
};

export type Conversation = {
    id: string;
    participant: User;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    messages: Message[];
};

export default function Messages() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Current user (will come from auth context)
    const currentUserId = 'current-user';

    // Fetch conversations from backend (mock for now)
    useEffect(() => {
        const fetchConversations = async () => {
            setIsLoading(true);
            try {
                // TODO: Replace with actual API call
                // const response = await api.getConversations();
                // setConversations(response.data);

                // Mock data
                setConversations(mockConversations);
                if (mockConversations.length > 0) {
                    setActiveConversationId(mockConversations[0].id);
                }
            } catch (error) {
                console.error('Failed to fetch conversations:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConversations();
    }, []);

    const handleSelectConversation = (conversationId: string) => {
        setActiveConversationId(conversationId);
        // TODO: Mark messages as read via API
    };

    const handleSendMessage = async (content: string) => {
        if (!activeConversationId || !content.trim()) return;

        // TODO: Replace with actual API call
        // await api.sendMessage(activeConversationId, content);

        // Mock: Add message locally
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: currentUserId,
            content: content.trim(),
            timestamp: new Date().toISOString(),
            isRead: true,
        };

        setConversations(prev => prev.map(conv => {
            if (conv.id === activeConversationId) {
                return {
                    ...conv,
                    messages: [...conv.messages, newMessage],
                    lastMessage: content.trim(),
                    lastMessageTime: 'Just now',
                };
            }
            return conv;
        }));
    };

    const activeConversation = conversations.find(c => c.id === activeConversationId);

    return (
        <div className="messages-container">
            <Header />
            <div className="messages-content">
                {/* Left - Conversations List */}
                <MessagesSidebar
                    conversations={conversations}
                    activeConversationId={activeConversationId}
                    onSelectConversation={handleSelectConversation}
                    isLoading={isLoading}
                />

                {/* Right - Chat Area */}
                <MessagesChat
                    conversation={activeConversation}
                    currentUserId={currentUserId}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
}

// Mock data - will be replaced by backend API
const mockConversations: Conversation[] = [
    {
        id: 'conv-1',
        participant: {
            id: 'user-1',
            name: 'Ahmet Yılmaz',
            avatar: 'https://ui-avatars.com/api/?name=AY&background=3b82f6&color=fff&size=48',
            isOnline: true,
        },
        lastMessage: 'Toplantı ne zaman başlıyor?',
        lastMessageTime: '10:30',
        unreadCount: 2,
        messages: [
            {
                id: 'msg-1',
                senderId: 'user-1',
                content: 'Merhaba, nasılsın?',
                timestamp: '2024-12-22T09:00:00',
                isRead: true,
            },
            {
                id: 'msg-2',
                senderId: 'current-user',
                content: 'İyiyim, teşekkürler! Sen nasılsın?',
                timestamp: '2024-12-22T09:05:00',
                isRead: true,
            },
            {
                id: 'msg-3',
                senderId: 'user-1',
                content: 'Ben de iyiyim. Bugün toplantı var mı?',
                timestamp: '2024-12-22T09:10:00',
                isRead: true,
            },
            {
                id: 'msg-4',
                senderId: 'current-user',
                content: 'Evet, saat 14:00\'te proje değerlendirme toplantısı var.',
                timestamp: '2024-12-22T09:15:00',
                isRead: true,
            },
            {
                id: 'msg-5',
                senderId: 'user-1',
                content: 'Toplantı ne zaman başlıyor?',
                timestamp: '2024-12-22T10:30:00',
                isRead: false,
            },
        ],
    },
    {
        id: 'conv-2',
        participant: {
            id: 'user-2',
            name: 'Zeynep Kaya',
            avatar: 'https://ui-avatars.com/api/?name=ZK&background=10b981&color=fff&size=48',
            isOnline: false,
        },
        lastMessage: 'Dosyaları gönderdim, kontrol eder misin?',
        lastMessageTime: 'Dün',
        unreadCount: 0,
        messages: [
            {
                id: 'msg-6',
                senderId: 'current-user',
                content: 'Proje dosyalarını gönderebilir misin?',
                timestamp: '2024-12-21T14:00:00',
                isRead: true,
            },
            {
                id: 'msg-7',
                senderId: 'user-2',
                content: 'Tabii, hemen hazırlıyorum.',
                timestamp: '2024-12-21T14:10:00',
                isRead: true,
            },
            {
                id: 'msg-8',
                senderId: 'user-2',
                content: 'Dosyaları gönderdim, kontrol eder misin?',
                timestamp: '2024-12-21T14:30:00',
                isRead: true,
            },
        ],
    },
];
