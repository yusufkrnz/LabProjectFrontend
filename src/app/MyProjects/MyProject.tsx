import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Eye, Calendar, Users, Code, DollarSign, Heart } from 'lucide-react';
import Header from '../../components/Header';
import './MyProject.css';

// Mock project data - will be replaced with API data
type Project = {
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

const MOCK_PROJECTS: Project[] = [
    {
        id: '1',
        name: 'crypto-seal-backend',
        description: 'A blockchain-based document verification system with SHA256 hashing and smart contract integration.',
        type: 'opensource',
        workStyle: 'volunteer',
        teamSize: 3,
        languages: ['Go', 'Solidity'],
        createdAt: '2024-12-20',
        status: 'active',
    },
    {
        id: '2',
        name: 'LabProject Frontend',
        description: 'Modern React frontend for project management and team collaboration platform.',
        type: 'commercial',
        workStyle: 'paid',
        budget: '5000',
        budgetType: 'monthly',
        teamSize: 4,
        languages: ['TypeScript', 'React'],
        createdAt: '2024-12-15',
        status: 'active',
    },
    {
        id: '3',
        name: 'ML Image Classifier',
        description: 'Deep learning model for image classification using TensorFlow and Python.',
        type: 'academic',
        workStyle: 'volunteer',
        teamSize: 2,
        languages: ['Python', 'TensorFlow'],
        createdAt: '2024-11-28',
        status: 'completed',
    },
    {
        id: '4',
        name: 'DevOps Pipeline Automation',
        description: 'Automated CI/CD pipeline with Docker, Kubernetes, and GitHub Actions integration.',
        type: 'portfolio',
        workStyle: 'volunteer',
        teamSize: 1,
        languages: ['Bash', 'YAML'],
        createdAt: '2024-11-10',
        status: 'paused',
    },
];

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

export default function MyProjects() {
    const [searchQuery, setSearchQuery] = useState('');
    const [projects] = useState<Project[]>(MOCK_PROJECTS);

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.languages.some(lang => lang.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const formatDate = (dateString: string) => {
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

    return (
        <div className="myprojects-container">
            <Header />
            <div className="myprojects-content">
                <div className="myprojects-wrapper">
                    {/* Header with Search and New Button */}
                    <div className="myprojects-header">
                        <div className="search-bar">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder=" Search a Project"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Link to="/project" className="new-project-btn">
                            <Plus size={18} />
                            New
                        </Link>
                    </div>

                    {/* Projects List */}
                    <div className="projects-list">
                        {filteredProjects.length === 0 ? (
                            <div className="empty-state">
                                <p>No projects found</p>
                                <Link to="/project" className="create-first-btn">
                                    Create your first project
                                </Link>
                            </div>
                        ) : (
                            filteredProjects.map(project => (
                                <div key={project.id} className="project-card">
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
                                                    Updated {formatDate(project.createdAt)}
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
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
