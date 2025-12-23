import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import MarketPlaceListings from './components/MarketPlaceListings/MarketPlaceListings';
import './MarketPlace.css';

export type TabType = 'projects' | 'finance';
export type FilterType = 'best-matches' | 'most-recent' | 'saved';

// Types for backend data - Project Listing (same structure for both tabs)
export type MarketplaceListing = {
    id: string;
    title: string;
    ownerName: string;
    ownerUsername: string;
    ownerAvatar: string;
    description: string;
    requiredSkills: string[];
    teamSize: number;
    currentMembers: number;
    deadline: string;
    location: string;
    postedDate: string;
    isBookmarked: boolean;
    applicationCount: number;
    ownerRating?: number;
    // Finance-specific fields
    workStyle: 'volunteer' | 'paid';
    budget?: string;
    budgetType?: 'fixed' | 'monthly' | 'hourly';
    type: 'opensource' | 'commercial' | 'portfolio' | 'academic';
    status: 'active' | 'completed' | 'paused';
};

// API Service - will connect to backend
const marketplaceService = {
    getListings: async (tab: TabType, filter: FilterType): Promise<MarketplaceListing[]> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/marketplace?tab=${tab}&filter=${filter}`);
        // return response.json();
        console.log('Fetching marketplace listings:', tab, filter);
        await new Promise(resolve => setTimeout(resolve, 300));

        // Return mock data based on tab
        if (tab === 'projects') {
            return mockProjectsListings;
        } else {
            return mockFinanceListings;
        }
    },

    applyToProject: async (listingId: string, message: string): Promise<boolean> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/marketplace/${listingId}/apply`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ message })
        // });
        // return response.ok;
        console.log('Applying to project:', listingId, 'Message:', message);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    },

    toggleBookmark: async (listingId: string): Promise<boolean> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/marketplace/${listingId}/bookmark`, {
        //     method: 'POST'
        // });
        // return response.ok;
        console.log('Toggle bookmark:', listingId);
        await new Promise(resolve => setTimeout(resolve, 200));
        return true;
    },

    reportNotInterested: async (listingId: string): Promise<boolean> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/marketplace/${listingId}/not-interested`, {
        //     method: 'POST'
        // });
        // return response.ok;
        console.log('Not interested:', listingId);
        await new Promise(resolve => setTimeout(resolve, 200));
        return true;
    }
};

export { marketplaceService };

