import { useFeed } from '@plebbit/plebbit-react-hooks';
import styles from './home.module.css';
import FeedPost from '../../components/feed-post';
import SpinningCoin from '../../components/spinning-coin';
import useFeedStateString from '../../hooks/use-feed-state-string';
import LoadingEllipsis from '../../components/loading-ellipsis';

const Home = () => {
  const { feed } = useFeed({subplebbitAddresses: ['blog.plebbit.eth']});
  const stateString = <LoadingEllipsis string={useFeedStateString(['blog.plebbit.eth']) || 'loading'} />;

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <SpinningCoin />
      </div>
      {feed.length === 0 && <div className={styles.stateString}>{stateString}</div>}
      {feed?.map((post) => (
        <FeedPost post={post} key={post.cid} />
      ))}
    </div>
  );
};

export default Home;
