import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './views/home';
import PostPage from './views/post-page';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import ChallengeModal from './components/challenge-modal/challenge-modal';
import useTheme from './hooks/use-theme';
import { useEffect } from 'react';

const App = () => {
  const [theme] = useTheme();
  useEffect(() => {
    document.body.classList.forEach((className) => document.body.classList.remove(className));
    document.body.classList.add(theme);
  }, [theme]);

  const globalLayout = (
    <>
      <ChallengeModal />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );

  return (
    <div className={theme}>
      <Routes>
        <Route path="/" element={globalLayout}>
          <Route index element={<Home />} />
          <Route path="/c/:commentCid" element={<PostPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
