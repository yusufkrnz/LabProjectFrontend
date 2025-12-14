import React, { type ReactNode } from 'react';

interface SettingsSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, description, children }) => {
    return (
        <div className="bg-bridge-card rounded-3xl shadow-lg border border-bridge-border overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(62,83,216,0.1)]">
            <div className="p-8 border-b border-bridge-border">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                {description && (
                    <p className="mt-2 text-[#94a3b8]">{description}</p>
                )}
            </div>
            <div className="p-8 space-y-1">
                {children}
            </div>
        </div>
    );
};

export default SettingsSection;
