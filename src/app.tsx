import { Routes, Route } from 'react-router-dom';
import Home from './views/home';
import PostPage from './views/post-page';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/c/:commentCid" element={<PostPage />} />
    </Routes>
  );
};

export default App;
