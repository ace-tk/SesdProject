import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, AlertTriangle, Loader2 } from 'lucide-react';
import api from '../../utils/api';

const MaintenanceModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    description: '',
    priority: 'Medium'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await api.post('/maintenance', formData);
      onSuccess();
      setFormData({ description: '', priority: 'Medium' });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request. Please try again.');
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

          <h2 style={{ marginBottom: '0.5rem' }}>Raise Maintenance Request</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Tell us what needs fixing in your apartment.</p>

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
              <AlertTriangle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Issue Description</label>
              <textarea 
                required
                rows={4}
                placeholder="Describe the issue in detail (e.g., Leaking pipe in the kitchen...)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border)',
                  outline: 'none',
                  resize: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Priority Level</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                {['Low', 'Medium', 'High'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: p })}
                    style={{
                      padding: '0.75rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: formData.priority === p ? 'var(--primary)' : 'var(--border)',
                      backgroundColor: formData.priority === p ? 'rgba(37, 99, 235, 0.08)' : 'white',
                      color: formData.priority === p ? 'var(--primary)' : 'var(--text)',
                      fontWeight: 600,
                      transition: 'var(--transition)'
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn btn-primary" 
              style={{ padding: '1rem', width: '100%', marginTop: '0.5rem' }}
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                <>Submit Request <Send size={18} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MaintenanceModal;
