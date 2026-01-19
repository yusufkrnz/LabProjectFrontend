import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import SearchBar from '../SearchBar/SearchBar';
import './Hero.css';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Initial setup
        // gsap.set(titleRef.current, { y: 50, opacity: 0 });

        // Animation Sequence
        // tl.to(titleRef.current, { y: 0, opacity: 1, duration: 1, delay: 0.3 });

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
