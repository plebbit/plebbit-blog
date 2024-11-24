import { useFeed } from '@plebbit/plebbit-react-hooks';
import styles from './home.module.css';
import Header from '../../components/header';
import FeedPost from '../../components/feed-post';

const Home = () => {
  const { feed } = useFeed({subplebbitAddresses: ['blog.plebbit.eth']});

  return (
    <div className={styles.home}>
      <Header />
      {feed?.map((post) => (
        <FeedPost post={post} key={post.cid} />
      ))}
    </div>
  );
};

export default Home;
