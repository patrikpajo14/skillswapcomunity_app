import { create } from "zustand";

const authStore = (set) => ({
  user: null,
  setUser: (value) => set(() => ({ user: value })),
});

const useAuthStore = create(authStore);

export default useAuthStore;
