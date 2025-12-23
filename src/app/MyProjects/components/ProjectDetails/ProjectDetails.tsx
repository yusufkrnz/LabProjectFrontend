import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, DollarSign, Heart, Clock, Globe, Github, Star, CheckCircle, AlertCircle, Timer } from 'lucide-react';
import Header from '../../../../components/Header';
import './ProjectDetails.css';

// Types - will be used with API responses
type TeamMember = {
    id: string;
    userId: string; // User ID for profile navigation
    name: string;
    role: string;
    avatar: string;
    rating?: number; // Overall rating for this project (1-5)
};

type Deadline = {
    id: string;
    title: string;
    dueDate: string;
    status: 'completed' | 'in-progress' | 'upcoming' | 'overdue';
    assignee?: string;
};

type Review = {
    id: string;
    reviewerId: string;
    reviewerName: string;
    reviewerAvatar: string;
    targetId: string;
    targetName: string;
    rating: number;
    comment: string;
    createdAt: string;
};

type Language = {
    name: string;
    percentage: number;
    color: string;
};

type Project = {
    id: string;
    name: string;
    description: string;
    type: 'opensource' | 'commercial' | 'portfolio' | 'academic';
    workStyle: 'volunteer' | 'paid';
    budget?: string;
    budgetType?: string;
    totalBudget?: string;
    spentBudget?: string;
    teamSize: number;
    languages: Language[];
    technologies: string[];
    createdAt: string;
    status: 'active' | 'completed' | 'paused';
    longDescription: string;
    teamMembers: TeamMember[];
    deadlines: Deadline[];
    reviews: Review[];
    repoUrl?: string;
    websiteUrl?: string;
    startDate: string;
    endDate?: string;
};

