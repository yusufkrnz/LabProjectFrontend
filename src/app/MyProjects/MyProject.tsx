import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import Header from '../../components/Header';
import { ProjectCard, type Project } from '../../components/ProjectCard';
import './MyProject.css';

// Mock project data - will be replaced with API data
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

export default function MyProjects() {
    const [searchQuery, setSearchQuery] = useState('');
    const [projects] = useState<Project[]>(MOCK_PROJECTS);

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.languages.some(lang => lang.toLowerCase().includes(searchQuery.toLowerCase()))
    );

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
                                <ProjectCard key={project.id} project={project} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
