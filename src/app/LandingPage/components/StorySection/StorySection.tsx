import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Cpu, Zap, ShieldCheck, Target } from 'lucide-react';
import './StorySection.css';

export default function StorySection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo('.story-card', 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                stagger: 0.2, 
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <section className="story-section" ref={sectionRef}>
            <div className="story-container">
                <div className="story-header">
                    <span className="story-badge">Hesap Verilebilir Eşleşme</span>
                    <h2>CV'nin Ötesine, Kodun Derinine. <br/><span>Rakamlarla Objektif Yetenek.</span></h2>
                    <p>Sadece ne yazdığınız değil, ne yaptığınız da önemli. GitHub reposu analizi ve semantik deneyim taramasıyla, yeteneğinizi matematiksel bir kesinlikte doğruluyoruz.</p>
                </div>

                <div className="story-grid">
                    <div className="story-card">
                        <div className="story-icon-box">
                            <Cpu size={32} />
                        </div>
                        <h3>GitHub & CV Füzyonu</h3>
                        <p>Statik özgeçmişinizi, aktif GitHub depolarınızla birleştiriyoruz. Kod kaliteniz ve teknik derinliğiniz yapay zekamız tarafından anlık taranır.</p>
                    </div>

                    <div className="story-card active">
                        <div className="story-icon-box highlighter">
                            <Zap size={32} />
                        </div>
                        <h3>360° Vektörel Konum</h3>
                        <p>Sadece teknik değil, iletişim ve problem çözme gibi soft skill'lerinizi de vektörel haritamıza ekliyoruz. Tam profillere tam eşleşme.</p>
                    </div>

                    <div className="story-card">
                        <div className="story-icon-box">
                            <ShieldCheck size={32} />
                        </div>
                        <h3>Hesap Verilebilir Veri</h3>
                        <p>Karar mekanizmalarımız şeffaftır. Neden öne çıktığınızı, hangi yetenek kümesinde olduğunuzu somut verilerle takip edin.</p>
                    </div>

                    <div className="story-card">
                        <div className="story-icon-box">
                            <Target size={32} />
                        </div>
                        <h3>Objektif Puanlama</h3>
                        <p>İnsan öznelliğini sistemden çıkarıyoruz. Her aday, global standartlarda ve GitHub verileriyle desteklenen bir puanlama ile listelenir.</p>
                    </div>
                </div>

                <div className="story-trust-cloud">
                    <p>Modern ekiplerin tercihi</p>
                    <div className="trust-logos">
                        <span>TECH-LAB</span>
                        <span>AI-CORE</span>
                        <span>NEXUS-SOFT</span>
                        <span>VORTEX-DATA</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
