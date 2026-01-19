import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Header.css';

export default function LandingHeader() {
    const headerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.set(headerRef.current, { y: -100, opacity: 0 });
        gsap.to(headerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        });
    }, { scope: headerRef });

    return (
        <header className="noweureka-landing-page-header" ref={headerRef}>
            <div className="noweureka-header-content-wrapper">
                {/* Logo */}
                <Link to="/" className="noweureka-brand-logo-link">
                    <span className="noweureka-logo-text">
                        now<span className="noweureka-logo-highlight">Eureka</span>
                    </span>
                </Link>

                {/* Navigation Links */}
                <nav className="noweureka-primary-navigation">
                    <a href="#features" className="noweureka-nav-link">Features</a>
                    <a href="#about" className="noweureka-nav-link">About</a>
                    <a href="#community" className="noweureka-nav-link">Community</a>
                </nav>

                {/* Authentication Buttons */}
                <div className="noweureka-auth-buttons-container">
                    <Link to="/login" className="noweureka-login-button">Log In</Link>
                    <Link to="/signup" className="noweureka-signup-button">Get Started</Link>
                </div>
            </div>
        </header>
    );
}
