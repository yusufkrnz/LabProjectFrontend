import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ThumbsDown, MapPin, Star, Users, Code, Calendar, DollarSign, Briefcase, FolderKanban, Send, X, Eye } from 'lucide-react';
import type { TabType, FilterType, MarketplaceListing } from '../../MarketPlace';
import { marketplaceService } from '../../MarketPlace';
import './MarketPlaceListings.css';

type MarketPlaceListingsProps = {
    activeTab: TabType;
    activeFilter: FilterType;
    onTabChange: (tab: TabType) => void;
    onFilterChange: (filter: FilterType) => void;
    listings: MarketplaceListing[];
    onBookmarkToggle: (listingId: string) => void;
    onNotInterested: (listingId: string) => void;
    isLoading: boolean;
};

const TYPE_LABELS: Record<string, string> = {
    opensource: 'Open Source',
    commercial: 'Commercial',
    portfolio: 'Portfolio',
    academic: 'Academic',
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
};

export default function MarketPlaceListings({
    activeTab,
    activeFilter,
    onTabChange,
    onFilterChange,
    listings,
    onBookmarkToggle,
    onNotInterested,
    isLoading,
}: MarketPlaceListingsProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
    const [applyMessage, setApplyMessage] = useState('');
    const [isApplying, setIsApplying] = useState(false);

    const filteredListings = listings.filter(listing => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            listing.title.toLowerCase().includes(query) ||
            listing.description.toLowerCase().includes(query) ||
            listing.requiredSkills.some(skill => skill.toLowerCase().includes(query))
        );
    });

    const getFilterDescription = () => {
        if (activeFilter === 'best-matches') {
            return 'Browse projects that match your skills. Ordered by most relevant.';
        } else if (activeFilter === 'most-recent') {
            return 'Recently posted listings. Ordered by date.';
        }
        return 'Your saved listings for later review.';
    };

    const handleApplyClick = (listing: MarketplaceListing) => {
        setSelectedListing(listing);
        setApplyMessage('');
        setShowApplyModal(true);
    };

    const handleSubmitApplication = async () => {
        if (!selectedListing || !applyMessage.trim()) return;

        setIsApplying(true);
        const success = await marketplaceService.applyToProject(selectedListing.id, applyMessage);

        if (success) {
            alert('Application submitted successfully!');
            setShowApplyModal(false);
            setSelectedListing(null);
            setApplyMessage('');
        } else {
            alert('Failed to submit application. Please try again.');
        }
        setIsApplying(false);
    };

    return (
        <div className="marketplace-listings">
            {/* Search Bar */}
            <div className="listings-search-container">
                <div className="listings-search">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search for projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Tab Buttons */}
            <div className="tab-buttons">
                <button
                    className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => onTabChange('projects')}
                >
                    <FolderKanban size={16} />
                    Projects
                </button>
                <button
                    className={`tab-btn ${activeTab === 'finance' ? 'active' : ''}`}
                    onClick={() => onTabChange('finance')}
                >
                    <Briefcase size={16} />
                    Finance
                </button>
            </div>

            {/* Title */}
            <h1 className="listings-title">
                {activeTab === 'projects' ? 'Volunteer Projects' : 'Paid Opportunities'}
            </h1>

            {/* Filter Tabs */}
            <div className="filter-tabs">
                <button
                    className={`filter-tab ${activeFilter === 'best-matches' ? 'active' : ''}`}
                    onClick={() => onFilterChange('best-matches')}
                >
                    Best Matches
                </button>
                <button
                    className={`filter-tab ${activeFilter === 'most-recent' ? 'active' : ''}`}
                    onClick={() => onFilterChange('most-recent')}
                >
                    Most Recent
                </button>
                <button
                    className={`filter-tab ${activeFilter === 'saved' ? 'active' : ''}`}
                    onClick={() => onFilterChange('saved')}
                >
                    Saved
                </button>
            </div>

            {/* Filter Description */}
            <p className="filter-description">{getFilterDescription()}</p>

            {/* Listings */}
            <div className="listings-list">
                {isLoading ? (
                    <div className="empty-state">
                        <p>Loading...</p>
                    </div>
                ) : filteredListings.length === 0 ? (
                    <div className="empty-state">
                        <h3>No listings found</h3>
                        <p>Try adjusting your search criteria or check back later.</p>
                    </div>
                ) : (
                    filteredListings.map((listing) => (
                        <div key={listing.id} className="listing-card">
                            {/* Header Row */}
                            <div className="listing-header">
                                <div className="listing-owner">
                                    <img src={listing.ownerAvatar} alt={listing.ownerName} className="owner-avatar" />
                                    <div className="owner-info">
                                        <span className="owner-name">{listing.ownerName}</span>
                                        <span className="posted-date">Posted {formatDate(listing.postedDate)}</span>
                                    </div>
                                </div>
                                <div className="listing-actions">
                                    <button
                                        className="action-icon-btn"
                                        onClick={() => onNotInterested(listing.id)}
                                        title="Not interested"
                                    >
                                        <ThumbsDown size={18} />
                                    </button>
                                    <button
                                        className={`action-icon-btn ${listing.isBookmarked ? 'active' : ''}`}
                                        onClick={() => onBookmarkToggle(listing.id)}
                                        title="Save"
                                    >
                                        <Heart size={18} fill={listing.isBookmarked ? '#e11d48' : 'none'} />
                                    </button>
                                </div>
                            </div>

                            {/* Title Row */}
                            <div className="listing-title-row">
                                <h2 className="listing-title">{listing.title}</h2>
                                <div className="listing-badges">
                                    <span className={`type-badge ${listing.type}`}>
                                        {TYPE_LABELS[listing.type]}
                                    </span>
                                    {listing.workStyle === 'paid' && listing.budget && (
                                        <span className="budget-badge">
                                            <DollarSign size={12} />
                                            {listing.budget}
                                            {listing.budgetType === 'monthly' && '/mo'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="listing-description">{listing.description}</p>

                            {/* Skills */}
                            <div className="listing-skills">
                                {listing.requiredSkills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>

                            {/* Meta Info */}
                            <div className="listing-meta">
                                <span className="meta-item">
                                    <Users size={14} />
                                    {listing.currentMembers}/{listing.teamSize} members
                                </span>
                                <span className="meta-item">
                                    <Calendar size={14} />
                                    {listing.deadline}
                                </span>
                                <span className="meta-item">
                                    <MapPin size={14} />
                                    {listing.location}
                                </span>
                                {listing.ownerRating && (
                                    <span className="meta-item rating">
                                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                        {listing.ownerRating.toFixed(1)}
                                    </span>
                                )}
                            </div>

                            {/* Footer with Apply */}
                            <div className="listing-footer">
                                <span className="applications-count">
                                    <Code size={14} />
                                    {listing.applicationCount} applications
                                </span>
                                <div className="listing-footer-actions">
                                    <Link to={`/project/${listing.id}`} className="view-details-btn">
                                        <Eye size={16} />
                                        View Details
                                    </Link>
                                    <button
                                        className="apply-btn"
                                        onClick={() => handleApplyClick(listing)}
                                    >
                                        <Send size={16} />
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Apply Modal */}
            {showApplyModal && selectedListing && (
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
                                <h4>{selectedListing.title}</h4>
                                <p>by {selectedListing.ownerName}</p>
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
