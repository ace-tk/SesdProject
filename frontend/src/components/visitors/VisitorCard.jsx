import React from 'react';
import { User, Calendar, Clock, MapPin, CheckCircle2, XCircle } from 'lucide-react';

const VisitorCard = ({ visitor }) => {
  const getStatusInfo = (status) => {
    switch (status) {
      case 'Expected': 
        return { color: 'var(--primary)', icon: <Clock size={16} /> };
      case 'Entered': 
        return { color: 'var(--success)', icon: <CheckCircle2 size={16} /> };
      case 'Exited': 
        return { color: 'var(--text-muted)', icon: <XCircle size={16} /> };
      default: 
        return { color: 'var(--text-muted)', icon: <Clock size={16} /> };
    }
  };

  const statusInfo = getStatusInfo(visitor.status);

  return (
    <div className="card" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      transition: 'var(--transition)',
      padding: '1.25rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)'
          }}>
            <User size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.125rem' }}>{visitor.visitor_name}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span style={{ 
                color: statusInfo.color, 
                backgroundColor: `${statusInfo.color}15`,
                padding: '0.15rem 0.5rem',
                borderRadius: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontWeight: 600
              }}>
                {statusInfo.icon} {visitor.status}
              </span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
            <Calendar size={14} className="text-text-muted" />
            <span>{new Date(visitor.expected_date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '0.5rem',
        padding: '0.75rem',
        backgroundColor: 'var(--background)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.8125rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <Clock size={14} />
          <span>Entry: {visitor.entry_time ? new Date(visitor.entry_time).toLocaleTimeString() : '--:--'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <Clock size={14} />
          <span>Exit: {visitor.exit_time ? new Date(visitor.exit_time).toLocaleTimeString() : '--:--'}</span>
        </div>
      </div>
      
      {visitor.purpose && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', gap: '0.5rem' }}>
          <strong>Purpose:</strong> {visitor.purpose}
        </p>
      )}
    </div>
  );
};

export default VisitorCard;
