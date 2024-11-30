import { useFeed, Comment } from '@plebbit/plebbit-react-hooks';
import styles from './home.module.css';
import SpinningCoin from '../../components/spinning-coin';
import useFeedStateString from '../../hooks/use-feed-state-string';
import LoadingEllipsis from '../../components/loading-ellipsis';
import { Link } from 'react-router-dom';
import { formatLocalizedUTCTimestamp } from '../../lib/time-utils';

const BlogPost = ({post}: {post: Comment}) => {
  const { author, cid, replyCount, timestamp, title, } = post || {};
  return (
    <div className={styles.blogPostContainer}>
      <Link to={`/c/${cid}`}>
        <div className={styles.blogPost}>
          <div className={styles.title}>{title}</div>
          <div className={styles.secondLine}>
            <span className={styles.author}>by {author?.shortAddress || 'Anonymous'}</span>
            <span className={styles.separator} />
            <span className={styles.timestamp}>{formatLocalizedUTCTimestamp(timestamp, 'en-US')}</span>
            <span className={styles.separator} />
            <span className={styles.comments}>{replyCount} {replyCount === 1 ? 'comment' : 'comments'}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  const { feed } = useFeed({subplebbitAddresses: ['blog.plebbit.eth']});
  const stateString = <LoadingEllipsis string={useFeedStateString(['blog.plebbit.eth']) || 'loading'} />;

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
