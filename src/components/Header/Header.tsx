import { Search, MessageCircle, Inbox, Plus, FolderPlus, Users, Flag, Download, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ProfileCard from '../ProfileCard';

export default function Header() {
    const [createMenuOpen, setCreateMenuOpen] = useState(false);

    return (
        <header className="dashboard-header">
            {/* Left Section - Logo & Navigation */}
            <div className="header-left">
                <Link to="/dashboard" className="header-logo">Bridge</Link>

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
                            <Link to="/project" className="create-menu-item" onClick={() => setCreateMenuOpen(false)}>
                                <FolderPlus size={18} />
                                <span>New Project</span>
                            </Link>
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
                    <Link to="/marketplace" className="header-nav-item">Marketplace</Link>
                    <Link to="/manage-finance" className="header-nav-item">Manage Finance</Link>
                </nav>
            </div>

            {/* Right Section - Search & Icons */}
            <div className="header-right">
                <div className="header-search">
                    <Search size={18} />
                    <input type="text" placeholder="Search" />
                </div>
                <Link to="/inbox" className="header-icon-btn">
                    <Inbox size={20} />
                </Link>
                <Link to="/messages" className="header-icon-btn">
                    <MessageCircle size={20} />
                </Link>

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
