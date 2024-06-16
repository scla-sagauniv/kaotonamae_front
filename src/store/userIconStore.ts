import { create } from 'zustand';

type UserIcon = {
	iconUrl: string;
	setIconUrl: (url: string) => void;
};

export const useUserIconStore = create<UserIcon>((set) => ({
	iconUrl: '',
	setIconUrl: (url: string) => set({ iconUrl: url }),
}));
