import { Check, Users, Code, Briefcase, Heart, DollarSign, Clock, Calendar, CreditCard } from 'lucide-react';
import './ProjectStep4.css';

type TeamMember = {
    id: string;
    role: string;
    languages: string[];
    frameworks: string[];
    customRole?: string;
};

type ProjectStep4Props = {
    formData: {
        projectName: string;
        description: string;
        teamSize: number;
        teamMembers: TeamMember[];
        projectType: string;
        workStyle: string;
        budget?: string;
        budgetType?: string;
    };
    onComplete: () => void;
    onBack: () => void;
};

const PROJECT_TYPE_LABELS: Record<string, string> = {
    opensource: 'Open Source',
    commercial: 'Commercial (SaaS/Startup)',
    portfolio: 'Portfolio / Learning',
    academic: 'Academic / Thesis',
};

const WORK_STYLE_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
    volunteer: { label: 'Volunteer', icon: <Heart size={16} /> },
    paid: { label: 'Paid', icon: <DollarSign size={16} /> },
};

const BUDGET_TYPE_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
    hourly: { label: 'Hourly', icon: <Clock size={16} /> },
    monthly: { label: 'Monthly', icon: <Calendar size={16} /> },
    'one-time': { label: 'One-time', icon: <CreditCard size={16} /> },
};

const ROLE_LABELS: Record<string, string> = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    mobile: 'Mobile Developer',
    cloud: 'Cloud/DevOps Engineer',
    ml: 'ML Engineer',
    deeplearning: 'Deep Learning Engineer',
    cybersecurity: 'Cybersecurity Specialist',
    qa: 'QA/Test Engineer',
    data: 'Data Engineer',
    blockchain: 'Blockchain Developer',
    gamedev: 'Game Developer',
    embedded: 'Embedded Systems Engineer',
    specific: 'Specific Role',
};

export default function ProjectStep4({ formData, onComplete, onBack }: ProjectStep4Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete();
    };

    return (
        <form className="step4-form" onSubmit={handleSubmit}>
            <div className="step-header">
                <h2>Review & Create</h2>
                <p>Review your project details before creating</p>
            </div>

            {/* Project Overview */}
            <div className="preview-section">
                <div className="preview-header">
                    <Briefcase size={20} />
                    <h3>Project Overview</h3>
                </div>
                <div className="preview-content">
                    <div className="preview-item">
                        <span className="preview-label">Project Name</span>
                        <span className="preview-value">{formData.projectName}</span>
                    </div>
                    {formData.description && (
                        <div className="preview-item">
                            <span className="preview-label">Description</span>
                            <span className="preview-value description">{formData.description}</span>
                        </div>
                    )}
                    <div className="preview-item">
                        <span className="preview-label">Project Type</span>
                        <span className="preview-value">{PROJECT_TYPE_LABELS[formData.projectType] || formData.projectType}</span>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="preview-section">
                <div className="preview-header">
                    <Users size={20} />
                    <h3>Team Members ({formData.teamSize})</h3>
                </div>
                <div className="preview-content">
                    {formData.teamMembers.map((member, index) => (
                        <div key={member.id} className="team-member-preview">
                            <div className="member-number">{index + 1}</div>
                            <div className="member-details">
                                <span className="member-role">
                                    {member.role === 'specific' ? member.customRole : ROLE_LABELS[member.role]}
                                </span>
                                {member.languages.length > 0 && (
                                    <div className="member-tech">
                                        <Code size={14} />
                                        <span>{member.languages.join(', ')}</span>
                                    </div>
                                )}
                                {member.frameworks.length > 0 && (
                                    <div className="member-frameworks">
                                        {member.frameworks.slice(0, 3).map(fw => (
                                            <span key={fw} className="framework-tag">{fw}</span>
                                        ))}
                                        {member.frameworks.length > 3 && (
                                            <span className="framework-tag more">+{member.frameworks.length - 3}</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Compensation Section */}
            <div className="preview-section">
                <div className="preview-header">
                    {WORK_STYLE_LABELS[formData.workStyle]?.icon || <DollarSign size={20} />}
                    <h3>Compensation</h3>
                </div>
                <div className="preview-content">
                    <div className="preview-item">
                        <span className="preview-label">Work Style</span>
                        <span className="preview-value">
                            {WORK_STYLE_LABELS[formData.workStyle]?.label || formData.workStyle}
                        </span>
                    </div>
                    {formData.workStyle === 'paid' && formData.budget && (
                        <>
                            <div className="preview-item">
                                <span className="preview-label">Budget</span>
                                <span className="preview-value budget">${formData.budget}</span>
                            </div>
                            {formData.budgetType && (
                                <div className="preview-item">
                                    <span className="preview-label">Payment Type</span>
                                    <span className="preview-value">
                                        {BUDGET_TYPE_LABELS[formData.budgetType]?.label || formData.budgetType}
                                    </span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onBack}>
                    Back
                </button>
                <button type="submit" className="btn-primary">
                    <Check size={18} />
                    Create Project
                </button>
            </div>
        </form>
    );
}
