import { useState } from "react";
import { 
  LayoutDashboard,
  Package,
  Mail,
  Calendar,
  Users,
  Bell,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import './SideBar.css';
import Dock from '../SideBar/DockComponents/Dock';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from "react-icons/vsc";

export default function SideBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", name: "Ana Sayfa", icon: <LayoutDashboard size={20} /> },
    { id: "products", name: "Products", icon: <Package size={20} /> },
    { id: "mail", name: "Mesajlar", icon: <Mail size={20} /> },
    { id: "calendar", name: "Calendar", icon: <Calendar size={20} /> },
    { id: "contacts", name: "Networks", icon: <Users size={20} /> },
  ];

  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  const accountItems = [
    { id: "notifications", name: "Notifications", icon: <Bell size={20} />, badge: "24" },
    { id: "chat", name: "Chat", icon: <MessageSquare size={20} />, badge: "8" },
    { id: "settings", name: "Settings", icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    const event = new CustomEvent('sidebarToggle', { detail: { isExpanded: newState } });
    window.dispatchEvent(event);
  };

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      
      {/* Header */}
      <div className="sidebar-header">
        <button 
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => setActiveItem(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {isExpanded && <span className="nav-text">{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Account Section */}
      <div className="account-section">
        {isExpanded && <div className="section-title">ACCOUNT</div>}
        <ul>
          {accountItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => setActiveItem(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {isExpanded && (
                  <>
                    <span className="nav-text">{item.name}</span>
                    {item.badge && <span className="badge">{item.badge}</span>}
                  </>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile */}
      <div className="user-profile">
        <div className="user-avatar">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
            alt="User Avatar"
          />
        </div>
        {isExpanded && (
          <div className="user-info">
            <div className="user-name">Nina Ergemla</div>
            <div className="user-email">nina_erg@ergemla.com</div>
          </div>
        )}
        <button className="user-menu-btn">
          <span>⋯</span>
        </button>
      </div>

      {/* Dock at the bottom of sidebar */}
      <div className="sidebar-dock">
        <Dock 
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>

    </aside>
  );
}
