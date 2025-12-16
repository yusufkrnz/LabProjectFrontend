import { useState } from 'react';
import { Search, MoreHorizontal, Bookmark, CheckCircle, XCircle, Sparkles, Users, DollarSign } from 'lucide-react';
import './InboxNotificationList.css';

// Three types of notifications
type NotificationType = 'algorithm_match' | 'collaboration_request' | 'business_offer';
type NotificationState = 'inbox' | 'saved' | 'done' | 'rejected';

type Notification = {
    id: string;
    notificationType: NotificationType;
    state: NotificationState;
    // For algorithm match
    matchTitle?: string;
    matchDescription?: string;
    // For collaboration request
    senderName?: string;
    senderAvatar?: string;
    requiredSkills?: string[];
    projectDescription?: string;
    // For business offer
    companyName?: string;
    companyLogo?: string;
    jobTitle?: string;
    salary?: string;
    jobDescription?: string;
    date: string;
    isUnread: boolean;
};

type InboxNotificationListProps = {
    activeFilter: string;
};

export default function InboxNotificationList({ activeFilter }: InboxNotificationListProps) {
    const [tab, setTab] = useState<'all' | 'unread'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // Mock data - will be fetched from backend
    const notifications: Notification[] = [
        // Algorithm Match Notifications
        {
            id: '1',
            notificationType: 'algorithm_match',
            state: 'inbox',
            matchTitle: '🎯 Perfect Match Found!',
            matchDescription: 'Our algorithm found a project that matches your skills perfectly. Click to explore this opportunity!',
            date: '2 hours ago',
            isUnread: true,
        },
        {
            id: '2',
            notificationType: 'algorithm_match',
            state: 'inbox',
            matchTitle: '✨ New Match Available!',
            matchDescription: 'Based on your profile, we found an exciting collaboration opportunity waiting for you.',
            date: '5 hours ago',
            isUnread: true,
        },
        // Collaboration Request Notifications
        {
            id: '3',
            notificationType: 'collaboration_request',
            state: 'inbox',
            senderName: 'John Smith',
            senderAvatar: 'https://ui-avatars.com/api/?name=JS&background=3b82f6&color=fff&size=48',
            requiredSkills: ['Python', 'Machine Learning', 'TensorFlow'],
            projectDescription: 'Looking for a talented developer to join our AI startup project. We are building an innovative recommendation system.',
            date: '1 day ago',
            isUnread: true,
        },
        {
            id: '4',
            notificationType: 'collaboration_request',
            state: 'inbox',
            senderName: 'Emily Chen',
            senderAvatar: 'https://ui-avatars.com/api/?name=EC&background=10b981&color=fff&size=48',
            requiredSkills: ['React', 'TypeScript', 'Node.js'],
            projectDescription: 'Seeking a frontend expert for our e-commerce platform redesign. Great opportunity for growth!',
            date: '2 days ago',
            isUnread: false,
        },
        {
            id: '5',
            notificationType: 'collaboration_request',
            state: 'saved',
            senderName: 'Michael Brown',
            senderAvatar: 'https://ui-avatars.com/api/?name=MB&background=8b5cf6&color=fff&size=48',
            requiredSkills: ['Spring Boot', 'Java', 'PostgreSQL'],
            projectDescription: 'Backend developer needed for fintech application. Experience with microservices is a plus.',
            date: '3 days ago',
            isUnread: false,
        },
        {
            id: '6',
            notificationType: 'collaboration_request',
            state: 'done',
            senderName: 'Sarah Wilson',
            senderAvatar: 'https://ui-avatars.com/api/?name=SW&background=f59e0b&color=fff&size=48',
            requiredSkills: ['Flutter', 'Dart', 'Firebase'],
            projectDescription: 'Mobile app developer wanted for health & fitness startup.',
            date: '1 week ago',
            isUnread: false,
        },
        // Business Offer Notifications
        {
            id: '7',
            notificationType: 'business_offer',
            state: 'inbox',
            companyName: 'TechCorp Industries',
            companyLogo: 'https://ui-avatars.com/api/?name=TC&background=059669&color=fff&size=48',
            jobTitle: 'Senior Full Stack Developer',
            salary: '$120,000 - $150,000 / year',
            jobDescription: 'Join our innovative team to build next-generation enterprise solutions. Remote-friendly with great benefits.',
            date: '3 hours ago',
            isUnread: true,
        },
        {
            id: '8',
            notificationType: 'business_offer',
            state: 'inbox',
            companyName: 'StartupX',
            companyLogo: 'https://ui-avatars.com/api/?name=SX&background=10b981&color=fff&size=48',
            jobTitle: 'React Native Developer',
            salary: '$80,000 - $100,000 / year',
            jobDescription: 'Exciting opportunity to work on cutting-edge mobile applications with equity options.',
            date: '1 day ago',
            isUnread: true,
        },
        {
            id: '9',
            notificationType: 'business_offer',
            state: 'saved',
            companyName: 'Global Finance Ltd',
            companyLogo: 'https://ui-avatars.com/api/?name=GF&background=047857&color=fff&size=48',
            jobTitle: 'Backend Engineer',
            salary: '$95,000 - $120,000 / year',
            jobDescription: 'Build scalable financial systems for millions of users worldwide.',
            date: '4 days ago',
            isUnread: false,
        },
    ];

    // Filter notifications based on sidebar selection
    const getFilteredByState = () => {
        let filtered = notifications;

        // Filter by sidebar state
        if (activeFilter === 'inbox') {
            filtered = filtered.filter(n => n.state === 'inbox');
        } else if (activeFilter === 'saved') {
            filtered = filtered.filter(n => n.state === 'saved');
        } else if (activeFilter === 'done') {
            filtered = filtered.filter(n => n.state === 'done');
        }

        // Filter by tab
        if (tab === 'unread') {
            filtered = filtered.filter(n => n.isUnread);
        }

        // Filter by search
        if (searchQuery) {
            filtered = filtered.filter(n => {
                const searchLower = searchQuery.toLowerCase();
                if (n.notificationType === 'algorithm_match') {
                    return n.matchTitle?.toLowerCase().includes(searchLower) ||
                        n.matchDescription?.toLowerCase().includes(searchLower);
                } else {
                    return n.senderName?.toLowerCase().includes(searchLower) ||
                        n.projectDescription?.toLowerCase().includes(searchLower) ||
                        n.requiredSkills?.some(s => s.toLowerCase().includes(searchLower));
                }
            });
        }

        return filtered;
    };

    const filteredNotifications = getFilteredByState();

    const toggleSelectAll = () => {
        if (selectedItems.length === filteredNotifications.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredNotifications.map(n => n.id));
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
    };

    const handleSave = (id: string) => {
        // TODO: Backend API call - save notification
        console.log('Save notification:', id);
    };

    const handleDone = (id: string) => {
        // TODO: Backend API call - mark as done
        console.log('Mark as done:', id);
    };

    const handleReject = (id: string) => {
        // TODO: Backend API call - reject notification
        console.log('Reject notification:', id);
    };

    const handleMatchClick = (id: string) => {
        // TODO: Navigate to match details or project page
        console.log('Navigate to match:', id);
    };

    return (
        <div className="inbox-notification-list">
            {/* Header */}
            <div className="notification-header">
                <div className="header-tabs">
                    <button
                        className={`tab-btn ${tab === 'all' ? 'active' : ''}`}
                        onClick={() => setTab('all')}
                    >
                        All
                    </button>
                    <button
                        className={`tab-btn ${tab === 'unread' ? 'active' : ''}`}
                        onClick={() => setTab('unread')}
                    >
                        Unread
                    </button>
                </div>
                <div className="header-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search notifications"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="header-actions">
                    <span className="filter-label">
                        Showing: <strong>{activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}</strong>
                    </span>
                </div>
            </div>

            {/* Notification List */}
            <div className="notification-list">
                {/* Select All */}
                <div className="select-all-row">
                    <label className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            checked={selectedItems.length === filteredNotifications.length && filteredNotifications.length > 0}
                            onChange={toggleSelectAll}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <span className="select-all-label">Select all ({filteredNotifications.length})</span>
                </div>

                {/* Empty State */}
                {filteredNotifications.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3>No notifications</h3>
                        <p>You're all caught up! No {activeFilter} notifications to show.</p>
                    </div>
                )}

                {/* Notification Items */}
                {filteredNotifications.map((notification) => (
                    notification.notificationType === 'algorithm_match' ? (
                        // Algorithm Match Notification - Special Card
                        <div
                            key={notification.id}
                            className={`notification-item algorithm-match ${notification.isUnread ? 'unread' : ''} ${selectedItems.includes(notification.id) ? 'selected' : ''}`}
                            onClick={() => handleMatchClick(notification.id)}
                        >
                            <label className="checkbox-wrapper" onClick={(e) => e.stopPropagation()}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(notification.id)}
                                    onChange={() => toggleSelect(notification.id)}
                                />
                                <span className="checkmark"></span>
                            </label>

                            <div className="match-icon">
                                <Sparkles size={24} />
                            </div>

                            <div className="notification-content">
                                <div className="match-title">{notification.matchTitle}</div>
                                <div className="match-desc">{notification.matchDescription}</div>
                            </div>

                            <div className="notification-meta">
                                <span className="match-badge">Algorithm Match</span>
                                <span className="notification-date">{notification.date}</span>
                            </div>

                            <div className="notification-actions" onClick={(e) => e.stopPropagation()}>
                                <button className="action-btn save" title="Save" onClick={() => handleSave(notification.id)}>
                                    <Bookmark size={16} />
                                </button>
                                <button className="action-btn done" title="Done" onClick={() => handleDone(notification.id)}>
                                    <CheckCircle size={16} />
                                </button>
                                <button className="action-btn reject" title="Reject" onClick={() => handleReject(notification.id)}>
                                    <XCircle size={16} />
                                </button>
                            </div>
                        </div>
                    ) : notification.notificationType === 'business_offer' ? (
                        // Business Offer Notification - Green Card with Dollar Sign
                        <div
                            key={notification.id}
                            className={`notification-item business-offer ${notification.isUnread ? 'unread' : ''} ${selectedItems.includes(notification.id) ? 'selected' : ''}`}
                            onClick={() => handleMatchClick(notification.id)}
                        >
                            <label className="checkbox-wrapper" onClick={(e) => e.stopPropagation()}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(notification.id)}
                                    onChange={() => toggleSelect(notification.id)}
                                />
                                <span className="checkmark"></span>
                            </label>

                            <div className="business-icon">
                                <DollarSign size={24} />
                            </div>

                            <div className="notification-content">
                                <div className="company-name">{notification.companyName}</div>
                                <div className="job-title">{notification.jobTitle}</div>
                                <div className="salary-row">
                                    <DollarSign size={14} />
                                    <span className="salary-amount">{notification.salary}</span>
                                </div>
                                <div className="notification-desc">{notification.jobDescription}</div>
                            </div>

                            <div className="notification-meta">
                                <span className="business-badge">Paid Opportunity</span>
                                <span className="notification-date">{notification.date}</span>
                            </div>

                            <div className="notification-actions" onClick={(e) => e.stopPropagation()}>
                                <button className="action-btn save" title="Save" onClick={() => handleSave(notification.id)}>
                                    <Bookmark size={16} />
                                </button>
                                <button className="action-btn done" title="Accept" onClick={() => handleDone(notification.id)}>
                                    <CheckCircle size={16} />
                                </button>
                                <button className="action-btn reject" title="Reject" onClick={() => handleReject(notification.id)}>
                                    <XCircle size={16} />
                                </button>
                            </div>

                            <div className="notification-avatar business-avatar">
                                <img
                                    src={notification.companyLogo}
                                    alt={notification.companyName}
                                />
                            </div>
                        </div>
                    ) : (
                        // Collaboration Request Notification
                        <div
                            key={notification.id}
                            className={`notification-item collab-request ${notification.isUnread ? 'unread' : ''} ${selectedItems.includes(notification.id) ? 'selected' : ''}`}
                        >
                            <label className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(notification.id)}
                                    onChange={() => toggleSelect(notification.id)}
                                />
                                <span className="checkmark"></span>
                            </label>

                            <div className="collab-icon">
                                <Users size={18} />
                            </div>

                            <div className="notification-content">
                                <div className="sender-name">{notification.senderName}</div>
                                <div className="collab-subtitle">sent you a collaboration request</div>
                                <div className="skills-row">
                                    <span className="skills-label">Looking for:</span>
                                    {notification.requiredSkills?.map((skill, idx) => (
                                        <span key={idx} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                                <div className="notification-desc">{notification.projectDescription}</div>
                            </div>

                            <div className="notification-meta">
                                <span className="activity-badge">Collaboration</span>
                                <span className="notification-date">{notification.date}</span>
                            </div>

                            <div className="notification-actions">
                                <button className="action-btn save" title="Save" onClick={() => handleSave(notification.id)}>
                                    <Bookmark size={16} />
                                </button>
                                <button className="action-btn done" title="Accept" onClick={() => handleDone(notification.id)}>
                                    <CheckCircle size={16} />
                                </button>
                                <button className="action-btn reject" title="Reject" onClick={() => handleReject(notification.id)}>
                                    <XCircle size={16} />
                                </button>
                            </div>

                            <div className="notification-avatar">
                                <img
                                    src={notification.senderAvatar}
                                    alt={notification.senderName}
                                />
                            </div>

                            <button className="more-btn">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
