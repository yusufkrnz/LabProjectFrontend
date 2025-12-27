import { useState } from 'react';
import Header from '../../components/Header/Header';
import People from './People/People';
import Topics from './Topics/Topics';
import './Hub.css';

type TabType = 'people' | 'topics';

export default function Hub() {
    const [activeTab, setActiveTab] = useState<TabType>('people');

    return (
        <div className="hub-page">
            <Header />
            <main className="hub-content">
                {/* Tabs */}
                <div className="hub-tabs">
                    <button
                        className={`hub-tab ${activeTab === 'people' ? 'active' : ''}`}
                        onClick={() => setActiveTab('people')}
                    >
                        People
                    </button>
                    <button
                        className={`hub-tab ${activeTab === 'topics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('topics')}
                    >
                        Topics
                    </button>
                </div>

                {/* Content */}
                <div className="hub-body">
                    {activeTab === 'people' && <People />}
                    {activeTab === 'topics' && <Topics />}
                </div>
            </main>
        </div>
    );
}
