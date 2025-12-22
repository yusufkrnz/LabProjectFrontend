import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ManageFinanceSidebar from './components/ManageFinanceSidebar/ManageFinanceSidebar';
import ManageFinanceContent from './components/ManageFinanceContent/ManageFinanceContent';
import './ManageFinance.css';

export type FinanceTab = 'in-progress' | 'payments';

// Types for backend data
export type WorkInProgressItem = {
    id: string;
    projectTitle: string;
    clientName: string;
    clientAvatar: string;
    startDate: string;
    deadline: string;
    totalBudget: number;
    earnedAmount: number;
    milestones: {
        id: string;
        title: string;
        amount: number;
        status: 'pending' | 'in-progress' | 'completed' | 'paid';
    }[];
    status: 'active' | 'review' | 'pending-payment';
};

export type PaymentHistoryItem = {
    id: string;
    projectTitle: string;
    clientName: string;
    clientAvatar: string;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
    status: 'completed' | 'pending' | 'failed';
    transactionId: string;
};

export default function ManageFinance() {
    const [activeTab, setActiveTab] = useState<FinanceTab>('in-progress');
    const [workInProgressItems, setWorkInProgressItems] = useState<WorkInProgressItem[]>([]);
    const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch data from backend (mock for now)
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // TODO: Replace with actual API calls
                // const response = await api.getFinanceData(activeTab);
                // setData(response.data);

                // Mock data
                setWorkInProgressItems(mockWorkInProgress);
                setPaymentHistory(mockPaymentHistory);
            } catch (error) {
                console.error('Failed to fetch finance data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    const handleTabChange = (tab: FinanceTab) => {
        setActiveTab(tab);
    };

    return (
        <div className="managefinance-container">
            {/* Global Header */}
            <Header />

            {/* Main Content */}
            <div className="managefinance-content">
                {/* Left Sidebar */}
                <ManageFinanceSidebar
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />

                {/* Content Area */}
                <ManageFinanceContent
                    activeTab={activeTab}
                    workInProgressItems={workInProgressItems}
                    paymentHistory={paymentHistory}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}

// Mock data - will be replaced by backend API
const mockWorkInProgress: WorkInProgressItem[] = [
    {
        id: 'w1',
        projectTitle: 'E-Commerce Website Development',
        clientName: 'John Smith',
        clientAvatar: 'https://ui-avatars.com/api/?name=JS&background=e5e7eb&color=374151&size=48',
        startDate: '2024-12-01',
        deadline: '2025-02-15',
        totalBudget: 3500,
        earnedAmount: 1500,
        milestones: [
            { id: 'm1', title: 'Design Phase', amount: 500, status: 'paid' },
            { id: 'm2', title: 'Frontend Development', amount: 1000, status: 'paid' },
            { id: 'm3', title: 'Backend Integration', amount: 1000, status: 'in-progress' },
            { id: 'm4', title: 'Testing & Deployment', amount: 1000, status: 'pending' },
        ],
        status: 'active',
    },
    {
        id: 'w2',
        projectTitle: 'Mobile App UI/UX Design',
        clientName: 'Emily Chen',
        clientAvatar: 'https://ui-avatars.com/api/?name=EC&background=e5e7eb&color=374151&size=48',
        startDate: '2024-12-10',
        deadline: '2025-01-20',
        totalBudget: 2000,
        earnedAmount: 800,
        milestones: [
            { id: 'm1', title: 'Wireframes', amount: 400, status: 'paid' },
            { id: 'm2', title: 'High-Fidelity Designs', amount: 400, status: 'paid' },
            { id: 'm3', title: 'Prototype', amount: 600, status: 'in-progress' },
            { id: 'm4', title: 'Final Delivery', amount: 600, status: 'pending' },
        ],
        status: 'active',
    },
    {
        id: 'w3',
        projectTitle: 'API Integration Project',
        clientName: 'Michael Brown',
        clientAvatar: 'https://ui-avatars.com/api/?name=MB&background=e5e7eb&color=374151&size=48',
        startDate: '2024-11-20',
        deadline: '2024-12-30',
        totalBudget: 1800,
        earnedAmount: 1800,
        milestones: [
            { id: 'm1', title: 'API Design', amount: 600, status: 'paid' },
            { id: 'm2', title: 'Implementation', amount: 800, status: 'paid' },
            { id: 'm3', title: 'Documentation', amount: 400, status: 'completed' },
        ],
        status: 'pending-payment',
    },
];

const mockPaymentHistory: PaymentHistoryItem[] = [
    {
        id: 'p1',
        projectTitle: 'Landing Page Design',
        clientName: 'Sarah Wilson',
        clientAvatar: 'https://ui-avatars.com/api/?name=SW&background=e5e7eb&color=374151&size=48',
        amount: 750,
        paymentDate: '2024-12-18',
        paymentMethod: 'Bank Transfer',
        status: 'completed',
        transactionId: 'TXN-2024-001',
    },
    {
        id: 'p2',
        projectTitle: 'WordPress Theme Customization',
        clientName: 'David Lee',
        clientAvatar: 'https://ui-avatars.com/api/?name=DL&background=e5e7eb&color=374151&size=48',
        amount: 450,
        paymentDate: '2024-12-15',
        paymentMethod: 'PayPal',
        status: 'completed',
        transactionId: 'TXN-2024-002',
    },
    {
        id: 'p3',
        projectTitle: 'Logo Design Package',
        clientName: 'Anna Martinez',
        clientAvatar: 'https://ui-avatars.com/api/?name=AM&background=e5e7eb&color=374151&size=48',
        amount: 300,
        paymentDate: '2024-12-10',
        paymentMethod: 'Credit Card',
        status: 'completed',
        transactionId: 'TXN-2024-003',
    },
    {
        id: 'p4',
        projectTitle: 'SEO Optimization',
        clientName: 'Robert Johnson',
        clientAvatar: 'https://ui-avatars.com/api/?name=RJ&background=e5e7eb&color=374151&size=48',
        amount: 600,
        paymentDate: '2024-12-05',
        paymentMethod: 'Bank Transfer',
        status: 'completed',
        transactionId: 'TXN-2024-004',
    },
    {
        id: 'p5',
        projectTitle: 'React Dashboard Development',
        clientName: 'Chris Anderson',
        clientAvatar: 'https://ui-avatars.com/api/?name=CA&background=e5e7eb&color=374151&size=48',
        amount: 1200,
        paymentDate: '2024-12-01',
        paymentMethod: 'Bank Transfer',
        status: 'completed',
        transactionId: 'TXN-2024-005',
    },
    {
        id: 'p6',
        projectTitle: 'Mobile App Consultation',
        clientName: 'Lisa Thompson',
        clientAvatar: 'https://ui-avatars.com/api/?name=LT&background=e5e7eb&color=374151&size=48',
        amount: 200,
        paymentDate: '2024-11-28',
        paymentMethod: 'PayPal',
        status: 'completed',
        transactionId: 'TXN-2024-006',
    },
    {
        id: 'p7',
        projectTitle: 'E-Commerce Integration',
        clientName: 'Mark Davis',
        clientAvatar: 'https://ui-avatars.com/api/?name=MD&background=e5e7eb&color=374151&size=48',
        amount: 850,
        paymentDate: '2024-11-25',
        paymentMethod: 'Credit Card',
        status: 'completed',
        transactionId: 'TXN-2024-007',
    },
];
