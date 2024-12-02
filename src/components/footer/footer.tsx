import styles from './footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <a href='https://plebbit.com' target='_blank' rel='noreferrer noopener'>about</a>
          <a href='https://x.com/getplebbit' target='_blank' rel='noreferrer noopener'>twitter/x</a>
          <a href='https://t.me/plebbit' target='_blank' rel='noreferrer noopener'>telegram</a>
          <a href='https://github.com/plebbit' target='_blank' rel='noreferrer noopener'>github</a>
          <a href='https://discord.gg/E7ejphwzGW' target='_blank' rel='noreferrer noopener'>discord</a>
        </div>
        <div className={styles.footerText}>
          <p>
            plebbit is a protocol to create serverless, adminless, fully decentralized social media platforms
          </p>
        </div>
        <div className={styles.footerText}>
          <p>
            this blog is stored and loaded using the plebbit protocol
          </p>
        </div>
        <div className={styles.footerText}>
          <p>
            GPLv2 licensed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
