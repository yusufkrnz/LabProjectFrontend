import { useState } from 'react';
import './SearchCard.css';

type SearchTab = 'talent' | 'jobs';

interface SearchCardProps {
    onSearch?: (query: string, tab: SearchTab) => void;
    className?: string;
}

export default function SearchCard({ onSearch, className = '' }: SearchCardProps) {
    const [activeTab, setActiveTab] = useState<SearchTab>('talent');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchQuery, activeTab);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const popularSearches = {
        talent: [
            'AI chatbot developer for support automation',
            'Creative director for a brand identity refresh',
            'Data analyst for churn modeling',
            'Video and motion editor for promo content',
        ],
        jobs: [
            'Full-stack Developer',
            'UI/UX Designer',
            'Project Manager',
            'Data Scientist',
        ]
    };

    const trustedCompanies = [
        { name: 'Microsoft', logo: '🏢' },
        { name: 'Airbnb', logo: '🏠' },
        { name: 'Bissell', logo: '🧹' },
        { name: 'Glassdoor', logo: '🚪' },
    ];

    return (
        <div className={`search-card ${className}`}>
            {/* Card Header with Tabs */}
            <div className="search-card-header">
                <button
                    className={`search-tab ${activeTab === 'talent' ? 'active' : ''}`}
                    onClick={() => setActiveTab('talent')}
                >
                    Yetenek Bul
                </button>
                <button
                    className={`search-tab ${activeTab === 'jobs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    İş Bul
                </button>
            </div>

            {/* Search Input */}
            <div className="search-input-wrapper">
                <input
                    type="text"
                    className="search-card-input"
                    placeholder={
                        activeTab === 'talent'
                            ? 'Rol, yetenek veya anahtar kelime ile ara...'
                            : 'İş pozisyonu veya şirket ara...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="search-card-button" onClick={handleSearch}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    Ara
                </button>
            </div>

            {/* Popular Searches */}
            <div className="popular-searches-section">
                <h4 className="popular-title">Popüler:</h4>
                <div className="popular-tags">
                    {popularSearches[activeTab].slice(0, 3).map((search, index) => (
                        <button
                            key={index}
                            className="popular-tag"
                            onClick={() => setSearchQuery(search)}
                        >
                            {search}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trusted By Section */}
            <div className="trusted-by-section">
                <span className="trusted-label">Güvenilen Şirketler:</span>
                <div className="company-logos">
                    {trustedCompanies.map((company, index) => (
                        <div key={index} className="company-logo" title={company.name}>
                            <span className="logo-icon">{company.logo}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
