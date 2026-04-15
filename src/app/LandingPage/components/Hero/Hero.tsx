import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import SearchBar from '../SearchBar/SearchBar';
import './Hero.css';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Animations cleared
    }, { scope: containerRef });

    return (
        <section className="hero-section" ref={containerRef}>
            <div className="hero-background-elements">
                <div className="gradient-sphere sphere-1"></div>
                <div className="gradient-sphere sphere-2"></div>
            </div>

            <div className="hero-content-wrapper">
                <div className="hero-logo-container">
                    
                </div>
            </div>

            {/* Search Bar */}
            <SearchBar />
        </section>
    );
}
