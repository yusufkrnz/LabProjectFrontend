import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { gsap } from 'gsap';
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ForgotPasswordCard from './components/ForgotPasswordCard';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const { login, isLoading: authLoading } = useAuth();

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const morphingShapeRef = useRef<HTMLDivElement>(null);

  // Fonksiyonları useEffect'ten önce tanımla
  const initializeAnimations = () => {
    // Gentle slide-in animations
    gsap.fromTo(leftPanelRef.current, 
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
    
    gsap.fromTo(rightPanelRef.current, 
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );

    // Stagger form elements
    gsap.fromTo('.form-element', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.8, ease: "power2.out" }
    );
  };

  const startMorphingAnimation = () => {
    if (!morphingShapeRef.current) return;

    // Smooth morphing animation
    gsap.to(morphingShapeRef.current, {
      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
      duration: 4,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    gsap.to(morphingShapeRef.current, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });
  };

  useEffect(() => {
    // Sadece authLoading false olduğunda animasyonları başlat
    if (!authLoading) {
      initializeAnimations();
      startMorphingAnimation();
    }
  }, [authLoading]);

  // Loading durumunda render etme - TÜM HOOKS'LARDAN SONRA
  if (authLoading) {
    return <div>Yükleniyor...</div>;
  }

  const handleInputFocus = (element: HTMLElement) => {
    gsap.to(element.parentElement, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleInputBlur = (element: HTMLElement) => {
    gsap.to(element.parentElement, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validasyonu
    if (!email || !password || (isFlipped && (!fullName || !confirmPassword))) {
      setErrorMessage('Lütfen tüm alanları eksiksiz doldurun.');
      return;
    }

    if (isFlipped && password !== confirmPassword) {
      setErrorMessage('Şifreler birbiriyle eşleşmiyor.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Buton feedback animasyonu
    gsap.to('.login-btn', {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    if (!isFlipped) {
      // Normal login akışı
      try {
        console.log('Login attempt started:', { email, passwordLength: password.length });
        await login(email, password);
        console.log('Login successful!');
        setIsLoading(false);
      } catch (error: any) {
        console.error('Login error in handleSubmit:', error);
        const message = error?.message || 'Giriş başarısız! Kullanıcı adı veya şifre yanlış.';
        setErrorMessage(message);
        setIsLoading(false);
      }
    } else {
      // Kayıt modu şu an sadece UI – backend entegrasyonu sonra bağlanabilir
      setTimeout(() => {
        setIsLoading(false);
      }, 900);
    }
  };


  return (
    <div
      className={`modern-login-container ${isFlipped ? 'login-flipped' : ''}`}
      ref={containerRef}
    >
      {/* Left Panel - Welcome */}
      <div className="welcome-panel" ref={leftPanelRef}>
        <div className="welcome-content">
          {/* Morphing Shape */}
          <div className="shape-container">
            <div className="morphing-shape" ref={morphingShapeRef}></div>
          </div>
          
          <div className="welcome-text">
            <h1>Tekrar Hoş Geldiniz</h1>
            <p>
              Hesabınıza giriş yaparak kaldığınız yerden devam edin. 
              Modern ve güvenli platformumuzda sizi bekleyen yenilikler var.
            </p>
          </div>
          
          <div className="feature-list">
            <div className="feature">
              <div className="feature-dot"></div>
              <span>Güvenli ve hızlı giriş</span>
            </div>
            <div className="feature">
              <div className="feature-dot"></div>
              <span>Modern arayüz deneyimi</span>
            </div>
            <div className="feature">
              <div className="feature-dot"></div>
              <span>Kişiselleştirilmiş dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login / Register Form */}
      <div className="login-panel" ref={rightPanelRef}>
        <div className="login-content">
          <div className="login-header form-element">
            <h2>{isFlipped ? 'Hesap Oluştur' : 'Giriş Yap'}</h2>
            <p>
              {isFlipped
                ? 'Kısa bir form ile Bridge hesabını oluştur.'
                : 'Hesap bilgilerinizi girerek devam edin'}
            </p>
          </div>

          <div className="social-row form-element">
            <button type="button" className="social-btn social-google">
              <span className="social-icon">G</span>
              <span>Google ile devam et</span>
            </button>
            <button type="button" className="social-btn social-guest">
              Misafir olarak devam et
            </button>
          </div>

          <div className="divider form-element">
            <span></span>
            <p>veya email ile {isFlipped ? 'kayıt ol' : 'giriş yap'}</p>
            <span></span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {isFlipped && (
              <div className="input-group form-element">
                <label>Ad Soyad</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Adınız ve soyadınız"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={(e) => handleInputFocus(e.target)}
                    onBlur={(e) => handleInputBlur(e.target)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="input-group form-element">
              <label>Email Adresi</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => handleInputFocus(e.target)}
                  onBlur={(e) => handleInputBlur(e.target)}
                  required
                />
              </div>
            </div>

            <div className="input-group form-element">
              <label>Şifre</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={isFlipped ? 'Oluşturmak istediğiniz şifre' : 'Şifrenizi girin'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => handleInputFocus(e.target)}
                  onBlur={(e) => handleInputBlur(e.target)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {isFlipped && (
              <div className="input-group form-element">
                <label>Şifre Tekrar</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifrenizi tekrar yazın"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={(e) => handleInputFocus(e.target)}
                    onBlur={(e) => handleInputBlur(e.target)}
                    required
                  />
                </div>
              </div>
            )}

            {!isFlipped && (
              <div className="form-options form-element">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span className="checkbox-custom"></span>
                  Beni hatırla
                </label>
                <button
                  type="button"
                  className="forgot-link forgot-link-button"
                  onClick={() => setIsForgotOpen(true)}
                >
                  Şifremi unuttum
                </button>
              </div>
            )}

            {/* Hata Mesajı */}
            {errorMessage && (
              <div className="error-message form-element">
                {errorMessage}
              </div>
            )}

            <button 
              type="submit" 
              className={`login-btn form-element ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  {isFlipped ? 'İşleniyor...' : 'Giriş yapılıyor...'}
                </>
              ) : (
                <>
                  {isFlipped ? 'Hesap Oluştur' : 'Giriş Yap'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="login-footer form-element">
            <p>
              {isFlipped ? 'Zaten hesabın var mı?' : 'Hesabınız yok mu?'}{' '}
              <button
                type="button"
                className="register-link"
                onClick={() => setIsFlipped((prev) => !prev)}
              >
                {isFlipped ? 'Giriş yap' : 'Kayıt olun'}
              </button>
            </p>
          </div>
        </div>
      </div>
      {isForgotOpen && (
        <ForgotPasswordCard email={email} onClose={() => setIsForgotOpen(false)} />
      )}
    </div>
  );
};

export default Login;