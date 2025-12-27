import { useState, useMemo } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Header from '../../components/Header/Header';
import UserCard from './components/UserCard';
import type { User } from './components/UserCard';
import './Network.css';

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
];

type SortOption = 'followers_desc' | 'followers_asc' | 'projects_desc' | 'projects_asc' | 'newest' | 'oldest';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'followers_desc', label: 'Most Followers' },
    { value: 'followers_asc', label: 'Least Followers' },
    { value: 'projects_desc', label: 'Most Projects' },
    { value: 'projects_asc', label: 'Least Projects' },
    { value: 'newest', label: 'Recently Joined' },
    { value: 'oldest', label: 'Oldest Members' },
];

export default function Network() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('followers_desc');
    const [showSortMenu, setShowSortMenu] = useState(false);

    const filteredAndSortedUsers = useMemo(() => {
        let result = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Sort
        switch (sortBy) {
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

    const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || 'Sort';

    return (
        <div className="network-page">
            <Header />
            <main className="network-content">
                <div className="network-header">
                    <h1>Bridge Network</h1>
                    <p>Discover and connect with developers</p>
                </div>

                {/* Search & Filter Bar */}
                <div className="network-toolbar">
                    <div className="network-search">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search by name, username or role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                                        onClick={() => {
                                            setSortBy(option.value);
                                            setShowSortMenu(false);
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="users-grid">
                    {filteredAndSortedUsers.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                    {filteredAndSortedUsers.length === 0 && (
                        <div className="no-results">
                            No users found matching "{searchQuery}"
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
