import React, { useState } from "react";
import './UserProfile.css';
import UserProfileDetailCard from "../../components/UserProfileDetailCard/UserProfileDetailCard";
import Sidebar from "../Dashboard/components/Sidebar";
import UserTechStack from "../../components/UserTechStack/UserTechStack";
import UserProjectsInfoCard from "../../components/UserProjectsInfoCard/UserProjectsInfoCard";
import DownloadCV from "../../components/DownloadCV/DownloadCV";

export default function UserProfile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="user-profile">
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div className="user-profile-projects-info-card">

                <div />
                <div>
                    <UserProfileDetailCard />
                </div>
                <div className="user-profile-tech-stack">
                    <DownloadCV />
                    <UserTechStack />
                    <UserProjectsInfoCard />
                </div>
            </div>
        </div>
    );
}