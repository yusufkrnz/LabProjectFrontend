import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Footer from './components/Footer/Footer';
import './LandingPage.css';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Global initialization or background animations can go here
    }, { scope: wrapperRef });

    return (
        <div className="landing-page-wrapper" ref={wrapperRef}>
            <Header />
            <Hero />
            <HowItWorks />
            <Footer />
        </div>
    );
}
