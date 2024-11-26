import { useComment, Comment } from '@plebbit/plebbit-react-hooks';
import styles from './post-page.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { formatLocalizedUTCTimestamp, getFormattedDate } from '../../lib/time-utils';
import Markdown from '../../components/markdown';
import useReplies from '../../hooks/use-replies';
import useIsMobile from '../../hooks/use-is-mobile';

const getReadingTime = (text: string) => {
  const wordsPerMinute = 225;
  const wordCount = text?.split(/\s+/)?.length || 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};

const Post = ({comment}: {comment: Comment}) => {
  const { author, content, timestamp, title, replyCount } = comment || {};
  const isMobile = useIsMobile();

  let loremIpsum = 'Lorem ipsum dolor *sit amet*, **consectetur** adipiscing [elit](https://www.google.com).\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n&nbsp;\n\n Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n![image](https://github.com/plebbit/assets/blob/master/logo-circle-32x32.png?raw=true)Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit animExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim\n\n![video](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\n![audio](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\n![iframe](https://www.youtube.com/watch?v=dQw4w9WgXcQ)\n\nhttps://www.youtube.com/watch?v=dQw4w9WgXcQ';

  loremIpsum = loremIpsum.repeat(5);

  return (
    <div className={styles.letter}>
      <h1>{title || 'No Title'}</h1>
      <hr />
      {isMobile ? (
        <div className={styles.secondLine}> 
          <div>
            <span className={styles.author}>by u/{author?.shortAddress || 'Anonymous'}</span>
            <span className={styles.comments}>{replyCount} {replyCount === 1 ? 'comment' : 'comments'}</span>
          </div>
          <div>
            <span className={styles.timestamp}>{formatLocalizedUTCTimestamp(timestamp, 'en-US')}</span>
            <span className={styles.readingTime}>{getReadingTime(content || loremIpsum)}</span>
          </div>
        </div>
      ) : (
        <div className={styles.secondLine}>
          <span className={styles.author}>by u/{author?.shortAddress || 'Anonymous'}</span>
          <span className={styles.separator} />
          <span className={styles.timestamp}>{formatLocalizedUTCTimestamp(timestamp, 'en-US')}</span>
          <span className={styles.separator} />
          <span className={styles.comments}>{replyCount} {replyCount === 1 ? 'comment' : 'comments'}</span>
          <span className={styles.readingTime}>{getReadingTime(content || loremIpsum)}</span>
        </div>
      )}
      <div className={styles.postContent}>
        <Markdown content={content || loremIpsum} />
      </div>
    </div>
  )
};

const Reply = ({comment, depth = 0}: {comment: Comment, depth: number}) => {
  const replies = useReplies(comment);
  return (
    <div className={`${styles.reply} ${depth > 0 ? styles.nestedReply : ''}`}>
      <span className={styles.author}>u/{comment.author?.shortAddress || 'Anonymous'}</span>
      <span className={styles.separator} />
      <span className={styles.timestamp}>{getFormattedDate(comment.timestamp, 'en-US')}</span>
      <span className={styles.content}>
        <Markdown content={comment.content} />
      </span>
      {replies.map((reply) => (
        <Reply 
          comment={reply}
          key={reply.cid}
          depth={(depth || 0) + 1}
        />
      ))}
    </div>
  );
};

const PostPage = () => {
  const comment = useComment({ commentCid: useParams().commentCid });
  const { replyCount, subplebbitAddress } = comment || {};
  
  const replies = useReplies(comment);

  const navigate = useNavigate();

  if (subplebbitAddress !== 'blog.plebbit.eth') {
    return <div>This is not the blog subplebbit</div>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.post}>
        <Post comment={comment} />
      </div>
      <div className={styles.navigation}>
        <div className={styles.backToTop}>
          ^{' '}
          <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            back to top
          </span>
        </div>
        <br />
        <div className={styles.backToFeed}>
          {`< `}
          <span onClick={() => navigate('/')}> back to all posts</span>
        </div>
      </div>
      <div className={styles.replies}>
        <h2>{replyCount} {replyCount === 1 ? 'comment' : 'comments'}</h2>
        <div className={styles.replyForm}>
          <textarea />
          <button>reply</button>
        </div>
        {replies.map((reply) => (
          <Reply comment={reply} key={reply.cid} depth={0} />
        ))}
      </div>
    </div>
  );
};

export default PostPage;
