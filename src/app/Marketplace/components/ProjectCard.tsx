import { Users } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    budget: string;
    category: string;
    skills: string[];
    postedDate: string;
    clientName: string;
    proposals: number;
}

interface ProjectCardProps {
    project: Project;
    viewType: 'grid' | 'list';
}

export default function ProjectCard({ project, viewType }: ProjectCardProps) {
    // İsmin baş harflerini al
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="project-card">
            <div className="project-card-header">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-budget">₺{project.budget}</span>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-skills">
                {project.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="project-meta">
                <div className="project-client">
                    <div className="client-avatar">
                        {getInitials(project.clientName)}
                    </div>
                    <div className="client-info">
                        <span className="client-name">{project.clientName}</span>
                        <span className="posted-date">{project.postedDate}</span>
                    </div>
                </div>

                <div className="project-proposals">
                    <Users size={16} />
                    <span>{project.proposals} teklif</span>
                </div>
            </div>
        </div>
    );
}
