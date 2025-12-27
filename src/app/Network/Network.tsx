import { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../../components/Header/Header';
import UserCard from './components/UserCard';
import type { User } from './components/UserCard';
import './Network.css';

const USERS_PER_PAGE = 20;

// Mock data - backend'den gelecek
const users: User[] = [
    { id: 1, username: '@denizy', name: 'Deniz Yılmaz', role: 'Full Stack Developer', avatar: 'https://ui-avatars.com/api/?name=DY&background=e2e8f0&color=374151', followers: 245, projects: 12, joinedAt: new Date('2024-01-15') },
    { id: 2, username: '@alikoc', name: 'Ali Koç', role: 'Backend Engineer', avatar: 'https://ui-avatars.com/api/?name=AK&background=e2e8f0&color=374151', followers: 189, projects: 8, joinedAt: new Date('2024-03-22') },
    { id: 3, username: '@zeynepk', name: 'Zeynep Kaya', role: 'UI/UX Designer', avatar: 'https://ui-avatars.com/api/?name=ZK&background=e2e8f0&color=374151', followers: 567, projects: 24, joinedAt: new Date('2023-06-10') },
    { id: 4, username: '@mehmeta', name: 'Mehmet Akın', role: 'Mobile Developer', avatar: 'https://ui-avatars.com/api/?name=MA&background=e2e8f0&color=374151', followers: 123, projects: 5, joinedAt: new Date('2024-11-01') },
    { id: 5, username: '@elifd', name: 'Elif Demir', role: 'Data Scientist', avatar: 'https://ui-avatars.com/api/?name=ED&background=e2e8f0&color=374151', followers: 342, projects: 15, joinedAt: new Date('2023-09-05') },
    { id: 6, username: '@canoz', name: 'Can Özkan', role: 'DevOps Engineer', avatar: 'https://ui-avatars.com/api/?name=CO&background=e2e8f0&color=374151', followers: 78, projects: 3, joinedAt: new Date('2024-12-10') },
    { id: 7, username: '@seliny', name: 'Selin Yıldız', role: 'Product Manager', avatar: 'https://ui-avatars.com/api/?name=SY&background=e2e8f0&color=374151', followers: 456, projects: 18, joinedAt: new Date('2023-04-20') },
    { id: 8, username: '@buraka', name: 'Burak Aydın', role: 'Frontend Developer', avatar: 'https://ui-avatars.com/api/?name=BA&background=e2e8f0&color=374151', followers: 234, projects: 9, joinedAt: new Date('2024-07-15') },
    { id: 9, username: '@aysec', name: 'Ayşe Çelik', role: 'QA Engineer', avatar: 'https://ui-avatars.com/api/?name=AC&background=e2e8f0&color=374151', followers: 67, projects: 2, joinedAt: new Date('2024-12-20') },
    { id: 10, username: '@ahmetk', name: 'Ahmet Kara', role: 'Backend Developer', avatar: 'https://ui-avatars.com/api/?name=AKR&background=e2e8f0&color=374151', followers: 890, projects: 32, joinedAt: new Date('2022-11-01') },
    { id: 11, username: '@cemrey', name: 'Cemre Yılmaz', role: 'AI Engineer', avatar: 'https://ui-avatars.com/api/?name=CY&background=e2e8f0&color=374151', followers: 412, projects: 14, joinedAt: new Date('2023-08-12') },
    { id: 12, username: '@ogecan', name: 'Özge Can', role: 'Security Analyst', avatar: 'https://ui-avatars.com/api/?name=OC&background=e2e8f0&color=374151', followers: 156, projects: 6, joinedAt: new Date('2024-05-30') },
    { id: 13, username: '@emrek', name: 'Emre Koçak', role: 'Cloud Architect', avatar: 'https://ui-avatars.com/api/?name=EK&background=e2e8f0&color=374151', followers: 321, projects: 11, joinedAt: new Date('2023-11-15') },
    { id: 14, username: '@gulsen', name: 'Gülşen Aydoğan', role: 'ML Engineer', avatar: 'https://ui-avatars.com/api/?name=GA&background=e2e8f0&color=374151', followers: 278, projects: 9, joinedAt: new Date('2024-02-20') },
    { id: 15, username: '@kaant', name: 'Kaan Tuncer', role: 'iOS Developer', avatar: 'https://ui-avatars.com/api/?name=KT&background=e2e8f0&color=374151', followers: 445, projects: 16, joinedAt: new Date('2023-07-08') },
    { id: 16, username: '@nilay', name: 'Nilay Şahin', role: 'Android Developer', avatar: 'https://ui-avatars.com/api/?name=NS&background=e2e8f0&color=374151', followers: 189, projects: 7, joinedAt: new Date('2024-04-12') },
    { id: 17, username: '@onurb', name: 'Onur Baran', role: 'Tech Lead', avatar: 'https://ui-avatars.com/api/?name=OB&background=e2e8f0&color=374151', followers: 612, projects: 28, joinedAt: new Date('2022-08-05') },
    { id: 18, username: '@pinarc', name: 'Pınar Çetin', role: 'Data Analyst', avatar: 'https://ui-avatars.com/api/?name=PC&background=e2e8f0&color=374151', followers: 134, projects: 5, joinedAt: new Date('2024-09-18') },
    { id: 19, username: '@rasitm', name: 'Raşit Mutlu', role: 'SRE Engineer', avatar: 'https://ui-avatars.com/api/?name=RM&background=e2e8f0&color=374151', followers: 223, projects: 8, joinedAt: new Date('2024-01-30') },
    { id: 20, username: '@sedat', name: 'Sedat Yılmaz', role: 'Blockchain Dev', avatar: 'https://ui-avatars.com/api/?name=SY&background=e2e8f0&color=374151', followers: 367, projects: 13, joinedAt: new Date('2023-05-22') },
    { id: 21, username: '@tugba', name: 'Tuğba Arslan', role: 'Game Developer', avatar: 'https://ui-avatars.com/api/?name=TA&background=e2e8f0&color=374151', followers: 198, projects: 6, joinedAt: new Date('2024-06-14') },
    { id: 22, username: '@ufukd', name: 'Ufuk Demir', role: 'Embedded Dev', avatar: 'https://ui-avatars.com/api/?name=UD&background=e2e8f0&color=374151', followers: 145, projects: 4, joinedAt: new Date('2024-10-20') },
];

type SortOption = 'best_match' | 'followers_desc' | 'followers_asc' | 'projects_desc' | 'projects_asc' | 'newest' | 'oldest';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'best_match', label: 'Best Matches' },
    { value: 'followers_desc', label: 'Most Followers' },
    { value: 'followers_asc', label: 'Least Followers' },
    { value: 'projects_desc', label: 'Most Projects' },
    { value: 'projects_asc', label: 'Least Projects' },
    { value: 'newest', label: 'Recently Joined' },
    { value: 'oldest', label: 'Oldest Members' },
];

