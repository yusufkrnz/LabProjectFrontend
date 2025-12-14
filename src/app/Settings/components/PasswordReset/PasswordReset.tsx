import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Info, CheckCircle } from 'lucide-react';

export default function PasswordReset() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [passwordStrength, setPasswordStrength] = useState(0);

    const calculateStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return Math.min(strength, 4);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'newPassword') {
            setPasswordStrength(calculateStrength(value));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert('Şifreler eşleşmiyor!');
            return;
        }

        console.log('Password change requested');
        // API call would go here
    };

    const getStrengthLabel = () => {
        switch (passwordStrength) {
            case 0: return '';
            case 1: return 'Çok Zayıf';
            case 2: return 'Zayıf';
            case 3: return 'Orta';
            case 4: return 'Güçlü';
            default: return '';
        }
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 1: return '#ef4444';
            case 2: return '#f59e0b';
            case 3: return '#3b82f6';
            case 4: return '#10b981';
            default: return '#6b7280';
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="settings-section">
                <h3>
                    <Lock size={20} />
                    Şifre Değiştir
                </h3>

                <div className="info-card">
                    <Info size={20} />
                    <p>
                        Güvenliğiniz için güçlü bir şifre kullanın. Şifreniz en az 8 karakter uzunluğunda olmalı
                        ve büyük/küçük harf, rakam ve özel karakter içermelidir.
                    </p>
                </div>

                <div className="form-group">
                    <label htmlFor="currentPassword">Mevcut Şifre</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            id="currentPassword"
                            name="currentPassword"
                            className="form-input"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Mevcut şifrenizi girin"
                            style={{ paddingRight: '48px' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            style={{
                                position: 'absolute',
                                right: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#8b8da3',
                                padding: '4px',
                            }}
                        >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="newPassword">Yeni Şifre</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id="newPassword"
                            name="newPassword"
                            className="form-input"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Yeni şifrenizi girin"
                            style={{ paddingRight: '48px' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            style={{
                                position: 'absolute',
                                right: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#8b8da3',
                                padding: '4px',
                            }}
                        >
                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {formData.newPassword && (
                        <>
                            <div className="password-strength">
                                {[1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        className="strength-bar"
                                        style={{
                                            background: passwordStrength >= level
                                                ? getStrengthColor()
                                                : 'rgba(255, 255, 255, 0.1)'
                                        }}
                                    />
                                ))}
                            </div>
                            <p style={{
                                margin: '8px 0 0 0',
                                fontSize: '13px',
                                color: getStrengthColor()
                            }}>
                                Şifre Gücü: {getStrengthLabel()}
                            </p>
                        </>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-input"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Yeni şifrenizi tekrar girin"
                            style={{ paddingRight: '48px' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                                position: 'absolute',
                                right: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#8b8da3',
                                padding: '4px',
                            }}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {formData.confirmPassword && formData.newPassword && (
                        <p style={{
                            margin: '8px 0 0 0',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: formData.confirmPassword === formData.newPassword
                                ? '#10b981'
                                : '#ef4444'
                        }}>
                            {formData.confirmPassword === formData.newPassword ? (
                                <>
                                    <CheckCircle size={14} />
                                    Şifreler eşleşiyor
                                </>
                            ) : (
                                'Şifreler eşleşmiyor'
                            )}
                        </p>
                    )}
                </div>
            </div>

            <div className="settings-divider" />

            <div className="settings-section">
                <h3>
                    <Lock size={20} />
                    Şifre Gereksinimleri
                </h3>

                <ul style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    {[
                        { text: 'En az 8 karakter', valid: formData.newPassword.length >= 8 },
                        { text: 'En az bir büyük harf (A-Z)', valid: /[A-Z]/.test(formData.newPassword) },
                        { text: 'En az bir küçük harf (a-z)', valid: /[a-z]/.test(formData.newPassword) },
                        { text: 'En az bir rakam (0-9)', valid: /[0-9]/.test(formData.newPassword) },
                        { text: 'En az bir özel karakter (!@#$%^&*)', valid: /[^A-Za-z0-9]/.test(formData.newPassword) },
                    ].map((req, index) => (
                        <li
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                color: formData.newPassword
                                    ? (req.valid ? '#10b981' : '#8b8da3')
                                    : '#8b8da3',
                                fontSize: '14px'
                            }}
                        >
                            <CheckCircle
                                size={16}
                                style={{
                                    opacity: formData.newPassword && req.valid ? 1 : 0.3
                                }}
                            />
                            {req.text}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="action-buttons">
                <button type="button" className="btn btn-secondary">
                    İptal
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                        !formData.currentPassword ||
                        !formData.newPassword ||
                        formData.newPassword !== formData.confirmPassword ||
                        passwordStrength < 3
                    }
                    style={{
                        opacity: (!formData.currentPassword ||
                            !formData.newPassword ||
                            formData.newPassword !== formData.confirmPassword ||
                            passwordStrength < 3) ? 0.5 : 1
                    }}
                >
                    Şifreyi Değiştir
                </button>
            </div>
        </form>
    );
}
