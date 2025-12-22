import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SearchCard from "../../components/SearchCard";
import "./LandingPage.css";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
    const navigate = useNavigate();
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const searchCardRef = useRef<HTMLDivElement>(null);
    const badge1Ref = useRef<HTMLDivElement>(null);
    const badge2Ref = useRef<HTMLDivElement>(null);
    const badge3Ref = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const journeyRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Hero entrance
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
        tl.from(titleRef.current, { y: 100, opacity: 0, duration: 1.2 })
            .from(subtitleRef.current, { y: 50, opacity: 0, duration: 0.8 }, "-=0.6")
            .from(searchCardRef.current, { y: 80, opacity: 0, scale: 0.95, duration: 1 }, "-=0.4")
            .from(circleRef.current, { scale: 0, opacity: 0, rotation: -180, duration: 1.2, ease: "back.out(1.7)" }, "-=0.8")
            .from([badge1Ref.current, badge2Ref.current, badge3Ref.current], {
                scale: 0, opacity: 0, y: 50, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)"
            }, "-=0.6");

        // DIVE INTO CARDS - Zoom Portal Effect
        if (journeyRef.current) {
            const pages = gsap.utils.toArray<HTMLElement>('.journey-page');

            pages.forEach((page, index) => {
                const isLast = index === pages.length - 1;

                // Pin each page
                ScrollTrigger.create({
                    trigger: page,
                    start: "top top",
                    end: isLast ? "bottom bottom" : "+=100%",
                    pin: true,
                    pinSpacing: !isLast,
                });

                if (!isLast) {
                    const nextPage = pages[index + 1];

                    // Current page zooms out and fades (diving away)
                    gsap.to(page, {
                        scrollTrigger: {
                            trigger: page,
                            start: "top top",
                            end: "+=100%",
                            scrub: 1,
                        },
                        scale: 1.5,
                        opacity: 0,
                        filter: "blur(20px)",
                        ease: "power2.in",
                    });

                    // Next page zooms in from distance (diving into)
                    gsap.fromTo(nextPage,
                        {
                            scale: 0.5,
                            opacity: 0,
                            filter: "blur(20px)",
                        },
                        {
                            scrollTrigger: {
                                trigger: page,
                                start: "top top",
                                end: "+=100%",
                                scrub: 1,
                            },
                            scale: 1,
                            opacity: 1,
                            filter: "blur(0px)",
                            ease: "power2.out",
                        }
                    );
                }
            });
        }

        // Other sections
        gsap.utils.toArray<HTMLElement>('.feature-card, .stat-card, .testimonial-card').forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
                y: 80, opacity: 0, duration: 0.8, delay: (i % 4) * 0.15, ease: "power3.out"
            });
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <div className="landing-container">
            {/* Hero */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content-wrapper">
                    <div className="hero-left">
                        <div className="hero-text">
                            <h1 className="hero-title" ref={titleRef}>
                                İş, ekip ve gelişime giden<span className="hero-highlight"> köprünüz</span>
                            </h1>
                            <p className="hero-subtitle" ref={subtitleRef}>
                                Yetenekli profesyonellerle buluşun, projelerinizi hayata geçirin.
                            </p>
                        </div>
                        <div ref={searchCardRef}><SearchCard onSearch={(q, t) => navigate(`/search?q=${encodeURIComponent(q)}&type=${t}`)} /></div>
                    </div>
                    <div className="hero-right">
                        <div className="hero-image-container">
                            <div className="floating-badge badge-1" ref={badge1Ref}><span className="badge-icon">💼</span><span className="badge-text">10K+ Projeler</span></div>
                            <div className="floating-badge badge-2" ref={badge2Ref}><span className="badge-icon">👥</span><span className="badge-text">5K+ Yetenekler</span></div>
                            <div className="floating-badge badge-3" ref={badge3Ref}><span className="badge-icon">⭐</span><span className="badge-text">98% Memnuniyet</span></div>
                            <div className="hero-circle" ref={circleRef}><span className="hero-logo">Bridge</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey - Dive Into Cards */}
            <section className="journey-section" ref={journeyRef}>
                {/* Page 1 */}
                <div className="journey-page page-1">
                    <div className="page-content">
                        <div className="page-number">01</div>
                        <div className="page-icon">📝</div>
                        <h2 className="page-title">Proje Oluştur</h2>
                        <p className="page-description">
                            İhtiyacınızı tanımlayın, bütçenizi belirleyin ve projenizi yayınlayın.
                        </p>
                        <div className="page-features">
                            <div className="feature-badge">✓ Hızlı Form</div>
                            <div className="feature-badge">✓ Bütçe Kontrolü</div>
                            <div className="feature-badge">✓ Kategori Seçimi</div>
                        </div>
                        <div className="page-visual">
                            <div className="visual-card">
                                <div className="card-header">Yeni Proje</div>
                                <div className="card-line"></div>
                                <div className="card-line short"></div>
                                <div className="card-line"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page 2 */}
                <div className="journey-page page-2">
                    <div className="page-content">
                        <div className="page-number">02</div>
                        <div className="page-icon">🔍</div>
                        <h2 className="page-title">Yetenek Bul</h2>
                        <p className="page-description">
                            AI destekli eşleştirme ile size en uygun profesyonelleri bulun.
                        </p>
                        <div className="page-features">
                            <div className="feature-badge">✓ AI Eşleştirme</div>
                            <div className="feature-badge">✓ Portfolyo</div>
                            <div className="feature-badge">✓ Mesajlaşma</div>
                        </div>
                        <div className="page-visual">
                            <div className="visual-profiles">
                                <div className="profile-mini">👨‍💻</div>
                                <div className="profile-mini">👩‍🎨</div>
                                <div className="profile-mini">👨‍💼</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page 3 */}
                <div className="journey-page page-3">
                    <div className="page-content">
                        <div className="page-number">03</div>
                        <div className="page-icon">🤝</div>
                        <h2 className="page-title">İşbirliği Yap</h2>
                        <p className="page-description">
                            Seçtiğiniz yetenekle anlaşın, milestone'ları belirleyin.
                        </p>
                        <div className="page-features">
                            <div className="feature-badge">✓ Sözleşme</div>
                            <div className="feature-badge">✓ Milestone</div>
                            <div className="feature-badge">✓ Escrow</div>
                        </div>
                        <div className="page-visual">
                            <div className="visual-handshake">
                                <div className="handshake-icon">🤝</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page 4 */}
                <div className="journey-page page-4">
                    <div className="page-content">
                        <div className="page-number">04</div>
                        <div className="page-icon">🚀</div>
                        <h2 className="page-title">Başarıya Ulaş</h2>
                        <p className="page-description">
                            Proje ilerlemesini takip edin, başarılı teslimat yapın.
                        </p>
                        <div className="page-features">
                            <div className="feature-badge">✓ Takip</div>
                            <div className="feature-badge">✓ Kalite</div>
                            <div className="feature-badge">✓ Değerlendirme</div>
                        </div>
                        <div className="page-visual">
                            <div className="visual-success">
                                <div className="success-icon">⭐</div>
                                <div className="success-text">Tamamlandı!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Neden Bridge?</h2>
                        <p className="section-subtitle">İşinizi büyütmek için ihtiyacınız olan her şey</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3 className="feature-title">Doğru Eşleşme</h3>
                            <p className="feature-description">AI destekli eşleştirme sistemi.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3 className="feature-title">Hızlı Başlangıç</h3>
                            <p className="feature-description">Dakikalar içinde başlayın.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3 className="feature-title">Güvenli Ödeme</h3>
                            <p className="feature-description">Escrow sistemi.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3 className="feature-title">Raporlama</h3>
                            <p className="feature-description">Gerçek zamanlı takip.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials-section">
                <div className="section-container">
                    <div className="section-header">
                        <h2 className="section-title">Müşterilerimiz Ne Diyor?</h2>
                    </div>
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <p className="testimonial-text">"Harika bir platform!"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">👨‍💼</div>
                                <div><div className="author-name">Ahmet Y.</div><div className="author-role">CEO</div></div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <p className="testimonial-text">"Çok kullanıcı dostu."</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">👩‍💻</div>
                                <div><div className="author-name">Zeynep K.</div><div className="author-role">Developer</div></div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                            <p className="testimonial-text">"Güvenli sistem!"</p>
                            <div className="testimonial-author">
                                <div className="author-avatar">👨‍🎨</div>
                                <div><div className="author-name">Can D.</div><div className="author-role">Designer</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats-section">
                <div className="section-container">
                    <div className="stats-grid">
                        <div className="stat-card"><div className="stat-number">10K+</div><div className="stat-label">Kullanıcı</div></div>
                        <div className="stat-card"><div className="stat-number">5K+</div><div className="stat-label">Proje</div></div>
                        <div className="stat-card"><div className="stat-number">98%</div><div className="stat-label">Memnuniyet</div></div>
                        <div className="stat-card"><div className="stat-number">24/7</div><div className="stat-label">Destek</div></div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2 className="cta-title">Hemen Başlayın</h2>
                    <p className="cta-subtitle">Ücretsiz hesap oluşturun.</p>
                    <div className="cta-buttons">
                        <button className="cta-btn primary" onClick={() => navigate('/login')}>Başla</button>
                        <button className="cta-btn secondary">Bilgi</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
