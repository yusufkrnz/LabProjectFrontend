import { useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitBranch, Cpu, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Features.css';
import VectorCluster from './visuals/VectorCluster/VectorCluster';

gsap.registerPlugin(ScrollTrigger);

interface FeatureModule {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: ReactNode;
    stats: string[];
    color: string;
}

const modules: FeatureModule[] = [
    {
        id: 'github-module',
        title: 'GitHub Verified Skills',
        subtitle: 'PROOF OF WORK',
        description: 'Forget resumes. We analyze open-source contributions to verify real-time skills. Your commits are your credentials.',
        icon: <GitBranch size={40} />,
        stats: ['Commit Analysis', 'Fraud Detection'],
        color: '#3b82f6'
    },
    {
        id: 'vector-module',
        title: 'AI Vector Search',
        subtitle: 'SEMANTIC MATCHING',
        description: 'Find developers who fit your engineering culture using high-dimensional vector embeddings.',
        icon: <Cpu size={40} />,
        stats: ['<50ms Latency', 'Context Aware'],
        color: '#8b5cf6'
    },
    {
        id: 'map-module',
        title: 'Global Talent Map',
        subtitle: 'ECOSYSTEM VISUALIZATION',
        description: 'Visualize talent density and tech stacks on an interactive 3D globe.',
        icon: <Globe size={40} />,
        stats: ['Live Clusters', 'Regional Data'],
        color: '#10b981'
    }
];

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>('.feature-pinned-card');

        // Ana Timeline: ScrollTrigger ile Pin'leme
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerRef.current,
                start: "top top",
                end: "+=3000", // 3000px'lik scroll mesafesi boyunca pin'li kal
                pin: true,
                scrub: 1, // Yumuşak geçiş
                snap: 1 / (cards.length - 1), // Kartlara "yapışma" (opsiyonel)
            }
        });

        // Kart Animasyonları
        cards.forEach((card, index) => {
            if (index === 0) return; // İlk kart zaten orada

            tl.fromTo(card,
                { yPercent: 100, opacity: 0 }, // Alttan başla
                { yPercent: 0, opacity: 1, duration: 1 } // Yerine gel
            );
        });

    }, { scope: sectionRef });

    return (
        <section className="features-pinned-section" ref={sectionRef}>
            <div className="pinned-scroll-wrapper" ref={triggerRef}>

                {/* Sağ Taraf: Kartların Sahnesi */}
                <div className="pinned-cards-container">
                    {modules.map((module, index) => (
                        <div key={index} className="feature-pinned-card" style={{ zIndex: index + 1 }}>
                            <div className="card-inner-content">
                                <div className="card-icon-circle" style={{ color: module.color, background: `${module.color}20` }}>
                                    {module.icon}
                                </div>
                                <span className="card-mini-sub">{module.subtitle}</span>
                                <h3 className="card-big-title">{module.title}</h3>
                                <p className="card-text-body">{module.description}</p>

                                <div className="card-stats-row">
                                    {module.stats.map((s, i) => (
                                        <span key={i} className="stat-badge">
                                            <CheckCircle2 size={14} /> {s}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Visual Placeholder */}
                            <div className="card-visual-area" style={{ background: `linear-gradient(135deg, ${module.color}10 0%, ${module.color}05 100%)` }}>
                                {module.id === 'vector-module' ? (
                                    <VectorCluster />
                                ) : (
                                    <div className="abstract-shape" style={{ borderColor: module.color }}></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
