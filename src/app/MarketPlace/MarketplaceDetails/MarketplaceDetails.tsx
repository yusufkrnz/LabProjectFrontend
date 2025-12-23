import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ArrowLeft, MapPin, Calendar, Users, Star, Code, Clock,
    Heart, Send, Globe, Github, MessageCircle, DollarSign,
    CheckCircle, X
} from 'lucide-react';
import Header from '../../../components/Header';
import './MarketplaceDetails.css';

// Types
type MarketplaceListing = {
    id: string;
    title: string;
    ownerName: string;
    ownerUsername: string;
    ownerAvatar: string;
    ownerBio: string;
    description: string;
    longDescription: string;
    requiredSkills: string[];
    teamSize: number;
    currentMembers: number;
    deadline: string;
    location: string;
    postedDate: string;
    isBookmarked: boolean;
    applicationCount: number;
    ownerRating: number;
    workStyle: 'volunteer' | 'paid';
    budget?: string;
    budgetType?: 'fixed' | 'monthly' | 'hourly';
    type: 'opensource' | 'commercial' | 'portfolio' | 'academic';
    status: 'active' | 'completed' | 'paused';
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
    timeline: string;
    ownerProjects: number;
    ownerGithub?: string;
    ownerWebsite?: string;
};

// API Service
const marketplaceDetailsService = {
    getListingById: async (id: string): Promise<MarketplaceListing | null> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/marketplace/${id}`);
        // return response.json();
        console.log('Fetching marketplace listing:', id);
        await new Promise(resolve => setTimeout(resolve, 300));

        // Return mock data
        return mockListingDetails;
    },

    applyToProject: async (listingId: string, message: string): Promise<boolean> => {
        // TODO: Replace with actual API call
        console.log('Applying to project:', listingId, 'Message:', message);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    },

    toggleBookmark: async (listingId: string): Promise<boolean> => {
        // TODO: Replace with actual API call
        console.log('Toggle bookmark:', listingId);
        await new Promise(resolve => setTimeout(resolve, 200));
        return true;
    }
};

const TYPE_LABELS: Record<string, string> = {
    opensource: 'Open Source',
    commercial: 'Commercial',
    portfolio: 'Portfolio',
    academic: 'Academic',
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export default function MarketplaceDetails() {
    const { id } = useParams<{ id: string }>();
    const [listing, setListing] = useState<MarketplaceListing | null>(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [applyMessage, setApplyMessage] = useState('');
    const [isApplying, setIsApplying] = useState(false);

    useEffect(() => {
        if (id) {
            marketplaceDetailsService.getListingById(id).then(data => {
                if (data) {
                    setListing(data);
                    setIsBookmarked(data.isBookmarked);
                }
            });
        }
    }, [id]);

    const handleBookmarkToggle = async () => {
        if (!listing) return;
        const success = await marketplaceDetailsService.toggleBookmark(listing.id);
        if (success) {
            setIsBookmarked(!isBookmarked);
        }
    };

    const handleSubmitApplication = async () => {
        if (!listing || !applyMessage.trim()) return;

        setIsApplying(true);
        const success = await marketplaceDetailsService.applyToProject(listing.id, applyMessage);

        if (success) {
            alert('Application submitted successfully!');
            setShowApplyModal(false);
            setApplyMessage('');
        } else {
            alert('Failed to submit application. Please try again.');
        }
        setIsApplying(false);
    };

    if (!listing) {
        return (
            <div className="marketplace-details-page">
                <Header />
            </div>
        );
    }

    return (
        <div className="marketplace-details-page">
            <Header />

            <div className="details-container">
                {/* Back Navigation */}
                <Link to="/marketplace" className="back-link">
                    <ArrowLeft size={18} />
                    Back to Marketplace
                </Link>

                <div className="details-layout">
                    {/* Main Content */}
                    <main className="details-main">
                        {/* Header Card */}
                        <div className="details-card header-card">
                            <div className="header-top">
                                <div className="listing-badges">
                                    <span className={`type-badge ${listing.type}`}>
                                        {TYPE_LABELS[listing.type]}
                                    </span>
                                    <span className={`status-badge ${listing.status}`}>
                                        {listing.status}
                                    </span>
                                    {listing.workStyle === 'paid' && listing.budget && (
                                        <span className="budget-badge">
                                            <DollarSign size={14} />
                                            {listing.budget}
                                            {listing.budgetType === 'monthly' && '/mo'}
                                        </span>
                                    )}
                                </div>
                                <button
                                    className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                                    onClick={handleBookmarkToggle}
                                >
                                    <Heart size={20} fill={isBookmarked ? '#e11d48' : 'none'} />
                                </button>
                            </div>

                            <h1 className="listing-title">{listing.title}</h1>

                            <div className="listing-meta">
                                <span className="meta-item">
                                    <Calendar size={16} />
                                    Posted {formatDate(listing.postedDate)}
                                </span>
                                <span className="meta-item">
                                    <MapPin size={16} />
                                    {listing.location}
                                </span>
                                <span className="meta-item">
                                    <Users size={16} />
                                    {listing.currentMembers}/{listing.teamSize} members
                                </span>
                                <span className="meta-item">
                                    <Clock size={16} />
                                    Deadline: {listing.deadline}
                                </span>
                            </div>

                            <p className="listing-description">{listing.description}</p>

                            <div className="listing-skills">
                                {listing.requiredSkills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="details-card">
                            <h2>About This Project</h2>
                            <p className="long-description">{listing.longDescription}</p>
                        </div>

                        {/* Responsibilities */}
                        <div className="details-card">
                            <h2>Responsibilities</h2>
                            <ul className="check-list">
                                {listing.responsibilities.map((item, idx) => (
                                    <li key={idx}>
                                        <CheckCircle size={16} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Requirements */}
                        <div className="details-card">
                            <h2>Requirements</h2>
                            <ul className="check-list">
                                {listing.requirements.map((item, idx) => (
                                    <li key={idx}>
                                        <CheckCircle size={16} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Benefits */}
                        {listing.benefits.length > 0 && (
                            <div className="details-card">
                                <h2>What You'll Get</h2>
                                <ul className="check-list benefits">
                                    {listing.benefits.map((item, idx) => (
                                        <li key={idx}>
                                            <Star size={16} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </main>

                    {/* Sidebar */}
                    <aside className="details-sidebar">
                        {/* Apply Card */}
                        <div className="sidebar-card apply-card">
                            <div className="applications-info">
                                <Code size={18} />
                                <span><strong>{listing.applicationCount}</strong> applications</span>
                            </div>
                            <button
                                className="apply-btn-large"
                                onClick={() => setShowApplyModal(true)}
                            >
                                <Send size={18} />
                                Apply Now
                            </button>
                            <p className="apply-hint">
                                Write a compelling message to stand out from other applicants.
                            </p>
                        </div>

                        {/* Owner Card */}
                        <div className="sidebar-card owner-card">
                            <h3>About the Owner</h3>
                            <div className="owner-header">
                                <img src={listing.ownerAvatar} alt={listing.ownerName} className="owner-avatar" />
                                <div className="owner-info">
                                    <span className="owner-name">{listing.ownerName}</span>
                                    <span className="owner-username">@{listing.ownerUsername}</span>
                                </div>
                            </div>
                            <p className="owner-bio">{listing.ownerBio}</p>

                            <div className="owner-stats">
                                <div className="stat">
                                    <Star size={16} fill="#f59e0b" color="#f59e0b" />
                                    <span>{listing.ownerRating.toFixed(1)} rating</span>
                                </div>
                                <div className="stat">
                                    <Code size={16} />
                                    <span>{listing.ownerProjects} projects</span>
                                </div>
                            </div>

                            <div className="owner-links">
                                {listing.ownerGithub && (
                                    <a href={`https://github.com/${listing.ownerGithub}`} target="_blank" rel="noopener noreferrer">
                                        <Github size={16} />
                                        {listing.ownerGithub}
                                    </a>
                                )}
                                {listing.ownerWebsite && (
                                    <a href={`https://${listing.ownerWebsite}`} target="_blank" rel="noopener noreferrer">
                                        <Globe size={16} />
                                        {listing.ownerWebsite}
                                    </a>
                                )}
                            </div>

                            <Link to={`/messages?user=${listing.ownerUsername}`} className="message-owner-btn">
                                <MessageCircle size={16} />
                                Message Owner
                            </Link>
                        </div>

                        {/* Timeline Card */}
                        <div className="sidebar-card">
                            <h3>Project Timeline</h3>
                            <p className="timeline-text">{listing.timeline}</p>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Apply Modal */}
            {showApplyModal && (
                <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Apply to Project</h3>
                            <button className="modal-close" onClick={() => setShowApplyModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="apply-project-info">
                                <h4>{listing.title}</h4>
                                <p>by {listing.ownerName}</p>
                            </div>
                            <label htmlFor="apply-message">Your Message</label>
                            <textarea
                                id="apply-message"
                                value={applyMessage}
                                onChange={(e) => setApplyMessage(e.target.value)}
                                placeholder="Introduce yourself and explain why you'd be a great fit for this project..."
                                rows={6}
                                maxLength={1000}
                            />
                            <span className="char-count">{applyMessage.length} / 1000</span>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="modal-btn modal-btn-secondary"
                                onClick={() => setShowApplyModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="modal-btn modal-btn-primary"
                                onClick={handleSubmitApplication}
                                disabled={isApplying || !applyMessage.trim()}
                            >
                                {isApplying ? 'Sending...' : 'Send Application'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Mock data for "Open Source React Component Library"
const mockListingDetails: MarketplaceListing = {
    id: 'p1',
    title: 'Open Source React Component Library',
    ownerName: 'Ahmet Y.',
    ownerUsername: 'ahmety',
    ownerAvatar: 'https://ui-avatars.com/api/?name=AY&background=3b82f6&color=fff&size=128',
    ownerBio: 'Full-stack developer passionate about open source. Building tools that help other developers create better software.',
    description: 'Building a comprehensive React component library with TypeScript support. Looking for passionate developers to contribute to documentation, testing, and new components.',
    longDescription: `We are building a modern, accessible, and fully customizable React component library that aims to be the go-to solution for developers who want beautiful UI components without the bloat.

Our library focuses on:
- **Accessibility First**: All components are WCAG 2.1 compliant out of the box
- **TypeScript Native**: Full TypeScript support with excellent intellisense
- **Customizable**: Easy theming with CSS variables and design tokens
- **Tree-shakeable**: Only import what you need
- **Well Documented**: Comprehensive documentation with Storybook

We're looking for contributors who share our vision of creating developer-friendly tools. Whether you're interested in building new components, writing tests, improving documentation, or helping with design, there's a place for you on this project.

This is a great opportunity to contribute to open source, learn from experienced developers, and build something that thousands of developers will use.`,
    requiredSkills: ['React', 'TypeScript', 'Storybook', 'Jest', 'CSS-in-JS', 'Accessibility'],
    teamSize: 5,
    currentMembers: 2,
    deadline: 'Ongoing',
    location: 'Remote',
    postedDate: '2024-12-20',
    isBookmarked: false,
    applicationCount: 8,
    ownerRating: 4.8,
    workStyle: 'volunteer',
    type: 'opensource',
    status: 'active',
    responsibilities: [
        'Design and implement reusable React components',
        'Write comprehensive unit and integration tests',
        'Create and maintain Storybook documentation',
        'Review pull requests from other contributors',
        'Participate in design discussions and code reviews',
        'Help maintain project issues and community support'
    ],
    requirements: [
        'Strong proficiency in React and TypeScript',
        'Experience with testing frameworks (Jest, React Testing Library)',
        'Understanding of accessibility standards (WCAG)',
        'Familiarity with Git and GitHub workflow',
        'Good communication skills in English',
        'Ability to commit at least 5 hours per week'
    ],
    benefits: [
        'Contribute to a widely-used open source project',
        'Learn from experienced senior developers',
        'Build your portfolio with real-world contributions',
        'Get recommendation letters for internships/jobs',
        'Recognition in project contributors list',
        'Networking opportunities in the React community'
    ],
    timeline: 'This is an ongoing open source project. We release minor updates bi-weekly and major versions quarterly. Contributors can join at any time and contribute at their own pace.',
    ownerProjects: 12,
    ownerGithub: 'ahmety',
    ownerWebsite: 'ahmety.dev'
};
