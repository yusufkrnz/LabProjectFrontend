import { useState, useEffect } from 'react';
import { Plus, X, ChevronDown, ChevronRight, Code } from 'lucide-react';
import type { TeamMember, TeamMemberRole } from '../../Project';
import { ROLE_LANGUAGES, LANGUAGE_FRAMEWORKS, ROLE_LABELS } from '../../Project';
import './ProjectStep2.css';

type ProjectStep2Props = {
    initialData: {
        teamSize: number;
        teamMembers: TeamMember[];
    };
    onComplete: (data: { teamSize: number; teamMembers: TeamMember[] }) => void;
    onBack: () => void;
};

const ROLES: TeamMemberRole[] = [
    'frontend',
    'backend',
    'mobile',
    'cloud',
    'ml',
    'deeplearning',
    'cybersecurity',
    'qa',
    'data',
    'blockchain',
    'gamedev',
    'embedded',
    'specific'
];

export default function ProjectStep2({ initialData, onComplete, onBack }: ProjectStep2Props) {
    const [teamSize, setTeamSize] = useState(initialData.teamSize);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialData.teamMembers);
    const [expandedLanguages, setExpandedLanguages] = useState<Record<string, Set<string>>>({});

    // Sync team members array with team size
    useEffect(() => {
        setTeamMembers(prev => {
            if (teamSize > prev.length) {
                const newMembers: TeamMember[] = [];
                for (let i = prev.length; i < teamSize; i++) {
                    newMembers.push({
                        id: `member-${i + 1}`,
                        role: 'frontend',
                        languages: [],
                        frameworks: [],
                    });
                }
                return [...prev, ...newMembers];
            } else {
                return prev.slice(0, teamSize);
            }
        });
    }, [teamSize]);

    const handleRoleChange = (memberId: string, role: TeamMemberRole) => {
        setTeamMembers(prev => prev.map(m =>
            m.id === memberId ? { ...m, role, languages: [], frameworks: [] } : m
        ));
        // Clear expanded languages for this member
        setExpandedLanguages(prev => {
            const newState = { ...prev };
            delete newState[memberId];
            return newState;
        });
    };

    const handleLanguageToggle = (memberId: string, language: string) => {
        setTeamMembers(prev => prev.map(m => {
            if (m.id !== memberId) return m;
            const hasLanguage = m.languages.includes(language);

            if (hasLanguage) {
                // Remove language and its frameworks
                const frameworksToRemove = LANGUAGE_FRAMEWORKS[language] || [];
                return {
                    ...m,
                    languages: m.languages.filter(l => l !== language),
                    frameworks: m.frameworks.filter(f => !frameworksToRemove.includes(f)),
                };
            } else {
                // Add language
                return {
                    ...m,
                    languages: [...m.languages, language],
                };
            }
        }));

        // Toggle expanded state for framework selection
        setExpandedLanguages(prev => {
            const memberExpanded = prev[memberId] || new Set();
            const newMemberExpanded = new Set(memberExpanded);

            if (newMemberExpanded.has(language)) {
                newMemberExpanded.delete(language);
            } else {
                newMemberExpanded.add(language);
            }

            return { ...prev, [memberId]: newMemberExpanded };
        });
    };

    const handleFrameworkToggle = (memberId: string, framework: string) => {
        setTeamMembers(prev => prev.map(m => {
            if (m.id !== memberId) return m;
            const hasFramework = m.frameworks.includes(framework);
            return {
                ...m,
                frameworks: hasFramework
                    ? m.frameworks.filter(f => f !== framework)
                    : [...m.frameworks, framework],
            };
        }));
    };

    const handleCustomRoleChange = (memberId: string, customRole: string) => {
        setTeamMembers(prev => prev.map(m =>
            m.id === memberId ? { ...m, customRole } : m
        ));
    };

    const isLanguageExpanded = (memberId: string, language: string): boolean => {
        return expandedLanguages[memberId]?.has(language) || false;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({ teamSize, teamMembers });
    };

    return (
        <form className="step2-form" onSubmit={handleSubmit}>
            <div className="step-header">
                <h2>Team Requirements</h2>
                <p>How many people are you looking for and what roles do you need?</p>
            </div>

            {/* Team Size Selector */}
            <div className="form-section">
                <div className="section-number">2</div>
                <div className="section-content">
                    <h3>Team Size</h3>

                    <div className="team-size-selector">
                        <p className="selector-label">How many team members do you need?</p>
                        <div className="size-buttons">
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <button
                                    key={num}
                                    type="button"
                                    className={`size-btn ${teamSize === num ? 'active' : ''}`}
                                    onClick={() => setTeamSize(num)}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Members Configuration */}
            {teamSize > 0 && (
                <div className="team-members-section">
                    {teamMembers.map((member, index) => (
                        <div key={member.id} className="member-card">
                            <div className="member-header">
                                <span className="member-label">Team Member {index + 1}</span>
                            </div>

                            {/* Role Selection */}
                            <div className="member-field">
                                <label>Role / Field</label>
                                <div className="role-select-wrapper">
                                    <select
                                        value={member.role}
                                        onChange={(e) => handleRoleChange(member.id, e.target.value as TeamMemberRole)}
                                    >
                                        {ROLES.map(role => (
                                            <option key={role} value={role}>
                                                {ROLE_LABELS[role]}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={16} className="select-icon" />
                                </div>
                            </div>

                            {/* Custom Role Input (for Specific) */}
                            {member.role === 'specific' && (
                                <div className="member-field">
                                    <label>Custom Role Name</label>
                                    <input
                                        type="text"
                                        value={member.customRole || ''}
                                        onChange={(e) => handleCustomRoleChange(member.id, e.target.value)}
                                        placeholder="Enter custom role..."
                                    />
                                </div>
                            )}

                            {/* Languages & Frameworks */}
                            {member.role !== 'specific' && (
                                <div className="member-field">
                                    <label>
                                        <Code size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                        Programming Languages & Frameworks
                                    </label>
                                    <p className="field-hint">Click on a language to select it and reveal its frameworks</p>

                                    <div className="languages-container">
                                        {ROLE_LANGUAGES[member.role].map(language => {
                                            const isSelected = member.languages.includes(language);
                                            const isExpanded = isLanguageExpanded(member.id, language);
                                            const frameworks = LANGUAGE_FRAMEWORKS[language] || [];

                                            return (
                                                <div key={language} className="language-block">
                                                    <button
                                                        type="button"
                                                        className={`language-chip ${isSelected ? 'selected' : ''}`}
                                                        onClick={() => handleLanguageToggle(member.id, language)}
                                                    >
                                                        {isSelected ? (
                                                            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
                                                        ) : (
                                                            <Plus size={14} />
                                                        )}
                                                        <span>{language}</span>
                                                        {isSelected && member.frameworks.filter(f => frameworks.includes(f)).length > 0 && (
                                                            <span className="framework-count">
                                                                {member.frameworks.filter(f => frameworks.includes(f)).length}
                                                            </span>
                                                        )}
                                                    </button>

                                                    {/* Framework dropdown */}
                                                    {isSelected && isExpanded && frameworks.length > 0 && (
                                                        <div className="frameworks-dropdown">
                                                            <div className="frameworks-grid">
                                                                {frameworks.map(framework => (
                                                                    <button
                                                                        key={framework}
                                                                        type="button"
                                                                        className={`framework-chip ${member.frameworks.includes(framework) ? 'selected' : ''}`}
                                                                        onClick={() => handleFrameworkToggle(member.id, framework)}
                                                                    >
                                                                        {member.frameworks.includes(framework) ? (
                                                                            <X size={12} />
                                                                        ) : (
                                                                            <Plus size={12} />
                                                                        )}
                                                                        {framework}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Selected Summary */}
                                    {(member.languages.length > 0 || member.frameworks.length > 0) && (
                                        <div className="selection-summary">
                                            <div className="summary-section">
                                                <span className="summary-label">Languages:</span>
                                                <span className="summary-value">{member.languages.join(', ') || 'None'}</span>
                                            </div>
                                            <div className="summary-section">
                                                <span className="summary-label">Frameworks:</span>
                                                <span className="summary-value">{member.frameworks.join(', ') || 'None'}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onBack}>
                    Back
                </button>
                <button type="submit" className="btn-primary">
                    Continue
                </button>
            </div>
        </form>
    );
}
