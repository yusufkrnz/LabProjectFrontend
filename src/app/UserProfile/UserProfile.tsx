import './UserProfile.css';
import Header from '../../components/Header';
import UserProfileDetailCard from "../../components/UserProfileDetailCard/UserProfileDetailCard";
import UserTechStack from "../../components/UserTechStack/UserTechStack";
import UserProjectsInfoCard from "../../components/UserProjectsInfoCard/UserProjectsInfoCard";
import DownloadCV from "../../components/DownloadCV/DownloadCV";

export default function UserProfile() {
    return (
        <div className="user-profile">
            <Header />
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