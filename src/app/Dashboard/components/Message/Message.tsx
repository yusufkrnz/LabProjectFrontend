import React, { useState } from "react";
import { MessageSquare, ChevronRight } from "lucide-react"; // İkonlar için
import './Message.css';


export default function Message() {
    const [isOpen, setIsOpen] = useState(true);
    const unreadCount = 3; // Mock veri

    const toggleMessage = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`message-container ${isOpen ? 'open' : 'closed'}`}>
            <div className="message-block">
                <div className="message-header" onClick={toggleMessage}>
                    <div className="header-left">
                        <MessageSquare size={20} className="header-icon" />
                        <h2>Messages</h2>
                        {unreadCount > 0 && (
                            <span className="count-badge">{unreadCount}</span>
                        )}
                    </div>
                    <div className="header-right">
                        {isOpen ? <ChevronRight size={20} style={{ transform: 'rotate(90deg)' }} /> : <ChevronRight size={20} style={{ transform: 'rotate(-90deg)' }} />}
                    </div>
                </div>

                <div className="message-content">
                    {/* Örnek Mesaj Listesi */}
                    <div className="message-item">
                        <div className="avatar">A</div>
                        <div className="msg-info">
                            <span className="name">Ahmet Yılmaz</span>
                            <span className="text">Toplantı ne zaman?</span>
                        </div>
                        <span className="time">10:30</span>
                    </div>
                    <div className="message-item unread">
                        <div className="avatar">Z</div>
                        <div className="msg-info">
                            <span className="name">Zeynep Kaya</span>
                            <span className="text">Dosyaları gönderdim.</span>
                        </div>
                        <span className="time">09:15</span>
                    </div>
                    <div className="message-item">
                        <div className="avatar">M</div>
                        <div className="msg-info">
                            <span className="name">Mehmet Demir</span>
                            <span className="text">Teşekkürler!</span>
                        </div>
                        <span className="time">Dün</span>
                    </div>
                </div>
            </div>
        </div>
    );
}