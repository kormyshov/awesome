import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style/index.css';
import App from './components/wrappers/App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
