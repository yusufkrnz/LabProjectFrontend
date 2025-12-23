import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Search, Monitor, Smartphone, Server, Database,
    Brain, Palette, Shield, Cloud, CheckCircle, ArrowRight
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

type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type WorkPreference = 'volunteer' | 'paid' | 'both';
type TimeCommitment = 'few-hours' | 'part-time' | 'full-time';

type JoinPreferences = {
    areas: string[];
    skills: string[];
    experienceLevel: ExperienceLevel;
    workPreference: WorkPreference;
    timeCommitment: TimeCommitment;
    bio: string;
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

const SKILL_SUGGESTIONS: Record<string, string[]> = {
    'web': ['React', 'Vue.js', 'Angular', 'TypeScript', 'JavaScript', 'Next.js', 'HTML', 'CSS', 'TailwindCSS'],
    'mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Dart', 'iOS', 'Android'],
    'backend': ['Node.js', 'Python', 'Go', 'Java', 'C#', 'Rust', 'Express', 'FastAPI', 'Spring'],
    'database': ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'SQL', 'Data Modeling'],
    'ai-ml': ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
    'design': ['Figma', 'Sketch', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping', 'Design Systems'],
    'security': ['Penetration Testing', 'Cryptography', 'Security Auditing', 'OWASP', 'Network Security'],
    'devops': ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'CI/CD', 'Terraform', 'Linux'],
};

export default function JoinProject() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);

    const [preferences, setPreferences] = useState<JoinPreferences>({
        areas: [],
        skills: [],
        experienceLevel: 'intermediate',
        workPreference: 'both',
        timeCommitment: 'part-time',
        bio: ''
    });

    const toggleArea = (areaId: string) => {
        setPreferences(prev => ({
            ...prev,
            areas: prev.areas.includes(areaId)
                ? prev.areas.filter(a => a !== areaId)
                : [...prev.areas, areaId]
        }));
    };

    const toggleSkill = (skill: string) => {
        setPreferences(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const success = await joinProjectService.savePreferences(preferences);

        if (success) {
            navigate('/marketplace');
        }
        setIsSaving(false);
    };

    const isStep1Valid = preferences.areas.length > 0;
    const isStep2Valid = preferences.skills.length > 0;

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

                {/* Progress */}
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                    ></div>
                </div>
                <div className="step-label">Step {currentStep} of 3</div>

                {/* Step 1: Select Areas */}
                {currentStep === 1 && (
                    <div className="step-content">
                        <h2>What areas are you interested in?</h2>
                        <p className="step-description">Select one or more areas you'd like to contribute to</p>

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
                                className="btn-primary"
                                onClick={() => setCurrentStep(2)}
                                disabled={!isStep1Valid}
                            >
                                Continue
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Select Skills */}
                {currentStep === 2 && (
                    <div className="step-content">
                        <h2>What are your skills?</h2>
                        <p className="step-description">Select the technologies and skills you're proficient in</p>

                        <div className="skills-section">
                            {preferences.areas.map(areaId => {
                                const area = PROJECT_AREAS.find(a => a.id === areaId);
                                const skills = SKILL_SUGGESTIONS[areaId] || [];

                                return (
                                    <div key={areaId} className="skill-category">
                                        <h3>{area?.name}</h3>
                                        <div className="skills-grid">
                                            {skills.map(skill => (
                                                <button
                                                    key={skill}
                                                    className={`skill-btn ${preferences.skills.includes(skill) ? 'selected' : ''}`}
                                                    onClick={() => toggleSkill(skill)}
                                                >
                                                    {preferences.skills.includes(skill) && <CheckCircle size={14} />}
                                                    {skill}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="selected-skills">
                            <span className="label">Selected ({preferences.skills.length}):</span>
                            {preferences.skills.map(skill => (
                                <span key={skill} className="selected-skill">{skill}</span>
                            ))}
                        </div>

                        <div className="step-actions">
                            <button className="btn-secondary" onClick={() => setCurrentStep(1)}>
                                Back
                            </button>
                            <button
                                className="btn-primary"
                                onClick={() => setCurrentStep(3)}
                                disabled={!isStep2Valid}
                            >
                                Continue
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Preferences */}
                {currentStep === 3 && (
                    <div className="step-content">
                        <h2>Your Preferences</h2>
                        <p className="step-description">Help us find the right projects for you</p>

                        <div className="preferences-form">
                            <div className="form-group">
                                <label>Experience Level</label>
                                <div className="option-buttons">
                                    {(['beginner', 'intermediate', 'advanced', 'expert'] as ExperienceLevel[]).map(level => (
                                        <button
                                            key={level}
                                            className={`option-btn ${preferences.experienceLevel === level ? 'active' : ''}`}
                                            onClick={() => setPreferences(p => ({ ...p, experienceLevel: level }))}
                                        >
                                            {level.charAt(0).toUpperCase() + level.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Work Preference</label>
                                <div className="option-buttons">
                                    <button
                                        className={`option-btn ${preferences.workPreference === 'volunteer' ? 'active' : ''}`}
                                        onClick={() => setPreferences(p => ({ ...p, workPreference: 'volunteer' }))}
                                    >
                                        Volunteer Only
                                    </button>
                                    <button
                                        className={`option-btn ${preferences.workPreference === 'paid' ? 'active' : ''}`}
                                        onClick={() => setPreferences(p => ({ ...p, workPreference: 'paid' }))}
                                    >
                                        Paid Only
                                    </button>
                                    <button
                                        className={`option-btn ${preferences.workPreference === 'both' ? 'active' : ''}`}
                                        onClick={() => setPreferences(p => ({ ...p, workPreference: 'both' }))}
                                    >
                                        Both
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Time Commitment</label>
                                <div className="option-buttons">
                                    <button
                                        className={`option-btn ${preferences.timeCommitment === 'few-hours' ? 'active' : ''}`}
                                        onClick={() => setPreferences(p => ({ ...p, timeCommitment: 'few-hours' }))}
                                    >
                                        Few hours/week
                                    </button>
                                    <button
                                        className={`option-btn ${preferences.timeCommitment === 'part-time' ? 'active' : ''}`}
                                        onClick={() => setPreferences(p => ({ ...p, timeCommitment: 'part-time' }))}
                                    >
                                        Part-time
                                    </button>
                                    <button
                                        className={`option-btn ${preferences.timeCommitment === 'full-time' ? 'active' : ''}`}
                                        onClick={() => setPreferences(p => ({ ...p, timeCommitment: 'full-time' }))}
                                    >
                                        Full-time
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Short Bio (Optional)</label>
                                <textarea
                                    value={preferences.bio}
                                    onChange={(e) => setPreferences(p => ({ ...p, bio: e.target.value }))}
                                    placeholder="Tell potential project owners a bit about yourself..."
                                    rows={4}
                                    maxLength={500}
                                />
                                <span className="char-count">{preferences.bio.length}/500</span>
                            </div>
                        </div>

                        <div className="step-actions">
                            <button className="btn-secondary" onClick={() => setCurrentStep(2)}>
                                Back
                            </button>
                            <button
                                className="btn-primary"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Find Projects'}
                                {!isSaving && <Search size={18} />}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
