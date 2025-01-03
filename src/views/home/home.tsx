import { useFeed, Comment } from '@plebbit/plebbit-react-hooks';
import styles from './home.module.css';
import SpinningCoin from '../../components/spinning-coin';
import useFeedStateString from '../../hooks/use-feed-state-string';
import LoadingEllipsis from '../../components/loading-ellipsis';
import { Link, useParams } from 'react-router-dom';
import { formatLocalizedUTCTimestamp } from '../../lib/time-utils';
import { useEffect, useState } from 'react';

interface FlairProps {
  flair: {
    text: string;
    backgroundColor?: string;
    textColor?: string;
    expiresAt?: number;
  };
}

const Flair = ({ flair }: FlairProps) => {
  const isExpired = flair.expiresAt ? Date.now() / 1000 > flair.expiresAt : false;

  if (isExpired) {
    return null;
  }

  return (
    <span className={styles.wrapper}>
      <Link to={`/tag/${flair.text}`}>
        <span className={styles.flair}>
          [{flair.text}]
        </span>
      </Link>
    </span>
  );
};

const BlogPost = ({post}: {post: Comment}) => {
  const { author, cid, flair, replyCount, timestamp, title } = post || {};
  const { displayName, shortAddress } = author;
  return (
    <div className={styles.blogPostContainer}>
      <Link to={`/c/${cid}`}>
        <div className={styles.blogPost}>
          <div className={styles.title}>{title}</div>
          <div className={styles.secondLine}>
            <span className={styles.author}>by {displayName ? `${displayName} ` : ""}{`u/${shortAddress}` || 'Anonymous'}</span>
            <span className={styles.separator} />
            <span className={styles.timestamp}>{formatLocalizedUTCTimestamp(timestamp, 'en-US')}</span>
            <span className={styles.separator} />
            <span className={styles.comments}>{replyCount} {replyCount === 1 ? 'comment' : 'comments'}</span>
          </div>
          <div className={styles.flairsLine}>
            {flair && <Flair flair={flair} key={flair.text} />}
          </div>
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  const { tag } = useParams();
  const { feed: unfiltedFeed } = useFeed({subplebbitAddresses: ['blog.plebbit.eth']});
  const baseStateString = useFeedStateString(['blog.plebbit.eth']) || 'loading';
  
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (unfiltedFeed.length === 0) {
      timeoutId = setTimeout(() => {
        setShowOfflineMessage(true);
      }, 10000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [unfiltedFeed.length]);

  const stateString = (
    <LoadingEllipsis 
      string={`${baseStateString}${showOfflineMessage ? ', the blog subplebbit might be offline' : ''}`} 
    />
  );

  const feed = unfiltedFeed.filter(post => 
    !tag || post.flair?.text === tag
  );

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <SpinningCoin />
      </div>
      {feed.length === 0 && <div className={styles.stateString}>{stateString}</div>}
      <div className={styles.blogPosts}>
        {feed?.map((post) => (
          <BlogPost post={post} key={post.cid} />
        ))}
      </div>
    </div>
  );
};

export default Home;
