import { Comment } from '@plebbit/plebbit-react-hooks';
import styles from './feed-post.module.css';
import { formatLocalizedUTCTimestamp } from '../../lib/time-utils';
import { Link } from 'react-router-dom';

const FeedPost = ({post}: {post: Comment}) => {
  const { author, cid, replyCount, timestamp, title, } = post || {};
  return (
    <div className={styles.feedPost}>
        <Link to={`/c/${cid}`}>
          <div className={styles.title}>{title}</div>
          <div className={styles.secondLine}>
            <span className={styles.author}>by {author?.shortAddress || 'unknown'}</span>
            <span className={styles.separator} />
            <span className={styles.timestamp}>{formatLocalizedUTCTimestamp(timestamp, 'en-US')}</span>
            <span className={styles.separator} />
            <span className={styles.comments}>{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</span>
          </div>
      </Link>
    </div>
  );
};

export default FeedPost;