export default function Network() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('best_match');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredAndSortedUsers = useMemo(() => {
        let result = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
        );

        switch (sortBy) {
            case 'best_match':
                // Default order or relevance-based (for now, sort by followers + projects combined)
                result = result.sort((a, b) => (b.followers + b.projects * 10) - (a.followers + a.projects * 10));
                break;
            case 'followers_desc':
                result = result.sort((a, b) => b.followers - a.followers);
                break;
            case 'followers_asc':
                result = result.sort((a, b) => a.followers - b.followers);
                break;
            case 'projects_desc':
                result = result.sort((a, b) => b.projects - a.projects);
                break;
            case 'projects_asc':
                result = result.sort((a, b) => a.projects - b.projects);
                break;
            case 'newest':
                result = result.sort((a, b) => b.joinedAt.getTime() - a.joinedAt.getTime());
                break;
            case 'oldest':
                result = result.sort((a, b) => a.joinedAt.getTime() - b.joinedAt.getTime());
                break;
        }

        return result;
    }, [searchQuery, sortBy]);

    // Pagination
    const totalUsers = filteredAndSortedUsers.length;
    const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

    const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || 'Sort';

    // Reset to page 1 when search or sort changes
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleSort = (value: SortOption) => {
        setSortBy(value);
        setCurrentPage(1);
        setShowSortMenu(false);
    };

    return (
        <div className="network-page">
            <Header />

            {/* Hero Section with Perspective Lines */}
            <div className="network-hero">
                {/* Content first (behind perspective) */}
                <div className="hero-content">
                    <h1>Bridge Network</h1>
                    <p>Discover and connect with developers from around the world</p>
                </div>

                {/* Perspective lines overlay */}
                <div className="perspective-bg">
                    <svg className="perspective-svg" viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
                        {/* Radial lines going downward only */}
                        <g className="perspective-lines">
                            {Array.from({ length: 30 }).map((_, i) => {
                                const angle = (i * 12) - 180; // Sparser lines
                                const rad = (angle * Math.PI) / 180;
                                // Only render if line goes downward (sin > 0, meaning angle between 0 and 180)
                                if (Math.sin(rad) <= 0) return null;
                                const endX = 600 + Math.cos(rad) * 1600;
                                const endY = 230 + Math.sin(rad) * 1000;
                                return (
                                    <line
                                        key={`radial-${i}`}
                                        x1="600"
                                        y1="250"
                                        x2={endX}
                                        y2={endY}
                                        className="radial-line"
                                    />
                                );
                            })}
                        </g>
                    </svg>
                </div>

                <div className="toolbar-wrapper">
                    <div className="network-toolbar">
                        <div className="network-search">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, username or role..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>

                        <div className="sort-dropdown">
                            <button
                                className="sort-btn"
                                onClick={() => setShowSortMenu(!showSortMenu)}
                            >
                                {currentSortLabel}
                                <ChevronDown size={16} />
                            </button>
                            {showSortMenu && (
                                <div className="sort-menu">
                                    {SORT_OPTIONS.map(option => (
                                        <button
                                            key={option.value}
                                            className={`sort-option ${sortBy === option.value ? 'active' : ''}`}
                                            onClick={() => handleSort(option.value)}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <main className="network-content">
                {/* Results info */}
                <div className="results-info">
                    <span>{totalUsers} developers found</span>
                </div>

                <div className="users-grid">
                    {paginatedUsers.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                    {paginatedUsers.length === 0 && (
                        <div className="no-results">
                            No users found matching "{searchQuery}"
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="pagination-pages">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i + 1}
                                    className={`pagination-page ${currentPage === i + 1 ? 'active' : ''}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            className="pagination-btn"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
