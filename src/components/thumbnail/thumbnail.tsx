import styles from './thumbnail.module.css';
import { Link } from 'react-router-dom';
import useFetchGifFirstFrame from '../../hooks/use-fetch-gif-first-frame';

interface ThumbnailProps {
  cid?: string;
  commentMediaInfo?: CommentMediaInfo;
  expanded?: boolean;
  isReply: boolean;
  link: string;
  subplebbitAddress?: string;
  toggleExpanded?: () => void;
}

interface CommentMediaInfo {
  url: string;
  type: string;
  thumbnail?: string;
  patternThumbnailUrl?: string;
}

const Thumbnail = ({ cid, commentMediaInfo, expanded = false, isReply = false, link, subplebbitAddress, toggleExpanded }: ThumbnailProps) => {
  const iframeThumbnail = commentMediaInfo?.patternThumbnailUrl || commentMediaInfo?.thumbnail;
  let displayWidth, displayHeight, hasLinkDimensions;
  const thumbnailClass = expanded ? styles.thumbnailHidden : styles.thumbnailVisible;


  const style = hasLinkDimensions ? ({ '--width': displayWidth, '--height': displayHeight } as React.CSSProperties) : {};

  let mediaComponent = null;
  const gifFrameUrl = useFetchGifFirstFrame(commentMediaInfo?.type === 'gif' ? commentMediaInfo.url : undefined);

  if (commentMediaInfo?.type === 'image') {
    mediaComponent = <img src={commentMediaInfo.url} alt='' />;
  } else if (commentMediaInfo?.type === 'video') {
    mediaComponent = commentMediaInfo.thumbnail ? <img src={commentMediaInfo.thumbnail} alt='' /> : <video src={`${commentMediaInfo.url}#t=0.001`} />;
  } else if (commentMediaInfo?.type === 'webpage') {
    mediaComponent = <img src={commentMediaInfo.thumbnail} alt='' />;
  } else if (commentMediaInfo?.type === 'iframe') {
    mediaComponent = iframeThumbnail ? <img src={iframeThumbnail} alt='' /> : null;
  } else if (commentMediaInfo?.type === 'gif' && gifFrameUrl) {
    mediaComponent = <img src={gifFrameUrl} alt='' />;
  }

  return (
    <span className={`${styles.thumbnail} ${thumbnailClass}`} style={style}>
      <span className={hasLinkDimensions ? styles.transparentThumbnailWrapper : styles.thumbnailWrapper}>
        {isReply || commentMediaInfo?.type === 'webpage' ? (
          <a
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            onClick={(e) => {
              if (e.button === 0 && isReply) {
                e.preventDefault();
                toggleExpanded && toggleExpanded();
              }
            }}
          >
            {mediaComponent}
          </a>
        ) : (
          <Link to={`/p/${subplebbitAddress}/c/${cid}`}>{mediaComponent}</Link>
        )}
      </span>
    </span>
  );
};

export default Thumbnail;
