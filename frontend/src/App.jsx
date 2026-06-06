import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.body.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-logo">L</div>
            <h1>Lead CRM</h1>
          </div>
          <button className="theme-toggle" onClick={() => setDark(!dark)}>
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
      <Dashboard />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: dark ? '#1c1c26' : '#ffffff',
            color: dark ? '#e8e8f0' : '#1a1a2e',
            border: dark ? '1px solid #2a2a3d' : '1px solid #e0e0e0',
            borderRadius: '10px',
            fontSize: '13px',
          },
        }}
      />
    </>
  );
}