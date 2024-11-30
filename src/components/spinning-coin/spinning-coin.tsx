import styles from './spinning-coin.module.css';

const SpinningCoin = () => {
  return (
    <div className={styles.coinContainer}>
      <svg className={styles.coin} version="1.1" viewBox="-5 -5 316.14 316.14" xmlns="http://www.w3.org/2000/svg">
        <circle 
          cx="153.07" 
          cy="153.07" 
          r="151.07" 
          fill="var(--spinning-coin-background)"
          stroke="var(--spinning-coin-stroke)"
          strokeWidth="4"
        />
        <g transform="translate(-229.37 -308.69)">
          <circle cx="334.04" cy="399.32" r="14.563" fill="var(--spinning-coin-stroke)"/>
          <circle cx="476.01" cy="400.8" r="14.563" fill="var(--spinning-coin-stroke)"/>
          <path d="m427.18 415.83 26.214 97.087-80.583-1.9418" fill="none" stroke="var(--spinning-coin-stroke)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="13.5"/>
          <path d="m359.22 557.57 100.97 3.8835" fill="none" stroke="var(--spinning-coin-stroke)" strokeLinecap="round" strokeWidth="13.5"/>
        </g>
      </svg>
    </div>
  );
};

export default SpinningCoin;
