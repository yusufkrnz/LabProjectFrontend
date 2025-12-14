import React from 'react';
import { motion } from 'framer-motion';

interface UserDetailCardProps {
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
    onEdit?: () => void;
}

const UserDetailCard: React.FC<UserDetailCardProps> = ({ name, email, role, avatarUrl, onEdit }) => {
    return (
        <div className="bg-bridge-card p-8 rounded-3xl shadow-lg border border-bridge-border flex items-center space-x-6">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-orange-500 rounded-full opacity-75 group-hover:opacity-100 transition duration-200 blur"></div>
                <img
                    src={avatarUrl || "https://ui-avatars.com/api/?name=" + name}
                    alt={name}
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-bridge-dark shadow-xl"
                />
                <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-bridge-dark rounded-full"></span>
            </div>
            <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">{name}</h3>
                <p className="text-[#94a3b8] font-medium">{email}</p>
                <div className="mt-3 flex items-center space-x-2">
                    <span className="px-3 py-1 text-sm font-bold bg-[#1e293b] text-blue-400 rounded-full border border-bridge-border">
                        {role}
                    </span>
                </div>
            </div>
            {onEdit && (
                <button
                    onClick={onEdit}
                    className="px-6 py-3 text-sm font-bold rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-orange-500/20 hover:opacity-90 ring-0 outline-none bg-bridge-orange text-white border-none"
                >
                    Edit Profile
                </button>
            )}
        </div>
    );
};

export default UserDetailCard;
