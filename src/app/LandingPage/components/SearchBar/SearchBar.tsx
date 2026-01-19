import { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import './SearchBar.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Arama Modları (Intent)
const searchModes = [
    { id: 'talent', label: 'Find Talent', slogan: 'ideal candidate', placeholder: 'Skills, job title, or role...' },
    { id: 'jobs', label: 'Find Jobs', slogan: 'dream job', placeholder: 'Job title, company, or keywords...' },
    { id: 'freelance', label: 'Freelance', slogan: 'perfect gig', placeholder: 'Project type, skill, or service...' }
];

export default function SearchBar() {
    const [activeMode, setActiveMode] = useState(searchModes[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    // Toggle Değişiminde Animasyon
    const handleModeChange = (mode: typeof searchModes[0], index: number) => {
        setActiveMode(mode);

        // Sliding Background Animation (Manuel basit hesaplama yerine CSS variable ile daha temiz olabilir ama GSAP ile yumuşak geçiş yapalım)
        if (bgRef.current) {
            gsap.to(bgRef.current, {
                x: index * 100 + '%', // %100 genişlik varsayımıyla (her buton eşit)
                duration: 0.4,
                ease: "back.out(1.7)"
            });
        }
    };

    useGSAP(() => {
        gsap.from(containerRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div className="search-section-wrapper" ref={containerRef}>

            {/* 1. Header Text (Outside the Card) */}
            <div className="search-header-text">
                <h2 className="search-main-title">
                    Eureka! You found your{' '}
                    <span className="mode-highlight-text">
                        {activeMode.slogan}
                    </span>.
                </h2>
                <p className="search-subtitle">
                    Connect with the best {activeMode.id === 'jobs' ? 'companies' : 'professionals'} in the galaxy.
                </p>
            </div>

            {/* 2. Interactive Toggle (Segmented Control) */}
            <div className="toggle-container-wrapper">
                <div className="toggle-bg-pill" ref={bgRef}></div>
                {searchModes.map((mode, index) => (
                    <button
                        key={mode.id}
                        className={`toggle-option ${activeMode.id === mode.id ? 'active' : ''}`}
                        onClick={() => handleModeChange(mode, index)}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

            {/* 3. Clean Input Bar */}
            <div className="clean-search-bar">
                <div className="clean-input-wrapper">
                    <Search className="clean-search-icon" size={20} />
                    <input
                        type="text"
                        className="clean-input"
                        placeholder={activeMode.placeholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="clean-submit-btn">
                    Search
                </button>
            </div>

        </div>
    );
}
