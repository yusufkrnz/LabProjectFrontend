import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Monitor, Smartphone, Server, Database,
    Brain, Palette, Shield, Cloud, CheckCircle, Send, PartyPopper
} from 'lucide-react';
import Header from '../../components/Header';
import './JoinProject.css';

// Types
type ProjectArea = {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
};

type JoinPreferences = {
    areas: string[];
};

// API Service
const joinProjectService = {
    savePreferences: async (data: JoinPreferences): Promise<boolean> => {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/join-project/preferences', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // return response.ok;
        console.log('Saving join preferences:', data);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
};

const PROJECT_AREAS: ProjectArea[] = [
    { id: 'web', name: 'Web Development', icon: <Monitor size={28} />, description: 'Frontend & full-stack web applications' },
    { id: 'mobile', name: 'Mobile Development', icon: <Smartphone size={28} />, description: 'iOS, Android, and cross-platform apps' },
    { id: 'backend', name: 'Backend Development', icon: <Server size={28} />, description: 'APIs, microservices, and server-side' },
    { id: 'database', name: 'Data & Database', icon: <Database size={28} />, description: 'Database design, data engineering' },
    { id: 'ai-ml', name: 'AI & Machine Learning', icon: <Brain size={28} />, description: 'ML models, AI applications' },
    { id: 'design', name: 'UI/UX Design', icon: <Palette size={28} />, description: 'User interfaces and experience' },
    { id: 'security', name: 'Security', icon: <Shield size={28} />, description: 'Cybersecurity and secure development' },
    { id: 'devops', name: 'DevOps & Cloud', icon: <Cloud size={28} />, description: 'Infrastructure, CI/CD, cloud services' },
];

export default function JoinProject() {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [preferences, setPreferences] = useState<JoinPreferences>({
        areas: [],
    });

    const toggleArea = (areaId: string) => {
        setPreferences(prev => ({
            ...prev,
            areas: prev.areas.includes(areaId)
                ? prev.areas.filter(a => a !== areaId)
                : [...prev.areas, areaId]
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const success = await joinProjectService.savePreferences(preferences);

        if (success) {
            setIsSubmitted(true);
        }
        setIsSaving(false);
    };

    const isFormValid = preferences.areas.length > 0;

    // Submitted state - success message
    if (isSubmitted) {
        return (
            <div className="join-project-page">
                <Header />

                <div className="join-container">
                    <div className="success-container">
                        <div className="success-icon">
                            <PartyPopper size={48} />
                        </div>
                        <h1>Request Received!</h1>
                        <p className="success-message">
                            Your preferences have been saved successfully. We'll notify you when we find matching projects.
                        </p>
                        <div className="selected-areas-summary">
                            <span className="summary-label">Selected Areas:</span>
                            <div className="summary-tags">
                                {preferences.areas.map(areaId => {
                                    const area = PROJECT_AREAS.find(a => a.id === areaId);
                                    return area ? (
                                        <span key={areaId} className="summary-tag">
                                            {area.name}
                                        </span>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </div>
                    {/* Butonlar kaldırıldı */}
                </div>
            </div>
        );
    }



    return (
        <div className="join-project-page">
            <Header />

            <div className="join-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                    Back
                </button>

                <div className="join-header">
                    <h1>Join a Project</h1>
                    <p>Tell us what you're interested in and we'll find the perfect projects for you</p>
                </div>

                {/* Step Content */}
                <div className="step-content">
                    <h2>What areas are you interested in?</h2>
                    <p className="step-description">Select one or more areas you'd like to work on</p>

                    <div className="areas-grid">
                        {PROJECT_AREAS.map(area => (
                            <button
                                key={area.id}
                                className={`area-card ${preferences.areas.includes(area.id) ? 'selected' : ''}`}
                                onClick={() => toggleArea(area.id)}
                            >
                                <div className="area-icon">{area.icon}</div>
                                <span className="area-name">{area.name}</span>
                                <span className="area-desc">{area.description}</span>
                                {preferences.areas.includes(area.id) && (
                                    <div className="check-icon">
                                        <CheckCircle size={20} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="step-actions">
                        <button
                            className="join-submit-btn"
                            onClick={handleSave}
                            disabled={!isFormValid || isSaving}
                        >
                            {isSaving ? 'Submitting...' : 'Submit'}
                            {!isSaving && <Send size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
