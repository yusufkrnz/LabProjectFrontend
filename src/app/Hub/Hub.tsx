import Header from '../../components/Header/Header';
import Topics from './Topics/Topics';
import './Hub.css';

export default function Hub() {
    return (
        <div className="hub-page">
            <Header />
            <main className="hub-content">
                <div className="hub-header">
                    <h1>Hub</h1>
                    <p>Share your projects, get feedback, and connect with the community</p>
                </div>
                <Topics />
            </main>
        </div>
    );
}
