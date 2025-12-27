import { useState } from 'react';
import { MessageCircle, Heart, Share2 } from 'lucide-react';
import './Topics.css';

// Mock data - backend'den gelecek
const topics = [
    {
        id: 1,
        author: { name: 'Sait Dündar', avatar: 'https://ui-avatars.com/api/?name=SD&background=3b82f6&color=fff' },
        project: 'Bridge App',
        content: 'Just launched the MVP of Bridge App! Looking for feedback from the community. Check it out and let me know what you think 🚀',
        likes: 24,
        comments: 8,
        time: '2 saat önce'
    },
    {
        id: 2,
        author: { name: 'Deniz Yılmaz', avatar: 'https://ui-avatars.com/api/?name=DY&background=10b981&color=fff' },
        project: 'Eco-Route Tracker',
        content: 'We just hit 1000 active users on our sustainability app! Thank you everyone who contributed to this project. Next goal: carbon footprint calculator 🌱',
        likes: 45,
        comments: 12,
        time: '5 saat önce'
    },
    {
        id: 3,
        author: { name: 'Ali Koç', avatar: 'https://ui-avatars.com/api/?name=AK&background=8b5cf6&color=fff' },
        project: 'FinSync Dashboard',
        content: 'Working on real-time sync feature. Any recommendations for WebSocket libraries that work well with React?',
        likes: 18,
        comments: 23,
        time: 'Dün'
    },
    {
        id: 4,
        author: { name: 'Zeynep Kaya', avatar: 'https://ui-avatars.com/api/?name=ZK&background=f59e0b&color=fff' },
        project: null,
        content: 'Looking for a frontend developer to join our open-source design system project. DM if interested!',
        likes: 32,
        comments: 5,
        time: 'Dün'
    },
];

export default function Topics() {
    const [likedPosts, setLikedPosts] = useState<number[]>([]);

    const toggleLike = (id: number) => {
        setLikedPosts(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    return (
        <div className="topics-list">
            {topics.map(topic => (
                <div key={topic.id} className="topic-item">
                    <div className="topic-header">
                        <img src={topic.author.avatar} alt={topic.author.name} className="topic-avatar" />
                        <div className="topic-meta">
                            <span className="topic-author">{topic.author.name}</span>
                            {topic.project && <span className="topic-project">in {topic.project}</span>}
                            <span className="topic-time">· {topic.time}</span>
                        </div>
                    </div>
                    <p className="topic-content">{topic.content}</p>
                    <div className="topic-actions">
                        <button
                            className={`action-btn ${likedPosts.includes(topic.id) ? 'liked' : ''}`}
                            onClick={() => toggleLike(topic.id)}
                        >
                            <Heart size={16} fill={likedPosts.includes(topic.id) ? 'currentColor' : 'none'} />
                            <span>{topic.likes + (likedPosts.includes(topic.id) ? 1 : 0)}</span>
                        </button>
                        <button className="action-btn">
                            <MessageCircle size={16} />
                            <span>{topic.comments}</span>
                        </button>
                        <button className="action-btn">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
