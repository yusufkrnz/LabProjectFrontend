import { Link } from 'react-router-dom';
import { Eye, Calendar, Users, Code, DollarSign, Heart } from 'lucide-react';
import './ProjectCard.css';

export type Project = {
    id: string;
    name: string;
    description: string;
    type: 'opensource' | 'commercial' | 'portfolio' | 'academic';
    workStyle: 'volunteer' | 'paid';
    budget?: string;
    budgetType?: string;
    teamSize: number;
    languages: string[];
    createdAt: string;
    status: 'active' | 'completed' | 'paused';
};

type ProjectCardProps = {
    project: Project;
};

const TYPE_LABELS: Record<string, string> = {
    opensource: 'Open Source',
    commercial: 'Commercial',
    portfolio: 'Portfolio',
    academic: 'Academic',
};

const STATUS_COLORS: Record<string, string> = {
    active: 'status-active',
    completed: 'status-completed',
    paused: 'status-paused',
};

export const formatProjectDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
};

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="project-card">
            <div className="project-main">
                <div className="project-info">
                    <div className="project-title-row">
                        <Link to={`/project/${project.id}`} className="project-name">{project.name}</Link>
                        <span className={`project-type ${project.type}`}>
                            {TYPE_LABELS[project.type]}
                        </span>
                        <span className={`project-status ${STATUS_COLORS[project.status]}`}>
                            {project.status}
                        </span>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-meta">
                        <span className="meta-item">
                            <Code size={14} />
                            {project.languages.join(', ')}
                        </span>
                        <span className="meta-item">
                            <Users size={14} />
                            {project.teamSize} {project.teamSize === 1 ? 'member' : 'members'}
                        </span>
                        <span className="meta-item">
                            {project.workStyle === 'paid' ? (
                                <>
                                    <DollarSign size={14} />
                                    Paid
                                </>
                            ) : (
                                <>
                                    <Heart size={14} />
                                    Volunteer
                                </>
                            )}
                        </span>
                        <span className="meta-item">
                            <Calendar size={14} />
                            Updated {formatProjectDate(project.createdAt)}
                        </span>
                    </div>
                </div>
                <div className="project-actions">
                    <Link to={`/project/${project.id}`} className="details-btn">
                        <Eye size={16} />
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
