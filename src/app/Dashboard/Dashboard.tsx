import Header from '../../components/Header';
import './Dashboard.css';
import { useState } from 'react';
import DashboardFeed from './components/DashboardFeed';
import Message from './components/Message/Message';

export default function Dashboard() {
  const [isSidebarOpen, setIsSiderbarOpen] = useState<boolean>(true);
  const [activePage, setActivePage] = useState<string>("market-place-pool");

  return (
    <div className={`dashboard-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Header />
      <div className='content-wrapper'>
        <main>
          <DashboardFeed />

        </main>

      </div>
    </div>
  )
}
