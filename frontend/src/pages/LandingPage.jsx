import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Wrench, Users, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--background)' }}>
      {/* Hero Section */}
      <section className="container" style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            variants={itemVariants}
            style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(90deg, var(--primary), #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Smarter Living for Modern Communities
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}
          >
            The all-in-one platform for maintenance requests, visitor management, and seamless communication in your apartment community.
          </motion.p>
          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              Start for Free <ArrowRight size={20} />
            </button>
            <button className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              Watch Demo
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container" style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Everything you need</h2>
          <p style={{ color: 'var(--text-muted)' }}>Advanced features designed for a frictionless living experience.</p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <FeatureCard 
            icon={<Wrench className="text-primary" />} 
            title="Maintenance Tracking" 
            description="Raise and track maintenance requests with real-time updates and status history."
          />
          <FeatureCard 
            icon={<Shield className="text-primary" />} 
            title="Visitor Management" 
            description="Pre-approve visitors and maintain secure digital entry logs for your peace of mind."
          />
          <FeatureCard 
            icon={<Users className="text-primary" />} 
            title="Admin Governance" 
            description="Complete control for administrators to manage residents, staff, and overall operations."
          />
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section style={{ backgroundColor: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '5rem 0' }}>
        <div className="container flex justify-between items-center" style={{ flexWrap: 'wrap', gap: '3rem' }}>
          <Stat item="10,000+" label="Happy Residents" />
          <Stat item="500+" label="Buildings Managed" />
          <Stat item="98%" label="Issue Resolution Rate" />
          <Stat item="24/7" label="Support Record" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container" style={{ margin: '6rem auto', textAlign: 'center' }}>
        <div className="card glass" style={{ padding: '4rem', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', color: 'white' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>Ready to transform your community?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2.5rem', opacity: 0.9 }}>Join hundreds of societies simplifying their daily operations today.</p>
          <button className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '1rem 2,5rem' }}>
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="card" 
    style={{ transition: 'var(--transition)' }}
  >
    <div style={{ 
      width: '50px', 
      height: '50px', 
      borderRadius: 'var(--radius-md)', 
      background: 'rgba(37, 99, 235, 0.1)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      marginBottom: '1.5rem',
      color: 'var(--primary)'
    }}>
      {icon}
    </div>
    <h3 style={{ marginBottom: '0.75rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{description}</p>
  </motion.div>
);

const Stat = ({ item, label }) => (
  <div style={{ textAlign: 'center', flex: '1 1 200px' }}>
    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>{item}</h2>
    <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{label}</p>
  </div>
);

export default LandingPage;
