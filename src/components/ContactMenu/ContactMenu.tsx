import React, { useState } from "react";
import './ContactMenu.css';

export default function ContactMenu() {
    const [open, setOpen] = useState(false);

    const iconImages = [
        "/media/ContactLogo/github_logo_icon_229278.png",
        "/media/ContactLogo/linkedin-logo.png",
        "/media/ContactLogo/kaggle-logo.jpg",
    ];

    const radius = 120;

    return (
        <div className="contact-menu">


            <button
                className="contact-menu-main-button"
                onClick={() => setOpen(!open)}
            >

                <p>Contact Me</p>
            </button>


            <div className="contact-menu-sub-button-container">
                {iconImages.map((src, i) => {

                    const angle = (360 / iconImages.length) * i;
                    const x = radius * Math.cos(angle * Math.PI / 180);
                    const y = radius * Math.sin(angle * Math.PI / 180);

                    return (
                        <div
                            key={i}
                            className="contact-menu-sub-button"
                            style={{
                                transform: open
                                    ? `translate(${x}px, ${y}px)`
                                    : "translate(0,0)",
                                opacity: open ? 1 : 0
                            }}
                        >
                            <img src={src} alt="icon" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
