/**
 * Kullanıcı Profili Tipleri
 * GitHub tabanlı match-making platformu için kapsamlı profil yapısı
 */

// Kullanıcı Rolleri
export type UserRole = 
  | 'developer'        // Yazılımcı/Geliştirici
  | 'employer'         // İşveren/Patron
  | 'freelancer'       // Freelancer
  | 'learner';         // Kendini Geliştirmek İsteyen

// Cinsiyet
export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';

// Deneyim Seviyesi
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Çalışma Modeli
export type WorkModel = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';

// Lokasyon (Dil desteği için)
export type Location = {
  country: string;
  city: string;
  timezone: string;
  preferredLanguage: 'tr' | 'en' | 'both';
};

// Frontend Teknolojileri
export interface FrontendStack {
  frameworks: string[];        // React, Vue, Angular, Next.js, etc.
  languages: string[];         // TypeScript, JavaScript, etc.
  styling: string[];           // CSS, Tailwind, Styled Components, etc.
  stateManagement: string[];   // Redux, Zustand, Context API, etc.
  testing: string[];           // Jest, React Testing Library, etc.
  buildTools: string[];        // Vite, Webpack, etc.
  experienceLevel: ExperienceLevel;
}

// Backend Teknolojileri
export interface BackendStack {
  languages: string[];         // Node.js, Python, Java, Go, Rust, etc.
  frameworks: string[];         // Express, Django, Spring, FastAPI, etc.
  apis: string[];               // REST, GraphQL, gRPC, etc.
  authentication: string[];     // JWT, OAuth, Passport, etc.
  experienceLevel: ExperienceLevel;
}

// Database Teknolojileri
export interface DatabaseStack {
  sql: string[];               // PostgreSQL, MySQL, SQL Server, etc.
  nosql: string[];             // MongoDB, Redis, Elasticsearch, etc.
  orm: string[];               // Prisma, Sequelize, TypeORM, etc.
  experienceLevel: ExperienceLevel;
}

// Bulut & DevOps
export interface CloudDevOpsStack {
  cloudProviders: string[];    // AWS, Azure, GCP, DigitalOcean, etc.
  containers: string[];         // Docker, Kubernetes, etc.
  cicd: string[];              // GitHub Actions, GitLab CI, Jenkins, etc.
  monitoring: string[];        // Prometheus, Grafana, New Relic, etc.
  infrastructure: string[];    // Terraform, Ansible, CloudFormation, etc.
  experienceLevel: ExperienceLevel;
}

// Mobil & Diğer
export interface MobileStack {
  platforms: string[];          // iOS, Android, React Native, Flutter, etc.
  experienceLevel: ExperienceLevel;
}

export interface OtherTechStack {
  blockchain: string[];         // Solidity, Web3, etc.
  aiMl: string[];               // TensorFlow, PyTorch, etc.
  gameDev: string[];            // Unity, Unreal Engine, etc.
  experienceLevel: ExperienceLevel;
}

// Tech Stack (Tüm Teknoloji Alanları)
export interface TechStack {
  // Alan Seçimi
  domains: ('frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'database' | 'ai-ml' | 'blockchain' | 'gamedev')[];
  
  // Detaylı Stack Bilgileri
  frontend?: FrontendStack;
  backend?: BackendStack;
  database?: DatabaseStack;
  cloudDevOps?: CloudDevOpsStack;
  mobile?: MobileStack;
  other?: OtherTechStack;
  
  // Genel Bilgiler
  yearsOfExperience: number;
  currentlyLearning: string[];      // Öğrenmek istediği teknolojiler
  preferredTechnologies: string[]; // Favori teknolojiler
}

// GitHub Profil Bilgileri
export interface GitHubProfile {
  username: string;
  isConnected: boolean;
  verifiedAt?: string;
  
  // Vektör oluşturmak için gerekli veriler
  repositories: {
    total: number;
    public: number;
    private: number;
    languages: Record<string, number>; // Kullanılan diller ve kod satır sayıları
    frameworks: string[];              // Tespit edilen framework'ler
    topics: string[];                 // Repository topic'leri
  };
  
  contributions: {
    totalCommits: number;
    contributionsLastYear: number;
    streakDays: number;
    languages: Record<string, number>;
  };
  
  skills: string[];                    // GitHub'dan çıkarılan yetenekler
  vectorEmbedding?: number[];         // Oluşturulan vektör embedding
  lastSynced?: string;
}

// Yazılımcı/Geliştirici Profil Detayları
export interface DeveloperProfile {
  role: 'developer';
  
  techStack: TechStack;
  githubProfile?: GitHubProfile;
  
  // Deneyim
  experienceLevel: ExperienceLevel;
  yearsOfExperience: number;
  
