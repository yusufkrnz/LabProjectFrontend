import { useState } from 'react';
import Header from '../../components/Header';
import './Settings.css';

// Backend'den gelecek user data tipi
interface UserSettings {
    // Profile
    displayName: string;
    email: string;
    avatarUrl: string | null;

    // Notifications
    emailNotifications: boolean;
    pushNotifications: boolean;
    projectUpdates: boolean;
    teamInvites: boolean;

    // Privacy
    profileVisibility: 'public' | 'private' | 'connections';
    showEmail: boolean;
    showProjects: boolean;

    // Account
    twoFactorEnabled: boolean;
}

export default function Settings() {
    // Mock data - Backend'den gelecek
    const [settings, setSettings] = useState<UserSettings>({
        displayName: 'Yusuf Baran',
        email: 'yusuf.baran@example.com',
        avatarUrl: null,
        emailNotifications: true,
        pushNotifications: true,
        projectUpdates: true,
        teamInvites: true,
        profileVisibility: 'public',
        showEmail: false,
        showProjects: true,
        twoFactorEnabled: false,
    });


    const [editingField, setEditingField] = useState<string | null>(null);
    const [tempValue, setTempValue] = useState('');

    // Toggle handler for boolean fields
    const handleToggle = (field: keyof UserSettings) => {
        setSettings(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
        // TODO: API call to update setting
        console.log(`Updated ${field}:`, !settings[field]);
    };

    // Select handler for dropdown fields
    const handleSelectChange = (field: keyof UserSettings, value: string) => {
        setSettings(prev => ({
            ...prev,
            [field]: value
        }));
        // TODO: API call to update setting
        console.log(`Updated ${field}:`, value);
    };

    // Edit text field
    const startEditing = (field: string, currentValue: string) => {
        setEditingField(field);
        setTempValue(currentValue);
    };

    const saveEdit = (field: keyof UserSettings) => {
        setSettings(prev => ({
            ...prev,
            [field]: tempValue
        }));
        setEditingField(null);
        // TODO: API call to update setting
        console.log(`Updated ${field}:`, tempValue);
    };

    const cancelEdit = () => {
        setEditingField(null);
        setTempValue('');
    };

    // Action handlers
    const handleAvatarUpload = () => {
        // TODO: Open file picker and upload
        console.log('Upload avatar clicked');
    };

    const handleChangePassword = () => {
        // TODO: Open password change modal
        console.log('Change password clicked');
    };

    const handleDeleteAccount = () => {
        // TODO: Open confirmation modal
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            console.log('Delete account confirmed');
        }
    };

    return (
        <div className="settings-page">
            <Header />
            <div className="settings-content">
                <div className="settings-container">
                    <h1 className="settings-title">Settings</h1>
                    <p className="settings-subtitle">Manage your account settings and preferences</p>

                    {/* Profile Section */}
                    <div className="settings-section">
                        <h2 className="settings-section-title">Profile</h2>
                        <div className="settings-card">
                            {/* Display Name */}
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Display Name</span>
                                    {editingField === 'displayName' ? (
                                        <input
                                            type="text"
                                            className="settings-input"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            autoFocus
                                        />
                                    ) : (
                                        <span className="settings-item-value">{settings.displayName}</span>
                                    )}
                                </div>
                                {editingField === 'displayName' ? (
                                    <div className="settings-btn-group">
                                        <button className="settings-item-btn save" onClick={() => saveEdit('displayName')}>Save</button>
                                        <button className="settings-item-btn" onClick={cancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <button className="settings-item-btn" onClick={() => startEditing('displayName', settings.displayName)}>Edit</button>
                                )}
                            </div>

                            {/* Email */}
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Email</span>
                                    {editingField === 'email' ? (
                                        <input
                                            type="email"
                                            className="settings-input"
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            autoFocus
                                        />
                                    ) : (
                                        <span className="settings-item-value">{settings.email}</span>
                                    )}
                                </div>
                                {editingField === 'email' ? (
                                    <div className="settings-btn-group">
                                        <button className="settings-item-btn save" onClick={() => saveEdit('email')}>Save</button>
                                        <button className="settings-item-btn" onClick={cancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <button className="settings-item-btn" onClick={() => startEditing('email', settings.email)}>Edit</button>
                                )}
                            </div>

                            {/* Avatar */}
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Avatar</span>
                                    <span className="settings-item-value">
                                        {settings.avatarUrl ? 'Change your profile picture' : 'Upload a profile picture'}
                                    </span>
                                </div>
                                <button className="settings-item-btn" onClick={handleAvatarUpload}>Upload</button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="settings-section">
                        <h2 className="settings-section-title">Notifications</h2>
                        <div className="settings-card">
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Email Notifications</span>
                                    <span className="settings-item-value">Receive email updates about your projects</span>
                                </div>
                                <label className="settings-toggle">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailNotifications}
                                        onChange={() => handleToggle('emailNotifications')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Push Notifications</span>
                                    <span className="settings-item-value">Get notified about important updates</span>
                                </div>
                                <label className="settings-toggle">
                                    <input
                                        type="checkbox"
                                        checked={settings.pushNotifications}
                                        onChange={() => handleToggle('pushNotifications')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Project Updates</span>
                                    <span className="settings-item-value">Get notified when projects you follow are updated</span>
                                </div>
                                <label className="settings-toggle">
                                    <input
                                        type="checkbox"
                                        checked={settings.projectUpdates}
                                        onChange={() => handleToggle('projectUpdates')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Team Invites</span>
                                    <span className="settings-item-value">Get notified when you're invited to a team</span>
                                </div>
                                <label className="settings-toggle">
                                    <input
                                        type="checkbox"
                                        checked={settings.teamInvites}
                                        onChange={() => handleToggle('teamInvites')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Section */}
                    <div className="settings-section">
                        <h2 className="settings-section-title">Privacy</h2>
                        <div className="settings-card">
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Profile Visibility</span>
                                    <span className="settings-item-value">Control who can see your profile</span>
                                </div>
                                <select
                                    className="settings-select"
                                    value={settings.profileVisibility}
                                    onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                    <option value="connections">Connections Only</option>
                                </select>
                            </div>
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Show Email</span>
                                    <span className="settings-item-value">Display your email on your public profile</span>
                                </div>
                                <label className="settings-toggle">
                                    <input
                                        type="checkbox"
                                        checked={settings.showEmail}
                                        onChange={() => handleToggle('showEmail')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Show Projects</span>
                                    <span className="settings-item-value">Display your projects on your public profile</span>
                                </div>
                                <label className="settings-toggle">
                                    <input
                                        type="checkbox"
                                        checked={settings.showProjects}
                                        onChange={() => handleToggle('showProjects')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="settings-section">
                        <h2 className="settings-section-title">Security</h2>
                        <div className="settings-card">
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Two-Factor Authentication</span>
                                    <span className="settings-item-value">Add an extra layer of security to your account</span>
                                </div>
                                <label className="settings-toggle">
                                    <input
                                        type="checkbox"
                                        checked={settings.twoFactorEnabled}
                                        onChange={() => handleToggle('twoFactorEnabled')}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="settings-item">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Change Password</span>
                                    <span className="settings-item-value">Update your password regularly for security</span>
                                </div>
                                <button className="settings-item-btn" onClick={handleChangePassword}>Change</button>
                            </div>
                        </div>
                    </div>

                    {/* Account Section */}
                    <div className="settings-section">
                        <h2 className="settings-section-title">Account</h2>
                        <div className="settings-card">
                            <div className="settings-item settings-item-danger">
                                <div className="settings-item-info">
                                    <span className="settings-item-label">Delete Account</span>
                                    <span className="settings-item-value">Permanently delete your account and all data</span>
                                </div>
                                <button className="settings-item-btn danger" onClick={handleDeleteAccount}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
