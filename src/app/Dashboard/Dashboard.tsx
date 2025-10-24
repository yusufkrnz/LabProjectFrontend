import React, { useState, useEffect } from "react";
import SideBar from "./components/SideBar/SideBar";
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const {user,isLoading}=useAuth();

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Listen for sidebar toggle events
        const handleSidebarToggle = (event: CustomEvent) => {
            setSidebarExpanded(event.detail.isExpanded);
        };

        window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <SideBar />
            
            {/* Main Content Area - Fixed positioning to avoid overlap */}
            <div 
                className={`dashboard-main-content min-h-screen transition-all duration-300 ease-in-out ${
                    !sidebarExpanded ? 'collapsed' : ''
                } ${
                    isMobile 
                        ? 'ml-0' 
                        : sidebarExpanded 
                            ? 'ml-[280px]' 
                            : 'ml-[70px]'
                }`}
                style={{
                    marginLeft: isMobile ? '0' : sidebarExpanded ? '280px' : '70px',
                    position: 'relative',
                    zIndex: 1,
                    backgroundColor: '#f9fafb',
                    minHeight: '100vh'
                }}
            >
                <main className="p-6 md:p-8 lg:p-12">
                    {/* Content Container with proper spacing */}
                    <div className="w-full max-w-7xl mx-auto">
                        {/* Header Section */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                                Dashboard
                            </h1>
                            <p className="text-gray-600">
                                Hoş geldiniz! {user?.username || 'Kullanıcı'} Dashboard'dasınız şuan .
                            </p>
                        </div>
                        
                        {/* Dashboard Content Area */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            {/* Dashboard içeriği buraya gelecek */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
