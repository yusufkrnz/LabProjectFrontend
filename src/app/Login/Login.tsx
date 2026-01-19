import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import { gsap } from 'gsap';
import { Eye, EyeOff, ArrowRight, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI } from '../../services/api';
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

  const containerRef = useRef<HTMLDivElement>(null);

  // Simple entrance animation
  useEffect(() => {
    if (!authLoading) {
      gsap.fromTo('.login-card',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [authLoading]);

  // Loading durumunda render etme
  if (authLoading) {
    return <div>Yükleniyor...</div>;
  }

  const handleInputFocus = (element: HTMLElement) => {
    gsap.to(element.parentElement, {
      borderColor: '#2563eb',
      duration: 0.2
    });
  };

  const handleInputBlur = (element: HTMLElement) => {
    gsap.to(element.parentElement, {
      borderColor: '#e2e8f0',
      duration: 0.2
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (!isFlipped) {
      try {
        await login(email, password);
        setIsLoading(false);
      } catch (error: any) {
        const message = error?.message || 'Giriş başarısız! Bilgilerinizi kontrol edin.';
        setErrorMessage(message);
        setIsLoading(false);
      }
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 900);
    }
  };

  return (
    <div className="modern-login-container" ref={containerRef}>
      {/* Background Elements Matching Hero */}
      <div className="login-background-elements">
        <div className="login-sphere sphere-1"></div>
        <div className="login-sphere sphere-2"></div>
      </div>

      {/* Main Centered Card */}
      <div className="login-card">
        <div className="login-header">
          <h2>{isFlipped ? 'Hesap Oluştur' : 'Tekrar Hoş Geldiniz'}</h2>
          <p>
            {isFlipped
              ? 'Hızlıca hesabınızı oluşturun ve başlayın.'
              : 'Hesabınıza giriş yaparak devam edin.'}
          </p>
        </div>

        <div className="social-row">
          <button
            type="button"
            className="social-btn social-google"
            onClick={() => window.location.href = authAPI.getGoogleAuthUrl()}
          >
            <span className="social-icon">G</span>
            <span>Google ile devam et</span>
          </button>

        </div>

        <div className="divider">
          <span></span>
          <p>veya</p>
          <span></span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {isFlipped && (
            <div className="input-group">
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

          <div className="input-group">
            <label>Email Adresi</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={(e) => handleInputFocus(e.target)}
                onBlur={(e) => handleInputBlur(e.target)}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Şifre</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete={isFlipped ? "new-password" : "current-password"}
                placeholder="Şifreniz"
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
            <div className="input-group">
              <label>Şifre Tekrar</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={18} />
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
            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkbox-text">Beni hatırla</span>
              </label>
              <button
                type="button"
                className="forgot-link"
                onClick={() => setIsForgotOpen(true)}
              >
                Şifremi unuttum
              </button>
            </div>
          )}

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                {isFlipped ? 'Hesap Oluştur' : 'Giriş Yap'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isFlipped ? 'Zaten hesabın var mı?' : 'Hesabınız yok mu?'}{' '}
            <button
              type="button"
              className="register-link"
              onClick={() => setIsFlipped((prev) => !prev)}
            >
              {isFlipped ? 'Giriş yap' : 'Kayıt ol'}
            </button>
          </p>
        </div>
      </div>

      {isForgotOpen && (
        <ForgotPasswordCard email={email} onClose={() => setIsForgotOpen(false)} />
      )}
    </div>
  );
};

export default Login;