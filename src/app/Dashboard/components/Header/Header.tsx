import { Search, Bell, Inbox, Plus, FolderPlus, Users, Flag, Download, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import './Header.css';
import ProfileCard from '../ProfileCard/ProfileCard';

export default function Header() {
    const [createMenuOpen, setCreateMenuOpen] = useState(false);

    return (
        <header className="dashboard-header">
            {/* Left Section - Logo & Navigation */}
            <div className="header-left">
                <a href="/dashboard" className="header-logo">Bridge</a>

                {/* Create Dropdown */}
                <div className="create-dropdown">
                    <button
                        className={`create-btn ${createMenuOpen ? 'active' : ''}`}
                        onClick={() => setCreateMenuOpen(!createMenuOpen)}
                    >
                        <Plus size={16} />
                        <ChevronDown size={14} />
                    </button>

                    {createMenuOpen && (
                        <div className="create-menu">
                            <a href="#" className="create-menu-item">
                                <FolderPlus size={18} />
                                <span>New Project</span>
                            </a>
                            <a href="#" className="create-menu-item">
                                <Users size={18} />
                                <span>New Team</span>
                            </a>
                            <a href="#" className="create-menu-item">
                                <Flag size={18} />
                                <span>New Milestone</span>
                            </a>
                            <div className="create-menu-divider"></div>
                            <a href="#" className="create-menu-item">
                                <Download size={18} />
                                <span>Import Project</span>
                            </a>
                        </div>
                    )}
                </div>

                <div className="header-divider"></div>

                <nav className="header-nav">
                    <a href="#" className="header-nav-item">Connect</a>
                    <a href="#" className="header-nav-item">My Projects</a>
                    <a href="#" className="header-nav-item">Marketplace</a>
                    <a href="#" className="header-nav-item">Manage Finance</a>
                </nav>
            </div>

            {/* Right Section - Search & Icons */}
            <div className="header-right">
                <div className="header-search">
                    <Search size={18} />
                    <input type="text" placeholder="Search" />
                </div>
                <a href="/inbox" className="header-icon-btn">
                    <Inbox size={20} />
                </a>
                <button className="header-icon-btn">
                    <Bell size={20} />
                </button>

                {/* Profile Card - Props will come from backend */}
                <ProfileCard
                    firstName="Yusuf"
                    lastName="Baran"
                    role="Developer"
                // profileImage="/path/to/image.jpg" // Uncomment when image is available
                />
            </div>
        </header>
    );
}
