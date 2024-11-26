import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './views/home';
import PostPage from './views/post-page';
import Header from './components/header/header';
import Footer from './components/footer/footer';

const App = () => {
  const globalLayout = (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );

  return (
    <Routes>
      <Route path="/" element={globalLayout}>
        <Route index element={<Home />} />
        <Route path="/c/:commentCid" element={<PostPage />} />
      </Route>
    </Routes>
  );
};

export default App;
