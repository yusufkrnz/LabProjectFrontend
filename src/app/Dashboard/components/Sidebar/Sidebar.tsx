import { Search, Bell, HelpCircle, Home, FolderKanban, Settings, User, ChevronLeft, ChevronRight, Compass, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';



import { useNavigate } from 'react-router-dom';

export default function Sidebar({ }) {


  return (
    <div className="sidebar-main">

      {/* SOL MENU */}
      <div className="left-section">
        <nav className="nav-menu">
          <a href="#" className="nav-item">Find Work</a>
          <a href="#" className="nav-item">My Work</a>
          <a href="#" className="nav-item">My Pool</a>
          <a href="#" className="nav-item">Marketplace</a>
          <a href="#" className="nav-item">Settings</a>
        </nav>
      </div>

      {/* SAĞ İÇERİK */}
      <div className="right-section">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search" />
        </div>
        <Bell size={20} />
        <HelpCircle size={20} />
        <div className="profile-avatar">YB</div>
      </div>

    </div>
  )

}
