import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { HashRouter as Router } from 'react-router-dom';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);
