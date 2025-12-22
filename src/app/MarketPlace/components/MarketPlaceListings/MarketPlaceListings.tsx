import { useState } from 'react';
import { Search, Heart, ThumbsDown, MapPin, Star, CheckCircle } from 'lucide-react';
import type { TabType, FilterType, ProjectListing, FinanceListing } from '../../MarketPlace';
import './MarketPlaceListings.css';

type MarketPlaceListingsProps = {
    activeTab: TabType;
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    projectListings: ProjectListing[];
    financeListings: FinanceListing[];
    onListingClick: (listingId: string) => void;
    onBookmarkToggle: (listingId: string) => void;
    isLoading: boolean;
};

export default function MarketPlaceListings({
    activeTab,
    activeFilter,
    onFilterChange,
    projectListings,
    financeListings,
    onListingClick,
    onBookmarkToggle,
    isLoading,
}: MarketPlaceListingsProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const listings = activeTab === 'project' ? projectListings : financeListings;

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
            return activeTab === 'project'
                ? 'Browse projects that match your skills. Ordered by most relevant.'
                : 'Browse jobs that match your experience to a client\'s hiring preferences. Ordered by most relevant.';
        } else if (activeFilter === 'most-recent') {
            return 'Recently posted listings. Ordered by date.';
        }
        return 'Your saved listings for later review.';
    };

    return (
        <div className="marketplace-listings">
            {/* Search Bar */}
            <div className="listings-search-container">
                <div className="listings-search">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder={activeTab === 'project' ? 'Search for projects' : 'Search for jobs'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Title */}
            <h1 className="listings-title">
                {activeTab === 'project' ? 'Projects you might like' : 'Jobs you might like'}
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
                    Saved {activeTab === 'project' ? 'Projects' : 'Jobs'}
                </button>
            </div>

            {/* Filter Description */}
            <p className="filter-description">{getFilterDescription()}</p>

            {/* Listings */}
            <div className="listings-list">
                {isLoading ? (
                    <div className="loading-state">
                        <p>Loading listings...</p>
                    </div>
                ) : filteredListings.length === 0 ? (
                    <div className="empty-state">
                        <h3>No listings found</h3>
                        <p>Try adjusting your search criteria or check back later.</p>
                    </div>
                ) : (
                    filteredListings.map((listing) => (
                        <div
                            key={listing.id}
                            className="listing-card"
                            onClick={() => onListingClick(listing.id)}
                        >
                            {/* Posted Date */}
                            <span className="listing-date">{listing.postedDate}</span>

                            {/* Title Row */}
                            <div className="listing-header">
                                <h2 className="listing-title">{listing.title}</h2>
                                <div className="listing-actions">
                                    <button
                                        className="action-icon-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // TODO: Dislike/hide functionality
                                            console.log('Dislike:', listing.id);
                                        }}
                                        title="Not interested"
                                    >
                                        <ThumbsDown size={18} />
                                    </button>
                                    <button
                                        className={`action-icon-btn ${listing.isBookmarked ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onBookmarkToggle(listing.id);
                                        }}
                                        title="Save"
                                    >
                                        <Heart size={18} fill={listing.isBookmarked ? '#e11d48' : 'none'} />
                                    </button>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="listing-meta">
                                {'budget' in listing && listing.budget && (
                                    <span>Fixed-price - Intermediate - Est. Budget: {listing.budget}</span>
                                )}
                                {'salary' in listing && (
                                    <span>{listing.employmentType} - {listing.salary}</span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="listing-description">
                                {listing.description}
                                <a href="#" className="more-link" onClick={(e) => e.stopPropagation()}>more</a>
                            </p>

                            {/* Skills */}
                            <div className="listing-skills">
                                {listing.requiredSkills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>

                            {/* Footer Info */}
                            <div className="listing-footer">
                                {'isPaymentVerified' in listing && listing.isPaymentVerified && (
                                    <span className="verified-badge">
                                        <CheckCircle size={14} />
                                        Payment verified
                                    </span>
                                )}
                                {'ownerRating' in listing && listing.ownerRating && (
                                    <span className="rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                fill={i < Math.floor(listing.ownerRating!) ? '#f59e0b' : 'none'}
                                                color="#f59e0b"
                                            />
                                        ))}
                                    </span>
                                )}
                                {'companyRating' in listing && listing.companyRating && (
                                    <span className="rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                fill={i < Math.floor(listing.companyRating!) ? '#f59e0b' : 'none'}
                                                color="#f59e0b"
                                            />
                                        ))}
                                    </span>
                                )}
                                {'ownerSpent' in listing && listing.ownerSpent && (
                                    <span className="spent">{listing.ownerSpent} spent</span>
                                )}
                                {'companySpent' in listing && listing.companySpent && (
                                    <span className="spent">{listing.companySpent} spent</span>
                                )}
                                <span className="location">
                                    <MapPin size={12} />
                                    {listing.location}
                                </span>
                            </div>

                            {/* Proposals */}
                            {'proposalCount' in listing && listing.proposalCount !== undefined && (
                                <span className="proposals">
                                    Proposals: {listing.proposalCount < 5 ? 'Less than 5' : `${listing.proposalCount}+`}
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
