import { create } from "zustand";

const langStore = (set) => ({
  currentLang: "en",
  setLang: (value) => set(() => ({ currentLang: value })),
});

const useLangStore = create(langStore);

export default useLangStore;
