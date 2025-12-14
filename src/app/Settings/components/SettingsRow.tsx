import React, { type ReactNode } from 'react';

interface SettingsRowProps {
    label: string;
    description?: string;
    action?: ReactNode;
    children?: ReactNode;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ label, description, action, children }) => {
    return (
        <div className="flex items-center justify-between py-6 border-b border-bridge-border last:border-0 hover:bg-[#1f2937] transition-colors duration-200 px-4 -mx-4 rounded-xl">
            <div className="flex-1 pr-4">
                <h4 className="text-base font-bold text-white">{label}</h4>
                {description && (
                    <p className="mt-1 text-sm text-[#94a3b8] font-medium">{description}</p>
                )}
                {children}
            </div>
            {action && <div className="flex-shrink-0 ml-4">{action}</div>}
        </div>
    );
};

export default SettingsRow;
