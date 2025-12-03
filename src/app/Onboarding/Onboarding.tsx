import React, { useState, useEffect, useRef, useMemo } from 'react';
import './Onboarding.css';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Mail, 
  Briefcase, 
  Building2, 
  Sparkles,
  Target,
  Settings,
  Code,
  Search,
  GraduationCap,
  Github,
  MapPin,
  Globe,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import frontendIll from '../../media/frontendIll.png';
import fullstackIll from '../../media/fullstack.png';
import mobileIll from '../../media/mobile.png';
import devopsIll from '../../media/devops.png';
import dbIll from '../../media/db.png';
import aiIll from '../../media/ai.png';
import StepIndicator from './components/StepIndicator';
import type { 
  UserRole, 
  Gender, 
  ExperienceLevel, 
  WorkModel,
  OnboardingFormData 
} from '../../types/userProfile';

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState<OnboardingFormData & { roles: UserRole[] }>({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'prefer-not-to-say',
    role: null,
    roles: [],
    developerData: undefined,
    employerData: undefined,
    freelancerData: undefined,
    learnerData: undefined,
    githubUsername: '',
    connectGitHub: false,
    preferences: {
      notifications: {
        newMatches: true,
        projectInvitations: true,
        messages: true,
        weeklyDigest: false
      },
      profileVisibility: 'public',
      theme: 'auto'
    },
    location: {
      country: '',
      city: '',
      timezone: 'Europe/Istanbul',
      preferredLanguage: 'tr'
    }
  });

  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const stepContentRef = useRef<HTMLDivElement>(null);

  // Adım yapısını rol bazında dinamik oluştur
  const getSteps = (): Array<{id: string; title: string; subtitle: string; icon: any}> => {
    const baseSteps = [
      { id: 'welcome', title: 'Hoş Geldiniz!', subtitle: 'Profesyonel ağınızı oluşturmaya başlayın', icon: Sparkles },
      { id: 'basic', title: 'Temel Bilgiler', subtitle: 'Kendiniz hakkında bilgi verin', icon: User },
      { id: 'role', title: 'Rol Seçimi', subtitle: 'Kendinizi nasıl tanımlıyorsunuz?', icon: Target }
    ];

    if (!formData.role) {
      return [...baseSteps, { id: 'complete', title: 'Tamamlandı!', subtitle: 'Hesabınız hazır', icon: Check }];
    }

    const roleSpecificSteps: Record<UserRole, Array<{id: string; title: string; subtitle: string; icon: any}>> = {
      developer: [
        { id: 'domains', title: 'Alan Seçimi', subtitle: 'Hangi alanlarda çalışıyorsunuz?', icon: Code },
        { id: 'frontend', title: 'Frontend Teknolojileri', subtitle: 'Frontend stack\'inizi seçin', icon: Code },
        { id: 'backend', title: 'Backend Teknolojileri', subtitle: 'Backend stack\'inizi seçin', icon: Code },
        { id: 'database', title: 'Database Teknolojileri', subtitle: 'Kullandığınız veritabanları', icon: Code },
        { id: 'cloud', title: 'Bulut & DevOps', subtitle: 'Bulut ve DevOps araçları', icon: Code },
        { id: 'experience', title: 'Deneyim Bilgileri', subtitle: 'Deneyiminizi paylaşın', icon: TrendingUp }
      ],
      employer: [
        { id: 'company', title: 'Şirket Bilgileri', subtitle: 'Şirketiniz hakkında bilgi verin', icon: Building2 },
        { id: 'looking-for', title: 'Aradığınız Profil', subtitle: 'Hangi profili arıyorsunuz?', icon: Search },
        { id: 'project-details', title: 'Proje Detayları', subtitle: 'Proje gereksinimleriniz', icon: Briefcase }
      ],
      freelancer: [
        { id: 'services', title: 'Hizmet Alanları', subtitle: 'Sunmak istediğiniz hizmetler', icon: Briefcase },
        { id: 'tech-stack', title: 'Teknoloji Stack\'i', subtitle: 'Uzmanlık alanlarınız', icon: Code },
        { id: 'pricing', title: 'Ücretlendirme', subtitle: 'Ücret bilgileriniz', icon: DollarSign },
        { id: 'experience', title: 'Deneyim', subtitle: 'Deneyim ve portfolio', icon: TrendingUp }
      ],
      learner: [
        { id: 'current-level', title: 'Mevcut Seviye', subtitle: 'Şu anki seviyeniz nedir?', icon: GraduationCap },
        { id: 'goals', title: 'Öğrenme Hedefleri', subtitle: 'Neyi öğrenmek istiyorsunuz?', icon: Target },
        { id: 'interests', title: 'İlgi Alanları', subtitle: 'Hangi teknolojiler ilginizi çekiyor?', icon: Sparkles },
        { id: 'mentorship', title: 'Mentorluk & Ekip', subtitle: 'Mentorluk veya ekip arıyor musunuz?', icon: User }
      ]
    };

    const finalSteps = [
      ...baseSteps,
      ...roleSpecificSteps[formData.role],
      { id: 'github', title: 'GitHub Bağlantısı', subtitle: 'GitHub profilinizi bağlayın (Önerilen)', icon: Github },
      { id: 'location', title: 'Lokasyon', subtitle: 'Konum bilgileriniz', icon: MapPin },
      { id: 'preferences', title: 'Tercihler', subtitle: 'Deneyiminizi kişiselleştirin', icon: Settings },
      { id: 'complete', title: 'Tamamlandı!', subtitle: 'Hesabınız hazır', icon: Check }
    ];

    return finalSteps;
  };

  const steps = useMemo(() => getSteps(), [formData.role]);

  // Animations
  useEffect(() => {
    if (stepContentRef.current) {
      gsap.fromTo(stepContentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentStep]);

  useEffect(() => {
    if (leftPanelRef.current && rightPanelRef.current) {
      gsap.fromTo(leftPanelRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );
      
      gsap.fromTo(rightPanelRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    }
  }, []);

  

  const updateFormData = (field: string, value: any) => {
    const keys = field.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    // Sadece tamamlanmış adımlara veya ilk adıma geri dönülebilir
    if (stepIndex <= currentStep || stepIndex === 0) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Onboarding data:', formData);
    navigate('/dashboard', { replace: true });
  };

  const canProceed = (): boolean => {
    const currentStepId = steps[currentStep]?.id;
    
    switch (currentStepId) {
      case 'welcome':
        return true;
      case 'basic':
        return formData.firstName.trim() !== '' && 
               formData.lastName.trim() !== '' && 
               formData.email.trim() !== '';
      case 'role':
        return ((formData as any).roles?.length || 0) > 0;
      case 'domains':
        return !!(formData.developerData?.domains && formData.developerData.domains.length > 0);
      case 'frontend':
        return true; // Opsiyonel
      case 'backend':
        return true;
      case 'database':
        return true;
      case 'cloud':
        return true;
      case 'experience':
        return formData.developerData?.yearsOfExperience !== undefined &&
               formData.developerData.yearsOfExperience >= 0;
      case 'company':
        return formData.employerData?.companyName?.trim() !== '' &&
               formData.employerData?.companyWebsite?.trim() !== '';
      case 'looking-for':
        return !!(formData.employerData?.lookingForRoles && 
               formData.employerData.lookingForRoles.length > 0);
      case 'project-details':
        return true;
      case 'services':
        return !!(formData.freelancerData?.serviceAreas && 
               formData.freelancerData.serviceAreas.length > 0);
      case 'tech-stack':
        return true;
      case 'pricing':
        return formData.freelancerData?.hourlyRate?.min !== undefined &&
               formData.freelancerData?.hourlyRate?.max !== undefined;
      case 'current-level':
        return formData.learnerData?.currentLevel !== undefined;
      case 'goals':
        return formData.learnerData?.learningGoals?.primary?.trim() !== '';
      case 'interests':
        return !!(formData.learnerData?.interests?.domains && 
               formData.learnerData.interests.domains.length > 0);
      case 'mentorship':
        return true;
      case 'github':
        return true; // Opsiyonel
      case 'location':
        return formData.location.country.trim() !== '' && 
               formData.location.city.trim() !== '';
      case 'preferences':
        return true;
      case 'complete':
        return true;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    const CurrentIcon = steps[currentStep]?.icon || User;
    const stepId = steps[currentStep]?.id;

    switch (stepId) {
      case 'welcome':
        return (
          <div className="step-content welcome-step">
            <div className="step-icon-wrapper">
              <CurrentIcon className="step-icon" size={48} />
            </div>
            <h2>Hoş Geldiniz!</h2>
            <p className="step-description">
              Profesyonel ağınızı oluşturun, ekip arkadaşları bulun ve projelerde yer alın.
              GitHub profilinizi bağlayarak otomatik match-making özelliğinden faydalanın.
            </p>
            <div className="welcome-features">
              <div className="feature-item">
                <Check size={20} />
                <span>GitHub tabanlı otomatik eşleştirme</span>
              </div>
              <div className="feature-item">
                <Check size={20} />
                <span>Yazılımcı ve işveren ağı</span>
              </div>
              <div className="feature-item">
                <Check size={20} />
                <span>Proje ekibi oluşturma</span>
              </div>
            </div>
          </div>
        );

      case 'basic':
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Temel Bilgiler</h2>
              <p>Hesabınız için gerekli bilgileri girin</p>
            </div>
            
            <div className="form-fields">
              <div className="input-group">
                <label>Ad</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Adınız"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Soyad</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Soyadınız"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Email Adresi</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    placeholder="ornek@email.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Cinsiyet (Opsiyonel)</label>
                <div className="select-wrapper">
                  <select
                    value={formData.gender}
                    onChange={(e) => updateFormData('gender', e.target.value as Gender)}
                  >
                    <option value="prefer-not-to-say">Belirtmek istemiyorum</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'role':
        const roles = [
          {
            id: 'developer' as UserRole,
            title: 'Yazılımcı',
            subtitle: 'Geliştirici olarak projelerde yer al',
            icon: Code
          },
          {
            id: 'employer' as UserRole,
            title: 'İşveren',
            subtitle: 'Projeler için geliştirici ara',
            icon: Search
          },
          {
            id: 'freelancer' as UserRole,
            title: 'Freelancer',
            subtitle: 'Bağımsız projeler al',
            icon: Briefcase
          },
          {
            id: 'learner' as UserRole,
            title: 'Öğrenci',
            subtitle: 'Öğren ve mentorluk al',
            icon: GraduationCap
          }
        ];

        return (
          <div className="step-content form-step role-selection-step">
            <div className="step-header">
              <h2>Choose your persona</h2>
              <p>Select personas that best represent you. Customize your experience to match your style and preferences.</p>
            </div>
            
            <div className="persona-grid">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = (formData as any).roles?.includes(role.id) || false;
                return (
                  <button
                    key={role.id}
                    type="button"
                    className={`persona-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      const currentRoles = (formData as any).roles || [];
                      const newRoles = isSelected
                        ? currentRoles.filter((r: UserRole) => r !== role.id)
                        : [...currentRoles, role.id];
                      
                      updateFormData('roles', newRoles);
                      
                      // İlk seçilen rolü primary role olarak ayarla
                      if (newRoles.length > 0 && !formData.role) {
                        updateFormData('role', newRoles[0]);
                      }
                      
                      // Role'e göre başlangıç verilerini oluştur
                      if (role.id === 'developer' && !formData.developerData) {
                        updateFormData('developerData', {
                          domains: [],
                          yearsOfExperience: 0,
                          workModel: [],
                          availability: 'available'
                        });
                      } else if (role.id === 'employer' && !formData.employerData) {
                        updateFormData('employerData', {
                          companyName: '',
                          companyWebsite: '',
                          companySize: 'startup',
                          industry: '',
                          lookingForRoles: [],
                          preferredWorkModel: []
                        });
                      } else if (role.id === 'freelancer' && !formData.freelancerData) {
                        updateFormData('freelancerData', {
                          serviceAreas: [],
                          specialization: '',
                          hourlyRate: { min: 0, max: 0, currency: 'USD' },
                          workModel: []
                        });
                      } else if (role.id === 'learner' && !formData.learnerData) {
                        updateFormData('learnerData', {
                          currentLevel: 'beginner',
                          currentOccupation: '',
                          learningGoals: { primary: '', secondary: [], timeline: 'flexible' },
                          interests: { domains: [], preferredLearningMethod: [] },
                          seekingMentorship: false,
                          lookingForTeam: false
                        });
                      }
                    }}
                  >
                    <div className="persona-icon">
                      <Icon size={40} strokeWidth={1.5} />
                    </div>
                    <div className="persona-silhouette">
                      <User size={48} strokeWidth={1.5} />
                    </div>
                    <div className="persona-text-placeholder">
                      <div className="persona-text-line"></div>
                      <div className="persona-text-line short"></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      // Developer Steps
      case 'domains':
        const domains = [
          { id: 'frontend', label: 'Frontend', icon: '🎨' },
          { id: 'backend', label: 'Backend', icon: '⚙️' },
          { id: 'fullstack', label: 'Full Stack', icon: '🚀' },
          { id: 'mobile', label: 'Mobile', icon: '📱' },
          { id: 'devops', label: 'DevOps', icon: '🔧' },
          { id: 'database', label: 'Database', icon: '💾' },
          { id: 'ai-ml', label: 'AI/ML', icon: '🤖' }
        ];

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Hangi Alanlarda Çalışıyorsunuz?</h2>
              <p>Bir veya daha fazla alan seçebilirsiniz</p>
            </div>
            
            <div className="domains-grid">
              <div className="domains-row row-3">
              {domains.slice(0,3).map((domain) => {
                const selected = formData.developerData?.domains?.includes(domain.id) || false;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    className={`domain-card domain-${domain.id} ${selected ? 'selected' : ''}`}
                    onClick={() => {
                      const currentDomains = formData.developerData?.domains || [];
                      const newDomains = selected
                        ? currentDomains.filter(d => d !== domain.id)
                        : [...currentDomains, domain.id];
                      updateFormData('developerData.domains', newDomains);
                    }}
                  >
                    <div className="domain-visual">
                      {domain.id === 'frontend' ? (
                        <img src={frontendIll} alt="Frontend" className="domain-img" />
                      ) : domain.id === 'fullstack' ? (
                        <img src={fullstackIll} alt="Full Stack" className="domain-img" />
                      ) : domain.id === 'mobile' ? (
                        <img src={mobileIll} alt="Mobile" className="domain-img" />
                      ) : domain.id === 'devops' ? (
                        <img src={devopsIll} alt="DevOps" className="domain-img" />
                      ) : domain.id === 'database' ? (
                        <img src={dbIll} alt="Database" className="domain-img" />
                      ) : domain.id === 'ai-ml' ? (
                        <img src={aiIll} alt="AI/ML" className="domain-img" />
                      ) : (
                        <span className="domain-icon">{domain.icon}</span>
                      )}
                    </div>
                    <span className="domain-title">{domain.label}</span>
                    <div className="domain-footer-bar" />
                    {selected && <Check size={16} className="domain-check" />}
                  </button>
                );
              })}
              </div>
              <div className="domains-row row-4">
              {domains.slice(3).map((domain) => {
                const selected = formData.developerData?.domains?.includes(domain.id) || false;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    className={`domain-card domain-${domain.id} ${selected ? 'selected' : ''}`}
                    onClick={() => {
                      const currentDomains = formData.developerData?.domains || [];
                      const newDomains = selected
                        ? currentDomains.filter(d => d !== domain.id)
                        : [...currentDomains, domain.id];
                      updateFormData('developerData.domains', newDomains);
                    }}
                  >
                    <div className="domain-visual">
                      {domain.id === 'frontend' ? (
                        <img src={frontendIll} alt="Frontend" className="domain-img" />
                      ) : domain.id === 'fullstack' ? (
                        <img src={fullstackIll} alt="Full Stack" className="domain-img" />
                      ) : domain.id === 'mobile' ? (
                        <img src={mobileIll} alt="Mobile" className="domain-img" />
                      ) : domain.id === 'devops' ? (
                        <img src={devopsIll} alt="DevOps" className="domain-img" />
                      ) : domain.id === 'database' ? (
                        <img src={dbIll} alt="Database" className="domain-img" />
                      ) : domain.id === 'ai-ml' ? (
                        <img src={aiIll} alt="AI/ML" className="domain-img" />
                      ) : (
                        <span className="domain-icon">{domain.icon}</span>
                      )}
                    </div>
                    <span className="domain-title">{domain.label}</span>
                    <div className="domain-footer-bar" />
                    {selected && <Check size={16} className="domain-check" />}
                  </button>
                );
              })}
              </div>
            </div>
            {(!formData.developerData?.domains || formData.developerData.domains.length === 0) && (
              <p className="helper-text">En az bir alan seçiniz</p>
            )}
          </div>
        );

      case 'frontend':
        const frontendFrameworks = ['React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'Svelte', 'Remix'];
        const frontendLanguages = ['JavaScript', 'TypeScript', 'HTML/CSS'];
        const stylingTools = ['Tailwind CSS', 'Styled Components', 'CSS Modules', 'SCSS/SASS', 'Material-UI', 'Chakra UI'];

        const hasFrontend = formData.developerData?.domains?.includes('frontend') || 
                           formData.developerData?.domains?.includes('fullstack');

        if (!hasFrontend) {
          handleNext();
          return null;
        }

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Frontend Teknolojileri</h2>
              <p>Kullandığınız frontend teknolojilerini seçin</p>
            </div>
            
            <div className="tech-stack-section">
              <div className="tech-group">
                <label>Framework'ler</label>
                <div className="tech-chips">
                  {frontendFrameworks.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`tech-chip ${formData.developerData?.frontend?.frameworks?.includes(tech) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.developerData?.frontend?.frameworks || [];
                        const updated = current.includes(tech)
                          ? current.filter(t => t !== tech)
                          : [...current, tech];
                        updateFormData('developerData.frontend.frameworks', updated);
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tech-group">
                <label>Diller</label>
                <div className="tech-chips">
                  {frontendLanguages.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`tech-chip ${formData.developerData?.frontend?.languages?.includes(tech) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.developerData?.frontend?.languages || [];
                        const updated = current.includes(tech)
                          ? current.filter(t => t !== tech)
                          : [...current, tech];
                        updateFormData('developerData.frontend.languages', updated);
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tech-group">
                <label>Stil Araçları</label>
                <div className="tech-chips">
                  {stylingTools.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`tech-chip ${formData.developerData?.frontend?.styling?.includes(tech) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.developerData?.frontend?.styling || [];
                        const updated = current.includes(tech)
                          ? current.filter(t => t !== tech)
                          : [...current, tech];
                        updateFormData('developerData.frontend.styling', updated);
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'backend':
        const backendLanguages = ['Node.js', 'Python', 'Java', 'Go', 'Rust', 'PHP', 'C#', 'Ruby'];
        const backendFrameworks = ['Express', 'Django', 'Spring', 'FastAPI', 'NestJS', 'Laravel', 'ASP.NET'];

        const hasBackend = formData.developerData?.domains?.includes('backend') || 
                          formData.developerData?.domains?.includes('fullstack');

        if (!hasBackend) {
          handleNext();
          return null;
        }

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Backend Teknolojileri</h2>
              <p>Kullandığınız backend teknolojilerini seçin</p>
            </div>
            
            <div className="tech-stack-section">
              <div className="tech-group">
                <label>Diller & Runtime'lar</label>
                <div className="tech-chips">
                  {backendLanguages.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`tech-chip ${formData.developerData?.backend?.languages?.includes(tech) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.developerData?.backend?.languages || [];
                        const updated = current.includes(tech)
                          ? current.filter(t => t !== tech)
                          : [...current, tech];
                        updateFormData('developerData.backend.languages', updated);
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tech-group">
                <label>Framework'ler</label>
                <div className="tech-chips">
                  {backendFrameworks.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`tech-chip ${formData.developerData?.backend?.frameworks?.includes(tech) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.developerData?.backend?.frameworks || [];
                        const updated = current.includes(tech)
                          ? current.filter(t => t !== tech)
                          : [...current, tech];
                        updateFormData('developerData.backend.frameworks', updated);
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'database':
        const sqlDatabases = ['PostgreSQL', 'MySQL', 'SQL Server', 'SQLite', 'Oracle'];
        const nosqlDatabases = ['MongoDB', 'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB'];

        const hasDatabase = formData.developerData?.domains?.includes('database') || 
                           formData.developerData?.domains?.includes('fullstack') ||
                           formData.developerData?.domains?.includes('backend');

        if (!hasDatabase) {
          handleNext();
          return null;
        }

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Database Teknolojileri</h2>
              <p>Kullandığınız veritabanı teknolojilerini seçin</p>
            </div>
            
            <div className="tech-stack-section">
              <div className="tech-group">
                <label>SQL Veritabanları</label>
                <div className="tech-chips">
                  {sqlDatabases.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`tech-chip ${formData.developerData?.database?.sql?.includes(tech) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.developerData?.database?.sql || [];
                        const updated = current.includes(tech)
                          ? current.filter(t => t !== tech)
                          : [...current, tech];
                        updateFormData('developerData.database.sql', updated);
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tech-group">
                <label>NoSQL Veritabanları</label>
                <div className="tech-chips">
                  {nosqlDatabases.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`tech-chip ${formData.developerData?.database?.nosql?.includes(tech) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.developerData?.database?.nosql || [];
                        const updated = current.includes(tech)
                          ? current.filter(t => t !== tech)
                          : [...current, tech];
                        updateFormData('developerData.database.nosql', updated);
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'cloud':
        const cloudProviders = ['AWS', 'Azure', 'GCP', 'DigitalOcean', 'Heroku', 'Vercel', 'Netlify'];
        const devopsTools = ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Jenkins', 'GitHub Actions'];

        const hasDevOps = formData.developerData?.domains?.includes('devops') || 
                         formData.developerData?.domains?.includes('fullstack');

        if (!hasDevOps) {
          handleNext();
          return null;
        }

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Bulut & DevOps</h2>
              <p>Kullandığınız bulut ve DevOps araçlarını seçin</p>
            </div>
            
            <div className="tech-stack-section">
              <div className="tech-group">
                <label>Bulut Sağlayıcıları</label>
                <div className="tech-chips">
                  {cloudProviders.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`tech-chip ${formData.developerData?.cloudDevOps?.cloudProviders?.includes(tech) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.developerData?.cloudDevOps?.cloudProviders || [];
                        const updated = current.includes(tech)
                          ? current.filter(t => t !== tech)
                          : [...current, tech];
                        updateFormData('developerData.cloudDevOps.cloudProviders', updated);
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tech-group">
                <label>DevOps Araçları</label>
                <div className="tech-chips">
                  {devopsTools.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`tech-chip ${formData.developerData?.cloudDevOps?.containers?.includes(tech) || formData.developerData?.cloudDevOps?.cicd?.includes(tech) ? 'selected' : ''}`}
                      onClick={() => {
                        const isContainer = ['Docker', 'Kubernetes'].includes(tech);
                        const field = isContainer ? 'containers' : 'cicd';
                        const current = formData.developerData?.cloudDevOps?.[field] || [];
                        const updated = current.includes(tech)
                          ? current.filter(t => t !== tech)
                          : [...current, tech];
                        updateFormData(`developerData.cloudDevOps.${field}`, updated);
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'experience':
        if (formData.role !== 'developer') {
          return null;
        }

        const workModelsDev: WorkModel[] = ['full-time', 'part-time', 'contract', 'freelance', 'internship'];
        const experienceLevels: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Deneyim Bilgileri</h2>
              <p>Deneyim seviyenizi ve çalışma tercihlerinizi belirtin</p>
            </div>
            
            <div className="form-fields">
              <div className="input-group">
                <label>Deneyim Seviyesi</label>
                <div className="select-wrapper">
                  <select
                    value={formData.developerData?.frontend?.experienceLevel || 'beginner'}
                    onChange={(e) => updateFormData('developerData.frontend.experienceLevel', e.target.value as ExperienceLevel)}
                  >
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>
                        {level === 'beginner' ? 'Başlangıç' : 
                         level === 'intermediate' ? 'Orta' :
                         level === 'advanced' ? 'İleri' : 'Uzman'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Yıllık Deneyim</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    placeholder="0"
                    value={formData.developerData?.yearsOfExperience || 0}
                    onChange={(e) => updateFormData('developerData.yearsOfExperience', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Çalışma Modelleri (Birden fazla seçebilirsiniz)</label>
                <div className="tech-chips">
                  {workModelsDev.map((model) => (
                    <button
                      key={model}
                      type="button"
                      className={`tech-chip ${formData.developerData?.workModel?.includes(model) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.developerData?.workModel || [];
                        const updated = current.includes(model)
                          ? current.filter(m => m !== model)
                          : [...current, model];
                        updateFormData('developerData.workModel', updated);
                      }}
                    >
                      {model === 'full-time' ? 'Tam Zamanlı' :
                       model === 'part-time' ? 'Yarı Zamanlı' :
                       model === 'contract' ? 'Sözleşmeli' :
                       model === 'freelance' ? 'Freelance' : 'Stajyer'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label>Müsaitlik Durumu</label>
                <div className="select-wrapper">
                  <select
                    value={formData.developerData?.availability || 'available'}
                    onChange={(e) => updateFormData('developerData.availability', e.target.value)}
                  >
                    <option value="available">Müsait</option>
                    <option value="busy">Meşgul</option>
                    <option value="not-looking">Şu an aramıyorum</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      // Employer Steps
      case 'company':
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Şirket Bilgileri</h2>
              <p>Şirketiniz hakkında bilgi verin</p>
            </div>
            
            <div className="form-fields">
              <div className="input-group">
                <label>Şirket Adı</label>
                <div className="input-wrapper">
                  <Building2 className="input-icon" size={18} />
                  <input
                    type="text"
                    placeholder="Şirket adınız"
                    value={formData.employerData?.companyName || ''}
                    onChange={(e) => updateFormData('employerData.companyName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Şirket Web Sitesi</label>
                <div className="input-wrapper">
                  <Globe className="input-icon" size={18} />
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.employerData?.companyWebsite || ''}
                    onChange={(e) => updateFormData('employerData.companyWebsite', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Şirket Büyüklüğü</label>
                <div className="select-wrapper">
                  <select
                    value={formData.employerData?.companySize || 'startup'}
                    onChange={(e) => updateFormData('employerData.companySize', e.target.value)}
                  >
                    <option value="startup">Startup (1-10)</option>
                    <option value="small">Küçük (11-50)</option>
                    <option value="medium">Orta (51-200)</option>
                    <option value="large">Büyük (201-1000)</option>
                    <option value="enterprise">Kurumsal (1000+)</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Sektör</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Örn: Fintech, E-ticaret, SaaS"
                    value={formData.employerData?.industry || ''}
                    onChange={(e) => updateFormData('employerData.industry', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'looking-for':
        const rolesToFind = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'Mobile Developer', 'DevOps Engineer', 'UI/UX Designer'];

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Aradığınız Profil</h2>
              <p>Hangi pozisyonlar için geliştirici arıyorsunuz?</p>
            </div>
            
            <div className="tech-chips">
              {rolesToFind.map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`tech-chip ${formData.employerData?.lookingForRoles?.includes(role) ? 'selected' : ''}`}
                  onClick={() => {
                    const current = formData.employerData?.lookingForRoles || [];
                    const updated = current.includes(role)
                      ? current.filter(r => r !== role)
                      : [...current, role];
                    updateFormData('employerData.lookingForRoles', updated);
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
            {(!formData.employerData?.lookingForRoles || formData.employerData.lookingForRoles.length === 0) && (
              <p className="helper-text">En az bir pozisyon seçiniz</p>
            )}
          </div>
        );

      case 'project-details':
        const workModelsEmp: WorkModel[] = ['full-time', 'part-time', 'contract', 'freelance', 'internship'];
        
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Proje Detayları</h2>
              <p>Proje gereksinimlerinizi belirtin</p>
            </div>
            
            <div className="form-fields">
              <div className="input-group">
                <label>Tercih Edilen Çalışma Modeli</label>
                <div className="tech-chips">
                  {workModelsEmp.map((model) => (
                    <button
                      key={model}
                      type="button"
                      className={`tech-chip ${formData.employerData?.preferredWorkModel?.includes(model) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.employerData?.preferredWorkModel || [];
                        const updated = current.includes(model)
                          ? current.filter(m => m !== model)
                          : [...current, model];
                        updateFormData('employerData.preferredWorkModel', updated);
                      }}
                    >
                      {model === 'full-time' ? 'Tam Zamanlı' :
                       model === 'part-time' ? 'Yarı Zamanlı' :
                       model === 'contract' ? 'Sözleşmeli' :
                       model === 'freelance' ? 'Freelance' : 'Stajyer'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label>Bütçe (Opsiyonel)</label>
                <div className="budget-inputs">
                  <div className="input-wrapper">
                    <DollarSign className="input-icon" size={18} />
                    <input
                      type="number"
                      placeholder="Min"
                      value={formData.employerData?.budget?.min || ''}
                      onChange={(e) => {
                        const budget = formData.employerData?.budget || { min: 0, max: 0, currency: 'USD' };
                        updateFormData('employerData.budget', { ...budget, min: parseInt(e.target.value) || 0 });
                      }}
                    />
                  </div>
                  <span>-</span>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      placeholder="Max"
                      value={formData.employerData?.budget?.max || ''}
                      onChange={(e) => {
                        const budget = formData.employerData?.budget || { min: 0, max: 0, currency: 'USD' };
                        updateFormData('employerData.budget', { ...budget, max: parseInt(e.target.value) || 0 });
                      }}
                    />
                  </div>
                  <select
                    value={formData.employerData?.budget?.currency || 'USD'}
                    onChange={(e) => {
                      const budget = formData.employerData?.budget || { min: 0, max: 0, currency: 'USD' };
                      updateFormData('employerData.budget', { ...budget, currency: e.target.value });
                    }}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TRY</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      // Freelancer Steps
      case 'services':
        const serviceAreas = [
          'Web Development',
          'Mobile App Development',
          'E-commerce Solutions',
          'API Development',
          'Database Design',
          'UI/UX Design',
          'DevOps & Cloud',
          'Data Analytics'
        ];

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Hizmet Alanları</h2>
              <p>Sunmak istediğiniz hizmetleri seçin</p>
            </div>
            
            <div className="tech-chips">
              {serviceAreas.map((service) => (
                <button
                  key={service}
                  type="button"
                  className={`tech-chip ${formData.freelancerData?.serviceAreas?.includes(service) ? 'selected' : ''}`}
                  onClick={() => {
                    const current = formData.freelancerData?.serviceAreas || [];
                    const updated = current.includes(service)
                      ? current.filter(s => s !== service)
                      : [...current, service];
                    updateFormData('freelancerData.serviceAreas', updated);
                  }}
                >
                  {service}
                </button>
              ))}
            </div>
            {(!formData.freelancerData?.serviceAreas || formData.freelancerData.serviceAreas.length === 0) && (
              <p className="helper-text">En az bir hizmet alanı seçiniz</p>
            )}
          </div>
        );

      case 'tech-stack':
        // Freelancer için basitleştirilmiş tech stack seçimi
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Teknoloji Stack'i</h2>
              <p>Uzman olduğunuz teknolojileri seçin</p>
            </div>
            
            <div className="tech-stack-section">
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                Detaylı tech stack bilgileri GitHub profilinizden otomatik olarak çıkarılacaktır.
              </p>
            </div>
          </div>
        );

      case 'pricing':
        const workModelsFreelancer: WorkModel[] = ['full-time', 'part-time', 'contract', 'freelance', 'internship'];
        
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Ücretlendirme</h2>
              <p>Saatlik ücret aralığınızı belirtin</p>
            </div>
            
            <div className="form-fields">
              <div className="input-group">
                <label>Saatlik Ücret Aralığı</label>
                <div className="budget-inputs">
                  <div className="input-wrapper">
                    <DollarSign className="input-icon" size={18} />
                    <input
                      type="number"
                      placeholder="Min"
                      value={formData.freelancerData?.hourlyRate?.min || ''}
                      onChange={(e) => {
                        const rate = formData.freelancerData?.hourlyRate || { min: 0, max: 0, currency: 'USD' };
                        updateFormData('freelancerData.hourlyRate', { ...rate, min: parseInt(e.target.value) || 0 });
                      }}
                    />
                  </div>
                  <span>-</span>
                  <div className="input-wrapper">
                    <input
                      type="number"
                      placeholder="Max"
                      value={formData.freelancerData?.hourlyRate?.max || ''}
                      onChange={(e) => {
                        const rate = formData.freelancerData?.hourlyRate || { min: 0, max: 0, currency: 'USD' };
                        updateFormData('freelancerData.hourlyRate', { ...rate, max: parseInt(e.target.value) || 0 });
                      }}
                    />
                  </div>
                  <select
                    value={formData.freelancerData?.hourlyRate?.currency || 'USD'}
                    onChange={(e) => {
                      const rate = formData.freelancerData?.hourlyRate || { min: 0, max: 0, currency: 'USD' };
                      updateFormData('freelancerData.hourlyRate', { ...rate, currency: e.target.value });
                    }}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="TRY">TRY</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Çalışma Modeli</label>
                <div className="tech-chips">
                  {workModelsFreelancer.map((model) => (
                    <button
                      key={model}
                      type="button"
                      className={`tech-chip ${formData.freelancerData?.workModel?.includes(model) ? 'selected' : ''}`}
                      onClick={() => {
                        const current = formData.freelancerData?.workModel || [];
                        const updated = current.includes(model)
                          ? current.filter(m => m !== model)
                          : [...current, model];
                        updateFormData('freelancerData.workModel', updated);
                      }}
                    >
                      {model === 'full-time' ? 'Tam Zamanlı' :
                       model === 'part-time' ? 'Yarı Zamanlı' :
                       model === 'contract' ? 'Sözleşmeli' :
                       model === 'freelance' ? 'Freelance' : 'Stajyer'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      // Learner Steps
      case 'current-level':
        const experienceLevelsLearner: ExperienceLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];
        
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Mevcut Seviye</h2>
              <p>Şu anki bilgi seviyeniz nedir?</p>
            </div>
            
            <div className="form-fields">
              <div className="input-group">
                <label>Deneyim Seviyesi</label>
                <div className="select-wrapper">
                  <select
                    value={formData.learnerData?.currentLevel || 'beginner'}
                    onChange={(e) => updateFormData('learnerData.currentLevel', e.target.value as ExperienceLevel)}
                  >
                    {experienceLevelsLearner.map(level => (
                      <option key={level} value={level}>
                        {level === 'beginner' ? 'Başlangıç' : 
                         level === 'intermediate' ? 'Orta' :
                         level === 'advanced' ? 'İleri' : 'Uzman'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label>Mevcut Meslek (Opsiyonel)</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Örn: Öğrenci, Pazarlama Uzmanı, vb."
                    value={formData.learnerData?.currentOccupation || ''}
                    onChange={(e) => updateFormData('learnerData.currentOccupation', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Öğrenme Hedefleri</h2>
              <p>Ne öğrenmek istiyorsunuz?</p>
            </div>
            
            <div className="form-fields">
              <div className="input-group">
                <label>Ana Hedef</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Örn: Full Stack Developer olmak"
                    value={formData.learnerData?.learningGoals?.primary || ''}
                    onChange={(e) => {
                      const goals = formData.learnerData?.learningGoals || { primary: '', secondary: [], timeline: 'flexible' };
                      updateFormData('learnerData.learningGoals', { ...goals, primary: e.target.value });
                    }}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Zaman Çizelgesi</label>
                <div className="select-wrapper">
                  <select
                    value={formData.learnerData?.learningGoals?.timeline || 'flexible'}
                    onChange={(e) => {
                      const goals = formData.learnerData?.learningGoals || { primary: '', secondary: [], timeline: 'flexible' };
                      updateFormData('learnerData.learningGoals', { ...goals, timeline: e.target.value });
                    }}
                  >
                    <option value="1-month">1 Ay</option>
                    <option value="3-months">3 Ay</option>
                    <option value="6-months">6 Ay</option>
                    <option value="1-year">1 Yıl</option>
                    <option value="flexible">Esnek</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'interests':
        const learningDomains = ['Frontend', 'Backend', 'Mobile', 'DevOps', 'Data Science', 'AI/ML'];

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>İlgi Alanları</h2>
              <p>Hangi teknoloji alanları ilginizi çekiyor?</p>
            </div>
            
            <div className="tech-chips">
              {learningDomains.map((domain) => (
                <button
                  key={domain}
                  type="button"
                  className={`tech-chip ${formData.learnerData?.interests?.domains?.includes(domain.toLowerCase()) ? 'selected' : ''}`}
                  onClick={() => {
                    const current = formData.learnerData?.interests?.domains || [];
                    const updated = current.includes(domain.toLowerCase())
                      ? current.filter(d => d !== domain.toLowerCase())
                      : [...current, domain.toLowerCase()];
                    const interests = formData.learnerData?.interests || { domains: [], preferredLearningMethod: [] };
                    updateFormData('learnerData.interests', { ...interests, domains: updated });
                  }}
                >
                  {domain}
                </button>
              ))}
            </div>
            {(!formData.learnerData?.interests?.domains || formData.learnerData.interests.domains.length === 0) && (
              <p className="helper-text">En az bir ilgi alanı seçiniz</p>
            )}
          </div>
        );

      case 'mentorship':
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Mentorluk & Ekip</h2>
              <p>Mentorluk veya ekip arayışınız var mı?</p>
            </div>
            
            <div className="form-fields">
              <div className="preference-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.learnerData?.seekingMentorship || false}
                    onChange={(e) => updateFormData('learnerData.seekingMentorship', e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    <strong>Mentorluk Arıyorum</strong>
                    <span className="checkbox-desc">Deneyimli bir mentor ile çalışmak istiyorum</span>
                  </span>
                </label>
              </div>

              <div className="preference-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.learnerData?.lookingForTeam || false}
                    onChange={(e) => updateFormData('learnerData.lookingForTeam', e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    <strong>Ekip Arıyorum</strong>
                    <span className="checkbox-desc">Birlikte öğrenmek için ekip arkadaşları arıyorum</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      // GitHub Connection
      case 'github':
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>GitHub Bağlantısı</h2>
              <p>GitHub profilinizi bağlayarak otomatik eşleştirmeden faydalanın (Önerilen)</p>
            </div>
            
            <div className="form-fields">
              <div className="preference-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.connectGitHub}
                    onChange={(e) => updateFormData('connectGitHub', e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    <strong>GitHub Profilimi Bağla</strong>
                    <span className="checkbox-desc">GitHub profilimizi tarayarak yeteneklerinizi otomatik çıkarın</span>
                  </span>
                </label>
              </div>

              {formData.connectGitHub && (
                <div className="input-group">
                  <label>GitHub Kullanıcı Adı</label>
                  <div className="input-wrapper">
                    <Github className="input-icon" size={18} />
                    <input
                      type="text"
                      placeholder="github-username"
                      value={formData.githubUsername}
                      onChange={(e) => updateFormData('githubUsername', e.target.value)}
                    />
                  </div>
                  <p className="helper-text" style={{ marginTop: '0.5rem', color: '#64748b' }}>
                    GitHub profiliniz tarandıktan sonra vektör embedding oluşturulacak ve size uygun eşleşmeler sunulacak.
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      // Location
      case 'location':
        const countries = ['Türkiye', 'United States', 'United Kingdom', 'Germany', 'France', 'Other'];
        const cities = {
          'Türkiye': ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Diğer'],
          'United States': ['New York', 'San Francisco', 'Los Angeles', 'Chicago', 'Boston', 'Other'],
          'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Other'],
          'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Other'],
          'France': ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Other'],
          'Other': ['Other']
        };

        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Lokasyon</h2>
              <p>Konum bilgilerinizi belirtin</p>
            </div>
            
            <div className="form-fields">
              <div className="input-group">
                <label>Ülke</label>
                <div className="select-wrapper">
                  <select
                    value={formData.location.country}
                    onChange={(e) => {
                      updateFormData('location.country', e.target.value);
                      updateFormData('location.city', ''); // Reset city when country changes
                    }}
                    required
                  >
                    <option value="">Seçiniz...</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.location.country && (
                <div className="input-group">
                  <label>Şehir</label>
                  <div className="select-wrapper">
                    <select
                      value={formData.location.city}
                      onChange={(e) => updateFormData('location.city', e.target.value)}
                      required
                    >
                      <option value="">Seçiniz...</option>
                      {cities[formData.location.country as keyof typeof cities]?.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="input-group">
                <label>Tercih Edilen Dil</label>
                <div className="select-wrapper">
                  <select
                    value={formData.location.preferredLanguage}
                    onChange={(e) => updateFormData('location.preferredLanguage', e.target.value)}
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                    <option value="both">Her İkisi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      // Preferences
      case 'preferences':
        return (
          <div className="step-content form-step">
            <div className="step-header">
              <CurrentIcon className="step-header-icon" size={24} />
              <h2>Tercihler</h2>
              <p>Deneyiminizi kişiselleştirin</p>
            </div>
            
            <div className="form-fields">
              <div className="preference-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.preferences.notifications.newMatches}
                    onChange={(e) => updateFormData('preferences.notifications.newMatches', e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    <strong>Yeni Eşleşmeler</strong>
                    <span className="checkbox-desc">Size uygun yeni eşleşmeler için bildirim al</span>
                  </span>
                </label>
              </div>

              <div className="preference-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.preferences.notifications.projectInvitations}
                    onChange={(e) => updateFormData('preferences.notifications.projectInvitations', e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    <strong>Proje Davetleri</strong>
                    <span className="checkbox-desc">Yeni proje davetleri için bildirim al</span>
                  </span>
                </label>
              </div>

              <div className="preference-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.preferences.notifications.messages}
                    onChange={(e) => updateFormData('preferences.notifications.messages', e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    <strong>Mesajlar</strong>
                    <span className="checkbox-desc">Yeni mesajlar için bildirim al</span>
                  </span>
                </label>
              </div>

              <div className="preference-group">
                <label>Profil Görünürlüğü</label>
                <div className="select-wrapper">
                  <select
                    value={formData.preferences.profileVisibility}
                    onChange={(e) => updateFormData('preferences.profileVisibility', e.target.value)}
                  >
                    <option value="public">Herkes Görebilir</option>
                    <option value="contacts-only">Sadece Bağlantılarım</option>
                    <option value="private">Gizli</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      // Complete
      case 'complete':
        return (
          <div className="step-content complete-step">
            <div className="complete-animation">
              <div className="success-circle">
                <Check size={48} strokeWidth={3} />
              </div>
            </div>
            <h2>Tamamlandı!</h2>
            <p className="step-description">
              Profiliniz başarıyla oluşturuldu. {formData.connectGitHub && 'GitHub profiliniz tarandıktan sonra '}
              Size en uygun eşleşmeleri görebileceksiniz!
            </p>
            <div className="complete-summary">
              <div className="summary-item">
                <User size={20} />
                <span>{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="summary-item">
                <Mail size={20} />
                <span>{formData.email}</span>
              </div>
              <div className="summary-item">
                <Target size={20} />
                <span>
                  {formData.role === 'developer' ? 'Yazılımcı' :
                   formData.role === 'employer' ? 'İşveren' :
                   formData.role === 'freelancer' ? 'Freelancer' : 'Öğrenci'}
                </span>
              </div>
              {formData.location.country && (
                <div className="summary-item">
                  <MapPin size={20} />
                  <span>{formData.location.city}, {formData.location.country}</span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container onboarding-dark" ref={containerRef}>
      
      {/* Left Panel - Progress & Info */}
      <div className="onboarding-left-panel" ref={leftPanelRef}>
        <div className="left-panel-content">
          <StepIndicator 
            steps={steps} 
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
          
          <div className="step-info">
            <div className="step-number">
              {currentStep + 1} / {steps.length}
            </div>
            <h3>{steps[currentStep]?.title}</h3>
            <p>{steps[currentStep]?.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Content */}
      <div className="onboarding-right-panel" ref={rightPanelRef}>
        <div className="right-panel-content">
          <div className="step-content-wrapper" ref={stepContentRef}>
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          {currentStep < steps.length - 1 && (
            <div className="navigation-buttons">
              {currentStep > 0 && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handlePrevious}
                >
                  <ArrowLeft size={18} />
                  Geri
                </button>
              )}
              <button
                type="button"
                className={`btn-primary ${!canProceed() ? 'disabled' : ''}`}
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === steps.length - 2 ? 'Tamamla' : 'İleri'}
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {currentStep === steps.length - 1 && (
            <div className="navigation-buttons">
              <button
                type="button"
                className="btn-primary complete-btn"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    Dashboard'a Git
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
