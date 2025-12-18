import { useState } from 'react';
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
