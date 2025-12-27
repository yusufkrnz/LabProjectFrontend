import { FolderGit2 } from 'lucide-react';
import './UserCard.css';

export interface User {
    id: number;
    username: string;
    name: string;
    role: string;
    avatar: string;
    followers: number;
    projects: number;
    joinedAt: Date;
}

interface UserCardProps {
    user: User;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <div className="user-card">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <div className="user-info">
                <span className="user-username">{user.username}</span>
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
                <div className="user-stats">
                    <span className="user-projects">
                        <FolderGit2 size={12} />
                        {user.projects}
                    </span>
                </div>
            </div>
        </div>
    );
}
