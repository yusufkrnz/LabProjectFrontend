import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Plus, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Header from '../../components/Header';
import { ProjectCard } from '../../components/ProjectCard';
import './UserProfile.css';

import { type UserData } from './mockData';

import { userService } from './userService';
import ProfileBadge from './components/ProfileBadge/ProfileBadge';

type ProfileTab = 'general' | 'projects';

export default function UserProfile() {
    const [user, setUser] = useState<UserData | null>(null);
    const [activeTab, setActiveTab] = useState<ProfileTab>('general');
    const [showReadmeModal, setShowReadmeModal] = useState(false);
    const [editReadme, setEditReadme] = useState('');
    const [showTitleModal, setShowTitleModal] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        userService.getCurrentUser().then(setUser);
    }, []);





    const handleSaveField = async (
        apiCall: (id: string, value: string) => Promise<boolean>,
        field: keyof UserData,
        value: string,
        closeModal: () => void
    ) => {
        if (!user) return;
        setIsSaving(true);
        const success = await apiCall(user.id, value);
        if (success) {
            setUser(prev => prev ? { ...prev, [field]: value } : null);
            closeModal();
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



    return (
        <div className="profile-page">
            <Header />
            <div className="profile-container">
                {/* Main Layout */}
                <div className="profile-layout">
                    {/* Left Sidebar - Bento Card */}
                    {/* Left Sidebar - Celsior Style Card */}
                    <aside className="profile-sidebar">
                        <ProfileBadge user={user} />

                    </aside >

                    {/* Main Content */}
                    < main className="profile-main" >


                        {/* Tabs Section - Separate */}
                        < div className="profile-tabs-container" >
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
                        </div >

                        {/* Tab Content */}
                        {
                            activeTab === 'general' && (
                                <>
                                    {/* About / Readme Section */}
                                    <section className="content-card">
                                        <div className="card-header">
                                            <h3>About Me</h3>
                                            <button
                                                className="edit-btn"
                                                onClick={() => {
                                                    setEditReadme(user.readme || '');
                                                    setShowReadmeModal(true);
                                                }}
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                        </div>
                                        <div className="markdown-content">
                                            {user.readme ? (
                                                <ReactMarkdown>{user.readme}</ReactMarkdown>
                                            ) : (
                                                <p className="empty-text">Write something about yourself...</p>
                                            )}
                                        </div>
                                    </section>


                                </>
                            )
                        }

                        {
                            activeTab === 'projects' && (
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
                            )
                        }
                    </main >


                </div >
            </div >



            {/* Edit Title Modal */}
            {
                showTitleModal && (
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
                                    onClick={() => handleSaveField(userService.updateUserTitle, 'title', editTitle, () => setShowTitleModal(false))}
                                    disabled={isSaving || !editTitle.trim()}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Edit Readme Modal */}
            {
                showReadmeModal && (
                    <div className="modal-overlay" onClick={() => setShowReadmeModal(false)}>
                        <div className="modal-content large-modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Edit About Me</h3>
                                <button className="modal-close" onClick={() => setShowReadmeModal(false)}>
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="markdown-editor-container">
                                    <label htmlFor="readme-textarea">Markdown Supported</label>
                                    <textarea
                                        id="readme-textarea"
                                        value={editReadme}
                                        onChange={(e) => setEditReadme(e.target.value)}
                                        placeholder="# Hello world..."
                                        rows={15}
                                        className="markdown-textarea"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="modal-btn modal-btn-secondary" onClick={() => setShowReadmeModal(false)}>
                                    Cancel
                                </button>
                                <button
                                    className="modal-btn modal-btn-primary"
                                    onClick={() => handleSaveField(userService.updateUserReadme, 'readme', editReadme, () => setShowReadmeModal(false))}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}