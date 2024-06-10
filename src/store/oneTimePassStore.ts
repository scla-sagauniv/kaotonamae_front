import { create } from 'zustand';

type OneTimePass = {
	isOneTimePass: boolean;
	setOneTimePassTrue: () => void;
	setOneTimePassFalse: () => void;
};

export const useOneTimePassStore = create<OneTimePass>((set) => ({
	isOneTimePass: true,
	setOneTimePassTrue: () => set({ isOneTimePass: true }),
	setOneTimePassFalse: () => set({ isOneTimePass: false }),
}));