export default function MarketPlace() {
    const [activeTab, setActiveTab] = useState<TabType>('projects');
    const [activeFilter, setActiveFilter] = useState<FilterType>('best-matches');
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch listings from backend
    useEffect(() => {
        const fetchListings = async () => {
            setIsLoading(true);
            try {
                const data = await marketplaceService.getListings(activeTab, activeFilter);
                setListings(data);
            } catch (error) {
                console.error('Failed to fetch listings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchListings();
    }, [activeTab, activeFilter]);

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
    };

    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter);
    };

    const handleBookmarkToggle = async (listingId: string) => {
        const success = await marketplaceService.toggleBookmark(listingId);
        if (success) {
            setListings(prev => prev.map(l =>
                l.id === listingId ? { ...l, isBookmarked: !l.isBookmarked } : l
            ));
        }
    };

    const handleNotInterested = async (listingId: string) => {
        const success = await marketplaceService.reportNotInterested(listingId);
        if (success) {
            setListings(prev => prev.filter(l => l.id !== listingId));
        }
    };

    return (
        <div className="marketplace-container">
            <Header />
            <div className="marketplace-content">
                <MarketPlaceListings
                    activeTab={activeTab}
                    activeFilter={activeFilter}
                    onTabChange={handleTabChange}
                    onFilterChange={handleFilterChange}
                    listings={listings}
                    onBookmarkToggle={handleBookmarkToggle}
                    onNotInterested={handleNotInterested}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}

// Mock data - Projects (Volunteer/Free projects)
const mockProjectsListings: MarketplaceListing[] = [
    {
        id: 'p1',
        title: 'Open Source React Component Library',
        ownerName: 'Ahmet Y.',
        ownerUsername: 'ahmety',
        ownerAvatar: 'https://ui-avatars.com/api/?name=AY&background=3b82f6&color=fff&size=48',
        description: 'Building a comprehensive React component library with TypeScript support. Looking for passionate developers to contribute to documentation, testing, and new components.',
        requiredSkills: ['React', 'TypeScript', 'Storybook', 'Jest'],
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
    },
    {
        id: 'p2',
        title: 'AI Research Paper Implementation',
        ownerName: 'Dr. Emily C.',
        ownerUsername: 'emilyc',
        ownerAvatar: 'https://ui-avatars.com/api/?name=EC&background=8b5cf6&color=fff&size=48',
        description: 'Academic project to implement and validate recent machine learning papers. Great opportunity for students interested in AI research and publishing.',
        requiredSkills: ['Python', 'PyTorch', 'Machine Learning', 'Research'],
        teamSize: 3,
        currentMembers: 1,
        deadline: 'June 2025',
        location: 'Istanbul, Turkey',
        postedDate: '2024-12-18',
        isBookmarked: true,
        applicationCount: 12,
        ownerRating: 5.0,
        workStyle: 'volunteer',
        type: 'academic',
        status: 'active',
    },
    {
        id: 'p3',
        title: 'Portfolio Website Builder Tool',
        ownerName: 'Michael B.',
        ownerUsername: 'michaelb',
        ownerAvatar: 'https://ui-avatars.com/api/?name=MB&background=10b981&color=fff&size=48',
        description: 'Creating an open-source portfolio website builder for developers. Looking for frontend developers and designers to help build templates and improve UX.',
        requiredSkills: ['Vue.js', 'CSS', 'UI/UX', 'Figma'],
        teamSize: 4,
        currentMembers: 2,
        deadline: 'April 2025',
        location: 'Remote',
        postedDate: '2024-12-15',
        isBookmarked: false,
        applicationCount: 5,
        ownerRating: 4.5,
        workStyle: 'volunteer',
        type: 'portfolio',
        status: 'active',
    },
];

// Mock data - Finance (Paid projects)
const mockFinanceListings: MarketplaceListing[] = [
    {
        id: 'f1',
        title: 'E-Commerce Platform Development',
        ownerName: 'TechCorp Industries',
        ownerUsername: 'techcorp',
        ownerAvatar: 'https://ui-avatars.com/api/?name=TC&background=f59e0b&color=fff&size=48',
        description: 'Looking for experienced full-stack developers to build a modern e-commerce platform. Long-term project with competitive monthly compensation.',
        requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
        teamSize: 4,
        currentMembers: 1,
        deadline: 'March 2025',
        location: 'Remote - USA',
        postedDate: '2024-12-22',
        isBookmarked: false,
        applicationCount: 25,
        ownerRating: 4.8,
        workStyle: 'paid',
        budget: '$5,000',
        budgetType: 'monthly',
        type: 'commercial',
        status: 'active',
    },
    {
        id: 'f2',
        title: 'Mobile App for Health Startup',
        ownerName: 'HealthTech Co.',
        ownerUsername: 'healthtech',
        ownerAvatar: 'https://ui-avatars.com/api/?name=HT&background=ef4444&color=fff&size=48',
        description: 'Building a cross-platform mobile app for health tracking with AI features. Fixed budget project with potential for ongoing maintenance contract.',
        requiredSkills: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow'],
        teamSize: 3,
        currentMembers: 0,
        deadline: 'May 2025',
        location: 'San Francisco, CA',
        postedDate: '2024-12-21',
        isBookmarked: true,
        applicationCount: 40,
        ownerRating: 4.5,
        workStyle: 'paid',
        budget: '$15,000',
        budgetType: 'fixed',
        type: 'commercial',
        status: 'active',
    },
    {
        id: 'f3',
        title: 'Blockchain DeFi Dashboard',
        ownerName: 'CryptoVentures',
        ownerUsername: 'cryptoventures',
        ownerAvatar: 'https://ui-avatars.com/api/?name=CV&background=6366f1&color=fff&size=48',
        description: 'Need skilled developers to build a DeFi analytics dashboard. Hourly rate with flexible working hours. Crypto/blockchain experience is a must.',
        requiredSkills: ['Solidity', 'Web3.js', 'React', 'GraphQL'],
        teamSize: 2,
        currentMembers: 0,
        deadline: 'February 2025',
        location: 'Remote',
        postedDate: '2024-12-19',
        isBookmarked: false,
        applicationCount: 18,
        ownerRating: 4.2,
        workStyle: 'paid',
        budget: '$75/hr',
        budgetType: 'hourly',
        type: 'commercial',
        status: 'active',
    },
];
