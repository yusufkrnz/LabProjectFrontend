import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Github, Linkedin, Globe, Edit2, CheckCircle, Plus, Mail, MessageCircle, X, Phone } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Header from '../../components/Header';
import { ProjectCard, type Project } from '../../components/ProjectCard';
import './UserProfile.css';

// Types for backend
type SkillArea = {
    name: string;
    level: number; // 0-100
};

type LanguageSkill = {
    name: string;
    level: number; // 0-100
};

type UserData = {
    id: string;
    name: string;
    username: string;
    title: string;
    bio: string;
    avatar: string;
    isVerified: boolean;
    location?: string;
    localTime?: string;
    website?: string;
    github?: string;
    linkedin?: string;
    email?: string;
    hourlyRate?: string;
    joinedDate: string;
    skillAreas: SkillArea[];
    languages: LanguageSkill[];
    projects: Project[];
};

// Mock user data - will be replaced with API
const MOCK_USER: UserData = {
    id: '1',
    name: 'Sait D.',
    username: 'saitd',
    title: 'Web Dev.',
    bio: "I'm a dedicated Computer Science student specializing in backend development, microservices, and cloud computing. I focus on architecting and building scalable, maintainable, and resilient server-side systems and APIs. My core motivation is solving complex engineering challenges by applying algorithmic thinking and developing elegant, efficient solutions.",
    avatar: 'https://ui-avatars.com/api/?name=Sait+D&background=3b82f6&color=fff',
    isVerified: false,
    location: 'Istanbul, Turkey',
    localTime: '9:25 am local time',
    website: 'saitdundar.dev',
    github: 'saitddundar',
    linkedin: 'saitdundar',
    email: 'sait@example.com',
    hourlyRate: '$20.00/hr',
    joinedDate: '2024-01-15',
    skillAreas: [
        { name: 'Frontend', level: 75 },
        { name: 'Backend', level: 92 },
        { name: 'Cloud', level: 78 },
        { name: 'Database', level: 85 },
        { name: 'DevOps', level: 60 },
        { name: 'Security', level: 55 }
    ],
    languages: [
        { name: 'TypeScript', level: 90 },
        { name: 'Go', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 65 },
        { name: 'Rust', level: 40 },
        { name: 'C++', level: 75 }
    ],
    projects: [
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
        }
    ]
};

