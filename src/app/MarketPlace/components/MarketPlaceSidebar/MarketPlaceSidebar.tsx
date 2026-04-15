import { Search, FolderKanban, Briefcase, Star, Clock, Bookmark } from 'lucide-react';
import type { TabType, FilterType } from '../../../MarketPlace';
import './MarketPlaceSidebar.css';

type Props = {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    activeFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
};

export default function MarketPlaceSidebar({
    searchQuery, setSearchQuery, activeTab, onTabChange, activeFilter, onFilterChange
}: Props) {
    return (
        <aside className="mp-sidebar">
            {/* Search */}
            <div className="mp-sidebar-card search-card">
                <div className="mp-search-wrapper">
                    <Search size={18} className="mp-search-icon" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mp-search-input"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="mp-sidebar-card">
                <h3 className="mp-sidebar-title">Categories</h3>
                <div className="mp-tab-group">
                    <button 
                        className={`mp-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                        onClick={() => onTabChange('projects')}
                    >
                        <div className="mp-tab-icon"><FolderKanban size={16} /></div>
                        <div className="mp-tab-info">
                            <span className="mp-tab-label">Volunteer</span>
                            <span className="mp-tab-desc">Free & Open Source</span>
                        </div>
                    </button>
                    <button 
                        className={`mp-tab-btn ${activeTab === 'finance' ? 'active' : ''}`}
                        onClick={() => onTabChange('finance')}
                    >
                        <div className="mp-tab-icon"><Briefcase size={16} /></div>
                        <div className="mp-tab-info">
                            <span className="mp-tab-label">Paid</span>
                            <span className="mp-tab-desc">Commercial Gigs</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Sort & Filter */}
            <div className="mp-sidebar-card">
                <h3 className="mp-sidebar-title">Sort By</h3>
                <div className="mp-filter-list">
                    <button 
                        className={`mp-filter-btn ${activeFilter === 'best-matches' ? 'active' : ''}`}
                        onClick={() => onFilterChange('best-matches')}
                    >
                        <Star size={16} className="mp-filter-icon" />
                        Best Matches
                        {activeFilter === 'best-matches' && <div className="mp-filter-dot" />}
                    </button>
                    <button 
                        className={`mp-filter-btn ${activeFilter === 'most-recent' ? 'active' : ''}`}
                        onClick={() => onFilterChange('most-recent')}
                    >
                        <Clock size={16} className="mp-filter-icon" />
                        Most Recent
                        {activeFilter === 'most-recent' && <div className="mp-filter-dot" />}
                    </button>
                    <button 
                        className={`mp-filter-btn ${activeFilter === 'saved' ? 'active' : ''}`}
                        onClick={() => onFilterChange('saved')}
                    >
                        <Bookmark size={16} className="mp-filter-icon" />
                        Saved List
                        {activeFilter === 'saved' && <div className="mp-filter-dot" />}
                    </button>
                </div>
            </div>
        </aside>
    );
}
