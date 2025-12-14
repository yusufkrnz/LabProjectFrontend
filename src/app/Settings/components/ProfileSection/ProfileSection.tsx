import React, { useState } from 'react';
import { Camera, User } from 'lucide-react';

export default function ProfileSection() {
    const [formData, setFormData] = useState({
        firstName: 'Yusuf',
        lastName: 'Bilgin',
        email: 'yusuf.bilgin@example.com',
        phone: '+90 555 123 4567',
        bio: 'Full-stack developer with 5+ years of experience in React and Node.js.',
        location: 'İstanbul, Türkiye',
        website: 'https://yusufbilgin.dev',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile updated:', formData);
        // API call would go here
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="settings-section">
                <h3>
                    <User size={20} />
                    Profil Bilgileri
                </h3>

                <div className="avatar-section">
                    <div className="avatar-preview-wrapper">
                        <div className="avatar-preview">
                            {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                        </div>
                        <button type="button" className="avatar-upload-btn" title="Fotoğraf Yükle">
                            <Camera size={16} />
                        </button>
                    </div>
                    <div className="avatar-info">
                        <h4>{formData.firstName} {formData.lastName}</h4>
                        <p>JPG, GIF veya PNG. Max 2MB.</p>
                        <button type="button" className="btn btn-danger btn-small">
                            Fotoğrafı Kaldır
                        </button>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">Ad</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-input"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Adınız"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Soyad</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-input"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Soyadınız"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">E-posta</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="ornek@email.com"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefon</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-input"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+90 555 123 4567"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="bio">Hakkımda</label>
                    <textarea
                        id="bio"
                        name="bio"
                        className="form-input"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Kendinizi kısaca tanıtın..."
                        rows={4}
                        style={{ resize: 'vertical', minHeight: '100px' }}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="location">Konum</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className="form-input"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Şehir, Ülke"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            className="form-input"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://example.com"
                        />
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <button type="button" className="btn btn-secondary">
                    İptal
                </button>
                <button type="submit" className="btn btn-primary">
                    Değişiklikleri Kaydet
                </button>
            </div>
        </form>
    );
}
