import { useState } from 'react';
import { Search, Image as ImageIcon, Send, Paperclip } from 'lucide-react';
import Header from '../../components/Header/Header';
import Topics from './Topics/Topics';
import './Hub.css';

export default function Hub() {
    const [searchQuery, setSearchQuery] = useState('');
    const [postContent, setPostContent] = useState('');

    const handlePost = () => {
        // Backend entegrasyonu buraya
        console.log('Posting:', postContent);
        setPostContent('');
    };

    return (
        <div className="hub-page">
            <Header />

            <main className="hub-content">
                <div className="hub-header-section">
                    <div className="hub-header-top">
                        <h1 className="hub-title">
                            <span className="font-bold">Bridge</span>
                            <span className="font-light">Hub</span>
                        </h1>
                        <div className="hub-search-input">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search discussions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="hub-header-separator" />
                    </div>

                    {/* Create Post Section - Lines only, no boxes */}
                    <div className="create-post-wrapper">
                        <div className="create-post-row">
                            <img
                                src="https://ui-avatars.com/api/?name=Sait+Dundar&background=3b82f6&color=fff"
                                alt="User"
                                className="current-user-avatar"
                            />
                            <div className="create-post-input-area">
                                <textarea
                                    placeholder="What's happening?"
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    rows={1}
                                />
                            </div>
                        </div>

                        <div className="create-post-actions">
                            <div className="create-post-icons">
                                <button className="icon-btn" title="Add Image">
                                    <ImageIcon size={20} />
                                </button>
                                <button className="icon-btn" title="Attach Project">
                                    <Paperclip size={20} />
                                </button>
                            </div>
                            <button
                                className="post-send-btn"
                                disabled={!postContent.trim()}
                                onClick={handlePost}
                            >
                                <span style={{ marginRight: '6px' }}>Post</span>
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hub-feed-container">
                    <Topics />
                </div>
            </main>
        </div>
    );
}
