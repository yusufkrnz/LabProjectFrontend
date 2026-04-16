import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, Network, BellRing } from 'lucide-react';
import './HowItWorks.css';

const steps = [
    {
        title: "CV & GitHub Füzyonu",
        desc: "Özgeçmişinizi GitHub repolarınızla birleştirin. AI kod kalitenizi ve teknik geçmişinizi saniyeler içinde analiz eder.",
        color: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
        icon: <Sparkles size={48} strokeWidth={1.5} />
    },
    {
        title: "360° Vektörel Konum",
        desc: "Hard ve Soft skill'leriniz matematiksel vektörlere dönüşür, pazarın en doğru kümesine objektif olarak yerleştirilirsiniz.",
        color: "linear-gradient(135deg, #ff9a9e, #fecfef)",
        icon: <Network size={48} strokeWidth={1.5} />
    },
    {
        title: "Hesap Verilebilir Bağlantı",
        desc: "Neden eşleştiğinizi bildiğiniz, her verinin doğrulanabilir olduğu şeffaf bir platformda projelerle tanışın.",
        color: "linear-gradient(135deg, #e0c3fc, #8ec5fc)",
        icon: <BellRing size={48} strokeWidth={1.5} />
    }
];

export default function HowItWorks() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.fromTo('.ag-card-wrapper', 
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%'
            }}
        );
    }, { scope: containerRef });

    return (
        <section className="how-it-works-alterego" ref={containerRef} id="how-it-works">
            <div className="ag-header">
                <h2>Yetenekten Projeye Giden Yol</h2>
                <p>Sistemin nasıl çalıştığını tek bakışta gör. Yapay zeka senin için çalışsın.</p>
            </div>

            <div className="ag-cards-grid">
                {steps.map((step, index) => (
                    <div className="ag-card-wrapper" key={index}>
                        
                        <div className="ag-holographic-glow"></div>
                        
                        <div className="ag-backdrop-silhouettes">
                            <div className="ag-blob ag-blob-1" style={{ background: step.color }}></div>
                            <div className="ag-blob ag-blob-2"></div>
                        </div>

                        <div className="ag-glass-panel">
                            <div className="ag-inner-content">
                                <div className="ag-icon-wrapper">
                                    {step.icon}
                                </div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        </div>

                        <div className="ag-notch-cutout">
                        </div>
                        <div className="ag-pill-btn static">
                            ADIM 0{index + 1}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="ag-footer-info">
                <span className="ag-footer-text left">
                    <img src="/noweurekalogo.png" alt="nowEureka Logo" className="ag-mini-logo" /> 
                    nowEureka
                </span>
                <span className="ag-footer-text right">YZ_Eşleşme_Sistemi</span>
            </div>
        </section>
    );
}
