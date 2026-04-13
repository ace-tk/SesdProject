import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, ShieldCheck, Wrench, Shield, ArrowRight, Home } from 'lucide-react';

const GetStarted = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'resident',
      title: 'Resident',
      icon: <Users size={32} />,
      description: 'Manage your household, track maintenance requests, and pay utility bills seamlessly.',
      color: '#3b82f6'
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: <ShieldCheck size={32} />,
      description: 'Full oversight of society operations, staff management, and financial reporting.',
      color: '#8b5cf6'
    },
    {
      id: 'staff',
      title: 'Maintenance Staff',
      icon: <Wrench size={32} />,
      description: 'View assigned service requests, update task status, and manage your schedule.',
      color: '#10b981'
    },
    {
      id: 'security',
      title: 'Security Guard',
      icon: <Shield size={32} />,
      description: 'Monitor building entry, manage visitor logs, and ensure community safety.',
      color: '#f59e0b'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '120px 2rem 60px', 
      background: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.05), transparent), radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.05), transparent)'
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          style={{ textAlign: 'center' }}
        >
          <motion.div variants={itemVariants} style={{ marginBottom: '1rem' }}>
            <span style={{ 
              backgroundColor: 'rgba(37, 99, 235, 0.1)', 
              color: 'var(--primary)', 
              padding: '0.5rem 1rem', 
              borderRadius: '2rem', 
              fontSize: '0.875rem', 
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Join our community
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 800 }}
          >
            Welcome to <span style={{ color: 'var(--primary)' }}>AptManager</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}
          >
            Select your role to get started with a customized experience tailored to your needs.
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}>
            {roles.map((role) => (
              <motion.div
                key={role.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/register?role=${role.id}`)}
                className="card"
                style={{ 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2rem',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-lg)',
                  background: `${role.color}15`,
                  color: role.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  {role.icon}
                </div>
                
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{role.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>
                  {role.description}
                </p>
                
                <div style={{ 
                  marginTop: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: 'var(--primary)', 
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  Select Role <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Already have an account?</span>
            <button 
              onClick={() => navigate('/login')}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
            >
              Sign In
            </button>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .card:hover {
          border-color: var(--primary-light);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
      `}</style>
    </div>
  );
};

export default GetStarted;
