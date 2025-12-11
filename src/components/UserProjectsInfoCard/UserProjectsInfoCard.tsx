import React from 'react';
import './UserProjectsInfoCard.css';


type ProjectType = {
    name: string;
    img: string;
    description: string;
}

export default function UserProjectsInfoCard() {

    const Projects: ProjectType[] = [
        {
            name: "Deneme Projesi",
            img: "../../public/media/reactweb.png",
            description: "Denemelerrrrr denemelerrr",

        }
    ]


    return (
        <div className='user-project-info-card-main'>
            <h2>Portfolio</h2>
            <div className='user-project-info-card'>
                {Projects.map((project, index) => (
                    <div key={index} className='user-project-info-card-item'>
                        <img className='user-project-info-card-item-img' src={project.img} alt={project.name} />
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}