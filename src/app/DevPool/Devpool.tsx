import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import {
    ArrowLeft,
    Send,
    Monitor,
    Smartphone,
    Server,
    Database,
    Brain,
    Palette,
    Shield,
    Cloud
} from 'lucide-react';
import './DevPool.css';

type AreaOption = {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
};

const AREA_OPTIONS: AreaOption[] = [
    {
        id: 'web',
        label: 'Web Development',
        description: 'Frontend & full-stack web applications',
        icon: <Monitor size={24} />
    },
    {
        id: 'mobile',
        label: 'Mobile Development',
        description: 'iOS, Android, and cross-platform apps',
        icon: <Smartphone size={24} />
    },
    {
        id: 'backend',
        label: 'Backend Development',
        description: 'APIs, microservices, and server-side',
        icon: <Server size={24} />
    },
    {
        id: 'data',
        label: 'Data & Database',
        description: 'Database design, data engineering',
        icon: <Database size={24} />
    },
    {
        id: 'ai',
        label: 'AI & Machine Learning',
        description: 'ML models, AI applications',
        icon: <Brain size={24} />
    },
    {
        id: 'uiux',
        label: 'UI/UX Design',
        description: 'User interfaces and experience',
        icon: <Palette size={24} />
    },
    {
        id: 'security',
        label: 'Security',
        description: 'Cybersecurity and secure development',
        icon: <Shield size={24} />
    },
    {
        id: 'devops',
        label: 'DevOps & Cloud',
        description: 'Infrastructure, CI/CD, cloud services',
        icon: <Cloud size={24} />
    },
];

export default function DevPool() {
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

    const totalActiveUsers = 192; // Mock - backend'den gelecek

    const toggleArea = (areaId: string) => {
        setSelectedAreas(prev =>
            prev.includes(areaId)
                ? prev.filter(id => id !== areaId)
                : [...prev, areaId]
        );
    };

    const handleSubmit = () => {
        console.log('Selected areas:', selectedAreas);
        // TODO: Backend'e gönder ve eşleştirme yap
    };

    return (
        <div className="devpool-page">
            <Header />
            <main className="devpool-content">
                {/* Back Link */}
                <Link to="/dashboard" className="back-link">
                    <ArrowLeft size={18} />
                    Back
                </Link>

                {/* Page Title */}
                <div className="page-title">
                    <h1>Bridge Developer Pool</h1>
                    <p>Get matched with 2 other developers and build something together</p>
                </div>

                {/* Active Users */}
                <div className="active-users">
                    <span className="pulse-dot"></span>
                    <span>{totalActiveUsers} developers in pool</span>
                </div>

                {/* How it works - Minimal */}
                <div className="how-it-works-inline">
                    <div className="step-inline">
                        <span className="step-num">1</span>
                        <span className="step-text">Select area</span>
                    </div>
                    <span className="step-divider">—</span>
                    <div className="step-inline">
                        <span className="step-num">2</span>
                        <span className="step-text">Get matched</span>
                    </div>
                    <span className="step-divider">—</span>
                    <div className="step-inline">
                        <span className="step-num">3</span>
                        <span className="step-text">Build together</span>
                    </div>
                </div>

                {/* Selection Card */}
                <div className="selection-card">
                    <h2>What areas are you interested in?</h2>
                    <p className="card-subtitle">Select one or more areas you'd like to work on</p>

                    <div className="areas-grid">
                        {AREA_OPTIONS.map((area) => (
                            <button
                                key={area.id}
                                className={`area-card ${selectedAreas.includes(area.id) ? 'selected' : ''}`}
                                onClick={() => toggleArea(area.id)}
                            >
                                <div className="area-icon">{area.icon}</div>
                                <span className="area-label">{area.label}</span>
                                <span className="area-description">{area.description}</span>
                            </button>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        className="submit-btn"
                        disabled={selectedAreas.length === 0}
                        onClick={handleSubmit}
                    >
                        Submit
                        <Send size={18} />
                    </button>
                </div>
            </main>
        </div>
    );
}
