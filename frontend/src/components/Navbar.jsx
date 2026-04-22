import React from 'react';
import { Home, LogOut, LayoutDashboard, Menu } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
      <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
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

      <div className="flex items-center gap-8 nav-links">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="nav-link">Home</Link>
        <Link to="/#features" className="nav-link">Features</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
      </div>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <button 
              className="btn btn-outline" 
              style={{ display: 'none', sm: 'block' }}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div style={{ textAlign: 'right', display: 'none', sm: 'block' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{user.name}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user.role}</p>
            </div>
            <button 
              className="btn btn-outline"
              onClick={logout}
              style={{ padding: '0.5rem 1rem' }}
            >
              <LogOut size={18} />
              <span style={{ display: 'none', lg: 'inline' }}>Logout</span>
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        .nav-link {
          font-weight: 500;
          color: var(--text-muted);
          transition: var(--transition);
        }
        .nav-link:hover {
          color: var(--primary);
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
