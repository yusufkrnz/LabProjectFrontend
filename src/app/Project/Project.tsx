import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '../../components/Header';
import ProjectStepper from './components/ProjectStepper/ProjectStepper';
import ProjectStep1 from './components/ProjectStep1/ProjectStep1';
import ProjectStep2 from './components/ProjectStep2/ProjectStep2';
import ProjectStep3 from './components/ProjectStep3/ProjectStep3';
import ProjectStep4 from './components/ProjectStep4/ProjectStep4';
import './Project.css';

// Types for backend
export type TeamMemberRole =
    | 'frontend'
    | 'backend'
    | 'mobile'
    | 'cloud'
    | 'ml'
    | 'deeplearning'
    | 'cybersecurity'
    | 'qa'
    | 'data'
    | 'blockchain'
    | 'gamedev'
    | 'embedded'
    | 'specific';

export type TeamMember = {
    id: string;
    role: TeamMemberRole;
    languages: string[];
    frameworks: string[];
    databases: string[];
    cloudTech: string[];
    tools: string[];
    customRole?: string;
};

export type ProjectFormData = {
    projectName: string;
    description: string;
    teamSize: number;
    teamMembers: TeamMember[];
    projectType: string;
    workStyle: string;
    budget?: string;
    budgetType?: string;
};

// Which categories to show per role
export type TechCategory = 'languages' | 'databases' | 'cloudTech' | 'tools';

export const ROLE_CATEGORIES: Record<TeamMemberRole, TechCategory[]> = {
    frontend: ['languages', 'tools'],
    backend: ['languages', 'databases', 'tools'],
    mobile: ['languages', 'databases', 'tools'],
    cloud: ['languages', 'cloudTech', 'tools'],
    ml: ['languages', 'databases', 'tools'],
    deeplearning: ['languages', 'tools'],
    cybersecurity: ['languages', 'tools'],
    qa: ['languages', 'tools'],
    data: ['languages', 'databases', 'tools'],
    blockchain: ['languages', 'tools'],
    gamedev: ['languages', 'tools'],
    embedded: ['languages', 'tools'],
    specific: ['languages'],
};

export const CATEGORY_LABELS: Record<TechCategory, string> = {
    languages: 'Languages & Frameworks',
    databases: 'Databases',
    cloudTech: 'Cloud & DevOps',
    tools: 'Tools & Technologies',
};

// Programming Languages per role
export const ROLE_LANGUAGES: Record<TeamMemberRole, string[]> = {
    frontend: ['JavaScript', 'TypeScript', 'HTML/CSS', 'SASS/SCSS'],
    backend: ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C#', 'PHP', 'Ruby', 'Rust', 'Kotlin'],
    mobile: ['Swift', 'Kotlin', 'Dart', 'JavaScript', 'TypeScript', 'Java', 'Objective-C'],
    cloud: ['Python', 'Go', 'Bash', 'JavaScript', 'TypeScript', 'Rust'],
    ml: ['Python', 'R', 'Julia', 'Scala', 'Java'],
    deeplearning: ['Python', 'C++', 'Julia', 'CUDA'],
    cybersecurity: ['Python', 'C', 'C++', 'Bash', 'PowerShell', 'Go', 'Rust', 'Assembly'],
    qa: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'Ruby'],
    data: ['Python', 'SQL', 'R', 'Scala', 'Java', 'Julia'],
    blockchain: ['Solidity', 'Rust', 'Go', 'JavaScript', 'TypeScript', 'Python', 'C++'],
    gamedev: ['C++', 'C#', 'JavaScript', 'Python', 'Lua', 'GDScript', 'Rust'],
    embedded: ['C', 'C++', 'Rust', 'Assembly', 'Python', 'MicroPython'],
    specific: [],
};

