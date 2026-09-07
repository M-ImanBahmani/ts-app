import { create } from "zustand";
import type { User } from "../Types/User"

type AuthStore = {
  user: User | null;
  setUser: (data: User) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,

  setUser: (data) => {
    set(() => ({ user: data }));
  },
}));
