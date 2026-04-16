import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Calendar, Clock, Loader2, Info } from 'lucide-react';
import api from '../../utils/api';

const VisitorModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    visitor_name: '',
    purpose: '',
    expected_date: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.post('/visitors/pre-approve', formData);
      onSuccess();
      setFormData({
        visitor_name: '',
        purpose: '',
        expected_date: new Date().toISOString().split('T')[0]
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to pre-approve visitor. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '1.5rem'
      }} onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="card"
          style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)' }}
          >
            <X size={24} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ 
              backgroundColor: 'rgba(37, 99, 235, 0.1)', 
              color: 'var(--primary)', 
              padding: '0.5rem', 
              borderRadius: 'var(--radius-md)' 
            }}>
              <UserPlus size={24} />
            </div>
            <h2 style={{ margin: 0 }}>Pre-approve Visitor</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Register your guest in advance for seamless entry at the gate.
          </p>

          {error && (
            <div style={{ 
              backgroundColor: '#fef2f2', 
              color: 'var(--error)', 
              padding: '1rem', 
              borderRadius: 'var(--radius-md)', 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem'
            }}>
              <Info size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Visitor Name</label>
              <input 
                required
                type="text"
                placeholder="Full Name"
                value={formData.visitor_name}
                onChange={(e) => setFormData({ ...formData, visitor_name: e.target.value })}
                className="input"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Expected Date</label>
              <div style={{ position: 'relative' }}>
                <input 
                  required
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.expected_date}
                  onChange={(e) => setFormData({ ...formData, expected_date: e.target.value })}
                  className="input"
                  style={{ width: '100%', paddingLeft: '2.5rem' }}
                />
                <Calendar size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Purpose of Visit</label>
              <input 
                type="text"
                placeholder="e.g., Family visit, Delivery, Service"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="input"
                style={{ width: '100%' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary" 
              style={{ padding: '1rem', width: '100%', marginTop: '0.5rem', gap: '0.75rem' }}
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Register Visitor <UserPlus size={18} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VisitorModal;
