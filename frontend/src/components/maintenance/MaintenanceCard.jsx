import React from 'react';
import { Wrench, Clock, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';

const MaintenanceCard = ({ request }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'var(--warning)';
      case 'In-Progress': return 'var(--primary)';
      case 'Completed': return 'var(--success)';
      case 'Cancelled': return 'var(--error)';
      default: return 'var(--text-muted)';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return <AlertCircle size={16} className="text-error" />;
      case 'Medium': return <Clock size={16} className="text-warning" />;
      case 'Low': return <CheckCircle2 size={16} className="text-success" />;
      default: return null;
    }
  };

  return (
    <div className="card" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.25rem',
      transition: 'var(--transition)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="badge" style={{ 
            backgroundColor: `${getStatusColor(request.status)}15`,
            color: getStatusColor(request.status),
          }}>
            {request.status}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-muted)' }}>
            {getPriorityIcon(request.priority)} {request.priority}
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          {new Date(request.request_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Wrench size={20} className="text-primary" />
          {request.description.length > 60 ? request.description.substring(0, 60) + '...' : request.description}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {request.description}
        </p>
      </div>

      {(request.assigned_staff_name || request.feedback) && (
        <div style={{ 
          marginTop: '0.25rem', 
          padding: '1.25rem', 
          backgroundColor: '#f8fafc', 
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          fontSize: '0.875rem'
        }}>
          {request.assigned_staff_name && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: request.feedback ? '0.75rem' : '0' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                {request.assigned_staff_name.charAt(0)}
              </div>
              <span>Assigned to <span style={{ fontWeight: 600, color: 'var(--text)' }}>{request.assigned_staff_name}</span></span>
            </div>
          )}
          {request.feedback && (
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.6rem', borderTop: request.assigned_staff_name ? '1px solid var(--border)' : 'none', paddingTop: request.assigned_staff_name ? '0.75rem' : '0' }}>
              <MessageSquare size={16} style={{ color: 'var(--secondary)', marginTop: '0.25rem' }} />
              <p style={{ fontStyle: 'italic', color: 'var(--secondary)' }}>"{request.feedback}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaintenanceCard;
