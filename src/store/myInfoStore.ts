import { create } from 'zustand';

type MyInfo = {
	myId: string;
	setMyId: (id: string) => void;
};

export const useMyInfoStore = create<MyInfo>((set) => ({
	myId: '',
	setMyId: (id: string) => set({ myId: id }),
}));
