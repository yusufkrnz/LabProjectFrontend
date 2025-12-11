import React, { useState } from 'react';
import './DashboardFeed.css';
import { Search, Plus, Send, MoreHorizontal, Filter, MessageSquare, Star } from 'lucide-react';

export default function DashboardFeed() {
    const [inputValue, setInputValue] = useState("");

    const feedItems = [
        {
            user: "tarikmenguc",
            action: "followed",
            target: "",
            time: "2 days ago",
            avatar: "https://ui-avatars.com/api/?name=TM&background=random",
            type: "follow"
        },
        {
            user: "fatihkadim",
            action: "starred",
            target: "15 repositories",
            time: "2 days ago",
            avatar: "https://ui-avatars.com/api/?name=FK&background=random",
            followers: 119,
            type: "star"
        },
        {
            user: "merrymercy",
            action: "contributed to",
            target: "sgl-project/sglang",
            time: "2 days ago",
            avatar: "https://ui-avatars.com/api/?name=MM&background=random",
            title: "Add per-request decode tp size #14678",
            status: "Merged",
            description: "merrymercy merged 3 commits",
            comments: 2,
            type: "contribution"
        }
    ];

    return (
        <div className="dashboard-feed-container">
            <div className="feed-header">
                <div className="feed-title">
                    <h1>Home</h1>
                </div>
                <a href="#" className="feedback-link">Try the new dashboard experience</a>
            </div>

            <div className="feed-input-section">
                <div className="feed-input-wrapper">
                    <Search size={16} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Ask anything"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div className="input-actions">
                        <span className="model-selector">GPT-4o mini</span>
                        <button className="send-btn">
                            <Send size={14} />
                        </button>
                    </div>
                </div>
                <div className="quick-actions">
                    <button className="action-pill">
                        <Plus size={14} /> Add repositories, files, and spaces
                    </button>
                </div>
            </div>

            <div className="feed-section-header">
                <h2>Feed</h2>
                <button className="filter-btn">
                    <Filter size={14} /> Filter
                </button>
            </div>

            <div className="feed-list">
                {feedItems.map((item, index) => (
                    <div className="feed-card" key={index}>
                        <div className="feed-card-header">
                            <img src={item.avatar} alt={item.user} className="avatar-sm" />
                            <div className="feed-card-meta">
                                <span className="username">{item.user}</span>
                                <span className="action">{item.action}</span>
                                {item.target && <span className="target">{item.target}</span>}
                                <span className="time">{item.time}</span>
                            </div>
                            <button className="more-btn"><MoreHorizontal size={16} /></button>
                        </div>

                        {item.type === 'star' && (
                            <div className="feed-content-simple">
                                <div className="user-block">
                                    <img src={item.avatar} alt={item.user} className="avatar-lg" />
                                    <div className="user-details">
                                        <h3>{item.user}</h3>
                                        <p>{item.target} • {item.followers} followers</p>
                                    </div>
                                    <button className="follow-btn">Follow</button>
                                </div>
                            </div>
                        )}

                        {item.type === 'contribution' && (
                            <div className="feed-content-contribution">
                                <h3>{item.title}</h3>
                                <div className="contribution-status">
                                    <span className="status-badge purple">{item.status}</span>
                                    <span>{item.description}</span>
                                </div>
                                <div className="contribution-footer">
                                    <button className="reaction-btn">Let's go!</button>
                                    <div className="comments">
                                        <MessageSquare size={14} /> {item.comments} comments
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                <div className="feed-card">
                    <div className="recommendation-header">
                        <span className="trend-icon">📈</span> Trending repositories · <a href="#">See more</a>
                        <button className="more-btn"><MoreHorizontal size={16} /></button>
                    </div>
                    <div className="repo-item">
                        <div className="repo-info">
                            <img src="https://ui-avatars.com/api/?name=AI&background=0D8ABC&color=fff" className="avatar-sm" />
                            <div>
                                <h3>sarwarbeing-ai/Agentic_Design_Patterns</h3>
                                <p>Agentic Design Patterns: A Hands-On Guide to Building Intelligent Systems</p>
                                <div className="repo-meta">
                                    <span className="lang-dot orange"></span> Jupyter Notebook
                                    <span className="stars"><Star size={12} /> 3.7k</span>
                                </div>
                            </div>
                        </div>
                        <button className="star-btn"><Star size={14} /> Star</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
