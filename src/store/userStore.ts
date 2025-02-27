// useUserStore.ts
import {create} from 'zustand';

export interface IUser {
  email: string;
  nickname: string;
  accountStatus: string;
  createDate: string;
  lastLoginTime: string;
}

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({user}),
  clearUser: () => set({user: null}),
}));
