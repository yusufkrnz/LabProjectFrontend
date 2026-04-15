import { useState } from 'react';
import Header from '../../components/Header/Header';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import './Feed.css';

type Post = {
    id: string;
    user: {
        name: string;
        username: string;
        avatar: string;
        title: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    timestamp: string;
};

const MOCK_POSTS: Post[] = [
    {
        id: '1',
        user: {
            name: 'Sarah Chen',
            username: 'sarahc',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
            title: 'Frontend Engineer'
        },
        content: 'Just shipped the new dashboard design! 🚀 Really enjoying the new features in React 19. #reactjs #webdev',
        image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80',
        likes: 124,
        comments: 18,
        timestamp: '2h ago'
    },
    {
        id: '2',
        user: {
            name: 'Alex Morgan',
            username: 'alexm',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
            title: 'Product Designer'
        },
        content: 'Working on some fresh UI concepts for the mobile app. Minimalism is key! 🎨',
        likes: 89,
        comments: 12,
        timestamp: '4h ago'
    },
    {
        id: '3',
        user: {
            name: 'David Kim',
            username: 'davidk',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            title: 'Backend Dev'
        },
        content: 'Optimized our API response times by 40% today. Caching strategies ftw! ⚡️',
        likes: 256,
        comments: 34,
        timestamp: '6h ago'
    }
];

export default function Feed() {
    const [posts] = useState<Post[]>(MOCK_POSTS);

    return (
        <div className="feed-page">
            <Header />
            <div className="feed-container">
                <main className="feed-main">
                    {/* Create Post Input */}
                    <div className="create-post-card">
                        <div className="create-post-top">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" alt="Me" className="user-avatar" />
                            <input type="text" placeholder="Start a post..." className="post-input" />
                        </div>
                    </div>

                    {/* Posts Feed */}
                    <div className="posts-list">
                        {posts.map(post => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <img src={post.user.avatar} alt={post.user.name} className="post-avatar" />
                                    <div className="post-header-info">
                                        <div className="post-user-row">
                                            <span className="post-name">{post.user.name}</span>
                                            <span className="post-username">@{post.user.username}</span>
                                            <span className="post-dot">•</span>
                                            <span className="post-time">{post.timestamp}</span>
                                        </div>
                                        <div className="post-title">{post.user.title}</div>
                                    </div>
                                    <button className="post-options-btn">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>

                                <div className="post-content">
                                    <p>{post.content}</p>
                                    {post.image && (
                                        <div className="post-image-container">
                                            <img src={post.image} alt="Post content" className="post-image" />
                                        </div>
                                    )}
                                </div>

                                <div className="post-actions">
                                    <button className="action-btn">
                                        <Heart size={20} />
                                        <span>{post.likes}</span>
                                    </button>
                                    <button className="action-btn">
                                        <MessageCircle size={20} />
                                        <span>{post.comments}</span>
                                    </button>
                                    <button className="action-btn">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                {/* Right Sidebar (Suggestions etc) */}
                <aside className="feed-sidebar">
                    <div className="sidebar-card">
                        <h3>Suggested for you</h3>
                        {/* Placeholder suggestions */}
                        <div className="suggestion-item">
                            <div className="suggestion-avatar"></div>
                            <div className="suggestion-info">
                                <div className="suggestion-name">Emily Rose</div>
                                <div className="suggestion-desc">UX Designer</div>
                            </div>
                            <button className="follow-text-btn">Follow</button>
                        </div>
                        <div className="suggestion-item">
                            <div className="suggestion-avatar"></div>
                            <div className="suggestion-info">
                                <div className="suggestion-name">Michael Chen</div>
                                <div className="suggestion-desc">Full Stack</div>
                            </div>
                            <button className="follow-text-btn">Follow</button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
