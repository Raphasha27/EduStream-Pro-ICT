import React, { useState } from 'react';
import { 
  Search,
  CheckCircle2,
  XCircle,
  Plus,
  Network,
  Ban,
  GraduationCap,
  Building2,
  BookOpen,
  Globe,
  Award,
  ChevronRight,
  UserPlus,
  CreditCard,
  Clock,
  Brain,
  Trophy,
  Calendar,
  MapPin,
  Terminal,
  MessageSquare,
  Users,
  Shield
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick, hasBadge }) => (
  <a 
    href="#" 
    className={`sidebar-nav-item ${active ? 'active' : ''}`}
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {Icon && <Icon size={16} />}
    <span>{label}</span>
    {hasBadge && <span className="badge-preview">Preview</span>}
  </a>
);

const SafeIcon = ({ icon: Icon, size = 16, color }) => {
  if (!Icon) return null;
  return <Icon size={size} color={color} />;
};

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice Johnson', major: 'Computer Science', status: 'Enrolled', year: 'Year 2' },
    { id: 2, name: 'Bob Smith', major: 'ICT Engineering', status: 'Enrolled', year: 'Year 3' },
    { id: 3, name: 'Catherine Lee', major: 'Cyber Security', status: 'Pending', year: 'Year 1' },
    { id: 4, name: 'David Miller', major: 'Data Science', status: 'Enrolled', year: 'Year 4' },
  ]);

  const stats = [
    { label: 'Total Students', value: '1,280', icon: Users, color: '#1d4ed8' },
    { label: 'Active Courses', value: '84', icon: BookOpen, color: '#b45309' },
    { label: 'Global Campuses', value: '3', icon: Globe, color: '#15803d' },
    { label: 'Accreditations', value: '12', icon: Award, color: '#7c3aed' },
  ];

  return (
    <div className="app-container">
      {/* Mobile Header */}
      <div className="mobile-header" style={{
        display: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border-default)',
        zIndex: 1100,
        alignItems: 'center',
        padding: '0 16px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GraduationCap size={24} color="var(--color-academic-gold)" />
          <span style={{ fontWeight: 800, fontSize: '14px' }}>NEXUS GLOBAL</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          {isMobileMenuOpen ? <XCircle size={24} /> : <Search size={24} />} {/* Search as placeholder for Menu */}
        </button>
      </div>

      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 8px', cursor: 'pointer' }}
          onClick={() => { setActivePage('dashboard'); setIsMobileMenuOpen(false); }}
        >
          <div style={{ padding: '8px', background: 'var(--color-academic-gold)', borderRadius: '8px', color: 'white' }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '-0.025em', color: 'var(--color-fg-default)' }}>NEXUS GLOBAL</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--color-academic-gold)', textTransform: 'uppercase' }}>Institute of Technology</div>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-title">Student Services</div>
          <nav className="sidebar-nav">
            <SidebarItem 
              icon={GraduationCap} 
              label="Dashboard" 
              active={activePage === 'dashboard'} 
              onClick={() => { setActivePage('dashboard'); setIsMobileMenuOpen(false); }} 
            />
            <SidebarItem 
              icon={CreditCard} 
              label="Fees & Finance" 
              active={activePage === 'fees'} 
              onClick={() => { setActivePage('fees'); setIsMobileMenuOpen(false); }} 
            />
            <SidebarItem 
              icon={Clock} 
              label="Smart Timetable" 
              active={activePage === 'timetable'} 
              onClick={() => { setActivePage('timetable'); setIsMobileMenuOpen(false); }} 
            />
            <SidebarItem 
              icon={Calendar} 
              label="Lab Bookings" 
              active={activePage === 'bookings'} 
              onClick={() => { setActivePage('bookings'); setIsMobileMenuOpen(false); }} 
            />
          </nav>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-title">Academic & AI</div>
          <nav className="sidebar-nav">
            <SidebarItem 
              icon={Brain} 
              label="Success Predictor" 
              active={activePage === 'predictor'} 
              onClick={() => { setActivePage('predictor'); setIsMobileMenuOpen(false); }} 
              hasBadge
            />
            <SidebarItem 
              icon={Trophy} 
              label="Skills Challenge" 
              active={activePage === 'skills'} 
              onClick={() => { setActivePage('skills'); setIsMobileMenuOpen(false); }} 
            />
            <SidebarItem 
              icon={BookOpen} 
              label="Course Resources" 
              active={activePage === 'resources'} 
              onClick={() => { setActivePage('resources'); setIsMobileMenuOpen(false); }} 
            />
          </nav>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-title">Technical Tools</div>
          <nav className="sidebar-nav">
            <SidebarItem 
              icon={Network} 
              label="Research Metrics" 
              active={activePage === 'metrics'} 
              onClick={() => { setActivePage('metrics'); setIsMobileMenuOpen(false); }} 
            />
            <SidebarItem 
              icon={Terminal} 
              label="ICT Console" 
              active={activePage === 'console'} 
              onClick={() => { setActivePage('console'); setIsMobileMenuOpen(false); }} 
            />
            <SidebarItem 
              icon={MapPin} 
              label="Campus Navigator" 
              active={activePage === 'navigator'} 
              onClick={() => { setActivePage('navigator'); setIsMobileMenuOpen(false); }} 
            />
          </nav>
        </div>
      </aside>

      <main className="main-content">
        {activePage === 'dashboard' && (
          <>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>Academic Dashboard</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>Overview of student enrollment and institutional metrics for Nexus Global.</p>
            </div>

            <div className="grid-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
              {stats.map((stat, i) => (
                <div key={i} className="card" style={{ padding: '24px', margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ padding: '8px', background: `${stat.color}1a`, borderRadius: '8px', color: stat.color }}>
                      <stat.icon size={20} />
                    </div>
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-fg-default)' }}>{stat.value}</div>
                  <div style={{ fontSize: '13px', color: 'var(--color-fg-muted)', fontWeight: 500 }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <section style={{ marginBottom: '40px' }}>
              <div className="card-header" style={{ background: 'transparent', border: 'none', padding: '0 0 20px 0' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="section-title">Recent Enrollments</span>
                  <span className="section-desc">Real-time update of students joining the Nexus Global academic track.</span>
                </div>
                <button className="btn btn-primary" onClick={() => setActivePage('predictor')}>
                  <Brain size={16} />
                  Analyze Success
                </button>
              </div>
              <div className="card">
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: 'var(--color-canvas-subtle)', borderBottom: '1px solid var(--color-border-default)' }}>
                        <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>Student Name</th>
                        <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>Academic Major</th>
                        <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>Year</th>
                        <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>Status</th>
                        <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student.id} style={{ borderBottom: '1px solid var(--color-border-muted)' }}>
                          <td style={{ padding: '16px', fontWeight: 600 }}>{student.name}</td>
                          <td style={{ padding: '16px', color: 'var(--color-fg-muted)' }}>{student.major}</td>
                          <td style={{ padding: '16px' }}>{student.year}</td>
                          <td style={{ padding: '16px' }}>
                            <span style={{ 
                              padding: '4px 12px', 
                              borderRadius: '20px', 
                              fontSize: '12px', 
                              fontWeight: 600,
                              background: student.status === 'Enrolled' ? '#dcfce7' : '#fef9c3',
                              color: student.status === 'Enrolled' ? '#166534' : '#854d0e'
                            }}>
                              {student.status}
                            </span>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <button className="btn btn-sm" onClick={() => setActivePage('resources')}>View File</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </>
        )}

        {activePage === 'fees' && (
          <>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>Fees Tracking</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>Real-time tuition balance monitoring and financial status.</p>
            </div>
            <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-academic-gold)', marginBottom: '8px' }}>R14,250</div>
              <div style={{ color: 'var(--color-fg-muted)', fontWeight: 600 }}>Current Outstanding Balance</div>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn btn-primary">Make Payment</button>
                <button className="btn">Download Statement</button>
              </div>
            </div>
          </>
        )}

        {activePage === 'predictor' && (
          <>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>Success Predictor</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>AI-powered analysis of student academic risk using Python ML.</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534', fontSize: '24px', fontWeight: 800 }}>85%</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '18px' }}>Low Risk Score</div>
                  <div style={{ color: 'var(--color-fg-muted)' }}>Based on attendance (92%) and assignment velocity.</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ padding: '16px', background: 'var(--color-canvas-subtle)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-fg-muted)', fontWeight: 600 }}>ATTENDANCE</div>
                  <div style={{ fontSize: '18px', fontWeight: 700 }}>92% Excellent</div>
                </div>
                <div style={{ padding: '16px', background: 'var(--color-canvas-subtle)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--color-fg-muted)', fontWeight: 600 }}>SPEED</div>
                  <div style={{ fontSize: '18px', fontWeight: 700 }}>Fast Completion</div>
                </div>
              </div>
            </div>
          </>
        )}

        {activePage === 'skills' && (
          <>
            <div style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>ICT Skills Challenge</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>Gamified daily quizzes on South African ICT landscape and cloud tech.</p>
            </div>
            <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <Trophy size={64} color="var(--color-academic-gold)" style={{ marginBottom: '16px' }} />
              <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Daily Challenge: Cloud Architecture</h2>
              <p style={{ color: 'var(--color-fg-muted)', marginBottom: '24px' }}>10 Questions • 500 XP Points • Global Leaderboard</p>
              <button className="btn btn-primary" style={{ padding: '8px 32px' }}>Start Challenge</button>
            </div>
          </>
        )}

        {/* Fallback for other pages */}
        {!['dashboard', 'fees', 'predictor', 'skills'].includes(activePage) && (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <div style={{ padding: '24px', background: '#fef3c7', display: 'inline-block', borderRadius: '50%', color: '#b45309', marginBottom: '16px' }}>
              <Terminal size={48} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Institutional Compliance Protocol</h2>
            <p style={{ color: 'var(--color-fg-muted)' }}>The {activePage.charAt(0).toUpperCase() + activePage.slice(1)} governance domain is being optimized by the registry.</p>
            <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => setActivePage('dashboard')}>Return to Dashboard</button>
          </div>
        )}

        <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 100 }}>
          <button 
            className="btn-primary" 
            style={{ 
              width: '60px', 
              height: '60px', 
              borderRadius: '30px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <MessageSquare size={24} />
          </button>
        </div>

        <footer className="footer">
          <span>© 2026 Nexus Global Institute of Technology</span>
          <nav className="footer-nav">
            <a href="#">Governance</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Academic Registry</a>
            <a href="#">Campus Security</a>
          </nav>
        </footer>
      </main>
    </div>
  );
};

export default App;
