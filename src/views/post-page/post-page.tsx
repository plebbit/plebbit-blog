import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useComment, Comment } from '@plebbit/plebbit-react-hooks';
import { useCommentMediaInfo } from '../../hooks/use-comment-media-info';
import { CommentMediaInfo } from '../../lib/media-utils';
import { formatLocalizedUTCTimestamp, getFormattedDate } from '../../lib/time-utils';
import styles from './post-page.module.css';
import useIsMobile from '../../hooks/use-is-mobile';
import useReplies from '../../hooks/use-replies';
import Markdown from '../../components/markdown';
import Thumbnail from '../../components/thumbnail';
import Embed from '../../components/embed';

const getReadingTime = (text: string) => {
  const wordsPerMinute = 225;
  const wordCount = text?.split(/\s+/)?.length || 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};

const Media = ({commentMediaInfo, expanded}: {commentMediaInfo: CommentMediaInfo, expanded: boolean}) => {
  let mediaComponent = null;

  if (commentMediaInfo?.type === 'image' || commentMediaInfo?.type === 'gif') {
    mediaComponent = <img src={commentMediaInfo.url} alt='' />;
  } else if (commentMediaInfo?.type === 'video' && expanded) {
    mediaComponent = <video src={`${commentMediaInfo.url}#t=0.001`} controls />;
  } else if (commentMediaInfo?.type === 'webpage' && commentMediaInfo?.thumbnail) {
    mediaComponent = <img src={commentMediaInfo.thumbnail} alt='' />;
  } else if (commentMediaInfo?.type === 'audio' && expanded) {
    mediaComponent = <audio src={commentMediaInfo.url} controls />;
  } else if (commentMediaInfo?.type === 'iframe' && expanded) {
    mediaComponent = <Embed url={commentMediaInfo.url} />;
  }

  return (
    <span className={styles.mediaContainer}>
      {mediaComponent}
    </span>
  );
};

const Post = ({comment}: {comment: Comment}) => {
  const { author, content, timestamp, title, replyCount } = comment || {};
  const isMobile = useIsMobile();
  const commentMediaInfo = useCommentMediaInfo(comment);

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
            <span className={styles.readingTime}>{getReadingTime(content)}</span>
          </div>
        </div>
      ) : (
        <div className={styles.secondLine}>
          <span className={styles.author}>by u/{author?.shortAddress || 'Anonymous'}</span>
          <span className={styles.separator} />
          <span className={styles.timestamp}>{formatLocalizedUTCTimestamp(timestamp, 'en-US')}</span>
          <span className={styles.separator} />
          <span className={styles.comments}>{replyCount} {replyCount === 1 ? 'comment' : 'comments'}</span>
          <span className={styles.readingTime}>{getReadingTime(content)}</span>
        </div>
      )}
      {commentMediaInfo && (
        <span className={styles.media}>
          <Media commentMediaInfo={commentMediaInfo} expanded={true} />
        </span>
      )}
      <div className={styles.postContent}>
        <Markdown content={content || ''} />
      </div>
    </div>
  )
};

const Reply = ({comment, depth = 0}: {comment: Comment, depth: number}) => {
  const replies = useReplies(comment);
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);
  const commentMediaInfo = useCommentMediaInfo(comment);

  return (
    <div className={`${styles.reply} ${depth > 0 ? styles.nestedReply : ''}`}>
      <span className={styles.author}>u/{comment.author?.shortAddress || 'Anonymous'}</span>
      <span className={styles.separator} />
      <span className={styles.timestamp}>{getFormattedDate(comment.timestamp, 'en-US')}</span>
      <span className={`${styles.content} ${expanded ? styles.expanded : ''}`}>
        {comment?.link && (
          <span className={styles.mediaContainer}>
            {expanded && commentMediaInfo ? 
              <span className={styles.media} onClick={() => commentMediaInfo?.type === 'image' || commentMediaInfo?.type === 'gif' || commentMediaInfo?.type === 'webpage' ? toggleExpanded() : null}>
                <Media commentMediaInfo={commentMediaInfo} expanded={expanded} />
              </span> :
              <Thumbnail commentMediaInfo={commentMediaInfo} isReply={true} link={comment?.link} toggleExpanded={toggleExpanded} />
            }
          </span>
        )}
        <span className={styles.textContent}>
          <Markdown content={comment.content || ''} />
        </span>
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
  const navigate = useNavigate();

  const comment = useComment({ commentCid: 'QmXb2bbW7hxn1to3MSoq7kg5Gsm6cfimxhwK2zkwksiuMJ' });
  const { replyCount } = comment || {};
  
  const replies = useReplies(comment);

  return (
    <div className={styles.postPage}>
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
          <span onClick={() => navigate('/')}> back to blog</span>
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
