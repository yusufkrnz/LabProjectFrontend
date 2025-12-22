import { useState } from 'react';
import { Briefcase, Heart, GraduationCap, DollarSign, Users, Rocket, BookOpen } from 'lucide-react';
import './ProjectStep3.css';

type ProjectStep3Props = {
    initialData: {
        projectType: string;
        workStyle: string;
        budget?: string;
    };
    onComplete: (data: { projectType: string; workStyle: string; budget?: string }) => void;
    onBack: () => void;
};

type ProjectType = {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
};

type WorkStyle = {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
};

const PROJECT_TYPES: ProjectType[] = [
    {
        id: 'opensource',
        label: 'Open Source',
        description: 'Community-driven, free and publicly accessible',
        icon: <Users size={24} />,
    },
    {
        id: 'commercial',
        label: 'Commercial (SaaS/Startup)',
        description: 'For-profit product or service',
        icon: <Rocket size={24} />,
    },
    {
        id: 'portfolio',
        label: 'Portfolio / Learning',
        description: 'Personal project for skill building',
        icon: <BookOpen size={24} />,
    },
    {
        id: 'academic',
        label: 'Academic / Thesis',
        description: 'University assignment or research',
        icon: <GraduationCap size={24} />,
    },
];

const WORK_STYLES: WorkStyle[] = [
    {
        id: 'volunteer',
        label: 'Volunteer',
        description: 'Unpaid, for learning and experience',
        icon: <Heart size={24} />,
    },
    {
        id: 'paid',
        label: 'Paid',
        description: 'Compensated work with budget',
        icon: <DollarSign size={24} />,
    },
];

export default function ProjectStep3({ initialData, onComplete, onBack }: ProjectStep3Props) {
    const [projectType, setProjectType] = useState(initialData.projectType || '');
    const [workStyle, setWorkStyle] = useState(initialData.workStyle || '');
    const [budget, setBudget] = useState(initialData.budget || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (projectType && workStyle) {
            onComplete({
                projectType,
                workStyle,
                budget: workStyle === 'paid' ? budget : undefined
            });
        }
    };

    const isValid = projectType && workStyle && (workStyle !== 'paid' || budget);

    return (
        <form className="step3-form" onSubmit={handleSubmit}>
            <div className="step-header">
                <h2>Project Details</h2>
                <p>What type of project is this and how will contributors be compensated?</p>
            </div>

            {/* Project Type Selection */}
            <div className="form-section">
                <div className="section-number">3</div>
                <div className="section-content">
                    <h3>Project Type</h3>
                    <p className="section-description">Select the category that best describes your project</p>

                    <div className="type-grid">
                        {PROJECT_TYPES.map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                className={`type-card ${projectType === type.id ? 'selected' : ''}`}
                                onClick={() => setProjectType(type.id)}
                            >
                                <div className="type-icon">{type.icon}</div>
                                <div className="type-info">
                                    <span className="type-label">{type.label}</span>
                                    <span className="type-description">{type.description}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Work Style Selection */}
            <div className="form-section">
                <div className="section-number">4</div>
                <div className="section-content">
                    <h3>Work Style</h3>
                    <p className="section-description">How will team members be compensated?</p>

                    <div className="work-style-grid">
                        {WORK_STYLES.map((style) => (
                            <button
                                key={style.id}
                                type="button"
                                className={`work-style-card ${workStyle === style.id ? 'selected' : ''}`}
                                onClick={() => setWorkStyle(style.id)}
                            >
                                <div className="work-style-icon">{style.icon}</div>
                                <div className="work-style-info">
                                    <span className="work-style-label">{style.label}</span>
                                    <span className="work-style-description">{style.description}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Budget Input (only for paid) */}
                    {workStyle === 'paid' && (
                        <div className="budget-section">
                            <label htmlFor="budget">
                                <Briefcase size={16} />
                                Project Budget
                            </label>
                            <div className="budget-input-wrapper">
                                <span className="currency-symbol">$</span>
                                <input
                                    id="budget"
                                    type="text"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="Enter budget amount"
                                />
                            </div>
                            <span className="budget-hint">
                                This will be displayed to potential team members
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onBack}>
                    Back
                </button>
                <button type="submit" className="btn-primary" disabled={!isValid}>
                    Create Project
                </button>
            </div>
        </form>
    );
}
