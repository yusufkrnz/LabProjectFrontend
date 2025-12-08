import Sidebar from './components/Sidebar';
import './Dashboard.css';
import HeaderMenu from '../Dashboard/components/HeaderMenu/HeaderMenu';
import React from 'react';
import { useState } from 'react';
import Content from './components/Content/Content';
import Message from './components/Message/Message';



export default function Dashboard() {
  const [isSidebarOpen, setIsSiderbarOpen] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<string>("market-place-pool");


  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSiderbarOpen(prev => !prev)} />
      <main>

        <HeaderMenu toggleSidebar={() => setIsSiderbarOpen((prev: boolean) => !prev)}
          setActivePage={setActivePage}
        />


        <div className="page-content">
          <Content activePage={activePage} />
        </div>

      </main>
      <Message />
    </div>
  )
}
