import { Home, FolderKanban, Settings, User, ChevronLeft, ChevronRight } from 'lucide-react';
import './Sidebar.css';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {

  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', active: true },
    { icon: <FolderKanban size={20} />, label: 'Projects', active: false },
    { icon: <Settings size={20} />, label: 'Settings', active: false },
  ];

  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">B</div>
          {isOpen && <span className="logo-text">Bridge</span>}
        </div>

        <button 
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Menu Section */}
      <div className="sidebar-menu">
        {isOpen && <div className="menu-title">MENU</div>}
        
        <nav className="menu-items">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`menu-item ${item.active ? 'active' : ''}`}
              title={!isOpen ? item.label : undefined}
            >
              <span className="menu-icon">{item.icon}</span>
              {isOpen && <span className="menu-label">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            <User size={20} />
          </div>
          {isOpen && (
            <div className="user-info">
              <div className="user-name">Kullanıcı</div>
              <div className="user-email">user@example.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
