import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="header-container">
            <div className="header-content">
                <div className="header-brand">
                    <div className="logo-icon" aria-label="Bridge logo">
                        <svg width="28" height="20" viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 26 L62 26" stroke="currentColor" strokeWidth="3" fill="none"/>
                            <path d="M8 26 C16 10, 48 10, 56 26" stroke="currentColor" strokeWidth="3" fill="none"/>
                            <path d="M16 26 L16 16 M24 26 L24 13 M32 26 L32 12 M40 26 L40 13 M48 26 L48 16" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </div>
                    <h1 className="header-title">Bridge</h1>
                </div>
                <nav className="header-nav">
                    <ul className="nav-links">
                        <li className="nav-item has-dropdown">
                            <a href="#product">Product</a>
                            <span className="dropdown-icon">▼</span>
                        </li>
                        <li className="nav-item"><a href="#home">Home</a></li>
                        <li className="nav-item"><a href="#shop">Shop</a></li>
                        <li className="nav-item"><a href="#pages">Pages</a></li>
                        <li className="nav-item"><a href="#integrations">Integrations</a></li>
                        <li className="nav-item"><a href="#developers">Developers</a></li>
                    </ul>
                </nav>
                <div className="header-actions">
                    <a href="#login" className="login-link">{user?.username ? user.username : 'Login'}</a>
                    <button className="cta-button">Start for free</button>
                </div>
            </div>
        </header>
    );
}

