import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Authentification/AuthContext';

window.onerror = function (message, source, lineno, colno, error) {
  return true;
};

window.addEventListener('error', function (e) {
  console.error('Caught global error:', e.error || e.message);
}, true);

window.addEventListener('unhandledrejection', function (e) {
  console.error('Unhandled Promise rejection:', e.reason);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