// API Service - will connect to backend
const userService = {
    getUserById: async (id: string): Promise<UserData | null> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/users/${id}`);
        // return response.json();
        console.log('Fetching user:', id);
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_USER;
    },

    getCurrentUser: async (): Promise<UserData | null> => {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/users/me');
        // return response.json();
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_USER;
    },

    getUserProjects: async (userId: string): Promise<Project[]> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/users/${userId}/projects`);
        // return response.json();
        console.log('Fetching user projects:', userId);
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_USER.projects;
    },

    updateUserBio: async (userId: string, bio: string): Promise<boolean> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/users/${userId}/bio`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ bio })
        // });
        // return response.ok;
        console.log('Updating user bio:', userId, bio);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    },

    uploadAvatar: async (userId: string, file: File): Promise<string | null> => {
        // TODO: Replace with actual API call
        // const formData = new FormData();
        // formData.append('avatar', file);
        // const response = await fetch(`/api/users/${userId}/avatar`, {
        //     method: 'POST',
        //     body: formData
        // });
        // const data = await response.json();
        // return data.avatarUrl;
        console.log('Uploading avatar:', userId, file.name);
        await new Promise(resolve => setTimeout(resolve, 500));
        // Return a mock URL with the file preview
        return URL.createObjectURL(file);
    },

    getPhoneNumber: async (userId: string): Promise<string | null> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/users/${userId}/phone`);
        // const data = await response.json();
        // return data.phone;
        console.log('Getting phone number for user:', userId);
        await new Promise(resolve => setTimeout(resolve, 300));
        return '+90 555 123 4567';
    },

    updateUserTitle: async (userId: string, title: string): Promise<boolean> => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/users/${userId}/title`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title })
        // });
        // return response.ok;
        console.log('Updating user title:', userId, title);
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
};

type ProfileTab = 'general' | 'projects';

export default function UserProfile() {
    const [user, setUser] = useState<UserData | null>(null);
    const [activeTab, setActiveTab] = useState<ProfileTab>('general');
    const [showBioModal, setShowBioModal] = useState(false);
    const [editBio, setEditBio] = useState('');
    const [showTitleModal, setShowTitleModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        userService.getCurrentUser().then(setUser);
    }, []);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setIsUploadingAvatar(true);
        const newAvatarUrl = await userService.uploadAvatar(user.id, file);

        if (newAvatarUrl) {
            setUser(prev => prev ? { ...prev, avatar: newAvatarUrl } : null);
        }
        setIsUploadingAvatar(false);

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleGetNumber = async () => {
        if (!user) return;
        const phone = await userService.getPhoneNumber(user.id);
        if (phone) {
            alert(`Phone: ${phone}`);
        }
    };

    const handleEditBio = () => {
        if (user) {
            setEditBio(user.bio);
            setShowBioModal(true);
        }
    };

    const handleEditTitle = () => {
        if (user) {
            setEditTitle(user.title);
            setShowTitleModal(true);
        }
    };

    const handleSaveTitle = async () => {
        if (!user) return;

        setIsSaving(true);
        const success = await userService.updateUserTitle(user.id, editTitle);

        if (success) {
            setUser(prev => prev ? { ...prev, title: editTitle } : null);
            setShowTitleModal(false);
        }
        setIsSaving(false);
    };

    const handleSaveBio = async () => {
        if (!user) return;

        setIsSaving(true);
        const success = await userService.updateUserBio(user.id, editBio);

        if (success) {
            setUser(prev => prev ? { ...prev, bio: editBio } : null);
            setShowBioModal(false);
        }
        setIsSaving(false);
    };

    if (!user) {
        return (
            <div className="profile-page">
                <Header />
            </div>
        );
    }

    // Prepare radar chart data
    const skillAreasData = user.skillAreas.map(skill => ({
        subject: skill.name,
        value: skill.level,
        fullMark: 100
    }));

    const languagesData = user.languages.map(lang => ({
        subject: lang.name,
        value: lang.level,
        fullMark: 100
    }));

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-container">
                {/* Profile Header */}
                <div className="profile-header-bar">
                    <div className="profile-header-left">
                        <div className="profile-avatar-wrapper">
                            <img src={user.avatar} alt={user.name} className="profile-avatar-img" />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarUpload}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <button
                                className="avatar-edit-btn"
                                onClick={handleAvatarClick}
                                disabled={isUploadingAvatar}
                            >
                                <Edit2 size={14} />
                            </button>
                        </div>
                        <div className="profile-header-info">
                            <div className="profile-name-row">
                                <h1>{user.name}</h1>
                            </div>
                            <div className="profile-location-row">
                                <MapPin size={14} />
                                <span>{user.location}</span>
                                <span className="separator">–</span>
                                <Clock size={14} />
                                <span>{user.localTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-header-right">
                        <Link to="/settings" className="btn-primary-blue">Profile settings</Link>
                    </div>
                </div>

                {/* Main Layout */}
                <div className="profile-layout">
                    {/* Left Sidebar */}
                    <aside className="profile-sidebar">
                        {/* Links Card */}
                        <div className="sidebar-card">
                            <h3>Links</h3>
                            <div className="social-links">
                                {user.github && (
                                    <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <Github size={16} />
                                        <span>{user.github}</span>
                                    </a>
                                )}
                                {user.linkedin && (
                                    <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <Linkedin size={16} />
                                        <span>{user.linkedin}</span>
                                    </a>
                                )}
                                {user.website && (
                                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <Globe size={16} />
                                        <span>{user.website}</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="sidebar-card">
                            <h3>Contact</h3>
                            <div className="contact-options">
                                {user.email && (
                                    <a href={`mailto:${user.email}`} className="contact-btn">
                                        <Mail size={16} />
                                        <span>Send Email</span>
                                    </a>
                                )}
                                <button onClick={handleGetNumber} className="contact-btn">
                                    <Phone size={16} />
                                    <span>Get Number</span>
                                </button>
                                <Link to={`/messages?user=${user.username}`} className="contact-btn">
                                    <MessageCircle size={16} />
                                    <span>Send a Message</span>
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="profile-main">
                        {/* Title & Rate Section */}
                        <section className="content-card title-card">
                            <div className="title-row">
                                <div className="title-info">
                                    <h2>{user.title}</h2>
                                    <button className="edit-btn" onClick={handleEditTitle}><Edit2 size={14} /></button>
                                </div>
                                <div className="rate-info">
                                    <span className="hourly-rate">{user.hourlyRate}</span>
                                    <button className="edit-btn"><Edit2 size={14} /></button>
                                </div>
                            </div>
                        </section>

                        {/* Tabs Section - Separate */}
                        <div className="profile-tabs-container">
                            <button
                                className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                                onClick={() => setActiveTab('general')}
                            >
                                General
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                                onClick={() => setActiveTab('projects')}
                            >
                                Projects
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'general' && (
                            <>
                                {/* About Section */}
                                <section className="content-card">
                                    <div className="card-header">
                                        <h3>Who Am I?</h3>
                                        <button className="edit-btn" onClick={handleEditBio}>
                                            <Edit2 size={14} />
                                        </button>
                                    </div>
                                    <p className="bio-text">{user.bio}</p>
                                </section>

                                {/* Skills Radar Charts - No Edit Button */}
                                <section className="content-card">
                                    <div className="card-header">
                                        <h3>Skills Overview</h3>
                                    </div>
                                    <div className="radar-charts-row">
                                        {/* Skill Areas Radar */}
                                        <div className="radar-chart-container">
                                            <h4>Skill Areas</h4>
                                            <ResponsiveContainer width="100%" height={280}>
                                                <RadarChart data={skillAreasData}>
                                                    <PolarGrid stroke="#e5e7eb" />
                                                    <PolarAngleAxis
                                                        dataKey="subject"
                                                        tick={{ fontSize: 12, fill: '#4b5563' }}
                                                    />
                                                    <PolarRadiusAxis
                                                        angle={30}
                                                        domain={[0, 100]}
                                                        tick={{ fontSize: 10, fill: '#9ca3af' }}
                                                    />
                                                    <Radar
                                                        name="Skill Level"
                                                        dataKey="value"
                                                        stroke="#3b82f6"
                                                        fill="#3b82f6"
                                                        fillOpacity={0.3}
                                                        strokeWidth={2}
                                                    />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>

                                        {/* Languages Radar */}
                                        <div className="radar-chart-container">
                                            <h4>Languages</h4>
                                            <ResponsiveContainer width="100%" height={280}>
                                                <RadarChart data={languagesData}>
                                                    <PolarGrid stroke="#e5e7eb" />
                                                    <PolarAngleAxis
                                                        dataKey="subject"
                                                        tick={{ fontSize: 12, fill: '#4b5563' }}
                                                    />
                                                    <PolarRadiusAxis
                                                        angle={30}
                                                        domain={[0, 100]}
                                                        tick={{ fontSize: 10, fill: '#9ca3af' }}
                                                    />
                                                    <Radar
                                                        name="Proficiency"
                                                        dataKey="value"
                                                        stroke="#3b82f6"
                                                        fill="#3b82f6"
                                                        fillOpacity={0.3}
                                                        strokeWidth={2}
                                                    />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        {activeTab === 'projects' && (
                            <section className="content-card projects-section">
                                <div className="card-header">
                                    <h3>My Projects</h3>
                                    <Link to="/project" className="new-project-btn">
                                        <Plus size={16} />
                                        New
                                    </Link>
                                </div>
                                <div className="projects-list">
                                    {user.projects.length === 0 ? (
                                        <div className="empty-state">
                                            <p>No projects yet</p>
                                            <Link to="/project" className="create-first-btn">
                                                Create your first project
                                            </Link>
                                        </div>
                                    ) : (
                                        user.projects.map(project => (
                                            <ProjectCard key={project.id} project={project} />
                                        ))
                                    )}
                                </div>
                            </section>
                        )}
                    </main>
                </div>
            </div>

            {/* Edit Bio Modal */}
            {showBioModal && (
                <div className="modal-overlay" onClick={() => setShowBioModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Edit Bio</h3>
                            <button className="modal-close" onClick={() => setShowBioModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="bio-textarea">Who Am I?</label>
                            <textarea
                                id="bio-textarea"
                                value={editBio}
                                onChange={(e) => setEditBio(e.target.value)}
                                placeholder="Tell us about yourself..."
                                rows={6}
                                maxLength={1000}
                            />
                            <span className="char-count">{editBio.length} / 1000</span>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn modal-btn-secondary" onClick={() => setShowBioModal(false)}>
                                Cancel
                            </button>
                            <button
                                className="modal-btn modal-btn-primary"
                                onClick={handleSaveBio}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Title Modal */}
            {showTitleModal && (
                <div className="modal-overlay" onClick={() => setShowTitleModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Edit Title</h3>
                            <button className="modal-close" onClick={() => setShowTitleModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="title-input">Your Title</label>
                            <input
                                type="text"
                                id="title-input"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="e.g. Full Stack Developer"
                                maxLength={50}
                                className="modal-input"
                            />
                            <span className="char-count">{editTitle.length} / 50</span>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-btn modal-btn-secondary" onClick={() => setShowTitleModal(false)}>
                                Cancel
                            </button>
                            <button
                                className="modal-btn modal-btn-primary"
                                onClick={handleSaveTitle}
                                disabled={isSaving || !editTitle.trim()}
                            >
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}