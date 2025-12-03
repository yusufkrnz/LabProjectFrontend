import React from 'react';
import './ForgotPasswordCard.css';

interface ForgotPasswordCardProps {
  email: string;
  onClose: () => void;
}

const ForgotPasswordCard: React.FC<ForgotPasswordCardProps> = ({ email, onClose }) => {
  return (
    <div className="forgot-card-backdrop">
      <div className="forgot-card">
        <div className="forgot-card-header">
          <h3>Şifre Sıfırlama</h3>
          <button
            className="forgot-card-close"
            type="button"
            onClick={onClose}
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>

        <p className="forgot-card-text">
          Mail adresine bir şifre sıfırlama bağlantısı göndereceğiz. Lütfen adresini kontrol et.
        </p>

        <div className="forgot-card-email">
          {email || 'ornek@email.com'}
        </div>

        <button className="forgot-card-submit" type="button">
          Sıfırlama Linki Gönder
        </button>

        <button className="forgot-card-secondary" type="button" onClick={onClose}>
          Vazgeç
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordCard;


