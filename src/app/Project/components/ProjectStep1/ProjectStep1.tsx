import { useState } from 'react';
import { Github } from 'lucide-react';
import './ProjectStep1.css';

type ProjectStep1Props = {
    initialData: {
        projectName: string;
        description: string;
        about?: string;
        githubRepo?: string;
    };
    onComplete: (data: { projectName: string; description: string; about?: string; githubRepo?: string }) => void;
};

const MAX_DESCRIPTION_LENGTH = 150;
const MAX_ABOUT_LENGTH = 1000;

export default function ProjectStep1({ initialData, onComplete }: ProjectStep1Props) {
    const [projectName, setProjectName] = useState(initialData.projectName);
    const [description, setDescription] = useState(initialData.description);
    const [about, setAbout] = useState(initialData.about || '');
    const [githubRepo, setGithubRepo] = useState(initialData.githubRepo || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (projectName.trim()) {
            onComplete({
                projectName: projectName.trim(),
                description: description.trim(),
                about: about.trim() || undefined,
                githubRepo: githubRepo.trim() || undefined
            });
        }
    };

    const isValidGithubUrl = (url: string) => {
        if (!url) return true; // Empty is valid (optional field)
        const githubPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
        return githubPattern.test(url);
    };

    const showGithubError = !!githubRepo && !isValidGithubUrl(githubRepo);

    return (
        <form className="step1-form" onSubmit={handleSubmit}>
            <div className="step-header">
                <h2>Create a new project</h2>
                <p>Tell us about your project and what you're looking to build.</p>
            </div>

            <div className="form-section">
                <div className="section-number">1</div>
                <div className="section-content">
                    <h3>General</h3>

                    <div className="form-group">
                        <label htmlFor="projectName">
                            Project name <span className="required">*</span>
                        </label>
                        <input
                            id="projectName"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Enter project name"
                            required
                        />
                        <span className="input-hint">
                            Great project names are short and memorable.
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                            Description <span className="required">*</span>
                        </label>
                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
                            placeholder="A short description of your project"
                        />
                        <span className="char-count">
                            {description.length} / {MAX_DESCRIPTION_LENGTH} characters
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="about">About</label>
                        <textarea
                            id="about"
                            value={about}
                            onChange={(e) => setAbout(e.target.value.slice(0, MAX_ABOUT_LENGTH))}
                            placeholder="Provide a detailed description of your project. What problem does it solve? What technologies will you use? What are your goals?"
                            rows={6}
                        />
                        <span className="char-count">
                            {about.length} / {MAX_ABOUT_LENGTH} characters
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="githubRepo">
                            <Github size={16} className="label-icon" />
                            GitHub Repository
                        </label>
                        <input
                            id="githubRepo"
                            type="url"
                            value={githubRepo}
                            onChange={(e) => setGithubRepo(e.target.value)}
                            placeholder="https://github.com/username/repository"
                            className={showGithubError ? 'input-error' : ''}
                        />
                        {showGithubError ? (
                            <span className="input-error-text">
                                Please enter a valid GitHub repository URL
                            </span>
                        ) : (
                            <span className="input-hint">
                                Optional. Link your existing GitHub repository.
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={!projectName.trim() || !description.trim() || showGithubError}
                >
                    Continue
                </button>
            </div>
        </form>
    );
}


