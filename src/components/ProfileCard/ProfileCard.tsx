import { User, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileCard.css';

interface ProfileCardProps {
    profileImage?: string;
    firstName: string;
    lastName: string;
    role: string;
    initials?: string;
}

export default function ProfileCard({
    profileImage,
    firstName,
    lastName,
    role,
    initials
}: ProfileCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    const displayInitials = initials || `${firstName.charAt(0)}${lastName.charAt(0)}`;

    return (
        <div className="profile-card-wrapper">
            <button
                className="profile-card-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                {profileImage ? (
                    <img src={profileImage} alt={`${firstName} ${lastName}`} className="profile-avatar-img" />
                ) : (
                    <div className="profile-avatar-initials">{displayInitials}</div>
                )}
            </button>

            {isOpen && (
                <div className="profile-card-dropdown">
                    {/* User Info Section */}
                    <div className="profile-card-header">
                        {profileImage ? (
                            <img src={profileImage} alt={`${firstName} ${lastName}`} className="profile-card-image" />
                        ) : (
                            <div className="profile-card-initials">{displayInitials}</div>
                        )}
                        <div className="profile-card-info">
                            <span className="profile-card-name">{firstName} {lastName}</span>
                            <span className="profile-card-role">{role}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="profile-card-divider"></div>

                    {/* Menu Items */}
                    <div className="profile-card-menu">
                        <Link to="/profile" className="profile-card-menu-item" onClick={() => setIsOpen(false)}>
                            <User size={18} />
                            <span>Profile</span>
                        </Link>
                        <Link to="/settings" className="profile-card-menu-item" onClick={() => setIsOpen(false)}>
                            <Settings size={18} />
                            <span>Settings</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
