import { create } from 'zustand';

type OneTimePass = {
	isOneTimePass: boolean;
	confirmEmail: string;
	confirmPassword: string;
	setOneTimePassTrue: () => void;
	setOneTimePassFalse: () => void;
	setConfirmEmail: (email: string) => void;
	setConfirmPassword: (password: string) => void;
};

export const useOneTimePassStore = create<OneTimePass>((set) => ({
	isOneTimePass: false,
	confirmEmail: '',
	confirmPassword: '',
	setOneTimePassTrue: () => set({ isOneTimePass: true }),
	setOneTimePassFalse: () => set({ isOneTimePass: false }),
	setConfirmEmail: (email: string) => set({ confirmEmail: email }),
	setConfirmPassword: (password: string) => set({ confirmPassword: password }),
}));
