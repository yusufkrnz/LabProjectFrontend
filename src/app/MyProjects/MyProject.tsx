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
        description: 'Crypto-Seal is a decentralized document verification system that leverages blockchain technology to provide immutable proof of document authenticity. The system uses SHA256 hashing to create unique fingerprints of documents and stores verification records on the Ethereum blockchain via smart contracts.',
        type: 'opensource',
        workStyle: 'volunteer',
        teamSize: 3,
        languages: [
            { name: 'Go', percentage: 68.5, color: '#00ADD8' },
            { name: 'Solidity', percentage: 24.3, color: '#363636' },
            { name: 'Shell', percentage: 7.2, color: '#89e051' }
        ],
        technologies: ['Ethereum', 'Docker', 'PostgreSQL', 'Redis', 'gRPC'],
        teamMembers: [
            { name: 'Yusuf Kıran', role: 'Project Lead', avatar: '', rating: 4.8, initials: 'YK' },
            { name: 'Sait Dündar', role: 'Backend Developer', avatar: '', rating: 4.9, initials: 'SD' },
            { name: 'Ali Veli', role: 'Smart Contract Developer', avatar: '', rating: 4.5, initials: 'AV' }
        ],
        createdAt: '2024-12-20',
        status: 'active',
        reviewCount: 12,
        rating: 4.8,
        githubUrl: 'https://github.com/crypto-seal/backend'
    },
    {
        id: '2',
        name: 'LabProject Frontend',
        description: 'Modern React frontend for project management and team collaboration platform. Features include real-time updates, drag-and-drop task management, and comprehensive reporting dashboards.',
        type: 'commercial',
        workStyle: 'paid',
        budget: '5000',
        budgetType: 'monthly',
        teamSize: 4,
        languages: [
            { name: 'TypeScript', percentage: 85.0, color: '#3178c6' },
            { name: 'CSS', percentage: 12.0, color: '#563d7c' },
            { name: 'HTML', percentage: 3.0, color: '#e34c26' }
        ],
        technologies: ['React', 'Vite', 'Redux', 'TailwindCSS', 'Jest'],
        teamMembers: [
            { name: 'Ayşe Yılmaz', role: 'Frontend Lead', avatar: '', rating: 5.0, initials: 'AY' },
            { name: 'Mehmet Demir', role: 'UI Developer', avatar: '', rating: 4.7, initials: 'MD' }
        ],
        createdAt: '2024-12-15',
        status: 'active',
        reviewCount: 8,
        rating: 4.9,
    },
    {
        id: '3',
        name: 'ML Image Classifier',
        description: 'Deep learning model for image classification using TensorFlow and Python. Achieves 99% accuracy on standard datasets with optimized inference time for edge devices.',
        type: 'academic',
        workStyle: 'volunteer',
        teamSize: 2,
        languages: [
            { name: 'Python', percentage: 95.0, color: '#3572A5' },
            { name: 'Jupyter Notebook', percentage: 5.0, color: '#DA5B0B' }
        ],
        technologies: ['TensorFlow', 'Keras', 'NumPy', 'Pandas', 'OpenCV'],
        teamMembers: [
            { name: 'John Doe', role: 'ML Engineer', avatar: '', rating: 4.6, initials: 'JD' }
        ],
        createdAt: '2024-11-28',
        status: 'completed',
        reviewCount: 24,
        rating: 4.7,
        githubUrl: '#'
    }
];

export default function MyProjects() {
    const [searchQuery, setSearchQuery] = useState('');
    const [projects] = useState<Project[]>(MOCK_PROJECTS);

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.languages.some(lang => lang.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
