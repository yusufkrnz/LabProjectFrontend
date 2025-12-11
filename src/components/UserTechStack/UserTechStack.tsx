import React from 'react';
import './UserTechStack.css';

export default function UserTechStack() {

    const TechStack = [
        { name: "React", img: "../../public/media/reactweb.png" },
        { name: "React", img: "../../public/media/reactweb.png" },
        { name: "React", img: "../../public/media/reactweb.png" },
        { name: "React", img: "../../public/media/reactweb.png" },
    ];

    return (
        <div className="tech-wrapper">
            <h2>Tech Stack</h2>

            <div className="scroll-container">
                <div className="scroll-content">
                    {TechStack.concat(TechStack).map((tech, index) => (
                        <div className="tech-item" key={index}>
                            <img src={tech.img} alt={tech.name} />
                            <p>{tech.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