// Frameworks per language
export const LANGUAGE_FRAMEWORKS: Record<string, string[]> = {
    // JavaScript Frameworks
    'JavaScript': ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Express.js', 'Nest.js', 'Electron', 'Three.js', 'Node.js'],
    'TypeScript': ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js', 'Express.js', 'Nest.js', 'Deno', 'tRPC'],

    // Python Frameworks
    'Python': ['Django', 'Flask', 'FastAPI', 'Pyramid', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'Selenium', 'Pytest', 'Scrapy', 'Celery'],

    // Java Frameworks
    'Java': ['Spring Boot', 'Spring MVC', 'Jakarta EE', 'Hibernate', 'Maven', 'Gradle', 'JUnit', 'Apache Kafka', 'Android SDK', 'Selenium'],

    // Go Frameworks
    'Go': ['Gin', 'Echo', 'Fiber', 'Beego', 'Buffalo', 'Chi', 'gRPC', 'Cobra', 'Kubernetes SDK'],

    // C# Frameworks
    'C#': ['.NET Core', 'ASP.NET', 'Entity Framework', 'Blazor', 'Unity', 'Xamarin', 'MAUI', 'NUnit', 'xUnit'],

    // PHP Frameworks
    'PHP': ['Laravel', 'Symfony', 'CodeIgniter', 'Yii', 'CakePHP', 'Slim', 'WordPress', 'Drupal'],

    // Ruby Frameworks
    'Ruby': ['Ruby on Rails', 'Sinatra', 'Hanami', 'RSpec', 'Capybara', 'Sidekiq'],

    // Rust Frameworks
    'Rust': ['Actix Web', 'Rocket', 'Axum', 'Tokio', 'Warp', 'Tauri', 'Bevy', 'Solana SDK'],

    // Kotlin Frameworks
    'Kotlin': ['Ktor', 'Spring Boot', 'Android Jetpack', 'Compose', 'Exposed', 'Arrow'],

    // Swift Frameworks
    'Swift': ['SwiftUI', 'UIKit', 'Combine', 'Vapor', 'RxSwift', 'Alamofire', 'Core Data'],

    // Dart Frameworks
    'Dart': ['Flutter', 'AngularDart', 'Aqueduct', 'Shelf'],

    // Mobile specific
    'Objective-C': ['UIKit', 'Core Data', 'AFNetworking', 'Realm'],

    // Data Science & ML
    'R': ['Shiny', 'ggplot2', 'dplyr', 'tidyverse', 'caret', 'mlr3'],
    'Julia': ['Flux.jl', 'MLJ.jl', 'DataFrames.jl', 'Pluto.jl', 'Genie.jl'],
    'Scala': ['Apache Spark', 'Akka', 'Play Framework', 'Cats', 'ZIO'],

    // Low-level & Systems
    'C': ['GTK', 'SDL', 'OpenGL', 'POSIX', 'FreeRTOS', 'Zephyr'],
    'C++': ['Qt', 'Boost', 'OpenCV', 'Unreal Engine', 'SFML', 'SDL2', 'CUDA', 'OpenGL', 'Vulkan'],
    'CUDA': ['cuDNN', 'TensorRT', 'Thrust', 'cuBLAS'],
    'Assembly': ['NASM', 'MASM', 'GAS'],

    // Scripting
    'Bash': ['Shell Scripting', 'AWK', 'sed', 'Ansible'],
    'PowerShell': ['PowerShell DSC', 'Pester', 'PSScriptAnalyzer'],

    // Blockchain
    'Solidity': ['Hardhat', 'Truffle', 'OpenZeppelin', 'Foundry', 'Ethers.js', 'Web3.js'],

    // Game Development
    'Lua': ['LÖVE', 'Corona SDK', 'Defold', 'Roblox'],
    'GDScript': ['Godot Engine'],

    // Embedded
    'MicroPython': ['MicroPython Libraries', 'CircuitPython'],

    // Styling
    'HTML/CSS': ['Bootstrap', 'Tailwind CSS', 'Material UI', 'Chakra UI', 'Ant Design', 'Bulma', 'Foundation'],
    'SASS/SCSS': ['Bootstrap', 'Tailwind CSS', 'Compass', 'Bourbon'],

    // SQL
    'SQL': [],
};

// Databases per role
export const ROLE_DATABASES: Record<TeamMemberRole, string[]> = {
    frontend: [],
    backend: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'MariaDB', 'Oracle', 'SQL Server', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'Firebase', 'Supabase'],
    mobile: ['SQLite', 'Realm', 'Firebase', 'CoreData', 'Room'],
    cloud: [],
    ml: ['PostgreSQL', 'MongoDB', 'InfluxDB', 'TimescaleDB', 'Pinecone', 'Weaviate', 'ChromaDB'],
    deeplearning: [],
    cybersecurity: [],
    qa: [],
    data: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra', 'ClickHouse', 'Snowflake', 'BigQuery', 'Redshift', 'Apache Hive', 'Delta Lake'],
    blockchain: [],
    gamedev: [],
    embedded: [],
    specific: [],
};

