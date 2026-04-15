import { type Project } from '../../components/ProjectCard';

// Types for backend
export type SkillArea = {
    name: string;
    level: number; // 0-100
};

export type LanguageSkill = {
    name: string;
    level: number; // 0-100
};

export type UserData = {
    id: string;
    name: string;
    username: string;
    title: string;
    bio: string;
    readme?: string;
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

// Mock user data
export const MOCK_USER: UserData = {
    id: '1',
    name: 'Sait D.',
    username: 'saitd',
    title: 'Web Dev.',
    bio: "I'm a dedicated Computer Science student specializing in backend development, microservices, and cloud computing. I focus on architecting and building scalable, maintainable, and resilient server-side systems and APIs. My core motivation is solving complex engineering challenges by applying algorithmic thinking and developing elegant, efficient solutions.",
    readme: `# Hello, I'm Sait D! 👋
    
I'm a passionate **Computer Science student** and **Backend Developer** based in Istanbul. I love building scalable systems and solving complex problems.

## 🛠 Tech Stack

- **Languages:** TypeScript, Go, Python, Java, Rust
- **Backend:** NestJS, Express, Gin, Django
- **Database:** PostgreSQL, MongoDB, Redis
- **DevOps:** Docker, Kubernetes, AWS

## 🚀 What I'm Working On

Currently, I'm working on a blockchain-based document verification system called **Crypto Seal**. It uses smart contracts to verify the authenticity of documents.

## 📫 Get in Touch

Feel free to reach out to me for collaborations!`,
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
            languages: [
                { name: 'Go', percentage: 60, color: '#00ADD8' },
                { name: 'Solidity', percentage: 40, color: '#363636' }
            ],
            technologies: ['Blockchain', 'Smart Contracts'],
            teamMembers: [
                { name: 'Sait D.', role: 'Backend', avatar: '', rating: 5, initials: 'SD' },
                { name: 'Alex M.', role: 'Frontend', avatar: '', rating: 4, initials: 'AM' }
            ],
            createdAt: '2024-12-20',
            status: 'active',
            reviewCount: 5,
            rating: 4.8,
            githubUrl: 'https://github.com/saitd/crypto-seal'
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
            languages: [
                { name: 'TypeScript', percentage: 70, color: '#3178C6' },
                { name: 'React', percentage: 30, color: '#61DAFB' }
            ],
            technologies: ['React', 'Redux', 'Material UI'],
            teamMembers: [
                { name: 'Sait D.', role: 'Frontend', avatar: '', rating: 5, initials: 'SD' },
                { name: 'Sarah L.', role: 'Design', avatar: '', rating: 5, initials: 'SL' }
            ],
            createdAt: '2024-12-15',
            status: 'active',
            reviewCount: 8,
            rating: 4.9
        },
        {
            id: '3',
            name: 'ML Image Classifier',
            description: 'Deep learning model for image classification using TensorFlow and Python.',
            type: 'academic',
            workStyle: 'volunteer',
            teamSize: 2,
            languages: [
                { name: 'Python', percentage: 100, color: '#3776AB' }
            ],
            technologies: ['TensorFlow', 'Keras', 'OpenCV'],
            teamMembers: [
                { name: 'Sait D.', role: 'ML Eng', avatar: '', rating: 5, initials: 'SD' }
            ],
            createdAt: '2024-11-28',
            status: 'completed',
            reviewCount: 3,
            rating: 5.0
        }
    ]
};
