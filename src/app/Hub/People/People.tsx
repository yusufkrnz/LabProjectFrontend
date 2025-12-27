import './People.css';

// Mock data - backend'den gelecek
const users = [
    { id: 1, name: 'Deniz Yılmaz', role: 'Full Stack Developer', avatar: 'https://ui-avatars.com/api/?name=DY&background=e2e8f0&color=374151' },
    { id: 2, name: 'Ali Koç', role: 'Backend Engineer', avatar: 'https://ui-avatars.com/api/?name=AK&background=e2e8f0&color=374151' },
    { id: 3, name: 'Zeynep Kaya', role: 'UI/UX Designer', avatar: 'https://ui-avatars.com/api/?name=ZK&background=e2e8f0&color=374151' },
    { id: 4, name: 'Mehmet Akın', role: 'Mobile Developer', avatar: 'https://ui-avatars.com/api/?name=MA&background=e2e8f0&color=374151' },
    { id: 5, name: 'Elif Demir', role: 'Data Scientist', avatar: 'https://ui-avatars.com/api/?name=ED&background=e2e8f0&color=374151' },
    { id: 6, name: 'Can Özkan', role: 'DevOps Engineer', avatar: 'https://ui-avatars.com/api/?name=CO&background=e2e8f0&color=374151' },
    { id: 7, name: 'Selin Yıldız', role: 'Product Manager', avatar: 'https://ui-avatars.com/api/?name=SY&background=e2e8f0&color=374151' },
    { id: 8, name: 'Burak Aydın', role: 'Frontend Developer', avatar: 'https://ui-avatars.com/api/?name=BA&background=e2e8f0&color=374151' },
];

export default function People() {
    return (
        <div className="people-list">
            {users.map(user => (
                <div key={user.id} className="people-item">
                    <img src={user.avatar} alt={user.name} className="people-avatar" />
                    <div className="people-info">
                        <span className="people-name">{user.name}</span>
                        <span className="people-role">{user.role}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
