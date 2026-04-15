import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Network, BellRing, Briefcase, SearchCode, MessageSquareCode } from 'lucide-react';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

const flows = {
    talent: [
        {
            icon: <Github size={32} />,
            title: "Kayıt & YZ Analizi",
            description: "Sisteme dahil olursun. Yapay zeka tüm geçmişini ve teknoloji yığınını analiz ederek gerçek yetenek modelini çıkarır.",
            color: "#3b82f6"
        },
        {
            icon: <Network size={32} />,
            title: "Vektörel Konumlandırma",
            description: "Yeteneklerine en uygun 'developer kümesine' (Cluster) matematiksel olarak yerleştirilirsin.",
            color: "#8b5cf6"
        },
        {
            icon: <BellRing size={32} />,
            title: "Semantik Eşleşme",
            description: "Sisteme düşen her yeni proje anında vektörel taranır. Tam senin alanına göre bir ilanda anında bildirim alırsın.",
            color: "#10b981"
        }
    ],
    client: [
        {
            icon: <Briefcase size={32} />,
            title: "İlan veya Proje Belirleme",
            description: "Aradığın stajyer, çalışan veya yaptırmak istediğin projeyi özellikleriyle sisteme girersin.",
            color: "#f59e0b"
        },
        {
            icon: <SearchCode size={32} />,
            title: "YZ Küme Taraması",
            description: "Yapay zeka motorumuz, tam aradığın teknoloji yığınına uyan adayları geniş veri tabanından anında filtreler.",
            color: "#f43f5e"
        },
        {
            icon: <MessageSquareCode size={32} />,
            title: "Nokta Atışı Eşleşme",
            description: "Yığınla CV incelemeden doğrudan YZ'nin belirlediği en ideal yeteneklerle iletişime geçer ve çalışmaya başlarsın.",
            color: "#0ea5e9"
        }
    ]
};

export default function HowItWorks() {
    const [activeTab, setActiveTab] = useState<'talent' | 'client'>('talent');
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    // Animasyonları tetiklemek için aktif tab değiştiğinde GSAP çalıştır
    useGSAP(() => {
        if (!timelineRef.current) return;

        const cards = gsap.utils.toArray<HTMLElement>('.hiw-horizontal-card');
        const lineFill = timelineRef.current.querySelector('.hiw-horizontal-line-fill') as HTMLElement;

        // Reset
        gsap.set(cards, { y: 30, opacity: 0 });
        gsap.set(lineFill, { width: "0%" });

        // Tab Değişim Animasyonu
        const tl = gsap.timeline();
        tl.to(lineFill, { width: "100%", duration: 1, ease: "power2.inOut" }, 0)
          .to(cards, { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "back.out(1.7)" }, 0.2);

    }, { scope: containerRef, dependencies: [activeTab] });

    return (
        <section className="how-it-works-section" ref={containerRef}>
            <div className="hiw-header">
                <span className="hiw-eyebrow">Nasıl Çalışır?</span>
                <h2 className="hiw-title">Yetenekten Projeye Giden Yol</h2>
                <p className="hiw-subtitle">
                    Yapay zeka altyapımızla sıradan özgeçmişleri ortadan kaldırıyor, doğru insanı doğru işle buluşturuyoruz.
                </p>
                
                {/* Tab Switcher */}
                <div className="hiw-tabs-container">
                    <button 
                        className={`hiw-tab-btn ${activeTab === 'talent' ? 'active' : ''}`}
                        onClick={() => setActiveTab('talent')}
                    >
                        Yetenekler İçin
                    </button>
                    <button 
                        className={`hiw-tab-btn ${activeTab === 'client' ? 'active' : ''}`}
                        onClick={() => setActiveTab('client')}
                    >
                        İş & Proje Verenler İçin
                    </button>
                </div>
            </div>

            <div className="hiw-horizontal-wrapper" ref={timelineRef}>
                <div className="hiw-horizontal-line-bg"></div>
                <div className="hiw-horizontal-line-fill"></div>

                <div className="hiw-horizontal-grid">
                    {flows[activeTab].map((step, index) => (
                        <div key={`${activeTab}-${index}`} className="hiw-horizontal-card">
                            <div className="hiw-node-indicator" style={{ borderColor: step.color }}></div>
                            <div className="hiw-icon-wrapper" style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                                {step.icon}
                            </div>
                            <h3 className="hiw-step-title">{step.title}</h3>
                            <p className="hiw-step-desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
