import React, { useState } from 'react';
import { motion } from 'motion/react';
import GlassSurface from '../GlassSurface';
import { 
  LayoutDashboard,
  Package,
  Mail,
  Calendar,
  Users,
  Bell,
  MessageSquare,
  Settings
} from "lucide-react";
import './Dock.css';

interface DockItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: string;
}

export default function Dock() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const dockItems: DockItem[] = [
    { id: "dashboard", name: "Ana Sayfa", icon: <LayoutDashboard size={24} /> },
    { id: "products", name: "Ürünler", icon: <Package size={24} /> },
    { id: "mail", name: "Mesajlar", icon: <Mail size={24} /> },
    { id: "calendar", name: "Takvim", icon: <Calendar size={24} /> },
    { id: "contacts", name: "Ağlar", icon: <Users size={24} /> },
    { id: "notifications", name: "Bildirimler", icon: <Bell size={24} />, badge: "24" },
    { id: "chat", name: "Sohbet", icon: <MessageSquare size={24} />, badge: "8" },
    { id: "settings", name: "Ayarlar", icon: <Settings size={24} /> },
  ];

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    console.log(`Navigating to: ${itemId}`);
  };

  return (
    <div className="dock-container">
      <motion.div 
        className="dock-wrapper"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GlassSurface
          width="auto"
          height={90}
          borderRadius={29}
          displace={25}
          distortionScale={-300}
          redOffset={10}
          greenOffset={25}
          blueOffset={40}
          brightness={80}
          opacity={0.9}
          mixBlendMode="screen"
          className="dock-glass-surface"
        >
          <div className="dock">
            {dockItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="dock-item-wrapper"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item.id)}
                whileHover={{ 
                  scale: 1.2,
                  y: -10,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <motion.div
                  className={`dock-item ${activeItem === item.id ? 'active' : ''}`}
                  animate={{
                    backgroundColor: activeItem === item.id ? '#d9b38c' : 'rgba(255, 255, 255, 0.1)',
                    scale: hoveredItem === item.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="dock-icon">
                    {item.icon}
                  </div>
                  
                  {item.badge && (
                    <motion.div 
                      className="dock-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {item.badge}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </GlassSurface>
      </motion.div>
    </div>
  );
}