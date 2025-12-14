import { Shield, Calendar, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function AccountInfo() {
    const accountData = {
        email: 'yusuf.bilgin@example.com',
        emailVerified: true,
        createdAt: '15 Ocak 2024',
        lastLogin: '14 Aralık 2025, 17:30',
        accountType: 'Premium',
        twoFactorEnabled: false,
    };

    return (
        <div>
            <div className="settings-section">
                <h3>
                    <Shield size={20} />
                    Hesap Bilgileri
                </h3>

                <div className="info-card">
                    <Info size={20} />
                    <p>
                        Hesap bilgilerinizi buradan görüntüleyebilirsiniz. E-posta adresinizi değiştirmek
                        için lütfen destek ekibimizle iletişime geçin.
                    </p>
                </div>

                <div className="form-group">
                    <label>E-posta Adresi</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                            type="email"
                            className="form-input"
                            value={accountData.email}
                            disabled
                            style={{ opacity: 0.7 }}
                        />
                        {accountData.emailVerified ? (
                            <span className="account-badge">
                                <CheckCircle size={14} />
                                Doğrulanmış
                            </span>
                        ) : (
                            <span className="account-badge warning">
                                <AlertCircle size={14} />
                                Doğrulanmamış
                            </span>
                        )}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Hesap Oluşturma Tarihi</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b8da3' }}>
                            <Calendar size={18} />
                            {accountData.createdAt}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Son Giriş</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b8da3' }}>
                            <Calendar size={18} />
                            {accountData.lastLogin}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Hesap Türü</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{
                            padding: '10px 20px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '14px'
                        }}>
                            {accountData.accountType}
                        </span>
                        <button className="btn btn-secondary" style={{ padding: '10px 16px' }}>
                            Planları Görüntüle
                        </button>
                    </div>
                </div>
            </div>

            <div className="settings-divider" />

            <div className="settings-section">
                <h3>
                    <Shield size={20} />
                    Güvenlik
                </h3>

                <div className="form-group">
                    <label>İki Faktörlü Doğrulama (2FA)</label>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}>
                        <div>
                            <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>
                                {accountData.twoFactorEnabled ? 'Aktif' : 'Pasif'}
                            </p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#8b8da3' }}>
                                Hesabınızı ekstra güvenlik katmanıyla koruyun
                            </p>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '10px 20px' }}>
                            {accountData.twoFactorEnabled ? 'Devre Dışı Bırak' : 'Etkinleştir'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="settings-divider" />

            <div className="settings-section">
                <h3 style={{ color: '#ef4444' }}>
                    <AlertCircle size={20} />
                    Tehlikeli Bölge
                </h3>

                <div style={{
                    padding: '20px',
                    background: 'rgba(239, 68, 68, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>Hesabı Sil</p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#8b8da3' }}>
                                Hesabınızı ve tüm verilerinizi kalıcı olarak silin
                            </p>
                        </div>
                        <button className="btn btn-danger">
                            Hesabı Sil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
