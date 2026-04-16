import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Users, 
  Wrench, 
  Shield, 
  LayoutDashboard, 
  Bell, 
  Settings, 
  LogOut,
  UserCheck,
  ClipboardList
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const renderRoleSpecificContent = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'resident':
        return <ResidentDashboard />;
      case 'staff':
        return <StaffDashboard />;
      case 'security':
        return <SecurityDashboard />;
      default:
        return <p>Loading specialized dashboard...</p>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '90vh', backgroundColor: 'var(--background)', marginTop: '64px' }}>
      {/* Sidebar - Simple for now */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--surface)', 
        borderRight: '1px solid var(--border)',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 0.5rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: 'var(--radius-md)', 
            backgroundColor: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h4 style={{ fontWeight: 700 }}>AptManager</h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{user?.role} Portal</p>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          {user?.role === 'admin' && <SidebarItem icon={<Users size={20} />} label="User Management" />}
          {(user?.role === 'admin' || user?.role === 'resident' || user?.role === 'staff') && (
            <SidebarItem icon={<Wrench size={20} />} label="Maintenance" />
          )}
          {(user?.role === 'admin' || user?.role === 'resident' || user?.role === 'security') && (
            <SidebarItem icon={<Shield size={20} />} label="Visitor Logs" />
          )}
          <SidebarItem icon={<Bell size={20} />} label="Notifications" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <button 
            onClick={logout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              color: 'var(--error)', 
              background: 'none', 
              border: 'none', 
              fontWeight: 600,
              padding: '0.75rem 0.5rem',
              width: '100%',
              borderRadius: 'var(--radius-md)',
              transition: 'var(--transition)'
            }}
            className="logout-btn"
          >
            <LogOut size={20} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Good morning, {user?.name.split(' ')[0]} 👋</h1>
            <p style={{ color: 'var(--text-muted)' }}>Here's what's happening in your community today.</p>
          </motion.div>

          {renderRoleSpecificContent()}
        </motion.div>
      </main>

      <style>{`
        .sidebar-item:hover {
          background-color: var(--background);
          color: var(--primary);
        }
        .logout-btn:hover {
          background-color: #fef2f2;
        }
      `}</style>
    </div>
  );
};

// Help Components
const SidebarItem = ({ icon, label, active = false }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: '0.75rem', 
    padding: '0.75rem 1rem', 
    borderRadius: 'var(--radius-md)',
    backgroundColor: active ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
    color: active ? 'var(--primary)' : 'var(--text-muted)',
    fontWeight: active ? 600 : 500,
    cursor: 'pointer',
    transition: 'var(--transition)'
  }} className="sidebar-item">
    {icon}
    <span>{label}</span>
  </div>
);

const AdminDashboard = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
    <DashboardCard title="Total Residents" value="1,248" icon={<Users size={24} />} color="#3b82f6" delta="+12 this month" />
    <DashboardCard title="Pending Requests" value="14" icon={<Wrench size={24} />} color="#f59e0b" delta="-2 since yesterday" />
    <DashboardCard title="Visitors Today" value="84" icon={<UserCheck size={24} />} color="#10b981" delta="+5% vs last week" />
    <DashboardCard title="Active Staff" value="22" icon={<ClipboardList size={24} />} color="#8b5cf6" delta="All shifts covered" />
  </div>
);

const ResidentDashboard = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
    <DashboardCard title="Your Bills" value="₹4,250" icon={<ClipboardList size={24} />} color="#ef4444" delta="Due in 4 days" />
    <DashboardCard title="Active Requests" value="2" icon={<Wrench size={24} />} color="#3b82f6" delta="1 in progress" />
    <DashboardCard title="Expected Visitors" value="1" icon={<UserCheck size={24} />} color="#10b981" delta="Arriving at 4:30 PM" />
  </div>
);

const StaffDashboard = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
    <DashboardCard title="Assigned Tasks" value="5" icon={<Wrench size={24} />} color="#3b82f6" delta="2 high priority" />
    <DashboardCard title="Completed Today" value="3" icon={<ClipboardList size={24} />} color="#10b981" delta="+1 bonus earned" />
  </div>
);

const SecurityDashboard = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
    <DashboardCard title="Entries Today" value="156" icon={<UserCheck size={24} />} color="#10b981" delta="Peak traffic now" />
    <DashboardCard title="Current Visitors" value="12" icon={<Shield size={24} />} color="#3b82f6" delta="Within building" />
  </div>
);

const DashboardCard = ({ title, value, icon, color, delta }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        borderRadius: 'var(--radius-md)', 
        backgroundColor: `${color}15`, 
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{title}</span>
    </div>
    <div>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{value}</h2>
      <p style={{ fontSize: '0.8125rem', color: delta.includes('+') ? 'var(--success)' : delta.includes('-') ? 'var(--error)' : 'var(--text-muted)', fontWeight: 600 }}>
        {delta}
      </p>
    </div>
  </div>
);

export default Dashboard;
