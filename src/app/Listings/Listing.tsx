import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    DollarSign, Heart, Users, Calendar, MapPin,
    Plus, X, CheckCircle
} from 'lucide-react';
import Header from '../../components/Header';
import ProjectStepper from '../Project/components/ProjectStepper/ProjectStepper';
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
        console.log('Creating listing:', data);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true, listingId: 'new-listing-1' };
    }
};

const SKILL_SUGGESTIONS = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Go',
    'Java', 'C++', 'Rust', 'Vue.js', 'Angular', 'Next.js',
    'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS'
];

export default function Listing() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [skillInput, setSkillInput] = useState('');
    const [responsibilityInput, setResponsibilityInput] = useState('');
    const [requirementInput, setRequirementInput] = useState('');

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
            setCurrentStep(5);
        } else {
            alert('Failed to create listing. Please try again.');
        }
        setIsSubmitting(false);
    };

    const isStep1Valid = formData.title && formData.description && formData.projectType;
    const isStep2Valid = formData.requiredSkills.length > 0 && formData.teamSize > 0;
    const isStep3Valid = formData.responsibilities.length > 0 || formData.requirements.length > 0;

    return (
        <div className="listing-container">
            <Header />
            <div className="listing-content">
                <div className="listing-wizard">
                    <ProjectStepper currentStep={currentStep} totalSteps={5} />

                    <div className="wizard-content">
                        {/* Step 1: Basic Info */}
                        {currentStep === 1 && (
                            <div className="step-form">
                                <div className="step-header">
                                    <h2>Create a new Listing</h2>
                                    <p>Tell us about your listing</p>
                                </div>

                                {/* Section 1: Basic Info */}
                                <div className="form-section">
                                    <div className="section-number">1</div>
                                    <div className="section-content">
                                        <h3>Basic Information</h3>

                                        <div className="form-field">
                                            <label>Project Title</label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => updateField('title', e.target.value)}
                                                placeholder="e.g., Open Source React Component Library"
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-field">
                                            <label>Short Description</label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => updateField('description', e.target.value)}
                                                placeholder="Brief overview of your project"
                                                className="form-textarea"
                                                rows={3}
                                            />
                                            <span className="char-count">{formData.description.length}/300</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Work Style & Type */}
                                <div className="form-section">
                                    <div className="section-number">2</div>
                                    <div className="section-content">
                                        <h3>Work Style & Project Type</h3>

                                        <div className="form-field">
                                            <label>Work Style</label>
                                            <div className="option-grid">
                                                <button
                                                    type="button"
                                                    className={`option-card ${formData.workStyle === 'volunteer' ? 'selected' : ''}`}
                                                    onClick={() => updateField('workStyle', 'volunteer')}
                                                >
                                                    <Heart size={24} />
                                                    <span className="option-label">Volunteer</span>
                                                    <span className="option-desc">For learning & experience</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`option-card ${formData.workStyle === 'paid' ? 'selected' : ''}`}
                                                    onClick={() => updateField('workStyle', 'paid')}
                                                >
                                                    <DollarSign size={24} />
                                                    <span className="option-label">Paid</span>
                                                    <span className="option-desc">Compensated position</span>
                                                </button>
                                            </div>

                                            {formData.workStyle === 'paid' && (
                                                <div className="budget-input-row">
                                                    <input
                                                        type="text"
                                                        value={formData.budget}
                                                        onChange={(e) => updateField('budget', e.target.value)}
                                                        placeholder="$5,000"
                                                        className="form-input budget-amount"
                                                    />
                                                    <select
                                                        value={formData.budgetType}
                                                        onChange={(e) => updateField('budgetType', e.target.value as BudgetType)}
                                                        className="form-select"
                                                    >
                                                        <option value="fixed">Fixed Price</option>
                                                        <option value="monthly">Monthly</option>
                                                        <option value="hourly">Hourly</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-field">
                                            <label>Project Type</label>
                                            <div className="type-pills">
                                                {(['opensource', 'commercial', 'portfolio', 'academic'] as ProjectType[]).map(type => (
                                                    <button
                                                        key={type}
                                                        type="button"
                                                        className={`type-pill ${formData.projectType === type ? 'selected' : ''}`}
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
                            <div className="step-form">
                                <div className="step-header">
                                    <h2>Skills & Team</h2>
                                    <p>Define your requirements and team structure</p>
                                </div>

                                {/* Section 1: Required Skills */}
                                <div className="form-section">
                                    <div className="section-number">1</div>
                                    <div className="section-content">
                                        <h3>Required Skills</h3>
                                        <div className="tag-input">
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
                                                className="form-input"
                                            />
                                            <button
                                                type="button"
                                                className="add-btn"
                                                onClick={() => {
                                                    addToArray('requiredSkills', skillInput);
                                                    setSkillInput('');
                                                }}
                                            >
                                                <Plus size={18} />
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
                                        <div className="suggestions">
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
                                </div>

                                {/* Section 2: Team & Location */}
                                <div className="form-section">
                                    <div className="section-number">2</div>
                                    <div className="section-content">
                                        <h3>Team & Location</h3>
                                        <div className="inline-inputs">
                                            <div className="icon-input">
                                                <Users size={18} />
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={20}
                                                    value={formData.teamSize}
                                                    onChange={(e) => updateField('teamSize', parseInt(e.target.value) || 1)}
                                                    className="form-input small"
                                                />
                                                <span>members</span>
                                            </div>
                                            <div className="icon-input">
                                                <MapPin size={18} />
                                                <input
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={(e) => updateField('location', e.target.value)}
                                                    placeholder="Remote"
                                                    className="form-input"
                                                />
                                            </div>
                                            <div className="icon-input">
                                                <Calendar size={18} />
                                                <input
                                                    type="text"
                                                    value={formData.deadline}
                                                    onChange={(e) => updateField('deadline', e.target.value)}
                                                    placeholder="March 2025"
                                                    className="form-input"
                                                />
                                            </div>
                                        </div>
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
                            <div className="step-form">
                                <div className="step-header">
                                    <h2>Project Details</h2>
                                    <p>Add responsibilities and requirements</p>
                                </div>

                                {/* Section 1: Description */}
                                <div className="form-section">
                                    <div className="section-number">1</div>
                                    <div className="section-content">
                                        <h3>Full Description</h3>
                                        <textarea
                                            value={formData.longDescription}
                                            onChange={(e) => updateField('longDescription', e.target.value)}
                                            placeholder="Detailed description of your project..."
                                            className="form-textarea"
                                            rows={5}
                                        />
                                    </div>
                                </div>

                                {/* Section 2: Responsibilities & Requirements */}
                                <div className="form-section">
                                    <div className="section-number">2</div>
                                    <div className="section-content">
                                        <h3>Responsibilities & Requirements</h3>

                                        <div className="form-field">
                                            <label>Responsibilities</label>
                                            <div className="tag-input">
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
                                                    className="form-input"
                                                />
                                                <button
                                                    type="button"
                                                    className="add-btn"
                                                    onClick={() => {
                                                        addToArray('responsibilities', responsibilityInput);
                                                        setResponsibilityInput('');
                                                    }}
                                                >
                                                    <Plus size={18} />
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

                                        <div className="form-field">
                                            <label>Requirements</label>
                                            <div className="tag-input">
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
                                                    placeholder="What experience should they have?"
                                                    className="form-input"
                                                />
                                                <button
                                                    type="button"
                                                    className="add-btn"
                                                    onClick={() => {
                                                        addToArray('requirements', requirementInput);
                                                        setRequirementInput('');
                                                    }}
                                                >
                                                    <Plus size={18} />
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
                                    </div>
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
                            <div className="step-form">
                                <div className="step-header">
                                    <h2>Review Your Listing</h2>
                                    <p>Make sure everything looks good</p>
                                </div>

                                <div className="review-card">
                                    <div className="review-badges">
                                        <span className={`badge type-${formData.projectType}`}>
                                            {formData.projectType === 'opensource' && 'Open Source'}
                                            {formData.projectType === 'commercial' && 'Commercial'}
                                            {formData.projectType === 'portfolio' && 'Portfolio'}
                                            {formData.projectType === 'academic' && 'Academic'}
                                        </span>
                                        <span className={`badge work-${formData.workStyle}`}>
                                            {formData.workStyle === 'volunteer' ? (
                                                <><Heart size={14} /> Volunteer</>
                                            ) : (
                                                <><DollarSign size={14} /> {formData.budget}</>
                                            )}
                                        </span>
                                    </div>

                                    <h3>{formData.title || 'Untitled'}</h3>
                                    <p className="review-description">{formData.description}</p>

                                    <div className="review-meta">
                                        <span><Users size={16} /> {formData.teamSize} members</span>
                                        <span><MapPin size={16} /> {formData.location}</span>
                                        {formData.deadline && <span><Calendar size={16} /> {formData.deadline}</span>}
                                    </div>

                                    <div className="review-skills">
                                        {formData.requiredSkills.map((skill, idx) => (
                                            <span key={idx} className="skill-tag">{skill}</span>
                                        ))}
                                    </div>

                                    {formData.responsibilities.length > 0 && (
                                        <div className="review-section">
                                            <h4>Responsibilities</h4>
                                            <ul>
                                                {formData.responsibilities.map((item, idx) => (
                                                    <li key={idx}><CheckCircle size={14} /> {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {formData.requirements.length > 0 && (
                                        <div className="review-section">
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
                                        Back
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

                        {/* Step 5: Success */}
                        {currentStep === 5 && (
                            <div className="step-complete">
                                <div className="success-icon">
                                    <CheckCircle size={64} />
                                </div>
                                <h2>Listing Published!</h2>
                                <p>Your listing is now live on the marketplace.</p>
                                <Link to="/marketplace" className="view-project-btn">
                                    View in Marketplace
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
