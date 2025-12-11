import React from 'react';
import './DownloadCV.css';


export default function DownloadCV() {
    return (
        <div className="download-cv-main-container">
            <button className='download-cv-button'>
                <img className='download-cv-icon' src="/media/downloadicon.png" alt="Download Icon" />
                <p>CV</p>
            </button>
        </div>
    );
}