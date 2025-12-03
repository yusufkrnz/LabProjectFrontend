import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
  watermark?: string; // faint background brand text
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  lockUntilComplete?: boolean; // prevent leaving section until all cards revealed
  snapToNextOnComplete?: boolean; // snap-scroll to next section when complete
  lockAnchorSelector?: string; // optional anchor inside section that enables the lock when reached
  lockAnchorThreshold?: number; // 0..1 of viewport height where anchor triggers lock
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const cardData: BentoCardProps[] = [
  { color: '#060010', title: 'Freelancer Dostu', description: 'Esnek iş modelleri, güvenli ödeme ve profil puanı ile destek.', label: 'Freelancers', watermark: 'GitHub' },
  { color: '#060010', title: 'Geliştiriciyi Güçlendir', description: 'Repo analizleri, issue-match ve task önerisi ile hız kazandır.', label: 'Developers', watermark: 'GitHub' },
  { color: '#060010', title: 'İşveren Güveni', description: 'Doğrulanmış profiller, proje pipeline ve hızlı eşleştirme.', label: 'Employers', watermark: 'HF' },
  { color: '#060010', title: 'Yetenek Arayanlar', description: 'Kriter bazlı arama, shortlist ve görüşme planlama tek ekranda.', label: 'Talent', watermark: 'LinkedIn' },
  { color: '#060010', title: 'Öğren & Katıl', description: 'Projeye katıl, mentor bul, gerçek dünyada öğren.', label: 'Learners', watermark: 'Kaggle' },
  { color: '#060010', title: 'AI Destekli Eşleştirme', description: 'Profil sinyalleriyle akıllı öneriler: ekip, proje, iş.', label: 'Matchmaking', watermark: 'HF' },
  { color: '#060010', title: 'Topluluk & Projeler', description: 'Hackathonlar, açık kaynak ve domain bazlı kanallar.', label: 'Community', watermark: 'OSS' },
  { color: '#060010', title: 'Portföy & İtibar', description: 'Rozetler, metrikler, başarı hikâyeleriyle görünürlüğünü artır.', label: 'Portfolio', watermark: 'GitHub' }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) {
      initializeParticles();
    }
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });
        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;
    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
      }
    };
    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      }
      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(element, { rotateX, rotateY, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      }
      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        magnetismAnimationRef.current = gsap.to(element, { x: magnetX, y: magnetY, duration: 0.3, ease: 'power2.out' });
      }
    };
    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);
    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`particle-container ${className}`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);
  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.magic-bento-card');
      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(card => { (card as HTMLElement).style.setProperty('--glow-intensity', '0'); });
        return;
      }
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;
      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);
        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance) glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });
      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
    };
    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.magic-bento-card').forEach(card => { (card as HTMLElement).style.setProperty('--glow-intensity', '0'); });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);
  return null;
};