// Cloud & DevOps technologies per role
export const ROLE_CLOUD_TECH: Record<TeamMemberRole, string[]> = {
    frontend: [],
    backend: [],
    mobile: [],
    cloud: ['AWS', 'Azure', 'Google Cloud', 'Alibaba Cloud', 'DigitalOcean', 'Heroku', 'Vercel', 'Netlify', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD', 'Prometheus', 'Grafana', 'ELK Stack', 'Nginx', 'Apache', 'Cloudflare'],
    ml: [],
    deeplearning: [],
    cybersecurity: [],
    qa: [],
    data: [],
    blockchain: [],
    gamedev: [],
    embedded: [],
    specific: [],
};

// Tools & Technologies per role
export const ROLE_TOOLS: Record<TeamMemberRole, string[]> = {
    frontend: ['Webpack', 'Vite', 'Parcel', 'ESLint', 'Prettier', 'Babel', 'npm', 'yarn', 'pnpm', 'Storybook'],
    backend: ['Maven', 'Gradle', 'Grafana', 'Prometheus', 'RabbitMQ', 'Apache Kafka', 'Nginx', 'Apache', 'Redis', 'Docker', 'Postman', 'Swagger', 'GraphQL', 'REST API', 'gRPC', 'WebSocket'],
    mobile: ['Xcode', 'Android Studio', 'Expo', 'Fastlane', 'TestFlight', 'Firebase', 'Crashlytics'],
    cloud: ['Linux', 'Ubuntu', 'CentOS', 'RedHat', 'Helm', 'Istio', 'Vault', 'Consul', 'Terraform', 'Pulumi'],
    ml: ['Jupyter', 'Google Colab', 'MLflow', 'Weights & Biases', 'DVC', 'Kubeflow', 'Apache Airflow', 'Feature Store'],
    deeplearning: ['NVIDIA GPU', 'TPU', 'AWS SageMaker', 'Google Colab', 'Weights & Biases', 'MLflow', 'Jupyter', 'TensorBoard', 'ONNX'],
    cybersecurity: ['Linux', 'Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite', 'Nmap', 'OWASP ZAP', 'Nessus', 'Snort', 'Splunk', 'Hashcat', 'John the Ripper'],
    qa: ['Selenium', 'Cypress', 'Playwright', 'Jest', 'Mocha', 'JMeter', 'Postman', 'Appium', 'TestRail', 'BrowserStack', 'SonarQube', 'Allure'],
    data: ['Apache Airflow', 'Apache Kafka', 'Apache Spark', 'Apache Flink', 'dbt', 'Tableau', 'Power BI', 'Looker', 'Metabase', 'Prefect', 'Dagster', 'Great Expectations', 'Fivetran', 'Airbyte'],
    blockchain: ['MetaMask', 'Remix IDE', 'Ganache', 'Infura', 'Alchemy', 'TheGraph', 'IPFS', 'Chainlink', 'Moralis'],
    gamedev: ['Unity', 'Unreal Engine', 'Godot', 'Blender', 'Maya', 'Photoshop', 'Aseprite', 'FMOD', 'Wwise'],
    embedded: ['Arduino', 'Raspberry Pi', 'ESP32', 'STM32', 'PlatformIO', 'JTAG', 'Logic Analyzer', 'Oscilloscope', 'FreeRTOS', 'Zephyr'],
    specific: [],
};

export const ROLE_LABELS: Record<TeamMemberRole, string> = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    mobile: 'Mobile Developer',
    cloud: 'Cloud/DevOps Engineer',
    ml: 'Machine Learning Engineer',
    deeplearning: 'Deep Learning Engineer',
    cybersecurity: 'Cybersecurity Specialist',
    qa: 'QA/Test Engineer',
    data: 'Data Engineer',
    blockchain: 'Blockchain Developer',
    gamedev: 'Game Developer',
    embedded: 'Embedded Systems Engineer',
    specific: 'Specific Role',
};

export default function Project() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<ProjectFormData>({
        projectName: '',
        description: '',
        teamSize: 1,
        teamMembers: [],
        projectType: '',
        workStyle: '',
        budget: '',
        budgetType: '',
    });

    // Browser back button support
    useEffect(() => {
        // Push initial state
        window.history.replaceState({ step: currentStep }, '', `?step=${currentStep}`);
    }, []);

    useEffect(() => {
        // Update URL when step changes (but not on initial load)
        if (currentStep > 1) {
            window.history.pushState({ step: currentStep }, '', `?step=${currentStep}`);
        }
    }, [currentStep]);

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state?.step) {
                setCurrentStep(event.state.step);
            } else {
                setCurrentStep(1);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleStep1Complete = (data: { projectName: string; description: string }) => {
        setFormData(prev => ({ ...prev, ...data }));
        setCurrentStep(2);
    };

    const handleStep2Complete = (data: { teamSize: number; teamMembers: TeamMember[] }) => {
        setFormData(prev => ({ ...prev, ...data }));
        setCurrentStep(3);
    };

    const handleStep3Complete = (data: { projectType: string; workStyle: string; budget?: string; budgetType?: string }) => {
        setFormData(prev => ({ ...prev, ...data }));
        setCurrentStep(4);
    };

    const handleStep4Complete = () => {
        // TODO: Send to backend
        console.log('Project Data for Backend:', formData);

        // Move to success step
        setCurrentStep(5);
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
                    <ProjectStepper currentStep={currentStep} totalSteps={5} />

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
                            <ProjectStep3
                                initialData={{
                                    projectType: formData.projectType,
                                    workStyle: formData.workStyle,
                                    budget: formData.budget,
                                    budgetType: formData.budgetType,
                                }}
                                onComplete={handleStep3Complete}
                                onBack={handleBack}
                            />
                        )}

                        {currentStep === 4 && (
                            <ProjectStep4
                                formData={formData}
                                onComplete={handleStep4Complete}
                                onBack={handleBack}
                            />
                        )}

                        {currentStep === 5 && (
                            <div className="step-complete">
                                <div className="success-icon">
                                    <CheckCircle size={64} />
                                </div>
                                <h2>Project Created!</h2>
                                <p>Your project has been submitted successfully.</p>
                                <Link to="/dashboard" className="view-project-btn">
                                    View Project
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
