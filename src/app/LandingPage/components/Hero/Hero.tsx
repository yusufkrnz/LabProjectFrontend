import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Phone, Search } from 'lucide-react';
import Logo from '../../../../components/Logo/Logo';
import './Hero.css';

export default function Hero() {
    const [isFirstVisit] = useState(true); // Temporarily true for testing every refresh

    useEffect(() => {
        if (isFirstVisit && typeof window !== 'undefined') {
            sessionStorage.setItem('doorAnimationPlayed', 'true');
        }
    }, [isFirstVisit]);

    const containerRef = useRef<HTMLDivElement>(null);
    const leftDoorRef = useRef<HTMLDivElement>(null);
    const rightDoorRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!isFirstVisit) {
            gsap.set(contentRef.current, { scale: 1, opacity: 1, filter: 'blur(0px)' });
            return;
        }

        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = '';
                gsap.set('.ss-doors-container', { display: 'none' });
            }
        });

        tl.fromTo('.split-logo',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
        )
            .to(leftDoorRef.current, {
                rotationY: 110,
                ease: "power2.inOut",
                opacity: 0,
                duration: 1.5
            }, "+=0.8")
            .to(rightDoorRef.current, {
                rotationY: -110,
                ease: "power2.inOut",
                opacity: 0,
                duration: 1.5
            }, "<")
            .fromTo(contentRef.current,
                { scale: 0.7, opacity: 0, filter: 'blur(20px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', ease: "power2.out", duration: 1.2 },
                "-=1.2"
            );

    }, { scope: containerRef, dependencies: [isFirstVisit] });

    return (
        <section className={`ss-hero-section perspective ${!isFirstVisit ? 'no-pin' : ''}`} ref={containerRef}>

            {isFirstVisit && (
                <div className="ss-doors-container">
                    <div className="ss-door door-left" ref={leftDoorRef}>
                        <div className="door-inner left-inner">
                            <div className="door-content-wrapper left-wrapper">
                                <img src="/noweurekalogo.png" alt="nowEureka Logo" className="door-logo-img split-logo" />
                                <h1 className="door-brand-name split-logo">nowEureka</h1>
                                <h2 className="door-call">Eureka Anınıza Kapıyı Aralayın.</h2>
                            </div>
                        </div>
                    </div>

                    <div className="ss-door door-right" ref={rightDoorRef}>
                        <div className="door-inner right-inner">
                            <div className="door-content-wrapper right-wrapper">
                                <img src="/noweurekalogo.png" alt="nowEureka Logo" className="door-logo-img split-logo" />
                                <h1 className="door-brand-name split-logo">nowEureka</h1>
                                <h2 className="door-call">Eureka Anınıza Kapıyı Aralayın.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="ss-card-wrapper" ref={contentRef}>
                <div className="ss-card">
                    <div className="ss-pinstripes"></div>

                    <header className="ss-header">
                        <Link to="/" className="ss-brand-link">
                            <img src="/noweurekalogo.png" alt="nowEureka Logo" className="ss-logo-img" />
                            <div className="ss-brand-text">
                                <span className="ss-bold">now</span><span className="ss-light">Eureka</span>
                            </div>
                        </Link>

                        <nav className="ss-nav">
                            <a href="#how-it-works">Nasıl Çalışır?</a>
                            <a href="#features">Özellikler</a>
                            <a href="#pricing">Çözümler</a>
                            <Link to="/login">Giriş Yap</Link>
                        </nav>

                        <button className="ss-contact-btn">
                            <Phone size={18} />
                        </button>
                    </header>

                    <div className="ss-content">
                        <div className="waitlist-badge">✨ Yapay Zeka Destekli Freelancer Ağı</div>
                        <h1 className="ss-main-title">İşini Büyütecek<br />Mükemmel Yeteneği Bul.</h1>
                        <p className="ss-subtitle">
                            Projeniz için en iyi bağımsız profesyonelleri AI algoritmamızla keşfedin,<br />
                            doğru eşleşmeyi sağlayıp anında çalışmaya başlayın.
                        </p>

                        <div className="ss-search-container">
                            <form className="ss-search-box" onSubmit={(e) => e.preventDefault()}>
                                <Search className="search-icon" size={20} />
                                <input type="text" placeholder="Hangi alanda yetenek arıyorsunuz? (Örn: React, UI Tasarım)" />
                                <button type="submit" className="ss-search-btn">Ara</button>
                            </form>
                            <div className="ss-popular-tags">
                                <span>Popüler:</span>
                                <a href="#ui">UI/UX Tasarım</a>
                                <a href="#frontend">Frontend Geliştirme</a>
                                <a href="#logo">Logo Tasarım</a>
                                <a href="#seo">SEO Uyumu</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

