import React, { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Scroll takibi (Header arkaplan değişimi için)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`landing-header ${scrolled ? "scrolled" : ""}`}>
            <div className="header-container">
                {/* Logo */}
                <div className="logo">
                    <span className="logo-icon">🌉</span>
                    <span className="logo-text">Bridge</span>
                </div>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <a href="#features">Özellikler</a>
                    <a href="#how-it-works">Nasıl Çalışır?</a>
                    <a href="#pricing">Fiyatlandırma</a>
                </nav>

                {/* Auth Buttons */}
                <div className="auth-buttons">
                    <button className="btn-login" onClick={() => window.location.href = '/login'}>Giriş Yap</button>
                    <button className="btn-register" onClick={() => window.location.href = '/register'}>Kayıt Ol</button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            {menuOpen && (
                <div className="mobile-nav">
                    <button className="close-menu" onClick={() => setMenuOpen(false)}>×</button>
                    <a href="#features" onClick={() => setMenuOpen(false)}>Özellikler</a>
                    <a href="#how-it-works" onClick={() => setMenuOpen(false)}>Nasıl Çalışır?</a>
                    <a href="#pricing" onClick={() => setMenuOpen(false)}>Fiyatlandırma</a>
                    <hr />
                    <button className="btn-login" onClick={() => window.location.href = '/login'}>Giriş Yap</button>
                </div>
            )}
        </header>
    );
}
