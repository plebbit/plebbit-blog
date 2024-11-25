import { useComment } from '@plebbit/plebbit-react-hooks';
import styles from './post-page.module.css';
import { useParams } from 'react-router-dom';
import { formatLocalizedUTCTimestamp } from '../../lib/time-utils';
import Markdown from '../../components/markdown';

const getReadingTime = (text: string) => {
  const wordsPerMinute = 225;
  const wordCount = text?.split(/\s+/)?.length || 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};

const PostPage = () => {
  const commentCid = useParams().commentCid;
  const comment = useComment({ commentCid });
  const { author, content, subplebbitAddress, timestamp, title, replyCount } = comment || {};

  if (subplebbitAddress !== 'blog.plebbit.eth') {
    return <div>This is not the blog subplebbit</div>;
  }

  let loremIpsum = 'Lorem ipsum dolor *sit amet*, **consectetur** adipiscing [elit](https://www.google.com).\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n&nbsp;\n\n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n![image](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)\n\n![video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\n![audio](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\n![iframe](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\nhttps://www.youtube.com/watch?v=dQw4w9WgXcQ';

  loremIpsum = loremIpsum.repeat(5);

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
          <span className={styles.readingTime}>{getReadingTime(content || loremIpsum)}</span>
        </div>
        <div className={styles.postContent}>
          <Markdown content={content || loremIpsum} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
