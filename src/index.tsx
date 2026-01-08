import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';
import './themes.css';

// React Grab: Hold ⌘C and click any element to provide visual context to AI coding agents (dev only)
if (import.meta.env.DEV) {
  import('react-grab');
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
