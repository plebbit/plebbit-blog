import { create } from 'zustand';

interface FlairFilterState {
  activeFlairText: string | null;
  setActiveFlairText: (text: string | null) => void;
}

const useFlairFilterStore = create<FlairFilterState>((set) => ({
  activeFlairText: null,
  setActiveFlairText: (text) => set({ activeFlairText: text }),
}));

export default useFlairFilterStore;
