import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import MagicBento from "./components/MagicBento";
import "./LandingPage.css";
// hero background image is set via CSS

export default function LandingPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight;
            const clientHeight = container.clientHeight;
            const maxScroll = scrollHeight - clientHeight;
            const scrollPercentage = scrollTop / Math.max(1, maxScroll);
            const newSection = Math.round(scrollPercentage * 9);
            setCurrentSection(newSection);
        };

        handleScroll();
        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className="landingpage-container" ref={containerRef}>
            <Header />
            {/* Section 1 - Hero */}
            <div className="hero-background bento-section">
                {/* SVG mask tanımı - üst mavi için dalgalı büküm */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                        <clipPath id="topBlueCurve" clipPathUnits="objectBoundingBox">
                            <path d="M 0.661,0 Q 0.68,0.08 0.665,0.15 Q 0.655,0.22 0.675,0.30 Q 0.66,0.38 0.665,0.45 Q 0.67,0.50 0.66,0.55 L 1,0.55 L 1,0 Z" />
                        </clipPath>
                    </defs>
                </svg>
                
                {/* Üst mavi alan */}
                <div className="hero-blue-top"></div>
                {/* Alt mavi alan */}
                <div className="hero-blue-bottom"></div>
                
                <div className="hero-top-fade" />
                <div className="hero-content hero-content--image">
                    <div className="bridge-hero-left">
                        <h1 className="bridge-title">Bridge</h1>
                        <h2 className="bridge-subtitle">İş, ekip ve gelişime giden köprünüz</h2>
                        <div className="bridge-cta-group">
                            <button className="btn-orange">Başla</button>
                            <button className="btn-outline">Daha Fazla</button>
                        </div>
                                        </div>
                                    </div>
                                </div>
            {/* Section 2 - Magic Bento (locked until complete) */}
            <div className="section-white bento-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MagicBento
                    textAutoHide={true}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={true}
                    enableMagnetism={true}
                    clickEffect={true}
                    spotlightRadius={300}
                    particleCount={12}
                    glowColor="37, 99, 235"
                />
            </div>

            {/* Sections - scroll için birden fazla bölüm */}
            {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="section-white bento-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="hero-content">
                        <h2 style={{ fontSize: '3rem', color: '#1A36B0', textAlign: 'center' }}>Section {i + 1}</h2>
                        <p style={{ fontSize: '1.2rem', color: '#666', textAlign: 'center', marginTop: '1rem' }}>
                            Scroll ederek köprünün inşa edilişini izleyin
                        </p>
                    </div>
            </div>
            ))}

            <div className="scroll-indicator">
                <svg width="150" height="40" viewBox="0 0 200 50" className="bridge-progress">
                    {/* Taban çizgi (gri sabit) */}
                    <line x1="0" y1="45" x2="200" y2="45" stroke="#666" strokeWidth="3" opacity="1"/>
                    
                    {/* Ana köprü eğrisi - ilerledikçe tamamlanır */}
                    <path
                        d="M 0,45 Q 50,10 100,45 Q 150,10 200,45"
                        stroke="#1A36B0"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="400"
                        strokeDashoffset={400 - (currentSection / 9) * 400}
                        className="bridge-main"
                    />
                    
                    {/* Direkler - 5 adet, ilerledikçe görünür */}
                    {[0, 2, 4, 6, 8].map((sectionIndex, i) => {
                        const x = 20 + i * 40;
                        const isVisible = currentSection >= sectionIndex;
                        return (
                            <line
                                key={i}
                                x1={x}
                                y1={i % 2 === 0 ? 18 : 12}
                                x2={x}
                                y2="45"
                                stroke="#FFCA29"
                                strokeWidth="3"
                                opacity={isVisible ? 1 : 0}
                                className="bridge-pillar"
                            />
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
