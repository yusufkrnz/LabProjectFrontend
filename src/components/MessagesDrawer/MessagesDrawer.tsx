import { X, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import './MessagesDrawer.css';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const MOCK_MESSAGES = [
    {
        id: '1',
        user: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        message: 'Hey! Did you see the new designs?',
        time: '2m ago',
        unread: true
    },
    {
        id: '2',
        user: 'Alex Morgan',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        message: 'The meeting is rescheduled to 3 PM.',
        time: '1h ago',
        unread: false
    },
    {
        id: '3',
        user: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        message: 'Thanks for the code review!',
        time: '3h ago',
        unread: false
    },
    {
        id: '4',
        user: 'Emma Watson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
        message: 'Can we sync up later?',
        time: '1d ago',
        unread: false
    }
];

export default function MessagesDrawer({ isOpen, onClose }: Props) {
    return (
        <>
            {/* Overlay */}
            <div
                className={`messages-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`messages-drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <h3>Messages</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="drawer-search">
                    <div className="search-input-wrapper">
                        <Search size={16} />
                        <input type="text" placeholder="Search messages" />
                    </div>
                </div>

                <div className="drawer-content">
                    {MOCK_MESSAGES.map(msg => (
                        <div key={msg.id} className={`message-item ${msg.unread ? 'unread' : ''}`}>
                            <div className="message-avatar-wrapper">
                                <img src={msg.avatar} alt={msg.user} className="message-avatar" />
                                {msg.unread && <div className="online-indicator"></div>}
                            </div>
                            <div className="message-info">
                                <div className="message-top">
                                    <span className="message-user">{msg.user}</span>
                                    <span className="message-time">{msg.time}</span>
                                </div>
                                <p className="message-preview">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="drawer-footer">
                    <Link to="/messages" className="view-all-btn" onClick={onClose}>
                        View all messages
                    </Link>
                </div>
            </div>
        </>
    );
}
