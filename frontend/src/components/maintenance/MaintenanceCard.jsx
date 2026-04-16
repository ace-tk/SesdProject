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
      gap: '1rem',
      transition: 'var(--transition)',
      borderLeft: `4px solid ${getStatusColor(request.status)}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: 700, 
            padding: '0.25rem 0.6rem', 
            borderRadius: '1rem', 
            backgroundColor: `${getStatusColor(request.status)}20`,
            color: getStatusColor(request.status),
            textTransform: 'uppercase'
          }}>
            {request.status}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {getPriorityIcon(request.priority)} {request.priority} Priority
          </div>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {new Date(request.request_date).toLocaleDateString()}
        </span>
      </div>

      <div>
        <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Wrench size={18} className="text-primary" />
          {request.description.length > 50 ? request.description.substring(0, 50) + '...' : request.description}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {request.description}
        </p>
      </div>

      {(request.assigned_staff_name || request.feedback) && (
        <div style={{ 
          marginTop: '0.5rem', 
          padding: '1rem', 
          backgroundColor: 'var(--background)', 
          borderRadius: 'var(--radius-md)',
          fontSize: '0.875rem'
        }}>
          {request.assigned_staff_name && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: request.feedback ? '0.5rem' : '0' }}>
              <CheckCircle2 size={16} className="text-primary" />
              <span>Assigned to: <strong>{request.assigned_staff_name}</strong></span>
            </div>
          )}
          {request.feedback && (
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
              <MessageSquare size={16} className="text-text-muted" style={{ marginTop: '0.2rem' }} />
              <p><em>"{request.feedback}"</em></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaintenanceCard;