// API Service - will connect to backend
const projectService = {
    getProjectById: async (id: string): Promise<Project | null> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/projects/${id}`);
        // return response.json();

        // Mock data for now - simulating API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_PROJECTS[id] || null;
    }
};

// Mock data - will be replaced by backend API
const MOCK_PROJECTS: Record<string, Project> = {
    '1': {
        id: '1',
        name: 'crypto-seal-backend',
        description: 'A blockchain-based document verification system with SHA256 hashing and smart contract integration.',
        type: 'opensource',
        workStyle: 'volunteer',
        teamSize: 3,
        languages: [
            { name: 'Go', percentage: 68.5, color: '#00ADD8' },
            { name: 'Solidity', percentage: 24.3, color: '#AA6746' },
            { name: 'Shell', percentage: 7.2, color: '#89e051' },
        ],
        technologies: ['Ethereum', 'Docker', 'PostgreSQL', 'Redis', 'gRPC'],
        createdAt: '2024-12-20',
        status: 'active',
        longDescription: 'Crypto-Seal is a decentralized document verification system that leverages blockchain technology to provide immutable proof of document authenticity. The system uses SHA256 hashing to create unique fingerprints of documents and stores verification records on the Ethereum blockchain via smart contracts.',
        teamMembers: [
            { id: '1', userId: 'user-1', name: 'Yusuf Kıran', role: 'Project Lead', avatar: 'YK', rating: 4.8 },
            { id: '2', userId: 'user-2', name: 'Sait Dündar', role: 'Backend Developer', avatar: 'SD', rating: 4.9 },
            { id: '3', userId: 'user-3', name: 'Ali Veli', role: 'Smart Contract Developer', avatar: 'AV', rating: 4.5 },
        ],
        deadlines: [
            { id: '1', title: 'Smart Contract V1 Deployment', dueDate: '2024-12-25', status: 'in-progress', assignee: 'Ali Veli' },
            { id: '2', title: 'API Documentation', dueDate: '2024-12-28', status: 'upcoming', assignee: 'Sait Dündar' },
            { id: '3', title: 'Unit Tests Coverage 80%', dueDate: '2024-12-15', status: 'completed', assignee: 'Sait Dündar' },
            { id: '4', title: 'Security Audit', dueDate: '2025-01-05', status: 'upcoming', assignee: 'Yusuf Kıran' },
        ],
        reviews: [
            { id: '1', reviewerId: '1', reviewerName: 'Yusuf Kıran', reviewerAvatar: 'YK', targetId: '2', targetName: 'Sait Dündar', rating: 5, comment: 'Excellent work on the backend architecture!', createdAt: '2024-12-18' },
            { id: '2', reviewerId: '2', reviewerName: 'Sait Dündar', reviewerAvatar: 'SD', targetId: '3', targetName: 'Ali Veli', rating: 4, comment: 'Great smart contract implementation, minor gas optimizations needed.', createdAt: '2024-12-17' },
            { id: '3', reviewerId: '3', reviewerName: 'Ali Veli', reviewerAvatar: 'AV', targetId: '1', targetName: 'Yusuf Kıran', rating: 5, comment: 'Strong leadership and clear communication.', createdAt: '2024-12-16' },
        ],
        repoUrl: 'https://github.com/yusufkrnz/crypto-seal',
        startDate: '2024-12-01',
    },
    '2': {
        id: '2',
        name: 'LabProject Frontend',
        description: 'Modern React frontend for project management and team collaboration platform.',
        type: 'commercial',
        workStyle: 'paid',
        budget: '5000',
        budgetType: 'monthly',
        totalBudget: '30000',
        spentBudget: '12500',
        teamSize: 4,
        languages: [
            { name: 'TypeScript', percentage: 61.2, color: '#3178c6' },
            { name: 'CSS', percentage: 32.4, color: '#563d7c' },
            { name: 'HTML', percentage: 5.8, color: '#e34c26' },
            { name: 'JavaScript', percentage: 0.6, color: '#f1e05a' },
        ],
        technologies: ['React', 'Vite', 'CSS3', 'React Router', 'Axios'],
        createdAt: '2024-12-15',
        status: 'active',
        longDescription: 'LabProject Frontend is a comprehensive project management and team collaboration platform designed for modern development teams. Built with React and TypeScript, it offers intuitive interfaces for managing projects, tracking progress, and facilitating team communication.',
        teamMembers: [
            { id: '1', userId: 'user-1', name: 'Yusuf Kıran', role: 'Product Owner', avatar: 'YK', rating: 4.9 },
            { id: '2', userId: 'user-2', name: 'Sait Dündar', role: 'Frontend Lead', avatar: 'SD', rating: 4.8 },
            { id: '3', userId: 'user-4', name: 'Mehmet Can', role: 'UI/UX Designer', avatar: 'MC', rating: 4.7 },
            { id: '4', userId: 'user-5', name: 'Ayşe Yılmaz', role: 'Frontend Developer', avatar: 'AY', rating: 4.6 },
        ],
        deadlines: [
            { id: '1', title: 'Dashboard Redesign', dueDate: '2024-12-22', status: 'completed', assignee: 'Mehmet Can' },
            { id: '2', title: 'Messages Feature', dueDate: '2024-12-24', status: 'in-progress', assignee: 'Ayşe Yılmaz' },
            { id: '3', title: 'Settings Page', dueDate: '2024-12-20', status: 'overdue', assignee: 'Sait Dündar' },
            { id: '4', title: 'API Integration', dueDate: '2024-12-30', status: 'upcoming', assignee: 'Sait Dündar' },
            { id: '5', title: 'Performance Optimization', dueDate: '2025-01-10', status: 'upcoming', assignee: 'Yusuf Kıran' },
        ],
        reviews: [
            { id: '1', reviewerId: '1', reviewerName: 'Yusuf Kıran', reviewerAvatar: 'YK', targetId: '3', targetName: 'Mehmet Can', rating: 5, comment: 'Outstanding UI designs, really captured the vision!', createdAt: '2024-12-20' },
            { id: '2', reviewerId: '2', reviewerName: 'Sait Dündar', reviewerAvatar: 'SD', targetId: '4', targetName: 'Ayşe Yılmaz', rating: 4, comment: 'Good progress on components, keep up the momentum.', createdAt: '2024-12-19' },
            { id: '3', reviewerId: '3', reviewerName: 'Mehmet Can', reviewerAvatar: 'MC', targetId: '2', targetName: 'Sait Dündar', rating: 5, comment: 'Great technical decisions and code quality.', createdAt: '2024-12-18' },
        ],
        repoUrl: 'https://github.com/yusufkrnz/LabProjectFrontend',
        websiteUrl: 'https://labproject.dev',
        startDate: '2024-11-15',
    },
    '3': {
        id: '3',
        name: 'ML Image Classifier',
        description: 'Deep learning model for image classification using TensorFlow and Python.',
        type: 'academic',
        workStyle: 'volunteer',
        teamSize: 2,
        languages: [
            { name: 'Python', percentage: 85.4, color: '#3572A5' },
            { name: 'Jupyter Notebook', percentage: 12.1, color: '#DA5B0B' },
            { name: 'Shell', percentage: 2.5, color: '#89e051' },
        ],
        technologies: ['TensorFlow', 'Keras', 'NumPy', 'OpenCV', 'Jupyter'],
        createdAt: '2024-11-28',
        status: 'completed',
        longDescription: 'This academic research project focuses on developing a robust image classification model using deep learning techniques. The project explores various CNN architectures and transfer learning approaches.',
        teamMembers: [
            { id: '1', userId: 'user-6', name: 'Dr. Ahmet Öz', role: 'Research Advisor', avatar: 'AÖ', rating: 5.0 },
            { id: '2', userId: 'user-1', name: 'Yusuf Kıran', role: 'Research Assistant', avatar: 'YK', rating: 4.7 },
        ],
        deadlines: [
            { id: '1', title: 'Literature Review', dueDate: '2024-09-15', status: 'completed', assignee: 'Yusuf Kıran' },
            { id: '2', title: 'Model Training', dueDate: '2024-10-30', status: 'completed', assignee: 'Yusuf Kıran' },
            { id: '3', title: 'Final Report', dueDate: '2024-11-25', status: 'completed', assignee: 'Yusuf Kıran' },
        ],
        reviews: [
            { id: '1', reviewerId: '1', reviewerName: 'Dr. Ahmet Öz', reviewerAvatar: 'AÖ', targetId: '2', targetName: 'Yusuf Kıran', rating: 5, comment: 'Exceptional research work and thorough analysis.', createdAt: '2024-11-28' },
        ],
        startDate: '2024-09-01',
        endDate: '2024-11-28',
    },
    '4': {
        id: '4',
        name: 'DevOps Pipeline Automation',
        description: 'Automated CI/CD pipeline with Docker, Kubernetes, and GitHub Actions integration.',
        type: 'portfolio',
        workStyle: 'volunteer',
        teamSize: 1,
        languages: [
            { name: 'Shell', percentage: 45.2, color: '#89e051' },
            { name: 'YAML', percentage: 38.6, color: '#cb171e' },
            { name: 'Dockerfile', percentage: 12.8, color: '#384d54' },
            { name: 'HCL', percentage: 3.4, color: '#844fba' },
        ],
        technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform', 'AWS'],
        createdAt: '2024-11-10',
        status: 'paused',
        longDescription: 'A comprehensive DevOps automation project showcasing modern CI/CD practices. This project demonstrates the implementation of automated deployment pipelines.',
        teamMembers: [
            { id: '1', userId: 'user-1', name: 'Yusuf Kıran', role: 'DevOps Engineer', avatar: 'YK', rating: 4.8 },
        ],
        deadlines: [
            { id: '1', title: 'Docker Setup', dueDate: '2024-10-15', status: 'completed', assignee: 'Yusuf Kıran' },
            { id: '2', title: 'Kubernetes Config', dueDate: '2024-11-01', status: 'in-progress', assignee: 'Yusuf Kıran' },
            { id: '3', title: 'AWS Deployment', dueDate: '2024-12-01', status: 'upcoming', assignee: 'Yusuf Kıran' },
        ],
        reviews: [],
        repoUrl: 'https://github.com/yusufkrnz/devops-automation',
        startDate: '2024-10-01',
    },
};

const TYPE_LABELS: Record<string, string> = {
    opensource: 'Open Source',
    commercial: 'Commercial',
    portfolio: 'Portfolio',
    academic: 'Academic',
};

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
    active: { label: 'Active', className: 'status-active' },
    completed: { label: 'Completed', className: 'status-completed' },
    paused: { label: 'Paused', className: 'status-paused' },
};

const DEADLINE_STATUS: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
    completed: { label: 'Completed', className: 'deadline-completed', icon: <CheckCircle size={14} /> },
    'in-progress': { label: 'In Progress', className: 'deadline-in-progress', icon: <Timer size={14} /> },
    upcoming: { label: 'Upcoming', className: 'deadline-upcoming', icon: <Clock size={14} /> },
    overdue: { label: 'Overdue', className: 'deadline-overdue', icon: <AlertCircle size={14} /> },
};

type TabType = 'overview' | 'details' | 'reviews';

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    // Fetch project from backend
    useEffect(() => {
        const fetchProject = async () => {
            if (!id) {
                setError('Project ID is required');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data = await projectService.getProjectById(id);
                if (data) {
                    setProject(data);
                } else {
                    setError('Project not found');
                }
            } catch (err) {
                console.error('Failed to fetch project:', err);
                setError('Failed to load project. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatShortDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    size={14}
                    className={i <= rating ? 'star-filled' : 'star-empty'}
                />
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="project-details-container">
                <Header />
                <div className="project-details-content">
                    <div className="project-details-wrapper">
                        <div className="loading-state">
                            <div className="loading-spinner"></div>
                            <p>Loading project details...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="project-details-container">
                <Header />
                <div className="project-details-content">
                    <div className="project-details-wrapper">
                        <div className="not-found">
                            <h2>{error || 'Project Not Found'}</h2>
                            <p>The project you're looking for doesn't exist or has been removed.</p>
                            <Link to="/my-projects" className="back-btn">
                                <ArrowLeft size={18} />
                                Back to My Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const statusInfo = STATUS_LABELS[project.status];

    return (
        <div className="project-details-container">
            <Header />
            <div className="project-details-content">
                <div className="project-details-wrapper">
                    {/* Back Navigation */}
                    <Link to="/my-projects" className="back-link">
                        <ArrowLeft size={18} />
                        Back to My Projects
                    </Link>

                    {/* Project Header */}
                    <div className="project-header">
                        <div className="project-header-main">
                            <h1 className="project-title">{project.name}</h1>
                            <div className="project-badges">
                                <span className="project-type-badge">
                                    {TYPE_LABELS[project.type]}
                                </span>
                                <span className={`project-status-badge ${statusInfo.className}`}>
                                    {statusInfo.label}
                                </span>
                            </div>
                        </div>
                        <p className="project-short-desc">{project.description}</p>
                    </div>

                    {/* Tabs */}
                    <div className="project-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                            onClick={() => setActiveTab('details')}
                        >
                            Details
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="overview-tab">
                                <div className="project-content-grid">
                                    <div className="project-main-content">
                                        {/* About Section */}
                                        <section className="details-section">
                                            <h2 className="section-title">About</h2>
                                            <p className="section-content">{project.longDescription}</p>
                                        </section>

                                        {/* Technologies Section */}
                                        <section className="details-section">
                                            <h2 className="section-title">Technologies</h2>
                                            <div className="tech-tags">
                                                {project.technologies.map((tech, index) => (
                                                    <span key={index} className="tech-tag">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Languages Section - GitHub Style */}
                                        <section className="details-section">
                                            <h2 className="section-title">Languages</h2>
                                            <div className="languages-bar">
                                                {project.languages.map((lang, index) => (
                                                    <div
                                                        key={index}
                                                        className="language-segment"
                                                        style={{
                                                            width: `${lang.percentage}%`,
                                                            backgroundColor: lang.color,
                                                        }}
                                                        title={`${lang.name}: ${lang.percentage}%`}
                                                    />
                                                ))}
                                            </div>
                                            <div className="languages-legend">
                                                {project.languages.map((lang, index) => (
                                                    <div key={index} className="language-item">
                                                        <span
                                                            className="language-dot"
                                                            style={{ backgroundColor: lang.color }}
                                                        />
                                                        <span className="language-name">{lang.name}</span>
                                                        <span className="language-percentage">{lang.percentage}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Team Section */}
                                        <section className="details-section">
                                            <h2 className="section-title">Team Members</h2>
                                            <div className="team-list">
                                                {project.teamMembers.map((member) => (
                                                    <div key={member.id} className="team-member">
                                                        <Link to={`/profile/${member.userId}`} className="member-avatar-link">
                                                            <div className="member-avatar">{member.avatar}</div>
                                                        </Link>
                                                        <div className="member-info">
                                                            <Link to={`/profile/${member.userId}`} className="member-name-link">
                                                                {member.name}
                                                            </Link>
                                                            <span className="member-role">{member.role}</span>
                                                        </div>
                                                        {member.rating && (
                                                            <div className="member-rating">
                                                                <Star size={14} className="star-filled" />
                                                                <span>{member.rating.toFixed(1)}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    {/* Sidebar */}
                                    <div className="project-sidebar">
                                        <div className="info-card">
                                            <h3 className="info-card-title">Project Info</h3>

                                            <div className="info-item">
                                                <Users size={16} />
                                                <span className="info-label">Team Size:</span>
                                                <span className="info-value">{project.teamSize}</span>
                                            </div>

                                            <div className="info-item">
                                                {project.workStyle === 'paid' ? <DollarSign size={16} /> : <Heart size={16} />}
                                                <span className="info-label">Work Style:</span>
                                                <span className={`info-value ${project.workStyle}`}>{project.workStyle === 'paid' ? 'Paid' : 'Volunteer'}</span>
                                            </div>

                                            <div className="info-item">
                                                <Calendar size={16} />
                                                <span className="info-label">Started:</span>
                                                <span className="info-value">{formatDate(project.startDate)}</span>
                                            </div>

                                            {project.endDate && (
                                                <div className="info-item">
                                                    <Calendar size={16} />
                                                    <span className="info-label">Completed:</span>
                                                    <span className="info-value">{formatDate(project.endDate)}</span>
                                                </div>
                                            )}

                                            <div className="info-item">
                                                <Clock size={16} />
                                                <span className="info-label">Updated:</span>
                                                <span className="info-value">{formatDate(project.createdAt)}</span>
                                            </div>
                                        </div>

                                        {(project.repoUrl || project.websiteUrl) && (
                                            <div className="info-card">
                                                <h3 className="info-card-title">Links</h3>
                                                {project.repoUrl && (
                                                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="link-item">
                                                        <Github size={16} />
                                                        <span>Repository</span>
                                                    </a>
                                                )}
                                                {project.websiteUrl && (
                                                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="link-item">
                                                        <Globe size={16} />
                                                        <span>Website</span>
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Details Tab */}
                        {activeTab === 'details' && (
                            <div className="details-tab">
                                {/* Budget Section - Only for paid projects */}
                                {project.workStyle === 'paid' && (
                                    <section className="details-section budget-section">
                                        <h2 className="section-title">
                                            <DollarSign size={20} />
                                            Budget Overview
                                        </h2>
                                        <div className="budget-cards">
                                            <div className="budget-card">
                                                <span className="budget-label">Monthly Budget</span>
                                                <span className="budget-value">${project.budget}</span>
                                                <span className="budget-type">/{project.budgetType}</span>
                                            </div>
                                            {project.totalBudget && (
                                                <div className="budget-card">
                                                    <span className="budget-label">Total Budget</span>
                                                    <span className="budget-value">${project.totalBudget}</span>
                                                </div>
                                            )}
                                            {project.spentBudget && (
                                                <div className="budget-card">
                                                    <span className="budget-label">Spent</span>
                                                    <span className="budget-value spent">${project.spentBudget}</span>
                                                    {project.totalBudget && (
                                                        <div className="budget-progress">
                                                            <div
                                                                className="budget-progress-bar"
                                                                style={{ width: `${(parseFloat(project.spentBudget) / parseFloat(project.totalBudget)) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {/* Deadlines Section */}
                                <section className="details-section">
                                    <h2 className="section-title">
                                        <Calendar size={20} />
                                        Deadlines & Milestones
                                    </h2>
                                    <div className="deadlines-table-container">
                                        <table className="deadlines-table">
                                            <thead>
                                                <tr>
                                                    <th>Task</th>
                                                    <th>Assignee</th>
                                                    <th>Due Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {project.deadlines.map((deadline) => {
                                                    const statusInfo = DEADLINE_STATUS[deadline.status];
                                                    return (
                                                        <tr key={deadline.id}>
                                                            <td className="deadline-title">{deadline.title}</td>
                                                            <td className="deadline-assignee">{deadline.assignee || '-'}</td>
                                                            <td className="deadline-date">{formatShortDate(deadline.dueDate)}</td>
                                                            <td>
                                                                <span className={`deadline-status ${statusInfo.className}`}>
                                                                    {statusInfo.icon}
                                                                    {statusInfo.label}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                {/* Project Timeline */}
                                <section className="details-section">
                                    <h2 className="section-title">
                                        <Clock size={20} />
                                        Project Timeline
                                    </h2>
                                    <div className="timeline-info">
                                        <div className="timeline-item">
                                            <span className="timeline-label">Start Date</span>
                                            <span className="timeline-value">{formatDate(project.startDate)}</span>
                                        </div>
                                        {project.endDate ? (
                                            <div className="timeline-item">
                                                <span className="timeline-label">End Date</span>
                                                <span className="timeline-value">{formatDate(project.endDate)}</span>
                                            </div>
                                        ) : (
                                            <div className="timeline-item">
                                                <span className="timeline-label">Status</span>
                                                <span className="timeline-value ongoing">Ongoing</span>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <div className="reviews-tab">
                                {/* Team Ratings Overview */}
                                <section className="details-section">
                                    <h2 className="section-title">
                                        Team Ratings
                                    </h2>
                                    <div className="team-ratings-grid">
                                        {project.teamMembers.map((member) => (
                                            <div key={member.id} className="rating-card">
                                                <div className="rating-card-header">
                                                    <div className="member-avatar large">{member.avatar}</div>
                                                    <div className="rating-card-info">
                                                        <span className="member-name">{member.name}</span>
                                                        <span className="member-role">{member.role}</span>
                                                    </div>
                                                </div>
                                                <div className="rating-card-content">
                                                    <div className="rating-stars">
                                                        {renderStars(member.rating || 0)}
                                                    </div>
                                                    <div className="rating-score">
                                                        <span className="score-value">{member.rating?.toFixed(1) || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Recent Reviews */}
                                <section className="details-section">
                                    <h2 className="section-title"> Reviews</h2>
                                    {project.reviews.length === 0 ? (
                                        <div className="empty-reviews">
                                            <p>No reviews yet for this project.</p>
                                        </div>
                                    ) : (
                                        <div className="reviews-list">
                                            {project.reviews.map((review) => (
                                                <div key={review.id} className="review-card">
                                                    <div className="review-header">
                                                        <div className="reviewer-info">
                                                            <div className="member-avatar small">{review.reviewerAvatar}</div>
                                                            <span className="reviewer-name">{review.reviewerName}</span>
                                                            <span className="review-arrow">→</span>
                                                            <span className="reviewee-name">{review.targetName}</span>
                                                        </div>
                                                        <div className="review-date">{formatShortDate(review.createdAt)}</div>
                                                    </div>
                                                    <div className="review-rating">
                                                        {renderStars(review.rating)}
                                                    </div>
                                                    <p className="review-comment">{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
