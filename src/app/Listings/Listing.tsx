import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, DollarSign, Heart, Users, Calendar, MapPin,
    Plus, X, CheckCircle
} from 'lucide-react';
import Header from '../../components/Header';
import './Listing.css';

// Types
type WorkStyle = 'volunteer' | 'paid';
type ProjectType = 'opensource' | 'commercial' | 'portfolio' | 'academic';
type BudgetType = 'fixed' | 'monthly' | 'hourly';

type ListingFormData = {
    title: string;
    description: string;
    longDescription: string;
    workStyle: WorkStyle;
    projectType: ProjectType;
    budget: string;
    budgetType: BudgetType;
    teamSize: number;
    deadline: string;
    location: string;
    requiredSkills: string[];
    responsibilities: string[];
    requirements: string[];
    benefits: string[];
};

// API Service
const listingService = {
    createListing: async (data: ListingFormData): Promise<{ success: boolean; listingId?: string }> => {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/listings', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        // return response.json();
        console.log('Creating listing:', data);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true, listingId: 'new-listing-1' };
    }
};

const SKILL_SUGGESTIONS = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Go',
    'Java', 'C++', 'Rust', 'Vue.js', 'Angular', 'Next.js',
    'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS',
    'Firebase', 'GraphQL', 'REST APIs', 'UI/UX', 'Figma', 'TailwindCSS'
];

