import { Search, MessageCircle, Inbox, Plus, FolderPlus, ClipboardList, UserPlus, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import ProfileCard from '../ProfileCard';
import logo from '../../assets/logo/image.png';

import MessagesDrawer from '../MessagesDrawer/MessagesDrawer';

export default function Header() {
    const [createMenuOpen, setCreateMenuOpen] = useState(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => {
        // Special case: /project/:id should keep My Projects active
        if (path === '/my-projects') {
            return location.pathname === '/my-projects' ||
                location.pathname.startsWith('/my-projects/') ||
                location.pathname.startsWith('/project/');
        }
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            <header className="dashboard-header">
                {/* Left Section - Logo & Navigation */}
                <div className="header-left">
                    <Link to="/dashboard" className="header-logo" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt="nowEureka Logo" style={{ height: '32px', objectFit: 'contain' }} />
                    </Link>

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
                                <Link to="/listing" className="create-menu-item" onClick={() => setCreateMenuOpen(false)}>
                                    <ClipboardList size={18} />
                                    <span>New Listing</span>
                                </Link>
                                <Link to="/join-project" className="create-menu-item" onClick={() => setCreateMenuOpen(false)}>
                                    <UserPlus size={18} />
                                    <span>Join a Project</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="header-divider"></div>

                    <nav className="header-nav">
                        <Link to="/feed" className={`header-nav-item ${isActive('/feed') ? 'active' : ''}`}>Feed</Link>
                        <Link to="/my-projects" className={`header-nav-item ${isActive('/my-projects') ? 'active' : ''}`}>My Projects</Link>
                        <Link to="/marketplace" className={`header-nav-item ${isActive('/marketplace') ? 'active' : ''}`}>Marketplace</Link>
                        <Link to="/manage-finance" className={`header-nav-item ${isActive('/manage-finance') ? 'active' : ''}`}>Manage Finance</Link>
                    </nav>
                </div>

                {/* Right Section - Search & Icons */}
                <div className="header-right">
                    <div className="header-search">
                        <Search size={18} />
                        <input type="text" placeholder="Search" />
                    </div>
                    <Link to="/inbox" className={`header-icon-btn ${isActive('/inbox') ? 'active' : ''}`}>
                        <Inbox size={20} />
                    </Link>

                    {/* Messages Toggle Button */}
                    <button
                        className={`header-icon-btn ${isMessagesOpen ? 'active' : ''}`}
                        onClick={() => setIsMessagesOpen(true)}
                    >
                        <MessageCircle size={20} />
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

            {/* Messages Sidebar Drawer */}
            <MessagesDrawer
                isOpen={isMessagesOpen}
                onClose={() => setIsMessagesOpen(false)}
            />
        </>
    );
}
