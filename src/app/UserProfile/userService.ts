import { MOCK_USER, type UserData } from './mockData';
import { type Project } from '../../components/ProjectCard';

export const userService = {
    getUserById: async (_id: string): Promise<UserData | null> => {
        // Simulating API latency
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_USER;
    },

    getCurrentUser: async (): Promise<UserData | null> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_USER;
    },

    getUserProjects: async (_userId: string): Promise<Project[]> => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_USER.projects;
    },

    updateUserBio: async (_userId: string, _bio: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    },

    uploadAvatar: async (_userId: string, file: File): Promise<string | null> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return URL.createObjectURL(file);
    },

    updateUserTitle: async (_userId: string, _title: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    },

    updateUserReadme: async (_userId: string, _readme: string): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
};
