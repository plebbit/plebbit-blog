import { useState, useRef, useEffect } from 'react';
import styles from './header.module.css';
import TypewriterTitle from '../typewriter-title/typewriter-title';
import useIsMobile from '../../hooks/use-is-mobile';

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
          <a href="https://explorer.gitcoin.co/#/projects/0xeb6fd033609d6978f8df55dfe05c58750ee086986d276b6897a0b9256b58c005" target="_blank" rel="noreferrer">Donate</a>
          <a href="https://github.com/plebbit/Whitepaper/discussions/2" target="_blank" rel="noreferrer">Whitepaper</a>
          <a href="https://github.com/plebbit" target="_blank" rel="noreferrer">Source Code</a>
          <a href="https://github.com/plebbit/docs" target="_blank" rel="noreferrer">Docs</a>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <div className={styles.header}>
      {!isMobile && ( 
        <span className={styles.linksLeft}>
          <a href="https://explorer.gitcoin.co/#/projects/0xeb6fd033609d6978f8df55dfe05c58750ee086986d276b6897a0b9256b58c005" target="_blank" rel="noreferrer">Donate</a>
          <a href="https://github.com/plebbit/Whitepaper/discussions/2" target="_blank" rel="noreferrer">Whitepaper</a>
        </span>
      )}
      <span className={styles.title}>
        <TypewriterTitle text="Plebbit Development Blog" />
      </span>
      {!isMobile && (
        <span className={styles.linksRight}>
          <a href="https://github.com/plebbit" target="_blank" rel="noreferrer">Source Code</a>
          <a href="https://github.com/plebbit/docs" target="_blank" rel="noreferrer">Docs</a>
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