export default function Listing() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [skillInput, setSkillInput] = useState('');
    const [responsibilityInput, setResponsibilityInput] = useState('');
    const [requirementInput, setRequirementInput] = useState('');
    const [benefitInput, setBenefitInput] = useState('');

    const [formData, setFormData] = useState<ListingFormData>({
        title: '',
        description: '',
        longDescription: '',
        workStyle: 'volunteer',
        projectType: 'opensource',
        budget: '',
        budgetType: 'fixed',
        teamSize: 3,
        deadline: '',
        location: 'Remote',
        requiredSkills: [],
        responsibilities: [],
        requirements: [],
        benefits: []
    });

    const updateField = <K extends keyof ListingFormData>(field: K, value: ListingFormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addToArray = (field: 'requiredSkills' | 'responsibilities' | 'requirements' | 'benefits', value: string) => {
        if (value.trim() && !formData[field].includes(value.trim())) {
            updateField(field, [...formData[field], value.trim()]);
        }
    };

    const removeFromArray = (field: 'requiredSkills' | 'responsibilities' | 'requirements' | 'benefits', index: number) => {
        updateField(field, formData[field].filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const result = await listingService.createListing(formData);

        if (result.success) {
            alert('Listing created successfully!');
            navigate('/marketplace');
        } else {
            alert('Failed to create listing. Please try again.');
        }
        setIsSubmitting(false);
    };

    const isStep1Valid = formData.title && formData.description && formData.projectType;
    const isStep2Valid = formData.requiredSkills.length > 0 && formData.teamSize > 0;
    const isStep3Valid = formData.responsibilities.length > 0 && formData.requirements.length > 0;

    return (
        <div className="listing-page">
            <Header />

            <div className="listing-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                    Back
                </button>

                <div className="listing-header">
                    <h1>Create New Listing</h1>
                    <p>Post a project to find talented contributors or team members</p>
                </div>

                {/* Progress Steps */}
                <div className="steps-indicator">
                    <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-label">Basic Info</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-label">Skills & Team</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-label">Details</span>
                    </div>
                    <div className="step-line"></div>
                    <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
                        <span className="step-number">4</span>
                        <span className="step-label">Review</span>
                    </div>
                </div>

                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                    <div className="form-card">
                        <h2>Basic Information</h2>

                        <div className="form-group">
                            <label>Project Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                placeholder="e.g., Open Source React Component Library"
                                maxLength={100}
                            />
                        </div>

                        <div className="form-group">
                            <label>Short Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                                placeholder="Brief overview of your project (shown in listings)"
                                rows={3}
                                maxLength={300}
                            />
                            <span className="char-count">{formData.description.length}/300</span>
                        </div>

                        <div className="form-group">
                            <label>Work Style *</label>
                            <div className="work-style-options">
                                <button
                                    type="button"
                                    className={`style-option ${formData.workStyle === 'volunteer' ? 'active' : ''}`}
                                    onClick={() => updateField('workStyle', 'volunteer')}
                                >
                                    <Heart size={24} />
                                    <span className="option-title">Volunteer</span>
                                    <span className="option-desc">Contributors join for experience & passion</span>
                                </button>
                                <button
                                    type="button"
                                    className={`style-option ${formData.workStyle === 'paid' ? 'active' : ''}`}
                                    onClick={() => updateField('workStyle', 'paid')}
                                >
                                    <DollarSign size={24} />
                                    <span className="option-title">Paid</span>
                                    <span className="option-desc">Compensated position with budget</span>
                                </button>
                            </div>
                        </div>

                        {formData.workStyle === 'paid' && (
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Budget *</label>
                                    <input
                                        type="text"
                                        value={formData.budget}
                                        onChange={(e) => updateField('budget', e.target.value)}
                                        placeholder="e.g., $5,000"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Budget Type</label>
                                    <select
                                        value={formData.budgetType}
                                        onChange={(e) => updateField('budgetType', e.target.value as BudgetType)}
                                    >
                                        <option value="fixed">Fixed Price</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="hourly">Hourly</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Project Type *</label>
                            <div className="type-options">
                                {(['opensource', 'commercial', 'portfolio', 'academic'] as ProjectType[]).map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`type-option ${formData.projectType === type ? 'active' : ''}`}
                                        onClick={() => updateField('projectType', type)}
                                    >
                                        {type === 'opensource' && 'Open Source'}
                                        {type === 'commercial' && 'Commercial'}
                                        {type === 'portfolio' && 'Portfolio'}
                                        {type === 'academic' && 'Academic'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                className="btn-primary"
                                onClick={() => setCurrentStep(2)}
                                disabled={!isStep1Valid}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Skills & Team */}
                {currentStep === 2 && (
                    <div className="form-card">
                        <h2>Skills & Team</h2>

                        <div className="form-group">
                            <label>Required Skills *</label>
                            <div className="tag-input-container">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addToArray('requiredSkills', skillInput);
                                            setSkillInput('');
                                        }
                                    }}
                                    placeholder="Type a skill and press Enter"
                                />
                                <button
                                    type="button"
                                    className="add-btn"
                                    onClick={() => {
                                        addToArray('requiredSkills', skillInput);
                                        setSkillInput('');
                                    }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <div className="tags-list">
                                {formData.requiredSkills.map((skill, idx) => (
                                    <span key={idx} className="tag">
                                        {skill}
                                        <button onClick={() => removeFromArray('requiredSkills', idx)}>
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="skill-suggestions">
                                <span className="suggestions-label">Suggestions:</span>
                                {SKILL_SUGGESTIONS.filter(s => !formData.requiredSkills.includes(s)).slice(0, 8).map(skill => (
                                    <button
                                        key={skill}
                                        type="button"
                                        className="suggestion-btn"
                                        onClick={() => addToArray('requiredSkills', skill)}
                                    >
                                        + {skill}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Team Size *</label>
                                <div className="team-size-input">
                                    <Users size={18} />
                                    <input
                                        type="number"
                                        min={1}
                                        max={20}
                                        value={formData.teamSize}
                                        onChange={(e) => updateField('teamSize', parseInt(e.target.value) || 1)}
                                    />
                                    <span>members needed</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Deadline</label>
                                <div className="deadline-input">
                                    <Calendar size={18} />
                                    <input
                                        type="text"
                                        value={formData.deadline}
                                        onChange={(e) => updateField('deadline', e.target.value)}
                                        placeholder="e.g., March 2025 or Ongoing"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <div className="location-input">
                                <MapPin size={18} />
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => updateField('location', e.target.value)}
                                    placeholder="e.g., Remote, New York, Istanbul"
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button className="btn-secondary" onClick={() => setCurrentStep(1)}>
                                Back
                            </button>
                            <button
                                className="btn-primary"
                                onClick={() => setCurrentStep(3)}
                                disabled={!isStep2Valid}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Details */}
                {currentStep === 3 && (
                    <div className="form-card">
                        <h2>Project Details</h2>

                        <div className="form-group">
                            <label>Full Description</label>
                            <textarea
                                value={formData.longDescription}
                                onChange={(e) => updateField('longDescription', e.target.value)}
                                placeholder="Detailed description of your project, goals, and what makes it special..."
                                rows={6}
                            />
                        </div>

                        <div className="form-group">
                            <label>Responsibilities *</label>
                            <div className="tag-input-container">
                                <input
                                    type="text"
                                    value={responsibilityInput}
                                    onChange={(e) => setResponsibilityInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addToArray('responsibilities', responsibilityInput);
                                            setResponsibilityInput('');
                                        }
                                    }}
                                    placeholder="What will contributors do?"
                                />
                                <button
                                    type="button"
                                    className="add-btn"
                                    onClick={() => {
                                        addToArray('responsibilities', responsibilityInput);
                                        setResponsibilityInput('');
                                    }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <ul className="items-list">
                                {formData.responsibilities.map((item, idx) => (
                                    <li key={idx}>
                                        <CheckCircle size={16} />
                                        <span>{item}</span>
                                        <button onClick={() => removeFromArray('responsibilities', idx)}>
                                            <X size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="form-group">
                            <label>Requirements *</label>
                            <div className="tag-input-container">
                                <input
                                    type="text"
                                    value={requirementInput}
                                    onChange={(e) => setRequirementInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addToArray('requirements', requirementInput);
                                            setRequirementInput('');
                                        }
                                    }}
                                    placeholder="What skills/experience should they have?"
                                />
                                <button
                                    type="button"
                                    className="add-btn"
                                    onClick={() => {
                                        addToArray('requirements', requirementInput);
                                        setRequirementInput('');
                                    }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <ul className="items-list">
                                {formData.requirements.map((item, idx) => (
                                    <li key={idx}>
                                        <CheckCircle size={16} />
                                        <span>{item}</span>
                                        <button onClick={() => removeFromArray('requirements', idx)}>
                                            <X size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="form-group">
                            <label>Benefits (What contributors get)</label>
                            <div className="tag-input-container">
                                <input
                                    type="text"
                                    value={benefitInput}
                                    onChange={(e) => setBenefitInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addToArray('benefits', benefitInput);
                                            setBenefitInput('');
                                        }
                                    }}
                                    placeholder="e.g., Learn new technologies, Portfolio building"
                                />
                                <button
                                    type="button"
                                    className="add-btn"
                                    onClick={() => {
                                        addToArray('benefits', benefitInput);
                                        setBenefitInput('');
                                    }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <ul className="items-list benefits">
                                {formData.benefits.map((item, idx) => (
                                    <li key={idx}>
                                        <CheckCircle size={16} />
                                        <span>{item}</span>
                                        <button onClick={() => removeFromArray('benefits', idx)}>
                                            <X size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="form-actions">
                            <button className="btn-secondary" onClick={() => setCurrentStep(2)}>
                                Back
                            </button>
                            <button
                                className="btn-primary"
                                onClick={() => setCurrentStep(4)}
                                disabled={!isStep3Valid}
                            >
                                Preview
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                    <div className="form-card review-card">
                        <h2>Review Your Listing</h2>

                        <div className="review-section">
                            <div className="review-header">
                                <div className="review-badges">
                                    <span className={`type-badge ${formData.projectType}`}>
                                        {formData.projectType === 'opensource' && 'Open Source'}
                                        {formData.projectType === 'commercial' && 'Commercial'}
                                        {formData.projectType === 'portfolio' && 'Portfolio'}
                                        {formData.projectType === 'academic' && 'Academic'}
                                    </span>
                                    {formData.workStyle === 'paid' && formData.budget && (
                                        <span className="budget-badge">
                                            <DollarSign size={14} />
                                            {formData.budget}
                                            {formData.budgetType === 'monthly' && '/mo'}
                                            {formData.budgetType === 'hourly' && '/hr'}
                                        </span>
                                    )}
                                    {formData.workStyle === 'volunteer' && (
                                        <span className="volunteer-badge">
                                            <Heart size={14} />
                                            Volunteer
                                        </span>
                                    )}
                                </div>
                            </div>

                            <h3 className="review-title">{formData.title || 'Untitled Project'}</h3>
                            <p className="review-description">{formData.description}</p>

                            <div className="review-meta">
                                <span><Users size={16} /> {formData.teamSize} members needed</span>
                                <span><Calendar size={16} /> {formData.deadline || 'No deadline'}</span>
                                <span><MapPin size={16} /> {formData.location}</span>
                            </div>

                            <div className="review-skills">
                                {formData.requiredSkills.map((skill, idx) => (
                                    <span key={idx} className="skill-tag">{skill}</span>
                                ))}
                            </div>

                            {formData.responsibilities.length > 0 && (
                                <div className="review-list">
                                    <h4>Responsibilities</h4>
                                    <ul>
                                        {formData.responsibilities.map((item, idx) => (
                                            <li key={idx}><CheckCircle size={14} /> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {formData.requirements.length > 0 && (
                                <div className="review-list">
                                    <h4>Requirements</h4>
                                    <ul>
                                        {formData.requirements.map((item, idx) => (
                                            <li key={idx}><CheckCircle size={14} /> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="form-actions">
                            <button className="btn-secondary" onClick={() => setCurrentStep(3)}>
                                Back to Edit
                            </button>
                            <button
                                className="btn-primary"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
