import { useState } from 'react';
import { User, Shield, Lock } from 'lucide-react';
import './Settings.css';
import ProfileSection from './components/ProfileSection';
import AccountInfo from './components/AccountInfo';
import PasswordReset from './components/PasswordReset';

type TabType = 'profile' | 'account' | 'password';

export default function Settings() {
    const [activeTab, setActiveTab] = useState<TabType>('profile');

    const tabs = [
        { id: 'profile' as TabType, label: 'Profil', icon: User },
        { id: 'account' as TabType, label: 'Hesap Bilgileri', icon: Shield },
        { id: 'password' as TabType, label: 'Şifre Değiştir', icon: Lock },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfileSection />;
            case 'account':
                return <AccountInfo />;
            case 'password':
                return <PasswordReset />;
            default:
                return <ProfileSection />;
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-content">
                <div className="settings-header">
                    <h1>Ayarlar</h1>
                    <p>Hesabınızı ve tercihlerinizi yönetin</p>
                </div>

                <div className="settings-tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="settings-panel">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}
