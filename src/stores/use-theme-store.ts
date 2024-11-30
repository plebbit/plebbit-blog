import { create, StoreApi } from 'zustand';

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

const useThemeStore = create<ThemeState>((set: StoreApi<ThemeState>['setState']) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const initialTheme = localStorage.getItem('theme') || (mediaQuery.matches ? 'dark' : 'light');

  return {
    theme: initialTheme,
    setTheme: (theme: string) => {
      localStorage.setItem('theme', theme);
      set({ theme });
    },
  };
});

export default useThemeStore;
