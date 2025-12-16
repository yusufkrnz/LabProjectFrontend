import { useState } from 'react';
import Sidebar from '../Dashboard/components/Sidebar';
import InboxSidebar from './components/InboxSidebar/InboxSidebar';
import InboxNotificationList from './components/InboxNotificationList/InboxNotificationList';
import './Inbox.css';

export default function Inbox() {
    const [activeFilter, setActiveFilter] = useState('inbox');

    const handleFilterChange = (filterId: string) => {
        setActiveFilter(filterId);
    };

    return (
        <div className="inbox-container">
            {/* Top Header */}
            <Sidebar />

            {/* Main Content */}
            <div className="inbox-content">
                {/* Left Sidebar */}
                <InboxSidebar
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                />

                {/* Notification List */}
                <InboxNotificationList activeFilter={activeFilter} />
            </div>
        </div>
    );
}
