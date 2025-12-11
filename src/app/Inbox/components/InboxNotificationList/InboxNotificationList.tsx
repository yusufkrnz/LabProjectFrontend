import { useState } from 'react';
import { Search, Check, X, AlertCircle, MoreHorizontal, ChevronDown, Bookmark, CheckCircle, XCircle } from 'lucide-react';
import './InboxNotificationList.css';

type Notification = {
    id: string;
    type: 'pr' | 'issue' | 'discussion' | 'workflow';
    status: 'success' | 'failure' | 'pending';
    repo: string;
    title: string;
    description: string;
    activityType: string;
    date: string;
    isUnread: boolean;
};

type InboxNotificationListProps = {
    activeTab?: 'all' | 'unread';
};

export default function InboxNotificationList({ activeTab = 'all' }: InboxNotificationListProps) {
    const [tab, setTab] = useState<'all' | 'unread'>(activeTab);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [groupBy, setGroupBy] = useState('Date');

    const notifications: Notification[] = [
        {
            id: '1',
            type: 'workflow',
            status: 'pending',
            repo: 'saitddundar/saitddundar.github.io',
            title: 'pages build and deployment #21',
            description: 'pages build and deployment workflow run cancelled for gh-pages branch',
            activityType: 'activity',
            date: 'on Nov 8',
            isUnread: true,
        },
        {
            id: '2',
            type: 'workflow',
            status: 'pending',
            repo: 'saitddundar/saitddundar.github.io',
            title: 'pages build and deployment #19',
            description: 'pages build and deployment workflow run cancelled for gh-pages branch',
            activityType: 'activity',
            date: 'on Nov 8',
            isUnread: true,
        },
        {
            id: '3',
            type: 'workflow',
            status: 'failure',
            repo: 'saitddundar/saitddundar.github.io',
            title: 'Deploy React App to GitHub Pages #29',
            description: 'Deploy React App to GitHub Pages workflow run failed for main branch',
            activityType: 'activity',
            date: 'on Nov 4',
            isUnread: false,
        },
        {
            id: '4',
            type: 'workflow',
            status: 'failure',
            repo: 'saitddundar/saitddundar.github.io',
            title: 'Deploy React App to GitHub Pages #28',
            description: 'Deploy React App to GitHub Pages workflow run failed for main branch',
            activityType: 'activity',
            date: 'on Nov 4',
            isUnread: false,
        },
        {
            id: '5',
            type: 'workflow',
            status: 'failure',
            repo: 'saitddundar/saitddundar.github.io',
            title: 'Deploy React App to GitHub Pages #27',
            description: 'Deploy React App to GitHub Pages workflow run failed for main branch',
            activityType: 'activity',
            date: 'on Nov 4',
            isUnread: false,
        },
    ];

    const filteredNotifications = notifications.filter(n => {
        if (tab === 'unread' && !n.isUnread) return false;
        if (searchQuery) {
            return n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                n.description.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'success':
                return <Check size={14} className="status-icon success" />;
            case 'failure':
                return <X size={14} className="status-icon failure" />;
            default:
                return <AlertCircle size={14} className="status-icon pending" />;
        }
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
                    <button className="group-by-btn">
                        Group by: {groupBy}
                        <ChevronDown size={14} />
                    </button>
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
                    <span className="select-all-label">Select all</span>
                </div>

                {/* Notification Items */}
                {filteredNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`notification-item ${notification.isUnread ? 'unread' : ''} ${selectedItems.includes(notification.id) ? 'selected' : ''}`}
                    >
                        <label className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(notification.id)}
                                onChange={() => toggleSelect(notification.id)}
                            />
                            <span className="checkmark"></span>
                        </label>

                        {getStatusIcon(notification.status)}

                        <div className="notification-content">
                            <div className="notification-repo">{notification.repo}</div>
                            <div className="notification-title">{notification.title}</div>
                            <div className="notification-desc">{notification.description}</div>
                        </div>

                        <div className="notification-meta">
                            <span className="activity-badge">{notification.activityType}</span>
                            <span className="notification-date">{notification.date}</span>
                        </div>

                        <div className="notification-actions">
                            <button className="action-btn save" title="Save">
                                <Bookmark size={16} />
                                <span>Save</span>
                            </button>
                            <button className="action-btn done" title="Done">
                                <CheckCircle size={16} />
                                <span>Done</span>
                            </button>
                            <button className="action-btn reject" title="Reject">
                                <XCircle size={16} />
                                <span>Reject</span>
                            </button>
                        </div>

                        <div className="notification-avatar">
                            <img
                                src="https://ui-avatars.com/api/?name=SD&background=e97f0d&color=fff&size=32"
                                alt="avatar"
                            />
                        </div>

                        <button className="more-btn">
                            <MoreHorizontal size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
