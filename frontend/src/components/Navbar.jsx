import React from 'react';
import { Home, User, ShieldCheck, Wrench, Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '70px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <Link to="/" className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
        <div style={{
          background: 'var(--primary)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Home size={24} />
        </div>
        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>
          AptManager
        </span>
      </Link>

      <div className="flex items-center gap-8" style={{ display: 'none', md: 'flex' }}>
        <a href="#features" className="nav-link">Features</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="btn btn-outline" style={{ display: 'none', sm: 'block' }}>Login</button>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/get-started')}
        >
          Get Started
        </button>
      </div>
      
      <style>{`
        .nav-link {
          font-weight: 500;
          color: var(--text-muted);
        }
        .nav-link:hover {
          color: var(--primary);
        }
        @media (max-width: 768px) {
          .nav-link { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
