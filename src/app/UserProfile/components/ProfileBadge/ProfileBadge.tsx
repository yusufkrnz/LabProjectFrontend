import { type UserData } from '../../mockData';
import { Github, Linkedin, Globe, CheckCircle, Award, Shield, Star } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import './ProfileBadge.css';

type Props = {
    user: UserData;
};

export default function ProfileBadge({ user }: Props) {
    const skillAreasData = user.skillAreas.map(skill => ({
        subject: skill.name,
        value: skill.level,
        fullMark: 100
    }));

    const languagesData = user.languages.map(lang => ({
        subject: lang.name,
        value: lang.level,
        fullMark: 100
    }));

    return (
        <div className="profile-badge-container">
            {/* Lanyard Strap & Clip */}
            <div className="badge-strap"></div>
            <div className="badge-clip"></div>

            {/* Main ID Card */}
            <div className="id-card">
                {/* Top Gradient Area */}
                <div className="card-mesh-top">
                    <div className="card-hole"></div>
                    <div className="card-star">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                        </svg>
                    </div>
                </div>

                {/* Avatar Overlapping Mesh */}
                <div className="badge-avatar-container">
                    <img src={user.avatar} alt={user.name} className="badge-avatar" />
                </div>

                {/* Bottom Text Area */}
                <div className="card-content">
                    {/* Social Row - Moved to Align with Name */}
                    <div className="badge-social-row">
                        {user.linkedin && (
                            <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noopener noreferrer" className="badge-icon-btn">
                                <Linkedin size={14} />
                            </a>
                        )}
                        {user.github && (
                            <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="badge-icon-btn">
                                <Github size={14} />
                            </a>
                        )}
                        {user.website && (
                            <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="badge-icon-btn">
                                <Globe size={14} />
                            </a>
                        )}
                    </div>


                    {/* Header Info - Aligned Left */}
                    <div className="badge-header-info">
                        <div className="badge-label">Developer</div>
                        <h2 className="badge-name">
                            {user.name.toUpperCase()}
                            {user.isVerified && <CheckCircle size={16} fill="#3b82f6" color="#fff" style={{ marginLeft: 4 }} />}
                        </h2>
                        <div className="badge-username">@{user.username}</div>
                    </div>

                    {/* Combined Meta & Stats Row */}
                    <div className="badge-combined-meta">
                        <div className="b-stat-inline">188 <span>Following</span></div>
                        <span className="badge-meta-pipe">|</span>
                        <div className="b-stat-inline">119 <span>Followers</span></div>
                    </div>

                    {/* Title & Rate - Moved Top Right */}
                    <div className="badge-meta-top-right">
                        <span className="badge-meta-title">{user.title}</span>
                        <span className="badge-meta-dot">•</span>
                        <span className="badge-meta-rate">{user.hourlyRate}</span>
                    </div>

                    <div className="badge-stats-container">
                        <button className="badge-follow-btn">Follow</button>
                    </div>

                    {/* Badges Section */}
                    <div className="badge-achievements">
                        <div className="achievement-title">Badges</div>
                        <div className="achievement-row">
                            <div className="achievement-item" title="Top Rated">
                                <Award size={16} />
                            </div>
                            <div className="achievement-item" title="Verified Pro">
                                <Shield size={16} />
                            </div>
                            <div className="achievement-item" title="Rising Star">
                                <Star size={16} />
                            </div>
                            {/* Placeholder for more */}
                            <div className="achievement-item empty">+</div>
                        </div>
                    </div>

                    <div className="badge-separator" />

                    {/* Radar Charts */}
                    <div className="badge-charts">
                        <div className="b-chart-box">
                            <h4>Skill Areas</h4>
                            <div className="chart-wrapper">
                                <ResponsiveContainer width="100%" height={160}>
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillAreasData}>
                                        <PolarGrid stroke="#e5e7eb" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: '#6b7280' }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar name="Skill Level" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="b-chart-box">
                            <h4>Languages</h4>
                            <div className="chart-wrapper">
                                <ResponsiveContainer width="100%" height={160}>
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={languagesData}>
                                        <PolarGrid stroke="#e5e7eb" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fill: '#6b7280' }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar name="Proficiency" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="badge-footer-company">
                        nowEureka
                    </div>
                </div>
            </div>
        </div>
    );
}
