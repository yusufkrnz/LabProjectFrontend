import Sidebar from './components/Sidebar';
import './Dashboard.css';
import React from 'react';
import { useState } from 'react';
import Message from './components/Message/Message';



import DashboardFeed from './components/DashboardFeed';

export default function Dashboard() {
  const [isSidebarOpen, setIsSiderbarOpen] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<string>("market-place-pool");


  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar />
      <div className='content-wrapper'>
        <main>
          <DashboardFeed />
        </main>
        <Message />

      </div>
    </div>
  )
}
