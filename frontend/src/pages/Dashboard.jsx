import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Users, 
  Wrench, 
  Shield, 
  Bell, 
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
  const userRole = user?.role?.toLowerCase();

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
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'resident':
        return <ResidentDashboard />;
      case 'staff':
        return <StaffDashboard />;
      case 'security':
        return <SecurityDashboard />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Loading your specialized dashboard...</p>
            <div className="flex justify-center">
              <div style={{ width: '40px', height: '40px', border: '3px solid var(--primary-light)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            </div>
            <style>{`
              @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Sidebar - Premium Design */}
      <aside className="glass" style={{ 
        width: '280px', 
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight: '1px solid var(--border)',
        padding: '2rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.75rem', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            backgroundColor: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.4)'
          }}>
            <Shield size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h4 style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>AptManager</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--success)' }}></div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live System</p>
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>

          

          {userRole === 'admin' && <SidebarItem icon={<Users size={20} />} label="Residents" />}
        </nav>

        {/* User Profile Card in Sidebar */}
        <div style={{ 
          marginTop: 'auto', 
          padding: '1.25rem', 
          backgroundColor: 'white', 
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '10px', 
              backgroundColor: 'var(--background)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              fontWeight: 700,
              border: '1px solid var(--border)'
            }}>
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h5 style={{ fontSize: '0.875rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.username}
              </h5>
              <p className="badge" style={{ 
                fontSize: '0.6rem', 
                backgroundColor: 'var(--background)', 
                color: 'var(--primary)',
                padding: '0.1rem 0.5rem',
                marginTop: '0.15rem'
              }}>
                {user?.role}
              </p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="btn btn-outline"
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              fontSize: '0.8rem', 
              color: 'var(--error)',
              borderColor: 'rgba(239, 68, 68, 0.1)',
              background: 'rgba(239, 68, 68, 0.02)'
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '2.5rem 4rem', overflowY: 'auto', height: '100vh' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Welcome Back
              </p>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                Hello, {user?.username} <span style={{ fontWeight: 400 }}>👋</span>
              </h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '1.05rem' }}>
                Here's a look at what's happening today in your estate.
              </p>
            </div>
            <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TODAY</p>
                <p style={{ fontSize: '0.95rem', fontWeight: 700 }}>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
              </div>
              <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)' }}></div>
              <ClockIcon size={20} className="text-primary" />
            </div>
          </motion.div>

          {renderRoleSpecificContent()}
        </motion.div>
      </main>

    </div>
  );
};


// Help Components
const SidebarItem = ({ icon, label, active = false, badge }) => (
  <div 
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.85rem', 
      padding: '0.85rem 1rem', 
      borderRadius: '14px',
      backgroundColor: active ? 'white' : 'transparent',
      color: active ? 'var(--primary)' : 'var(--text-muted)',
      boxShadow: active ? '0 10px 15px -3px rgba(15, 23, 42, 0.04)' : 'none',
      fontWeight: active ? 700 : 500,
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'var(--transition)',
      border: active ? '1px solid var(--border)' : '1px solid transparent'
    }} 
    className="sidebar-item"
  >
    <span style={{ 
      color: active ? 'var(--primary)' : 'var(--text-muted)',
      display: 'flex'
    }}>
      {icon}
    </span>
    <span style={{ flex: 1 }}>{label}</span>
    {badge && (
      <span style={{ 
        backgroundColor: 'var(--primary)', 
        color: 'white', 
        fontSize: '0.7rem', 
        padding: '0.1rem 0.45rem', 
        borderRadius: '6px',
        fontWeight: 700
      }}>
        {badge}
      </span>
    )}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: 'rgba(37, 99, 235, 0.08)', color: 'var(--primary)' }}>
                <ClipboardList size={20} />
              </div>
              Maintenance Oversight
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {isLoading ? (
              <p>Loading requests...</p>
            ) : requests.length === 0 ? (
              <div className="card glass" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <p>No maintenance requests in the system.</p>
              </div>
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

        <div>
           <AnnouncementSection />
        </div>
      </div>

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
      <div className="card glass" style={{ width: '480px', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>Assign Staff Member</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Assigning for: <span style={{ fontWeight: 700, color: 'var(--text)' }}>"{request.description}"</span>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '350px', overflowY: 'auto', marginBottom: '2rem', paddingRight: '0.5rem' }}>
          {staffList.map(s => (
            <div 
              key={s.staff_id}
              onClick={() => onAssign(request.maintenance_id, s.staff_id)}
              style={{ 
                padding: '1rem 1.25rem', 
                border: '1px solid var(--border)', 
                borderRadius: '14px',
                cursor: 'pointer',
                transition: 'var(--transition)',
                backgroundColor: 'var(--background)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              className="staff-item"
            >
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.15rem' }}>{s.username}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>{s.specialization}</p>
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(37, 99, 235, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Plus size={16} />
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="btn btn-outline" style={{ width: '100%', padding: '0.85rem' }}>Cancel</button>
      </div>

      <style>{`
        .staff-item:hover {
          border-color: var(--primary);
          background-color: white;
          transform: translateX(4px);
          box-shadow: var(--shadow-sm);
        }
      `}</style>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Stats Quick View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Maintenance Section */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: 'rgba(37, 99, 235, 0.08)', color: 'var(--primary)' }}>
                  <Wrench size={20} />
                </div>
                Maintenance Activity
              </h3>
              <button 
                onClick={() => setIsMaintenanceModalOpen(true)}
                className="btn btn-primary" 
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
              >
                <Plus size={18} /> New Request
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {isLoading ? (
                <p>Loading requests...</p>
              ) : maintenance.length === 0 ? (
                <div className="card glass" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
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
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.08)', color: 'var(--success)' }}>
                  <Shield size={20} />
                </div>
                Visitor Logs
              </h3>
              <button 
                onClick={() => setIsVisitorModalOpen(true)}
                className="btn btn-outline" 
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}
              >
                <Plus size={18} /> Pre-approve
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {isLoading ? (
                <p>Loading visitors...</p>
              ) : visitors.length === 0 ? (
                <div className="card glass" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
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

        {/* Right Column: Announcements */}
        <div>
          <AnnouncementSection />
        </div>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2.5rem' }}>
        <section>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: 'rgba(37, 99, 235, 0.08)', color: 'var(--primary)' }}>
              <ClipboardList size={20} />
            </div>
            My Task Queue
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {isLoading ? (
              <p>Loading your tasks...</p>
            ) : tasks.length === 0 ? (
              <div className="card glass" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
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
                        padding: '0.6rem 1.25rem',
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
        <div>
          <AnnouncementSection />
        </div>
      </div>

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
      <div className="card glass" style={{ width: '450px', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>Update Task Status</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Please provide the current status and any work details.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Current Status</label>
            <select 
              value={status} 
              onChange={e => setStatus(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.85rem', 
                borderRadius: '12px', 
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
                fontSize: '0.95rem'
              }}
            >
              <option value="Pending">Pending</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Maintenance Feedback</label>
            <textarea 
              value={feedback} 
              onChange={e => setFeedback(e.target.value)}
              style={{ 
                width: '100%', 
                minHeight: '120px', 
                padding: '1rem', 
                borderRadius: '12px', 
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                resize: 'none'
              }}
              placeholder="Describe the work performed or any issues encountered..."
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={onClose} className="btn btn-outline" style={{ flex: 1, padding: '0.85rem' }}>Cancel</button>
            <button onClick={() => onUpdate(task.maintenance_id, status, feedback)} className="btn btn-primary" style={{ flex: 1, padding: '0.85rem' }}>Update Task</button>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
        <section>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: 'rgba(37, 99, 235, 0.08)', color: 'var(--primary)' }}>
              <Shield size={20} />
            </div>
            Active Visitors
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {isLoading ? (
              <p>Loading...</p>
            ) : data.active.length === 0 ? (
              <div className="card glass" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <p>No visitors currently inside.</p>
              </div>
            ) : (
              data.active.map(v => (
                <div key={v.visitor_id} style={{ position: 'relative' }}>
                  <VisitorCard visitor={v} />
                  <button 
                    onClick={() => handleExit(v.visitor_id)}
                    className="btn btn-primary"
                    style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem' }}
                  >
                    Log Exit
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
             <div style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.08)', color: 'var(--warning)' }}>
              <UserCheck size={20} />
            </div>
            Expected Guests
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {isLoading ? (
              <p>Loading...</p>
            ) : data.expected.length === 0 ? (
              <div className="card glass" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                <p>No guests expected right now.</p>
              </div>
            ) : (
              data.expected.map(v => (
                <div key={v.visitor_id} style={{ position: 'relative' }}>
                  <VisitorCard visitor={v} />
                  <button 
                    onClick={() => handleEntry(v.visitor_id)}
                    className="btn btn-primary"
                    style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem' }}
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
  <div className="card" style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '1.25rem', 
    position: 'relative', 
    overflow: 'hidden',
    padding: '1.75rem'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ 
        width: '52px', 
        height: '52px', 
        borderRadius: '16px', 
        backgroundColor: `${color}10`, 
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 8px 20px -6px ${color}30`
      }}>
        {React.cloneElement(icon, { size: 26, strokeWidth: 2.2 })}
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.025em' }}>{title}</p>
        <p style={{ fontSize: '0.8125rem', color: delta?.includes('+') ? 'var(--success)' : 'var(--text-muted)', fontWeight: 600 }}>
          {delta}
        </p>
      </div>
    </div>
    <div>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em' }}>{value}</h2>
    </div>
    {/* Decorative background circle */}
    <div style={{ 
      position: 'absolute', 
      bottom: '-20px', 
      right: '-20px', 
      width: '100px', 
      height: '100px', 
      borderRadius: '50%', 
      background: `radial-gradient(circle, ${color}08 0%, transparent 70%)` 
    }}></div>
  </div>
);

const AnnouncementSection = () => (
  <div className="card glass" style={{ padding: '2rem', border: '1px solid var(--primary-light)', backgroundColor: 'rgba(37, 99, 235, 0.02)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.25rem' }}>
        <Bell size={24} className="text-primary" /> Community Announcements
      </h3>
      <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>New</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <AnnouncementItem 
        title="Annual General Meeting" 
        date="Oct 24, 2026" 
        category="Admin" 
        description="The AGM will be held in the community hall at 6:00 PM. All residents are invited."
      />
      <div style={{ height: '1px', backgroundColor: 'var(--border)' }}></div>
      <AnnouncementItem 
        title="Water Tank Cleaning" 
        date="Oct 20, 2026" 
        category="Maintenance" 
        description="Scheduled water tank cleaning for Blocks A and B. Water supply will be disrupted from 10 AM to 2 PM."
      />
    </div>
  </div>
);

const AnnouncementItem = ({ title, date, category, description }) => (
  <div className="slide-in-right">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{title}</h4>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{date}</span>
    </div>
    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
      {description}
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span className="badge" style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem', backgroundColor: 'var(--background)' }}>{category}</span>
    </div>
  </div>
);

export default Dashboard;
