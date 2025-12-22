import { Briefcase, CreditCard } from 'lucide-react';
import type { FinanceTab } from '../../ManageFinance';
import './ManageFinanceSidebar.css';

type ManageFinanceSidebarProps = {
    activeTab: FinanceTab;
    onTabChange: (tab: FinanceTab) => void;
};

export default function ManageFinanceSidebar({ activeTab, onTabChange }: ManageFinanceSidebarProps) {
    return (
        <aside className="finance-sidebar">
            <nav className="sidebar-nav">
                <button
                    className={`sidebar-nav-item ${activeTab === 'in-progress' ? 'active' : ''}`}
                    onClick={() => onTabChange('in-progress')}
                >
                    <Briefcase size={16} />
                    <span>In Progress</span>
                </button>
                <button
                    className={`sidebar-nav-item ${activeTab === 'payments' ? 'active' : ''}`}
                    onClick={() => onTabChange('payments')}
                >
                    <CreditCard size={16} />
                    <span>Payments</span>
                </button>
            </nav>
        </aside>
    );
}
