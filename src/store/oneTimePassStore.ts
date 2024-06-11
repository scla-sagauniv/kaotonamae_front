import { create } from 'zustand';

type OneTimePass = {
	isOneTimePass: boolean;
	confirmEmail: string;
	setConfirmEmail: (email: string) => void;
	setOneTimePassTrue: () => void;
	setOneTimePassFalse: () => void;
};

export const useOneTimePassStore = create<OneTimePass>((set) => ({
	isOneTimePass: false,
	confirmEmail: '',
	setConfirmEmail: (email: string) => set({ confirmEmail: email }),
	setOneTimePassTrue: () => set({ isOneTimePass: true }),
	setOneTimePassFalse: () => set({ isOneTimePass: false }),
}));
