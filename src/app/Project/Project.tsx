import { useState } from 'react';
import Header from '../../components/Header';
import ProjectStepper from './components/ProjectStepper/ProjectStepper';
import ProjectStep1 from './components/ProjectStep1/ProjectStep1';
import ProjectStep2 from './components/ProjectStep2/ProjectStep2';
import './Project.css';

// Types for backend
export type TeamMemberRole = 'frontend' | 'backend' | 'cloud' | 'ml' | 'deeplearning' | 'specific';

export type TeamMember = {
    id: string;
    role: TeamMemberRole;
    technologies: string[];
    customRole?: string;
};

export type ProjectFormData = {
    projectName: string;
    description: string;
    teamSize: number;
    teamMembers: TeamMember[];
};

// Technology options per role
export const ROLE_TECHNOLOGIES: Record<TeamMemberRole, string[]> = {
    frontend: ['React', 'Vue', 'Angular', 'TypeScript', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML/CSS'],
    backend: ['Node.js', 'Python', 'Java', 'Go', '.NET', 'Spring Boot', 'Express.js', 'Django', 'FastAPI'],
    cloud: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
    ml: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter', 'Python', 'R'],
    deeplearning: ['TensorFlow', 'PyTorch', 'Keras', 'CUDA', 'OpenCV', 'Hugging Face', 'LangChain'],
    specific: [],
};

export const ROLE_LABELS: Record<TeamMemberRole, string> = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    cloud: 'Cloud/DevOps Engineer',
    ml: 'ML Engineer',
    deeplearning: 'Deep Learning Engineer',
    specific: 'Specific Role',
};

export default function Project() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<ProjectFormData>({
        projectName: '',
        description: '',
        teamSize: 0,
        teamMembers: [],
    });

    const handleStep1Complete = (data: { projectName: string; description: string }) => {
        setFormData(prev => ({ ...prev, ...data }));
        setCurrentStep(2);
    };

    const handleStep2Complete = (data: { teamSize: number; teamMembers: TeamMember[] }) => {
        const finalData = { ...formData, ...data };
        setFormData(finalData);

        // TODO: Send to backend
        console.log('Project Data:', finalData);

        // Move to step 3 or submit
        setCurrentStep(3);
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(1, prev - 1));
    };

    return (
        <div className="project-container">
            <Header />
            <div className="project-content">
                <div className="project-wizard">
                    {/* Step Indicator */}
                    <ProjectStepper currentStep={currentStep} totalSteps={3} />

                    {/* Step Content */}
                    <div className="wizard-content">
                        {currentStep === 1 && (
                            <ProjectStep1
                                initialData={{
                                    projectName: formData.projectName,
                                    description: formData.description,
                                }}
                                onComplete={handleStep1Complete}
                            />
                        )}

                        {currentStep === 2 && (
                            <ProjectStep2
                                initialData={{
                                    teamSize: formData.teamSize,
                                    teamMembers: formData.teamMembers,
                                }}
                                onComplete={handleStep2Complete}
                                onBack={handleBack}
                            />
                        )}

                        {currentStep === 3 && (
                            <div className="step-complete">
                                <h2>Project Created!</h2>
                                <p>Your project has been submitted successfully.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
