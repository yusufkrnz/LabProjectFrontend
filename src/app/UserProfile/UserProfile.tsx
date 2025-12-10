import React, { useState } from "react";
import './UserProfile.css';
import UserProfileDetailCard from "../../components/UserProfileDetailCard/UserProfileDetailCard";
import Sidebar from "../Dashboard/components/Sidebar";

export default function UserProfile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="user-profile">
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div>
                <UserProfileDetailCard />
            </div>
        </div>
    );
}