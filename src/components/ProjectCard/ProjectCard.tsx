import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import './ProjectCard.css';

export type TeamMember = {
    name: string;
    role: string;
    avatar: string;
    rating: number;
    initials: string;
};

export type Language = {
    name: string;
    percentage: number;
    color: string;
};

export type Project = {
    id: string;
    name: string;
    description: string;
    type: 'opensource' | 'commercial' | 'portfolio' | 'academic';
    workStyle: 'volunteer' | 'paid';
    budget?: string;
    budgetType?: string;
    teamSize: number;
    languages: Language[];
    technologies: string[];
    teamMembers: TeamMember[];
    createdAt: string;
    status: 'active' | 'completed' | 'paused';
    reviewCount: number;
    rating: number;
    githubUrl?: string;
};

type ProjectCardProps = {
    project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="project-card">
            <div className="folder-content">
                {/* 1. Name */}
                <div className="folder-header">
                    <Link to={`/project/${project.id}`} className="folder-title" title={project.name}>
                        {project.name}
                    </Link>
                </div>

                {/* 2. About */}
                <div className="folder-section-about">
                    <p className="folder-description" title={project.description}>
                        {project.description}
                    </p>
                </div>

                {/* 3. Tech Stack */}
                <div className="folder-section-tech">
                    <div className="folder-tech-stack">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                            <span key={i} className="tech-chip">{tech}</span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="tech-chip">+{project.technologies.length - 3}</span>
                        )}
                    </div>
                </div>

                {/* Footer Row: Contributors & Link */}
                <div className="card-footer-row">
                    <div className="folder-section-contributors">
                        <div className="folder-contributors">
                            {project.teamMembers.map((member, i) => (
                                <div key={i} className="contributor-avatar" title={`${member.name} - ${member.role}`}>
                                    {member.initials}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="folder-footer">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="github-link-btn" title="View on GitHub">
                                <Github size={18} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
