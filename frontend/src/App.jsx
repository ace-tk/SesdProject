import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Future routes */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/register" element={<Register />} /> */}
          </Routes>
        </main>
        
        <footer className="container" style={{
          padding: '4rem 0 2rem',
          marginTop: '4rem',
          borderTop: '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} AptManager. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
