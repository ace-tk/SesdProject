import React from 'react';
import { User, Calendar, Clock, MapPin, CheckCircle2, XCircle, LogOut } from 'lucide-react';

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
      gap: '1.25rem',
      transition: 'var(--transition)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '12px', 
            backgroundColor: 'var(--background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            border: '1px solid var(--border)'
          }}>
            <User size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>{visitor.visitor_name}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className="badge" style={{ 
                backgroundColor: `${statusInfo.color}15`,
                color: statusInfo.color,
                fontSize: '0.65rem'
              }}>
                {visitor.status}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 500 }}>
          <Calendar size={14} />
          {new Date(visitor.expected_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '0.75rem', 
        padding: '1rem',
        backgroundColor: '#f8fafc',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Clock size={16} style={{ color: 'var(--primary)' }} />
          <div>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.025em' }}>Entry</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{visitor.entry_time ? new Date(visitor.entry_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <LogOut size={16} style={{ color: 'var(--error)' }} />
          <div>
            <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.025em' }}>Exit</p>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{visitor.exit_time ? new Date(visitor.exit_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}</p>
          </div>
        </div>
      </div>
      
      {visitor.purpose && (
        <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          <span>Purpose: {visitor.purpose}</span>
        </div>
      )}
    </div>
  );
};

export default VisitorCard;
