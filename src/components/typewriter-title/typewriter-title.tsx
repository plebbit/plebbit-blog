import { useState, useEffect } from 'react';
import styles from './typewriter-title.module.css';

interface TypewriterTitleProps {
  text: string;
  typingSpeed?: number;
}

const TypewriterTitle = ({ text, typingSpeed = 60 }: TypewriterTitleProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    const timeout = setTimeout(() => {
      if (displayText.length < text.length) {
        setDisplayText(text.slice(0, displayText.length + 1));
      } else {
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, text, typingSpeed, isTyping]);

  return (
    <span className={styles.typewriter}>
      {displayText}
      <span className={isTyping ? styles.staticBlinker : styles.blinker}>&#32;</span>
    </span>
  );
};

export default TypewriterTitle;