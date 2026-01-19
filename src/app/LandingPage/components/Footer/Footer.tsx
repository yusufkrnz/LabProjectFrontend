import './Footer.css';


export default function Footer() {
    return (
        <footer className="landing-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h3>now<span className="text-highlight">Eureka</span></h3>
                        <p>Bridging the gap between ideas and reality.</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Product</h4>
                            <a href="#">Features</a>
                            <a href="#">Solutions</a>
                            <a href="#">Pricing</a>
                        </div>
                        <div className="footer-column">
                            <h4>Company</h4>
                            <a href="#">About</a>
                            <a href="#">Careers</a>
                            <a href="#">Blog</a>
                        </div>
                        <div className="footer-column">
                            <h4>Resources</h4>
                            <a href="#">Documentation</a>
                            <a href="#">Support</a>
                            <a href="#">Community</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright-text">
                        &copy; {new Date().getFullYear()} now<span className="footer-eureka-highlight">Eureka</span>. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
