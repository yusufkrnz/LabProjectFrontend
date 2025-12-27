import { useState } from 'react';
import { MessageSquare, ArrowBigUp, Share2, MoreHorizontal } from 'lucide-react';
import './Topics.css';

// Mock data
const topics = [
    {
        id: 1,
        author: { name: 'Sait Dündar', username: '@saitdundar', avatar: 'https://ui-avatars.com/api/?name=SD&background=3b82f6&color=fff' },
        project: 'Bridge App',
        content: 'Just launched the MVP of Bridge App! Looking for feedback from the community. Check it out and let me know what you think 🚀',
        upvotes: 24,
        comments: 8,
        time: '2h'
    },
    {
        id: 2,
        author: { name: 'Deniz Yılmaz', username: '@denizyilmaz', avatar: 'https://ui-avatars.com/api/?name=DY&background=10b981&color=fff' },
        project: 'Eco-Route Tracker',
        content: 'We just hit 1000 active users on our sustainability app! Thank you everyone who contributed to this project. Next goal: carbon footprint calculator 🌱',
        upvotes: 45,
        comments: 12,
        time: '5h'
    },
    {
        id: 3,
        author: { name: 'Ali Koç', username: '@alikoc', avatar: 'https://ui-avatars.com/api/?name=AK&background=8b5cf6&color=fff' },
        project: 'FinSync Dashboard',
        content: 'Working on real-time sync feature. Any recommendations for WebSocket libraries that work well with React? #react #websocket',
        upvotes: 18,
        comments: 23,
        time: '1d'
    },
    {
        id: 4,
        author: { name: 'Zeynep Kaya', username: '@zeynepk', avatar: 'https://ui-avatars.com/api/?name=ZK&background=f59e0b&color=fff' },
        project: null,
        content: 'Looking for a frontend developer to join our open-source design system project. DM if interested!',
        upvotes: 32,
        comments: 5,
        time: '1d'
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
                    <img src={topic.author.avatar} alt={topic.author.name} className="topic-avatar" />
                    <div className="topic-body">
                        <div className="topic-header">
                            <div className="topic-meta">
                                <span className="topic-author-name">{topic.author.name}</span>
                                <span className="topic-author-username">{topic.author.username}</span>
                                <span className="topic-dot">·</span>
                                <span className="topic-time">{topic.time}</span>
                            </div>
                            <button className="topic-more-btn">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>

                        {topic.project && (
                            <div className="topic-project-tag">
                                <span>Developing </span>
                                <strong>{topic.project}</strong>
                            </div>
                        )}

                        <p className="topic-content">{topic.content}</p>

                        <div className="topic-actions">
                            <button
                                className={`action-btn upvote ${likedPosts.includes(topic.id) ? 'upvoted' : ''}`}
                                onClick={() => toggleLike(topic.id)}
                                title="Upvote"
                            >
                                <ArrowBigUp
                                    size={20}
                                    className={likedPosts.includes(topic.id) ? 'fill-current' : ''}
                                    strokeWidth={1.5}
                                />
                                <span>{topic.upvotes + (likedPosts.includes(topic.id) ? 1 : 0)}</span>
                            </button>
                            <button className="action-btn comment">
                                <MessageSquare size={18} strokeWidth={1.5} />
                                <span>{topic.comments}</span>
                            </button>
                            <button className="action-btn share">
                                <Share2 size={18} strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
