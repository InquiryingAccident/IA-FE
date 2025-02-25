import {create} from 'zustand';
import {Profile} from '@/types/domain';

interface UserState {
  user: Profile | null;
  setUser: (user: Profile) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({user}),
  clearUser: () => set({user: null}),
}));

export default useUserStore;
