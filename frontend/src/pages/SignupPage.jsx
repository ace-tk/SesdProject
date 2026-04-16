import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Shield, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'resident'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signup(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '120px 1.5rem 60px',
      background: 'var(--background)'
    }}>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="card" 
        style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--text-muted)' }}>Join AptManager to manage your community.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fee2e2', 
              color: 'var(--error)', 
              padding: '1rem', 
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.9rem'
            }}
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                type="text" 
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem 0.75rem 2.75rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)',
                  outline: 'none',
                  transition: 'var(--transition)'
                }}
                className="input-field"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                type="email" 
                name="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem 0.75rem 2.75rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
                className="input-field"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <input 
                type="password" 
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem 0.75rem 2.75rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)',
                  outline: 'none'
                }}
                className="input-field"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>I am a...</label>
            <div style={{ position: 'relative' }}>
              <Shield style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{ 
                  width: '100%', 
                  padding: '0.75rem 1rem 0.75rem 2.75rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)',
                  outline: 'none',
                  backgroundColor: 'white',
                  appearance: 'none'
                }}
                className="input-field"
              >
                <option value="resident">Resident</option>
                <option value="admin">Administrator</option>
                <option value="staff">Maintenance Staff</option>
                <option value="security">Security Personnel</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '1rem', padding: '0.875rem' }}
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <>Sign Up <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log In</Link>
        </div>
      </motion.div>

      <style>{`
        .input-field:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
