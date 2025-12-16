import { useState } from 'react';
import { Inbox, Bookmark, Check, User, Users, AtSign, GitPullRequest, ChevronDown, Plus } from 'lucide-react';
import './InboxSidebar.css';

type FilterItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
    count?: number;
};

type InboxSidebarProps = {
    activeFilter: string;
    onFilterChange: (filterId: string) => void;
};

export default function InboxSidebar({ activeFilter, onFilterChange }: InboxSidebarProps) {
    const [isFiltersOpen, setIsFiltersOpen] = useState(true);

    const mainItems: FilterItem[] = [
        { id: 'inbox', label: 'Inbox', icon: <Inbox size={16} />, count: 19 },
        { id: 'saved', label: 'Saved', icon: <Bookmark size={16} /> },
        { id: 'done', label: 'Done', icon: <Check size={16} /> },
    ];

    const filterItems: FilterItem[] = [
        { id: 'assigned', label: 'Assigned', icon: <User size={14} />, count: 12 },
        { id: 'participating', label: 'Participating', icon: <Users size={14} />, count: 12 },
        { id: 'mentioned', label: 'Mentioned', icon: <AtSign size={14} /> },
        { id: 'team-mentioned', label: 'Team mentioned', icon: <Users size={14} /> },
        { id: 'review-requested', label: 'Review requested', icon: <GitPullRequest size={14} /> },
    ];


    return (
        <aside className="inbox-sidebar">
            {/* Main Navigation */}
            <nav className="sidebar-nav">
                {mainItems.map((item) => (
                    <button
                        key={item.id}
                        className={`sidebar-item ${activeFilter === item.id ? 'active' : ''}`}
                        onClick={() => onFilterChange(item.id)}
                    >
                        <span className="item-icon">{item.icon}</span>
                        <span className="item-label">{item.label}</span>
                        {item.count && <span className="item-count">{item.count}</span>}
                    </button>
                ))}
            </nav>

            {/* Filters Section */}
            <div className="sidebar-section">
                <button
                    className="section-header"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                >
                    <span>Filters</span>
                    <ChevronDown size={14} className={`chevron ${isFiltersOpen ? 'open' : ''}`} />
                </button>
                {isFiltersOpen && (
                    <nav className="section-nav">
                        {filterItems.map((item) => (
                            <button
                                key={item.id}
                                className={`sidebar-item small ${activeFilter === item.id ? 'active' : ''}`}
                                onClick={() => onFilterChange(item.id)}
                            >
                                <span className="item-icon">{item.icon}</span>
                                <span className="item-label">{item.label}</span>
                                {item.count && <span className="item-count">{item.count}</span>}
                            </button>
                        ))}
                        <button className="sidebar-item small add-filter">
                            <Plus size={14} />
                            <span>Add new filter</span>
                        </button>
                    </nav>
                )}
            </div>

            {/* Manage Notifications */}
            <div className="sidebar-footer">
                <button className="manage-btn">
                    Manage notifications
                    <ChevronDown size={14} />
                </button>
            </div>
        </aside>
    );
}
