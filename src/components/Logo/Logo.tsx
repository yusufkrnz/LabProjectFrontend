import { SVGProps } from 'react';
import './Logo.css';

interface LogoProps extends SVGProps<SVGSVGElement> {
    className?: string;
    variant?: 'dark' | 'light' | 'blue';
}

export default function Logo({ className = '', variant = 'dark', ...props }: LogoProps) {
    const textColor = variant === 'dark' ? '#1a2830' : variant === 'light' ? '#ffffff' : '#8cb9d5';
    const iconColorPrimary = variant === 'dark' ? '#1a2830' : variant === 'light' ? '#ffffff' : '#2a5a75';
    const iconColorSecondary = '#8cb9d5';

    return (
        <div className={`ne-logo-container ${className}`}>
            <svg 
                width="36" 
                height="36" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="ne-logo-icon"
                {...props}
            >
                <rect width="100" height="100" rx="20" fill="transparent"/>
                {/* The "n" shape */}
                <path d="M25 75V35C25 25 35 25 45 25C55 25 55 35 55 45V75" stroke={iconColorPrimary} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                {/* The Eureka "Spark" / "E" element intersecting */}
                <path d="M75 25H50M75 50H50M75 75H50" stroke={iconColorSecondary} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="75" cy="25" r="6" fill={iconColorSecondary} />
            </svg>
            <span className="ne-logo-text" style={{ color: textColor }}>
                <span className="ne-bold">now</span><span className="ne-light" style={{ color: iconColorSecondary }}>Eureka</span>
            </span>
        </div>
    );
}
