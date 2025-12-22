import { useState } from 'react';
import './ProjectStep1.css';

type ProjectStep1Props = {
    initialData: {
        projectName: string;
        description: string;
    };
    onComplete: (data: { projectName: string; description: string }) => void;
};

const MAX_DESCRIPTION_LENGTH = 350;

export default function ProjectStep1({ initialData, onComplete }: ProjectStep1Props) {
    const [projectName, setProjectName] = useState(initialData.projectName);
    const [description, setDescription] = useState(initialData.description);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (projectName.trim()) {
            onComplete({ projectName: projectName.trim(), description: description.trim() });
        }
    };

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
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESCRIPTION_LENGTH))}
                            placeholder="Describe your project..."
                            rows={4}
                        />
                        <span className="char-count">
                            {description.length} / {MAX_DESCRIPTION_LENGTH} characters
                        </span>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={!projectName.trim()}>
                    Continue
                </button>
            </div>
        </form>
    );
}
