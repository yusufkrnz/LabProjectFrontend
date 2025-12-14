import React, { useState } from 'react';
import UserDetailCard from '../components/UserDetailCard';
import './Profile.css';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
    // Mock user data
    const [user] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin"
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="profile-container space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="section-header" variants={itemVariants}>
                <h2 className="text-3xl font-bold text-white">
                    Account Information
                </h2>
                <p className="text-[#94a3b8] mt-2 text-lg">
                    Manage your personal details and account settings.
                </p>
            </motion.div>

            {/* Account Info Section using UserDetailCard */}
            <motion.div variants={itemVariants}>
                <UserDetailCard
                    name={user.name}
                    email={user.email}
                    role={user.role}
                    onEdit={() => console.log("Edit profile clicked")}
                />
            </motion.div>

            {/* Password Reset Section */}
            <motion.div
                className="bg-bridge-card p-8 rounded-3xl shadow-lg border border-bridge-border"
                variants={itemVariants}
            >
                <h3 className="text-xl font-bold text-white mb-6">Security</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-bold text-white text-lg">Password</p>
                        <p className="text-sm text-[#94a3b8] mt-1 font-medium">Last changed 3 months ago</p>
                    </div>
                    <button
                        className="px-6 py-3 text-sm font-bold rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-orange-500/20 hover:opacity-90 ring-0 outline-none bg-bridge-orange text-white border-none"
                    >
                        Reset Password
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Profile;
