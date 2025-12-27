import { useState } from 'react';
import './DashboardFeed.css';

// Mock data
const filterTags = ['All', '#Co-Founder', '#Freelance', '#Volunteer', '#Equity'];

const hotProjects = [
    {
        id: 1,
        title: 'Mobile App Developer Needed',
        project: 'Eco-Route Tracker',
        description: 'Building a sustainable transportation app',
        tech: ['React Native', 'Firebase'],
        urgency: 'hot',
        applicants: 12
    },
    {
        id: 2,
        title: 'Backend Engineer for MVP',
        project: 'FinSync',
        description: 'Financial dashboard for startups',
        tech: ['Node.js', 'PostgreSQL'],
        urgency: 'new',
        applicants: 8
    }
];

const aiMatches = [
    {
        id: 1,
        matchScore: 94,
        project: 'AI Image Upscaler',
        reason: 'Your expertise in Python matches their ML pipeline goal.',
        tech: ['Python', 'TensorFlow']
    },
    {
        id: 2,
        matchScore: 87,
        project: 'Social Impact Dashboard',
        reason: 'Your React skills align with their frontend needs.',
        tech: ['React', 'D3.js']
    }
];

const recentActivity = [
    { id: 1, user: 'Deniz Y.', action: 'started following', target: 'Ali K.', time: '2h' },
    { id: 2, user: 'Sait D.', action: 'created project', target: 'Bridge App', time: '3h' },
    { id: 3, user: 'Zeynep K.', action: 'joined', target: 'FinTech Wallet', time: '5h' }
];

export default function DashboardFeed() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <div className="dashboard-feed">
            {/* Filter Bar */}
            <div className="filter-bar">
                {filterTags.map(tag => (
                    <button
                        key={tag}
                        className={`filter-pill ${activeFilter === tag ? 'active' : ''}`}
                        onClick={() => setActiveFilter(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="feed-layout">
                {/* Main Content */}
                <div className="feed-main">
                    {/* Hot Projects Section */}
                    <section className="feed-section">
                        <h2 className="section-title">Open Positions</h2>
                        <div className="projects-grid">
                            {hotProjects.map(project => (
                                <div
                                    key={project.id}
                                    className="project-card"
                                    onMouseEnter={() => setHoveredCard(project.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    {project.urgency === 'hot' && (
                                        <span className="badge-hot">Hot</span>
                                    )}
                                    {project.urgency === 'new' && (
                                        <span className="badge-new">New</span>
                                    )}
                                    <h3>{project.title}</h3>
                                    <p className="project-name">{project.project}</p>
                                    <p className="project-desc">{project.description}</p>
                                    <div className="tech-stack">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="tech-tag">{t}</span>
                                        ))}
                                    </div>
                                    <div className="card-footer">
                                        <span className="applicants">{project.applicants} applicants</span>
                                        <button
                                            className={`apply-btn ${hoveredCard === project.id ? 'visible' : ''}`}
                                        >
                                            Quick Apply
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* AI Matches Section */}
                    <section className="feed-section">
                        <h2 className="section-title">Recommended for You</h2>
                        <div className="matches-list">
                            {aiMatches.map(match => (
                                <div key={match.id} className="match-card">
                                    <div className="match-score">
                                        <svg viewBox="0 0 36 36" className="score-ring">
                                            <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="2" />
                                            <circle
                                                cx="18" cy="18" r="16"
                                                fill="none"
                                                stroke="url(#gradient)"
                                                strokeWidth="2"
                                                strokeDasharray={`${match.matchScore} ${100 - match.matchScore}`}
                                                strokeLinecap="round"
                                                transform="rotate(-90 18 18)"
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="100%" stopColor="#1e40af" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <span className="score-text">{match.matchScore}%</span>
                                    </div>
                                    <div className="match-content">
                                        <h4>{match.project}</h4>
                                        <p>{match.reason}</p>
                                        <div className="tech-stack">
                                            {match.tech.map((t, i) => (
                                                <span key={i} className="tech-tag">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="view-btn">View</button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <aside className="feed-sidebar">
                    <div className="sidebar-card">
                        <h3>Recent Activity</h3>
                        <div className="activity-list">
                            {recentActivity.map(item => (
                                <div key={item.id} className="activity-item">
                                    <p>
                                        <strong>{item.user}</strong> {item.action}{' '}
                                        <strong>{item.target}</strong>
                                    </p>
                                    <span className="activity-time">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
