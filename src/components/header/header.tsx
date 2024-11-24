import styles from './header.module.css';
import TypewriterTitle from '../typewriter-title/typewriter-title';
import useIsMobile from '../../hooks/use-is-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <div className={styles.header}>
      {!isMobile && ( 
        <span className={styles.linksLeft}>
          <a href="https://explorer.gitcoin.co/#/projects/0xeb6fd033609d6978f8df55dfe05c58750ee086986d276b6897a0b9256b58c005" target="_blank" rel="noreferrer">Donate</a>
          <a href="https://github.com/plebbit/whitepaper/discussions/2" target="_blank" rel="noreferrer">Whitepaper</a>
        </span>
      )}
      <span className={styles.title}>
        <TypewriterTitle text="Plebbit Development Blog" />
      </span>
      {!isMobile && (
        <span className={styles.linksRight}>
          <a href="https://github.com/plebbit" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/plebbit/docs" target="_blank" rel="noreferrer">Docs</a>
        </span>
      )}
    </div>
  );
};

export default Header;
