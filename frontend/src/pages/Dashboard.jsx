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
  ClipboardList,
  Plus,
  CheckCircle,
  Clock as ClockIcon
} from 'lucide-react';
import api from '../utils/api';
import MaintenanceCard from '../components/maintenance/MaintenanceCard';
import MaintenanceModal from '../components/maintenance/MaintenanceModal';
import VisitorCard from '../components/visitors/VisitorCard';
import VisitorModal from '../components/visitors/VisitorModal';

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

const AdminDashboard = () => {
  const [requests, setRequests] = React.useState([]);
  const [staff, setStaff] = React.useState([]);
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [reqsRes, staffRes] = await Promise.all([
        api.get('/maintenance/admin'),
        api.get('/maintenance/admin/staff')
      ]);
      setRequests(reqsRes.data.data);
      setStaff(staffRes.data.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleAssign = async (maintenanceId, staffId) => {
    try {
      await api.post(`/maintenance/${maintenanceId}/assign`, { staff_id: staffId });
      fetchData();
      setSelectedRequest(null);
    } catch (err) {
      alert('Failed to assign staff');
    }
  };

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const inProgressRequests = requests.filter(r => r.status === 'In-Progress');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <DashboardCard title="Total Residents" value="1,248" icon={<Users size={24} />} color="#3b82f6" delta="+12 this month" />
        <DashboardCard 
          title="Pending Requests" 
          value={pendingRequests.length} 
          icon={<Wrench size={24} />} 
          color="#f59e0b" 
          delta={`${inProgressRequests.length} in progress`} 
        />
        <DashboardCard title="Maintenance Staff" value={staff.length} icon={<Users size={24} />} color="#10b981" delta="All active" />
      </div>

      <section>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ClipboardList size={20} className="text-primary" /> Maintenance Oversight
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isLoading ? (
            <p>Loading requests...</p>
          ) : requests.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No maintenance requests in the system.</p>
          ) : (
            requests.map(request => (
              <div key={request.maintenance_id} style={{ position: 'relative' }}>
                <MaintenanceCard request={request} />
                {request.status === 'Pending' && (
                  <button 
                    onClick={() => setSelectedRequest(request)}
                    className="btn btn-primary"
                    style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8125rem' }}
                  >
                    Assign Staff
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {selectedRequest && (
        <StaffAssignmentModal 
          request={selectedRequest} 
          staffList={staff} 
          onClose={() => setSelectedRequest(null)} 
          onAssign={handleAssign} 
        />
      )}
    </div>
  );
};

const StaffAssignmentModal = ({ request, staffList, onClose, onAssign }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 3000
    }}>
      <div className="card" style={{ width: '450px', padding: '2rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Assign Maintenance Staff</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Select a staff member for: "{request.description}"
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem' }}>
          {staffList.map(s => (
            <div 
              key={s.staff_id}
              onClick={() => onAssign(request.maintenance_id, s.staff_id)}
              style={{ 
                padding: '1rem', 
                border: '1px solid var(--border)', 
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              className="sidebar-item"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.9375rem', marginBottom: '0.125rem' }}>{s.username}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.specialization}</p>
                </div>
                <Users size={18} className="text-primary" />
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="btn btn-outline" style={{ width: '100%' }}>Cancel</button>
      </div>
    </div>
  );
};

const ResidentDashboard = () => {
  const [maintenance, setMaintenance] = React.useState([]);
  const [visitors, setVisitors] = React.useState([]);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = React.useState(false);
  const [isVisitorModalOpen, setIsVisitorModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [mRes, vRes] = await Promise.all([
        api.get('/maintenance/resident'),
        api.get('/visitors/history')
      ]);
      setMaintenance(mRes.data.data);
      setVisitors(vRes.data.data);
    } catch (err) {
      console.error('Error fetching resident data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const activeMaintenance = maintenance.filter(m => m.status !== 'Completed');
  const upcomingVisitors = visitors.filter(v => v.status === 'Expected');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Stats Quick View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <DashboardCard 
          title="Active Requests" 
          value={activeMaintenance.length} 
          icon={<Wrench size={24} />} 
          color="#3b82f6" 
          delta={activeMaintenance.some(m => m.status === 'In-Progress') ? "1 in progress" : "All pending"} 
        />
        <DashboardCard 
          title="Expected Visitors" 
          value={upcomingVisitors.length} 
          icon={<UserCheck size={24} />} 
          color="#10b981" 
          delta={upcomingVisitors.length > 0 ? "Entry pre-approved" : "No expected guests"} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Maintenance Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Wrench size={20} className="text-primary" /> Recent Maintenance
            </h3>
            <button 
              onClick={() => setIsMaintenanceModalOpen(true)}
              className="btn btn-primary" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', gap: '0.5rem' }}
            >
              <Plus size={16} /> Raise Request
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isLoading ? (
              <p>Loading requests...</p>
            ) : maintenance.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <p>No maintenance requests found.</p>
              </div>
            ) : (
              maintenance.slice(0, 3).map(m => (
                <MaintenanceCard key={m.maintenance_id} request={m} />
              ))
            )}
          </div>
        </section>

        {/* Visitors Section */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={20} className="text-success" /> Visitor Logs
            </h3>
            <button 
              onClick={() => setIsVisitorModalOpen(true)}
              className="btn btn-outline" 
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', gap: '0.5rem' }}
            >
              <Plus size={16} /> Pre-approve
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isLoading ? (
              <p>Loading visitors...</p>
            ) : visitors.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <p>No visitor history found.</p>
              </div>
            ) : (
              visitors.slice(0, 3).map(v => (
                <VisitorCard key={v.visitor_id} visitor={v} />
              ))
            )}
          </div>
        </section>
      </div>

      <MaintenanceModal 
        isOpen={isMaintenanceModalOpen} 
        onClose={() => setIsMaintenanceModalOpen(false)} 
        onSuccess={fetchData} 
      />
      <VisitorModal 
        isOpen={isVisitorModalOpen} 
        onClose={() => setIsVisitorModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  );
};

const StaffDashboard = () => {
  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedTask, setSelectedTask] = React.useState(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/maintenance/staff');
      setTasks(res.data.data);
    } catch (err) {
      console.error('Error fetching staff tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdateStatus = async (taskId, status, feedback) => {
    try {
      await api.patch(`/maintenance/${taskId}`, { status, feedback });
      fetchTasks();
      setSelectedTask(null);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <DashboardCard 
          title="Assigned Tasks" 
          value={tasks.filter(t => t.status !== 'Completed').length} 
          icon={<Wrench size={24} />} 
          color="#3b82f6" 
          delta="Active works" 
        />
        <DashboardCard 
          title="Completed Today" 
          value={tasks.filter(t => t.status === 'Completed').length} 
          icon={<CheckCircle size={24} />} 
          color="#10b981" 
          delta="Good progress" 
        />
      </div>

      <section>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ClipboardList size={20} className="text-primary" /> My Task Queue
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isLoading ? (
            <p>Loading your tasks...</p>
          ) : tasks.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              <p>No tasks assigned to you yet.</p>
            </div>
          ) : (
            tasks.map(task => (
              <div key={task.maintenance_id} style={{ position: 'relative' }}>
                <MaintenanceCard request={task} />
                {task.status !== 'Completed' && (
                  <button 
                    onClick={() => setSelectedTask(task)}
                    className="btn btn-outline"
                    style={{ 
                      position: 'absolute', 
                      right: '1.5rem', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      padding: '0.5rem 1rem',
                      fontSize: '0.8125rem'
                    }}
                  >
                    Update Progress
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {selectedTask && (
        <StatusUpdateModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
          onUpdate={handleUpdateStatus} 
        />
      )}
    </div>
  );
};

const StatusUpdateModal = ({ task, onClose, onUpdate }) => {
  const [status, setStatus] = React.useState(task.status);
  const [feedback, setFeedback] = React.useState(task.feedback || '');

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 3000
    }}>
      <div className="card" style={{ width: '400px', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Update Task Status</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Status</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)}
              className="input"
              style={{ width: '100%' }}
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Maintenance Feedback</label>
            <textarea 
              value={feedback} 
              onChange={e => setFeedback(e.target.value)}
              className="input"
              style={{ width: '100%', minHeight: '100px', padding: '0.75rem' }}
              placeholder="What work was done?"
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
            <button onClick={() => onUpdate(task.maintenance_id, status, feedback)} className="btn btn-primary" style={{ flex: 1 }}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecurityDashboard = () => {
  const [data, setData] = React.useState({ active: [], expected: [] });
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchDashboard = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/visitors/security/dashboard');
      setData(res.data.data);
    } catch (err) {
      console.error('Error fetching security dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDashboard();
  }, []);

  const handleEntry = async (id) => {
    try {
      await api.patch(`/visitors/${id}/entry`);
      fetchDashboard();
    } catch (err) {
      alert('Failed to log entry');
    }
  };

  const handleExit = async (id) => {
    try {
      await api.patch(`/visitors/${id}/exit`);
      fetchDashboard();
    } catch (err) {
      alert('Failed to log exit');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <DashboardCard 
          title="Active Visitors" 
          value={data.active.length} 
          icon={<Shield size={24} />} 
          color="#3b82f6" 
          delta="Currently in building" 
        />
        <DashboardCard 
          title="Expected Today" 
          value={data.expected.length} 
          icon={<UserCheck size={24} />} 
          color="#f59e0b" 
          delta="Registration pending" 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <section>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
             Active Visitors
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isLoading ? (
              <p>Loading...</p>
            ) : data.active.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No visitors currently inside.</p>
            ) : (
              data.active.map(v => (
                <div key={v.visitor_id} style={{ position: 'relative' }}>
                  <VisitorCard visitor={v} />
                  <button 
                    onClick={() => handleExit(v.visitor_id)}
                    className="btn btn-outline"
                    style={{ position: 'absolute', right: '1rem', top: '1rem', size: 'small' }}
                  >
                    Log Exit
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '1.5rem' }}>Expected Guests</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {isLoading ? (
              <p>Loading...</p>
            ) : data.expected.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No guests expected right now.</p>
            ) : (
              data.expected.map(v => (
                <div key={v.visitor_id} style={{ position: 'relative' }}>
                  <VisitorCard visitor={v} />
                  <button 
                    onClick={() => handleEntry(v.visitor_id)}
                    className="btn btn-primary"
                    style={{ position: 'absolute', right: '1rem', top: '1rem' }}
                  >
                    Check In
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

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
