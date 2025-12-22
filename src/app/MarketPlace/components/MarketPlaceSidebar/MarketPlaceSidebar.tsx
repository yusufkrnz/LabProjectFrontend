import { FolderKanban, Briefcase } from 'lucide-react';
import type { TabType } from '../../MarketPlace';
import './MarketPlaceSidebar.css';

type MarketPlaceSidebarProps = {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
};

export default function MarketPlaceSidebar({ activeTab, onTabChange }: MarketPlaceSidebarProps) {
    return (
        <aside className="marketplace-sidebar">
            <nav className="sidebar-nav">
                <button
                    className={`sidebar-nav-item ${activeTab === 'project' ? 'active' : ''}`}
                    onClick={() => onTabChange('project')}
                >
                    <FolderKanban size={16} />
                    <span>Project</span>
                </button>
                <button
                    className={`sidebar-nav-item ${activeTab === 'finance' ? 'active' : ''}`}
                    onClick={() => onTabChange('finance')}
                >
                    <Briefcase size={16} />
                    <span>Finance</span>
                </button>
            </nav>
        </aside>
    );
}