  // Çalışma Tercihleri
  workModel: WorkModel[];
  availability: 'available' | 'busy' | 'not-looking';
  hourlyRate?: {
    min: number;
    max: number;
    currency: 'USD' | 'EUR' | 'TRY';
  };
  
  // Portfolio & Projeler
  portfolio: {
    website?: string;
    github?: string;
    linkedin?: string;
    personalProjects: {
      name: string;
      description: string;
      techStack: string[];
      url?: string;
    }[];
  };
  
  // Önceki İşler/Deneyimler
  workHistory: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    technologies: string[];
    description: string;
  }[];
  
  // Kendi Kendine Öğrenme & Gelişim
  learningGoals: string[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }[];
}

// İşveren Profil Detayları
export interface EmployerProfile {
  role: 'employer';
  
  // Şirket Bilgileri
  company: {
    name: string;
    website: string;
    size: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
    industry: string;
    description: string;
    logo?: string;
  };
  
  // Aradığı Profil
  lookingFor: {
    roles: string[];                    // Aradığı pozisyonlar
    experienceLevel: ExperienceLevel[];
    techStack: Partial<TechStack>;      // İstenilen tech stack
    workModel: WorkModel[];
    budget?: {
      min: number;
      max: number;
      currency: 'USD' | 'EUR' | 'TRY';
      period: 'hourly' | 'daily' | 'monthly' | 'project';
    };
    location: 'remote' | 'onsite' | 'hybrid';
    urgency: 'asap' | 'this-month' | 'flexible';
  };
  
  // Aktif Projeler
  activeProjects: {
    title: string;
    description: string;
    requiredSkills: string[];
    budget: number;
    deadline: string;
    status: 'planning' | 'in-progress' | 'on-hold';
  }[];
  
  // Geçmiş İşverenlik Deneyimi
  pastHires: number;
  averageProjectDuration: string;
  preferredPaymentMethod: 'hourly' | 'fixed' | 'milestone' | 'retainer';
}

// Freelancer Profil Detayları
export interface FreelancerProfile {
  role: 'freelancer';
  
  techStack: TechStack;
  githubProfile?: GitHubProfile;
  
  // Hizmet Alanları
  serviceAreas: string[];              // Web Development, Mobile Apps, etc.
  specialization: string;               // Ana uzmanlık alanı
  
  // Deneyim & Ücretler
  experienceLevel: ExperienceLevel;
  yearsOfExperience: number;
  hourlyRate: {
    min: number;
    max: number;
    currency: 'USD' | 'EUR' | 'TRY';
  };
  
  // Çalışma Modeli
  workModel: WorkModel[];
  availability: 'full-time' | 'part-time' | 'project-based';
  maxHoursPerWeek?: number;
  
  // Portfolio
  portfolio: {
    website?: string;
    github?: string;
    behance?: string;
    dribbble?: string;
    completedProjects: {
      title: string;
      client: string;
      description: string;
      techStack: string[];
      duration: string;
      budget?: string;
    }[];
  };
  
  // Müşteri Tercihleri
  preferredClientTypes: ('startup' | 'small-business' | 'enterprise' | 'individual')[];
  preferredProjectDuration: ('short-term' | 'medium-term' | 'long-term')[];
  
  // Platform Deneyimi
  platformExperience: {
    upwork?: { profileUrl?: string; rating?: number; completedJobs?: number };
    fiverr?: { profileUrl?: string; rating?: number; completedJobs?: number };
    armut?: { profileUrl?: string; rating?: number; completedJobs?: number };
    bionluk?: { profileUrl?: string; rating?: number; completedJobs?: number };
  };
}

// Kendini Geliştirmek İsteyen Profil Detayları
export interface LearnerProfile {
  role: 'learner';
  
  // Mevcut Durum
  currentLevel: ExperienceLevel;
  currentOccupation?: string;
  learningMotivation: string;           // Neden öğreniyor?
  
  // Öğrenme Hedefleri
  learningGoals: {
    primary: string;                    // Ana hedef
    secondary: string[];                 // İkincil hedefler
    targetRoles: string[];               // Hedef rol/pozisyon
    timeline: '1-month' | '3-months' | '6-months' | '1-year' | 'flexible';
  };
  
  // İlgi Alanları
  interests: {
    domains: ('frontend' | 'backend' | 'mobile' | 'devops' | 'data-science' | 'ai-ml')[];
    technologies: string[];              // İlgilendiği teknolojiler
    preferredLearningMethod: ('courses' | 'projects' | 'mentoring' | 'community' | 'bootcamp')[];
  };
  
  // Mevcut Bilgiler
  currentSkills: {
    languages: string[];
    frameworks: string[];
    tools: string[];
    experienceLevel: ExperienceLevel;
  };
  
