import { useFeed } from '@plebbit/plebbit-react-hooks';
import styles from './home.module.css';
import FeedPost from '../../components/feed-post';
import SpinningCoin from '../../components/spinning-coin';

const Home = () => {
  const { feed } = useFeed({subplebbitAddresses: ['blog.plebbit.eth']});

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <SpinningCoin />
      </div>
      {Array(100).fill(null).map(() => (
        feed?.map((post) => (
          <FeedPost post={post} key={post.cid} />
        ))
      ))}
    </div>
  );
};

export default Home;
