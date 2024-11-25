import { useComment } from '@plebbit/plebbit-react-hooks';
import styles from './post-page.module.css';
import { useParams } from 'react-router-dom';
import { formatLocalizedUTCTimestamp } from '../../lib/time-utils';
import Markdown from '../../components/markdown';

const PostPage = () => {
  const commentCid = useParams().commentCid;
  const comment = useComment({ commentCid });
  const { author, content, subplebbitAddress, timestamp, title, replyCount } = comment || {};

  if (subplebbitAddress !== 'blog.plebbit.eth') {
    return <div>This is not the blog subplebbit</div>;
  }

  const loremIpsum = 'Lorem ipsum dolor *sit amet*, **consectetur** adipiscing [elit](https://www.google.com).\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n&nbsp;\n\n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  return (
    <div className={styles.postPage}>
      <div className={styles.paper}>
        <h1>{title || 'Lorem ipsum dolor sit amet'}</h1>
        <hr />
        <div className={styles.secondLine}>
          <span className={styles.author}>by {author?.shortAddress || 'Anonymous'}</span>
          <span className={styles.separator} />
          <span className={styles.timestamp}>{formatLocalizedUTCTimestamp(timestamp, 'en-US')}</span>
          <span className={styles.separator} />
          <span className={styles.comments}>{replyCount} {replyCount === 1 ? 'reply' : 'replies'}</span>
        </div>
        <Markdown content={content || loremIpsum} />
      </div>
    </div>
  );
};

export default PostPage;