  // Mentorship & Ekip Arayışı
  seekingMentorship: boolean;
  lookingForTeam: boolean;
  willingToContribute: boolean;          // Open source projelerine katkı vermek istiyor mu?
  
  // İlerleme Takibi
  learningResources: {
    courses: string[];
    projects: string[];
    certifications: string[];
  };
}

// Kullanıcı Profil Ana Yapısı
export interface UserProfile {
  // Temel Bilgiler
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  dateOfBirth?: string;
  profilePicture?: string;
  
  // Lokasyon
  location: Location;
  
  // Rol & Profil Tipi
  role: UserRole;
  profile: DeveloperProfile | EmployerProfile | FreelancerProfile | LearnerProfile;
  
  // Match-making için
  preferences: {
    // Ne arıyor?
    lookingFor: {
      role?: UserRole[];
      experienceLevel?: ExperienceLevel[];
      techStack?: Partial<TechStack>;
      location?: 'remote' | 'onsite' | 'hybrid' | 'any';
      workModel?: WorkModel[];
    };
    
    // Bildirimler
    notifications: {
      newMatches: boolean;
      projectInvitations: boolean;
      messages: boolean;
      weeklyDigest: boolean;
    };
    
    // Profil Görünürlüğü
    profileVisibility: 'public' | 'private' | 'contacts-only';
    showEmail: boolean;
    showLocation: boolean;
  };
  
  // İletişim
  contactInfo: {
    phone?: string;
    telegram?: string;
    discord?: string;
    slack?: string;
    preferredContactMethod: 'email' | 'phone' | 'telegram' | 'discord' | 'in-app';
  };
  
  // Bio & Açıklama
  bio: string;                          // Kısa özgeçmiş/açıklama
  about: string;                        // Detaylı hakkında
  
  // Match Score Ayarları (Match algoritması için)
  matchPreferences: {
    techStackWeight: number;            // 0-100
    experienceWeight: number;            // 0-100
    locationWeight: number;              // 0-100
    githubActivityWeight: number;        // 0-100
    responseTimeWeight?: number;         // 0-100 (işverenler için)
  };
  
  // Meta Bilgiler
  createdAt: string;
  updatedAt: string;
  onboardingCompleted: boolean;
  lastActiveAt: string;
  isVerified: boolean;
  isPremium?: boolean;
}

// Onboarding Form Data
export interface OnboardingFormData {
  // Step 1: Temel Bilgiler
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  
  // Step 2: Rol Seçimi
  role: UserRole | null;
  
  // Step 3-7: Role'e göre dinamik adımlar
  // Developer için
  developerData?: {
    domains: string[];
    frontend?: Partial<FrontendStack>;
    backend?: Partial<BackendStack>;
    database?: Partial<DatabaseStack>;
    cloudDevOps?: Partial<CloudDevOpsStack>;
    mobile?: Partial<MobileStack>;
    other?: Partial<OtherTechStack>;
    yearsOfExperience: number;
    workModel: WorkModel[];
    availability: string;
    portfolio?: {
      website?: string;
      github?: string;
    };
  };
  
  // Employer için
  employerData?: {
    companyName: string;
    companyWebsite: string;
    companySize: string;
    industry: string;
    lookingForRoles: string[];
    preferredWorkModel: WorkModel[];
    budget?: {
      min: number;
      max: number;
      currency: string;
    };
  };
  
  // Freelancer için
  freelancerData?: {
    serviceAreas: string[];
    specialization: string;
    hourlyRate: {
      min: number;
      max: number;
      currency: string;
    };
    workModel: WorkModel[];
    platformExperience?: Record<string, any>;
  };
  
  // Learner için
  learnerData?: {
    currentLevel: ExperienceLevel;
    currentOccupation?: string;
    learningGoals: {
      primary: string;
      secondary: string[];
      timeline: string;
    };
    interests: {
      domains: string[];
      preferredLearningMethod: string[];
    };
    seekingMentorship: boolean;
    lookingForTeam: boolean;
  };
  
  // GitHub Bağlantısı (Opsiyonel ama önerilen)
  githubUsername?: string;
  connectGitHub: boolean;
  
  // Tercihler
  preferences: {
    notifications: {
      newMatches: boolean;
      projectInvitations: boolean;
      messages: boolean;
      weeklyDigest: boolean;
    };
    profileVisibility: 'public' | 'private' | 'contacts-only';
    theme: 'light' | 'dark' | 'auto';
  };
  
  // Lokasyon
  location: {
    country: string;
    city: string;
    timezone: string;
    preferredLanguage: 'tr' | 'en' | 'both';
  };
}

