import { useState, useRef, useEffect } from 'react';
import styles from './header.module.css';
import TypewriterTitle from '../typewriter-title/typewriter-title';
import useIsMobile from '../../hooks/use-is-mobile';
import { Link } from 'react-router-dom';
import useTheme from '../../hooks/use-theme';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.hamburgerContainer} ref={menuRef}>
      <button 
        className={`${styles.hamburgerButton} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      {isOpen && (
        <div className={styles.menuContent}>
          <a href="https://plebbit.com" target="_blank" rel="noreferrer noopener">About</a>
          <a href="https://explorer.gitcoin.co/#/projects/0xeb6fd033609d6978f8df55dfe05c58750ee086986d276b6897a0b9256b58c005" target="_blank" rel="noreferrer noopener">Donate</a>
          <a href="https://github.com/plebbit/Whitepaper/discussions/2" target="_blank" rel="noreferrer noopener">Whitepaper</a>
          <a href="https://github.com/plebbit" target="_blank" rel="noreferrer noopener">Source Code</a>
          <a href="https://plebbit.github.io/docs/" target="_blank" rel="noreferrer noopener">Docs</a>
          <div className={styles.menuThemeToggle}>
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
};

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const ThemeToggle = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button 
      className={`${styles.themeToggle} ${theme === 'dark' ? styles.dark : styles.light}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <div className={styles.toggleTrack}>
        <span className={styles.sun}><SunIcon /></span>
        <span className={styles.moon}><MoonIcon /></span>
      </div>
      <div className={styles.toggleThumb} />
    </button>
  );
};

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <div className={styles.header}>
      {!isMobile && ( 
        <span className={styles.linksLeft}>
          <a href="https://plebbit.com" target="_blank" rel="noreferrer noopener">About</a>
          <a href="https://explorer.gitcoin.co/#/projects/0xeb6fd033609d6978f8df55dfe05c58750ee086986d276b6897a0b9256b58c005" target="_blank" rel="noreferrer noopener">Donate</a>
          <a href="https://github.com/plebbit/Whitepaper/discussions/2" target="_blank" rel="noreferrer noopener">Whitepaper</a>
        </span>
      )}
      <Link to="/">
        <span className={styles.title}>
          <TypewriterTitle text="Plebbit Development Blog" />
        </span>
      </Link>
      {!isMobile && (
        <span className={styles.linksRight}>
          <a href="https://github.com/plebbit" target="_blank" rel="noreferrer noopener">Source Code</a>
          <a href="https://plebbit.github.io/docs/" target="_blank" rel="noreferrer noopener">Docs</a>
          <ThemeToggle />
        </span>
      )}
      {isMobile && (
        <span className={styles.hamburgerMenu}>
          <HamburgerMenu />
        </span>
      )}
    </div>
  );
};

export default Header;
