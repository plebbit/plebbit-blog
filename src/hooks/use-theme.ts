import { useEffect, useState } from 'react';
import useThemeStore from '../stores/use-theme-store';

const useTheme = (): [string, (theme: string) => void] => {
  const { theme, setTheme } = useThemeStore();
  const [hasUserToggled, setHasUserToggled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (!hasUserToggled) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    if (!localStorage.getItem('theme')) {
      handleChange();
    }

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [setTheme, hasUserToggled]);

  const toggleTheme = (newTheme: string) => {
    setHasUserToggled(true);
    setTheme(newTheme);
  };

  return [theme, toggleTheme];
};

export default useTheme;