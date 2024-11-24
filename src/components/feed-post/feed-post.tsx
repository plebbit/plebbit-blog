import { Comment } from '@plebbit/plebbit-react-hooks';
import styles from './feed-post.module.css';

const FeedPost = ({post}: {post: Comment}) => {
  const { author, timestamp, title } = post || {};
  return (
    <div className={styles.feedPost}>
      <h3>{title || 'no title'}</h3> by {author?.shortAddress || 'unknown'}
    </div>
  );
};

export default FeedPost;
