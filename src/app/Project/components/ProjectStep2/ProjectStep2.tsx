import { useState, useEffect } from 'react';
import { Plus, X, ChevronDown, Code, Database, Cloud, Wrench } from 'lucide-react';
import type { TeamMember, TeamMemberRole, TechCategory } from '../../Project';
import {
    ROLE_LANGUAGES,
    LANGUAGE_FRAMEWORKS,
    ROLE_LABELS,
    ROLE_CATEGORIES,
    CATEGORY_LABELS,
    ROLE_DATABASES,
    ROLE_CLOUD_TECH,
    ROLE_TOOLS
} from '../../Project';
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

const CATEGORY_ICONS: Record<TechCategory, React.ReactNode> = {
    languages: <Code size={16} />,
    databases: <Database size={16} />,
    cloudTech: <Cloud size={16} />,
    tools: <Wrench size={16} />,
};

export default function ProjectStep2({ initialData, onComplete, onBack }: ProjectStep2Props) {
    const [teamSize, setTeamSize] = useState(initialData.teamSize);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialData.teamMembers);
    const [activeTab, setActiveTab] = useState<Record<string, TechCategory>>({});
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
                        databases: [],
                        cloudTech: [],
                        tools: [],
                    });
                }
                return [...prev, ...newMembers];
            } else {
                return prev.slice(0, teamSize);
            }
        });
    }, [teamSize]);

    // Initialize active tab for each member
    useEffect(() => {
        setActiveTab(prev => {
            const newTabs = { ...prev };
            teamMembers.forEach(member => {
                if (!newTabs[member.id]) {
                    const categories = ROLE_CATEGORIES[member.role];
                    newTabs[member.id] = categories[0] || 'languages';
                }
            });
            return newTabs;
        });
    }, [teamMembers]);

    const handleRoleChange = (memberId: string, role: TeamMemberRole) => {
        setTeamMembers(prev => prev.map(m =>
            m.id === memberId ? {
                ...m,
                role,
                languages: [],
                frameworks: [],
                databases: [],
                cloudTech: [],
                tools: [],
            } : m
        ));
        // Reset active tab for this member
        const categories = ROLE_CATEGORIES[role];
        setActiveTab(prev => ({ ...prev, [memberId]: categories[0] || 'languages' }));
        // Clear expanded languages
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
                const frameworksToRemove = LANGUAGE_FRAMEWORKS[language] || [];
                return {
                    ...m,
                    languages: m.languages.filter(l => l !== language),
                    frameworks: m.frameworks.filter(f => !frameworksToRemove.includes(f)),
                };
            } else {
                return {
                    ...m,
                    languages: [...m.languages, language],
                };
            }
        }));

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

    const handleItemToggle = (memberId: string, category: TechCategory, item: string) => {
        setTeamMembers(prev => prev.map(m => {
            if (m.id !== memberId) return m;
            const currentItems = m[category] as string[];
            const hasItem = currentItems.includes(item);
            return {
                ...m,
                [category]: hasItem
                    ? currentItems.filter(i => i !== item)
                    : [...currentItems, item],
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

    const getItemsForCategory = (role: TeamMemberRole, category: TechCategory): string[] => {
        switch (category) {
            case 'languages':
                return ROLE_LANGUAGES[role];
            case 'databases':
                return ROLE_DATABASES[role];
            case 'cloudTech':
                return ROLE_CLOUD_TECH[role];
            case 'tools':
                return ROLE_TOOLS[role];
            default:
                return [];
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({ teamSize, teamMembers });
    };

    const renderCategoryContent = (member: TeamMember, category: TechCategory) => {
        if (category === 'languages') {
            return (
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
                                    {isSelected ? <X size={14} /> : <Plus size={14} />}
                                    <span>{language}</span>
                                    {isSelected && member.frameworks.filter(f => frameworks.includes(f)).length > 0 && (
                                        <span className="framework-count">
                                            {member.frameworks.filter(f => frameworks.includes(f)).length}
                                        </span>
                                    )}
                                </button>

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
                                                    {member.frameworks.includes(framework) ? <X size={12} /> : <Plus size={12} />}
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
            );
        }

        // For databases, cloudTech, tools
        const items = getItemsForCategory(member.role, category);
        const memberItems = member[category] as string[];

        if (items.length === 0) {
            return (
                <p className="empty-message">No {CATEGORY_LABELS[category].toLowerCase()} available for this role</p>
            );
        }

        return (
            <div className="items-grid">
                {items.map(item => (
                    <button
                        key={item}
                        type="button"
                        className={`item-chip ${memberItems.includes(item) ? 'selected' : ''}`}
                        onClick={() => handleItemToggle(member.id, category, item)}
                    >
                        {memberItems.includes(item) ? <X size={14} /> : <Plus size={14} />}
                        {item}
                    </button>
                ))}
            </div>
        );
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
                            {[1, 2, 3, 4, 5].map(num => (
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
                    {teamMembers.map((member, index) => {
                        const categories = ROLE_CATEGORIES[member.role];
                        const currentTab = activeTab[member.id] || categories[0];

                        return (
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

                                {/* Technology Tabs */}
                                {member.role !== 'specific' && (
                                    <div className="member-field">
                                        <label>Required Technologies</label>

                                        {/* Tabs */}
                                        <div className="tech-tabs">
                                            {categories.map(cat => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    className={`tech-tab ${currentTab === cat ? 'active' : ''}`}
                                                    onClick={() => setActiveTab(prev => ({ ...prev, [member.id]: cat }))}
                                                >
                                                    {CATEGORY_ICONS[cat]}
                                                    {CATEGORY_LABELS[cat]}
                                                    {(member[cat] as string[]).length > 0 && (
                                                        <span className="tab-count">{(member[cat] as string[]).length}</span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Tab Content */}
                                        <div className="tech-tab-content">
                                            {renderCategoryContent(member, currentTab)}
                                        </div>

                                        {/* Selected Summary */}
                                        {(member.languages.length > 0 || member.frameworks.length > 0 ||
                                            member.databases.length > 0 || member.cloudTech.length > 0 ||
                                            member.tools.length > 0) && (
                                                <div className="selection-summary">
                                                    {member.languages.length > 0 && (
                                                        <div className="summary-section">
                                                            <span className="summary-label">Languages:</span>
                                                            <span className="summary-value">{member.languages.join(', ')}</span>
                                                        </div>
                                                    )}
                                                    {member.frameworks.length > 0 && (
                                                        <div className="summary-section">
                                                            <span className="summary-label">Frameworks:</span>
                                                            <span className="summary-value">{member.frameworks.join(', ')}</span>
                                                        </div>
                                                    )}
                                                    {member.databases.length > 0 && (
                                                        <div className="summary-section">
                                                            <span className="summary-label">Databases:</span>
                                                            <span className="summary-value">{member.databases.join(', ')}</span>
                                                        </div>
                                                    )}
                                                    {member.cloudTech.length > 0 && (
                                                        <div className="summary-section">
                                                            <span className="summary-label">Cloud & DevOps:</span>
                                                            <span className="summary-value">{member.cloudTech.join(', ')}</span>
                                                        </div>
                                                    )}
                                                    {member.tools.length > 0 && (
                                                        <div className="summary-section">
                                                            <span className="summary-label">Tools:</span>
                                                            <span className="summary-value">{member.tools.join(', ')}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