const BentoCardGrid: React.FC<{ children: React.ReactNode; gridRef?: React.RefObject<HTMLDivElement | null>; }> = ({ children, gridRef }) => (
  <div className="card-grid" ref={gridRef}>
    {children}
    {/* Anchor inside section to trigger locking when it reaches threshold */}
    <div className="bridge-anchor" aria-hidden="true" />
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  lockUntilComplete = true,
  snapToNextOnComplete = false,
  lockAnchorSelector = '.bridge-anchor',
  lockAnchorThreshold = 0.9
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  // Scroll-reveal: reveal one card per scroll gesture while section is in view
  useEffect(() => {
    if (shouldDisableAnimations) return;
    document.body.classList.add('js-enabled');
    const grid = gridRef.current;
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll('.magic-bento-card')) as HTMLElement[];
    cards.forEach((c) => {
      c.classList.remove('reveal-in');
      c.classList.add('reveal-init');
    });

    let revealed = 0;
    let lastRevealTs = 0;
    const minIntervalMs = 200; // throttle per gesture

    const isInView = () => {
      const section = grid.closest('.bento-section');
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Consider in view if top is above 85% viewport and bottom below 15%
      return rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
    };

    // Lock becomes active only after a specific anchor inside the section (e.g., the bridge at bottom-left) enters threshold
    const isLockActive = () => {
      if (!lockUntilComplete) return false;
      const section = grid.closest('.bento-section');
      if (!section) return false;
      // Only lock on the second section (index 1)
      const allSections = Array.from(document.querySelectorAll('.bento-section')) as HTMLElement[];
      const sectionIndex = allSections.indexOf(section as HTMLElement);
      if (sectionIndex !== 1) return false;
      // Early lock as soon as section top gets near viewport
      const secRect = (section as HTMLElement).getBoundingClientRect();
      const vh2 = window.innerHeight || document.documentElement.clientHeight;
      if (secRect.top <= vh2 * lockAnchorThreshold) return true;
      const anchor = (section as HTMLElement).querySelector(lockAnchorSelector) as HTMLElement | null;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!anchor) {
        // fallback: activate once the section top passes threshold of viewport
        const rect = (section as HTMLElement).getBoundingClientRect();
        return rect.top <= vh * lockAnchorThreshold;
      }
      const rect = anchor.getBoundingClientRect();
      return rect.top <= vh * lockAnchorThreshold;
    };

    const revealNext = () => {
      if (revealed >= cards.length) return;
      const now = Date.now();
      if (now - lastRevealTs < minIntervalMs) return;
      const el = cards[revealed];
      el.classList.add('reveal-in');
      el.classList.remove('reveal-init');
      revealed += 1;
      lastRevealTs = now;
    };

    // Ensure at least the first card is visible immediately
    revealNext();

    const enforceSectionLock = () => {
      if (!lockUntilComplete) return;
      const section = grid.closest('.bento-section') as HTMLElement | null;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const sectionTop = window.scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;
      const minScroll = sectionTop;
      const maxScroll = Math.max(sectionTop, sectionBottom - vh);
      // Pin to vertical center of the section while locked
      const centerScroll = Math.min(maxScroll, Math.max(minScroll, sectionTop + Math.max(0, (rect.height - vh) / 2)));
      if (Math.abs(window.scrollY - centerScroll) > 2) {
        window.scrollTo({ top: centerScroll, behavior: 'instant' as any });
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!isInView()) return;
      if (e.deltaY > 0) {
        if (revealed < cards.length && isLockActive()) {
          e.preventDefault();
          revealNext();
          enforceSectionLock();
        } else if (revealed >= cards.length && snapToNextOnComplete) {
          const section = grid.closest('.bento-section');
          const nextSection = section?.nextElementSibling as HTMLElement | null;
          if (nextSection) {
            e.preventDefault();
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else if (e.deltaY < 0 && isLockActive()) {
        enforceSectionLock();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (!isInView()) return;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isInView()) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (deltaY > 10) {
        if (revealed < cards.length && isLockActive()) {
          e.preventDefault();
          revealNext();
          enforceSectionLock();
        } else if (revealed >= cards.length && snapToNextOnComplete) {
          const section = grid.closest('.bento-section');
          const nextSection = section?.nextElementSibling as HTMLElement | null;
          if (nextSection) {
            e.preventDefault();
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isInView()) return;
      const keys = ['ArrowDown', 'PageDown', 'Space', ' '];
      if (keys.includes(e.key)) {
        if (revealed < cards.length && isLockActive()) {
          e.preventDefault();
          revealNext();
          enforceSectionLock();
        } else if (revealed >= cards.length && snapToNextOnComplete) {
          const section = grid.closest('.bento-section');
          const nextSection = section?.nextElementSibling as HTMLElement | null;
          if (nextSection) {
            e.preventDefault();
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    };

    const onScroll = () => {
      if (!isInView() || revealed >= cards.length || !isLockActive()) return;
      enforceSectionLock();
    };

    const scrollRoot: any = document.querySelector('.landingpage-container') || window;
    scrollRoot.addEventListener('wheel', onWheel, { passive: false });
    scrollRoot.addEventListener('touchstart', onTouchStart, { passive: true });
    scrollRoot.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    scrollRoot.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scrollRoot.removeEventListener('wheel', onWheel as any);
      scrollRoot.removeEventListener('touchstart', onTouchStart as any);
      scrollRoot.removeEventListener('touchmove', onTouchMove as any);
      window.removeEventListener('keydown', onKeyDown as any);
      scrollRoot.removeEventListener('scroll', onScroll as any);
    };
  }, [shouldDisableAnimations]);
  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} glowColor={glowColor} />
      )}
      <BentoCardGrid gridRef={gridRef}>
        {cardData.map((card, index) => {
          const baseClassName = `magic-bento-card ${textAutoHide ? 'magic-bento-card--text-autohide' : ''} ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''}`;
          const cardProps = {
            className: baseClassName,
            style: { backgroundColor: card.color, '--glow-color': glowColor, '--glow-color-2': '234, 88, 12' } as React.CSSProperties
          };
          if (enableStars) {
            return (
              <ParticleCard key={index} {...cardProps} disableAnimations={shouldDisableAnimations} particleCount={particleCount} glowColor={glowColor} enableTilt={enableTilt} clickEffect={clickEffect} enableMagnetism={enableMagnetism}>
                <div className="magic-bento-card__header"><div className="magic-bento-card__label">{card.label}</div></div>
                <div className="magic-bento-card__content"><h2 className="magic-bento-card__title">{card.title}</h2><p className="magic-bento-card__description">{card.description}</p></div>
                {card.watermark && <div className="magic-bento-card__watermark">{card.watermark}</div>}
              </ParticleCard>
            );
          }
          return (
            <div key={index} {...cardProps}>
              <div className="magic-bento-card__header"><div className="magic-bento-card__label">{card.label}</div></div>
              <div className="magic-bento-card__content"><h2 className="magic-bento-card__title">{card.title}</h2><p className="magic-bento-card__description">{card.description}</p></div>
              {card.watermark && <div className="magic-bento-card__watermark">{card.watermark}</div>}
            </div>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;


