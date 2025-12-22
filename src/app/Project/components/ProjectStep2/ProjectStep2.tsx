import { useState, useEffect } from 'react';
import { Plus, X, ChevronDown } from 'lucide-react';
import type { TeamMember, TeamMemberRole } from '../../Project';
import { ROLE_TECHNOLOGIES, ROLE_LABELS } from '../../Project';
import './ProjectStep2.css';

type ProjectStep2Props = {
    initialData: {
        teamSize: number;
        teamMembers: TeamMember[];
    };
    onComplete: (data: { teamSize: number; teamMembers: TeamMember[] }) => void;
    onBack: () => void;
};

const ROLES: TeamMemberRole[] = ['frontend', 'backend', 'cloud', 'ml', 'deeplearning', 'specific'];

export default function ProjectStep2({ initialData, onComplete, onBack }: ProjectStep2Props) {
    const [teamSize, setTeamSize] = useState(initialData.teamSize);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialData.teamMembers);

    // Sync team members array with team size
    useEffect(() => {
        setTeamMembers(prev => {
            if (teamSize > prev.length) {
                const newMembers: TeamMember[] = [];
                for (let i = prev.length; i < teamSize; i++) {
                    newMembers.push({
                        id: `member-${i + 1}`,
                        role: 'frontend',
                        technologies: [],
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
            m.id === memberId ? { ...m, role, technologies: [] } : m
        ));
    };

    const handleTechToggle = (memberId: string, tech: string) => {
        setTeamMembers(prev => prev.map(m => {
            if (m.id !== memberId) return m;
            const hasTech = m.technologies.includes(tech);
            return {
                ...m,
                technologies: hasTech
                    ? m.technologies.filter(t => t !== tech)
                    : [...m.technologies, tech],
            };
        }));
    };

    const handleCustomRoleChange = (memberId: string, customRole: string) => {
        setTeamMembers(prev => prev.map(m =>
            m.id === memberId ? { ...m, customRole } : m
        ));
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
                            {[0, 1, 2, 3, 4, 5].map(num => (
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
                                <label>Role</label>
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

                            {/* Technologies */}
                            {member.role !== 'specific' && (
                                <div className="member-field">
                                    <label>Required Technologies</label>
                                    <div className="tech-chips">
                                        {ROLE_TECHNOLOGIES[member.role].map(tech => (
                                            <button
                                                key={tech}
                                                type="button"
                                                className={`tech-chip ${member.technologies.includes(tech) ? 'selected' : ''}`}
                                                onClick={() => handleTechToggle(member.id, tech)}
                                            >
                                                {member.technologies.includes(tech) ? (
                                                    <X size={12} />
                                                ) : (
                                                    <Plus size={12} />
                                                )}
                                                {tech}
                                            </button>
                                        ))}
                                    </div>
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
                    Create Project
                </button>
            </div>
        </form>
    );
}
