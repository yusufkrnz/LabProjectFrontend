import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import MarketPlaceListings from './components/MarketPlaceListings/MarketPlaceListings';
import './MarketPlace.css';

export type TabType = 'project' | 'finance';
export type FilterType = 'best-matches' | 'most-recent' | 'saved';

// Types for backend data
export type ProjectListing = {
    id: string;
    title: string;
    ownerName: string;
    ownerAvatar: string;
    description: string;
    requiredSkills: string[];
    teamSize: string;
    budget?: string;
    deadline: string;
    location: string;
    postedDate: string;
    isBookmarked: boolean;
    proposalCount?: number;
    isPaymentVerified?: boolean;
    ownerRating?: number;
    ownerSpent?: string;
};

export type FinanceListing = {
    id: string;
    title: string;
    companyName: string;
    companyLogo: string;
    description: string;
    requiredSkills: string[];
    salary: string;
    employmentType: string;
    location: string;
    postedDate: string;
    isBookmarked: boolean;
    proposalCount?: number;
    isPaymentVerified?: boolean;
    companyRating?: number;
    companySpent?: string;
};

export default function MarketPlace() {
    const [activeTab, setActiveTab] = useState<TabType>('project');
    const [activeFilter, setActiveFilter] = useState<FilterType>('best-matches');
    const [projectListings, setProjectListings] = useState<ProjectListing[]>([]);
    const [financeListings, setFinanceListings] = useState<FinanceListing[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch listings from backend (mock for now)
    useEffect(() => {
        const fetchListings = async () => {
            setIsLoading(true);
            try {
                // TODO: Replace with actual API call
                // const response = await api.getMarketplaceListings(activeTab, activeFilter);
                // setListings(response.data);

                // Mock data for now
                if (activeTab === 'project') {
                    setProjectListings(mockProjectListings);
                } else {
                    setFinanceListings(mockFinanceListings);
                }
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

    const handleListingClick = (listingId: string) => {
        // TODO: Navigate to listing details page
        console.log('Navigate to listing:', listingId);
        // navigate(`/marketplace/${activeTab}/${listingId}`);
    };

    const handleBookmarkToggle = async (listingId: string) => {
        // TODO: Backend API call to toggle bookmark
        console.log('Toggle bookmark for:', listingId);
    };

    return (
        <div className="marketplace-container">
            {/* Global Header */}
            <Header />

            {/* Main Content */}
            <div className="marketplace-content">
                <MarketPlaceListings
                    activeTab={activeTab}
                    activeFilter={activeFilter}
                    onTabChange={handleTabChange}
                    onFilterChange={handleFilterChange}
                    projectListings={projectListings}
                    financeListings={financeListings}
                    onListingClick={handleListingClick}
                    onBookmarkToggle={handleBookmarkToggle}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}

// Mock data - will be replaced by backend API
const mockProjectListings: ProjectListing[] = [
    {
        id: 'p1',
        title: 'React Frontend Developer Needed for Project',
        ownerName: 'Ahmet Y.',
        ownerAvatar: 'https://ui-avatars.com/api/?name=AY&background=e5e7eb&color=374151&size=48',
        description: 'We are seeking a talented React frontend developer to join our team for an exciting project. The ideal candidate will have a strong understanding of React and be able to create responsive and user-friendly interfaces. You will work closely with our design team to implement features and ensure a seamless user experience. If you are passionate about building great...',
        requiredSkills: ['React', 'JavaScript', 'CSS', 'HTML', 'HTML5'],
        teamSize: '3-5 people needed',
        budget: '$200',
        deadline: 'March 2025',
        location: 'United Kingdom',
        postedDate: 'Posted 2 minutes ago',
        isBookmarked: false,
        proposalCount: 5,
        isPaymentVerified: true,
        ownerRating: 4.5,
        ownerSpent: '$10K+',
    },
    {
        id: 'p2',
        title: 'Junior/Intermediate Web Developer Needed for Our Team',
        ownerName: 'Emily C.',
        ownerAvatar: 'https://ui-avatars.com/api/?name=EC&background=e5e7eb&color=374151&size=48',
        description: 'Looking for a passionate web developer to join our growing startup. We need someone who can work on both frontend and backend tasks. Experience with modern JavaScript frameworks is a plus. Great opportunity for career growth and learning!',
        requiredSkills: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
        teamSize: '2-4 people needed',
        budget: '$150',
        deadline: 'April 2025',
        location: 'Remote',
        postedDate: 'Posted yesterday',
        isBookmarked: false,
        proposalCount: 12,
        isPaymentVerified: true,
        ownerRating: 4.8,
        ownerSpent: '$25K+',
    },
    {
        id: 'p3',
        title: 'Mobile App Developer for Health & Fitness Application',
        ownerName: 'Michael B.',
        ownerAvatar: 'https://ui-avatars.com/api/?name=MB&background=e5e7eb&color=374151&size=48',
        description: 'Seeking passionate developers for a health-tech startup. Building a comprehensive fitness tracking app with social features. Great opportunity for portfolio building and potential equity!',
        requiredSkills: ['Flutter', 'Dart', 'Firebase', 'UI/UX'],
        teamSize: '2-3 people needed',
        budget: '$300',
        deadline: 'June 2025',
        location: 'Istanbul, Turkey',
        postedDate: 'Posted 3 days ago',
        isBookmarked: true,
        proposalCount: 8,
        isPaymentVerified: true,
        ownerRating: 5.0,
        ownerSpent: '$50K+',
    },
];

const mockFinanceListings: FinanceListing[] = [
    {
        id: 'f1',
        title: 'Senior Full Stack Developer - Fintech Startup',
        companyName: 'TechCorp Industries',
        companyLogo: 'https://ui-avatars.com/api/?name=TC&background=e5e7eb&color=374151&size=48',
        description: 'Join our innovative team to build next-generation financial technology solutions. We offer competitive salary, remote-friendly work environment, and great benefits including health insurance and stock options.',
        requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
        salary: '$120,000 - $150,000 / year',
        employmentType: 'Full-time',
        location: 'Remote - USA',
        postedDate: 'Posted 3 hours ago',
        isBookmarked: false,
        proposalCount: 25,
        isPaymentVerified: true,
        companyRating: 4.8,
        companySpent: '$100K+',
    },
    {
        id: 'f2',
        title: 'React Native Mobile Developer',
        companyName: 'StartupX',
        companyLogo: 'https://ui-avatars.com/api/?name=SX&background=e5e7eb&color=374151&size=48',
        description: 'Exciting opportunity to work on cutting-edge mobile applications. We are a fast-growing startup with equity options and flexible working hours. Join our dynamic team and make an impact!',
        requiredSkills: ['React Native', 'TypeScript', 'Redux', 'REST APIs'],
        salary: '$80,000 - $100,000 / year',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        postedDate: 'Posted 1 day ago',
        isBookmarked: true,
        proposalCount: 40,
        isPaymentVerified: true,
        companyRating: 4.5,
        companySpent: '$75K+',
    },
];
