import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import GetStarted from './pages/GetStarted';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/get-started" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
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
    </AuthProvider>
  );
}

export default App;
