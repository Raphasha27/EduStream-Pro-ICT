import React, { useState, useEffect } from 'react';
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
  Shield,
  Menu,
  X
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
  const [selectedStudentId, setSelectedStudentId] = useState(1);
  const [prediction, setPrediction] = useState(null);
  const [students, setStudents] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [stats, setStats] = useState([
    { label: 'Total Students', value: '...', icon: Users, color: '#1d4ed8' },
    { label: 'Active Courses', value: '...', icon: BookOpen, color: '#b45309' },
    { label: 'Global Campuses', value: '...', icon: Globe, color: '#15803d' },
    { label: 'Accreditations', value: '...', icon: Award, color: '#7c3aed' },
  ]);

  // Mock AI Predictions
  useEffect(() => {
    const mockPredictions = {
      1: {
        student: 'Koketso Raphasha',
        riskScore: 78,
        riskLevel: 'Low',
        factors: [
          { name: 'Attendance Rate', score: 92, weight: 50, icon: 'CheckCircle2' },
          { name: 'Academic Performance', score: 85, weight: 30, icon: 'Brain' },
          { name: 'Assignment Submission Speed', score: 48, weight: 20, icon: 'Clock' }
        ]
      },
      2: {
        student: 'Thabo Mokoena',
        riskScore: 65,
        riskLevel: 'Medium',
        factors: [
          { name: 'Attendance Rate', score: 78, weight: 50, icon: 'CheckCircle2' },
          { name: 'Academic Performance', score: 68, weight: 30, icon: 'Brain' },
          { name: 'Assignment Submission Speed', score: 42, weight: 20, icon: 'Clock' }
        ]
      },
      3: {
        student: 'Naledi Khumalo',
        riskScore: 45,
        riskLevel: 'High',
        factors: [
          { name: 'Attendance Rate', score: 55, weight: 50, icon: 'CheckCircle2' },
          { name: 'Academic Performance', score: 48, weight: 30, icon: 'Brain' },
          { name: 'Assignment Submission Speed', score: 28, weight: 20, icon: 'Clock' }
        ]
      },
      4: {
        student: 'Sipho Ndlovu',
        riskScore: 88,
        riskLevel: 'Low',
        factors: [
          { name: 'Attendance Rate', score: 95, weight: 50, icon: 'CheckCircle2' },
          { name: 'Academic Performance', score: 92, weight: 30, icon: 'Brain' },
          { name: 'Assignment Submission Speed', score: 72, weight: 20, icon: 'Clock' }
        ]
      }
    };
    setPrediction(mockPredictions[selectedStudentId] || mockPredictions[1]);
  }, [selectedStudentId]);

  // Initialize all mock data
  useEffect(() => {
    // Mock students
    setStudents([
      { id: 1, name: 'Koketso Raphasha', course: 'AI Engineering', department: 'Computer Science', status: 'Active' },
      { id: 2, name: 'Thabo Mokoena', course: 'Data Science', department: 'Analytics', status: 'Active' },
      { id: 3, name: 'Naledi Khumalo', course: 'Cloud Architecture', department: 'Infrastructure', status: 'Audit' },
      { id: 4, name: 'Sipho Ndlovu', course: 'Cybersecurity', department: 'Security', status: 'Active' },
      { id: 5, name: 'Lerato Dlamini', course: 'Software Engineering', department: 'Computer Science', status: 'Active' },
    ]);

    // Mock stats
    setStats([
      { label: 'Total Students', value: '2,847', icon: Users, color: '#1d4ed8' },
      { label: 'Active Courses', value: '156', icon: BookOpen, color: '#b45309' },
      { label: 'Global Campuses', value: '12', icon: Globe, color: '#15803d' },
      { label: 'Accreditations', value: '8', icon: Award, color: '#7c3aed' },
    ]);

    // Mock challenges
    setChallenges([
      { id: 1, title: 'Cloud Architecture', description: 'Design a multi-tenant SaaS platform on Azure', xp: 150, category: 'Cloud' },
      { id: 2, title: 'Security Audit', description: 'Identify vulnerabilities in legacy systems', xp: 200, category: 'Security' },
      { id: 3, title: 'AI Model Training', description: 'Build a predictive analytics model with Python', xp: 250, category: 'AI' },
    ]);
  }, []);

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
          {isMobileMenuOpen ? <X size={24} color="var(--color-academic-gold)" /> : <Menu size={24} color="var(--color-academic-gold)" />}
        </button>
      </div>

      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', padding: '0 8px', cursor: 'pointer' }}
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
              icon={Shield} 
              label="Governance Protocols" 
              active={activePage === 'governance'} 
              onClick={() => { setActivePage('governance'); setIsMobileMenuOpen(false); }} 
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
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>Academic Dashboard</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>Overview of student enrollment and institutional metrics for Nexus Global.</p>
            </div>

            <div className="grid-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
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

            <div className="card" style={{ background: 'var(--color-academic-navy)', color: 'white', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-academic-gold)', textTransform: 'uppercase', marginBottom: '4px' }}>NEXT LECTURE IN 45 MINS</div>
                <div style={{ fontSize: '20px', fontWeight: 800 }}>Advanced Cloud Architecture (CSC301)</div>
                <div style={{ fontSize: '14px', color: '#94a3b8' }}>Hall B-102 • Dr. S. Mandela</div>
              </div>
              <button className="btn btn-primary" style={{ background: 'white', color: 'var(--color-academic-navy)', border: 'none' }}>View Joining Link</button>
            </div>

            <section style={{ marginBottom: '24px' }}>
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
                            <button className="btn btn-sm" onClick={() => { setSelectedStudentId(student.id); setActivePage('predictor'); }}>Analyze Success</button>
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
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>Fees Tracking</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>Real-time tuition balance monitoring and financial status.</p>
            </div>
            <div className="card" style={{ padding: '32px', textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--color-academic-gold)', marginBottom: '8px' }}>R14,250</div>
              <div style={{ color: 'var(--color-fg-muted)', fontWeight: 600 }}>Current Outstanding Balance</div>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button className="btn btn-primary">Make Payment</button>
                <button className="btn">Download Statement</button>
              </div>
            </div>

            <section>
              <h3 className="section-title">Transaction History</h3>
              <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--color-canvas-subtle)', borderBottom: '1px solid var(--color-border-default)' }}>
                      <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>Date</th>
                      <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>Description</th>
                      <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>Amount</th>
                      <th style={{ padding: '16px', fontSize: '12px', color: 'var(--color-fg-muted)', textTransform: 'uppercase' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: '2026-01-15', desc: 'Semester 1 Tuition Fee', amount: 'R25,000', status: 'Invoiced' },
                      { date: '2026-01-20', desc: 'Scholarship Award', amount: '-R10,750', status: 'Applied' },
                      { date: '2026-01-25', desc: 'Registration Fee', amount: 'R1,250', status: 'Paid' },
                    ].map((tx, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--color-border-muted)' }}>
                        <td style={{ padding: '16px', fontSize: '14px' }}>{tx.date}</td>
                        <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600 }}>{tx.desc}</td>
                        <td style={{ padding: '16px', fontSize: '14px' }}>{tx.amount}</td>
                        <td style={{ padding: '16px' }}>
                          <span style={{ 
                            padding: '4px 10px', 
                            borderRadius: '20px', 
                            fontSize: '11px', 
                            fontWeight: 700,
                            background: tx.status === 'Paid' ? '#dcfce7' : tx.status === 'Applied' ? '#dbeafe' : '#f3f4f6',
                            color: tx.status === 'Paid' ? '#166534' : tx.status === 'Applied' ? '#1e40af' : '#4b5563'
                          }}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activePage === 'predictor' && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>Success Predictor</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>AI-powered analysis of student academic risk using Python ML.</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-fg-muted)', display: 'block', marginBottom: '8px' }}>SELECT STUDENT</label>
                <select 
                  className="form-control" 
                  value={selectedStudentId} 
                  onChange={(e) => setSelectedStudentId(parseInt(e.target.value))}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border-default)' }}
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.major})</option>
                  ))}
                </select>
              </div>

              {prediction && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '50%', 
                      background: prediction.risk === 'Low' ? '#dcfce7' : prediction.risk === 'Medium' ? '#fef9c3' : '#fee2e2', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: prediction.risk === 'Low' ? '#166534' : prediction.risk === 'Medium' ? '#854d0e' : '#991b1b', 
                      fontSize: '24px', 
                      fontWeight: 800 
                    }}>
                      {prediction.score}%
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '18px' }}>{prediction.risk} Risk Assessment</div>
                      <div style={{ color: 'var(--color-fg-muted)' }}>AI Confidence based on Nexus institutional data streams.</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ padding: '16px', background: 'var(--color-canvas-subtle)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--color-fg-muted)', fontWeight: 600 }}>ATTENDANCE RATE</div>
                      <div style={{ fontSize: '18px', fontWeight: 700 }}>{prediction.factors.attendance}%</div>
                    </div>
                    <div style={{ padding: '16px', background: 'var(--color-canvas-subtle)', borderRadius: '8px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--color-fg-muted)', fontWeight: 600 }}>ACADEMIC PERFORMANCE</div>
                      <div style={{ fontSize: '18px', fontWeight: 700 }}>{prediction.factors.academic}% Avg.</div>
                    </div>
                    <div style={{ padding: '16px', background: 'var(--color-canvas-subtle)', borderRadius: '12px', gridColumn: 'span 2', border: '1px solid var(--color-academic-gold)', backgroundColor: 'rgba(180, 83, 9, 0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: 'var(--color-fg-muted)', fontWeight: 600 }}>SUBMISSION SPEED</div>
                          <div style={{ fontSize: '16px', fontWeight: 700 }}>{prediction.factors.speed}% Optimized</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '11px', color: 'var(--color-academic-gold)', fontWeight: 800 }}>AI RECOMMENDATION</div>
                          <div style={{ fontSize: '13px', fontWeight: 600 }}>{prediction.insights}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {activePage === 'skills' && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>ICT Skills Challenge</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>Gamified daily quizzes on South African ICT landscape and cloud tech.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {challenges.map((challenge) => (
                <div key={challenge.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ padding: '4px 8px', background: 'var(--color-academic-gold)', color: 'white', borderRadius: '4px', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase' }}>{challenge.category}</span>
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>{challenge.title}</h2>
                  <p style={{ color: 'var(--color-fg-muted)', fontSize: '14px', marginBottom: '24px', flex: 1 }}>{challenge.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ fontWeight: 800, color: 'var(--color-academic-gold)' }}>{challenge.xp} XP</div>
                    <button className="btn btn-primary">Start Task</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activePage === 'bookings' && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.05em' }}>Lab Bookings</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: '0 0 20px 0', fontSize: '13px' }}>Reserve workstation time in specialized institutional ICT labs.</p>
            </div>
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                {['High-Performance Lab 1', 'Cyber Security Cell', 'AI Research Lab'].map((lab, i) => (
                  <div key={i} style={{ 
                    padding: '12px', 
                    borderRadius: '6px', 
                    border: '2px solid',
                    cursor: 'pointer',
                    background: i === 0 ? 'var(--color-canvas-subtle)' : 'white',
                    borderColor: i === 0 ? 'var(--color-academic-gold)' : 'var(--color-border-default)',
                    transition: 'all 0.2s'
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>{lab}</div>
                    <div style={{ fontSize: '11px', color: 'var(--color-fg-muted)' }}>{10 - i * 2} available</div>
                  </div>
                ))}
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available Slots: Today</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'].map((slot, i) => (
                  <button key={i} className={`btn ${i === 1 ? 'btn-primary' : ''}`} style={{ padding: '12px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ fontWeight: 700 }}>{slot}</span>
                    <span style={{ fontSize: '10px', opacity: 0.8, marginTop: '4px' }}>{i % 2 === 0 ? 'Low' : 'High'}</span>
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px', height: '40px', fontSize: '14px' }}>Confirm Reservation</button>
            </div>
          </>
        )}

        {activePage === 'navigator' && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>Campus Navigator</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>Visual mapping of lectures halls, high-performance labs, and administrative blocks.</p>
            </div>
            <div className="card" style={{ padding: '0', overflow: 'hidden', position: 'relative', height: '500px', background: '#f8fafc' }}>
              <div style={{ padding: '24px', position: 'absolute', top: 0, left: 0, zIndex: 10, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', borderRadius: '0 0 12px 0', borderBottom: '1px solid var(--color-border-muted)', borderRight: '1px solid var(--color-border-muted)' }}>
                <div style={{ fontWeight: 800, color: 'var(--color-academic-gold)' }}>MAIN CAMPUS - ZONE A</div>
                <div style={{ fontSize: '12px', color: 'var(--color-fg-muted)' }}>3 Active Sessions in Lab 4</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, 1fr)', height: '100%', gap: '1px', background: '#e2e8f0' }}>
                {[...Array(16)].map((_, i) => (
                  <div key={i} style={{ 
                    background: i === 5 ? 'var(--color-academic-gold)' : i === 2 || i === 10 ? '#334155' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s',
                    cursor: 'pointer',
                    position: 'relative'
                  }} className="map-tile">
                    {i === 5 && <MapPin color="white" size={24} />}
                    <span style={{ fontSize: '10px', color: i === 5 ? 'white' : '#94a3b8', position: 'absolute', bottom: '8px' }}>
                      {i === 2 ? 'Admin' : i === 5 ? 'You' : i === 10 ? 'ICT Lab' : `Block ${i}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activePage === 'international' && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>International Research</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>Worldwide academic partnerships and cross-border innovation in ICT.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              {[
                { country: 'UK', uni: 'Oxford ICT Center', focus: 'Quantum Computing' },
                { country: 'USA', uni: 'MIT Media Lab', focus: 'Ethical AI' },
                { country: 'RSA', uni: 'Nexus Cape Town', focus: '5G Infrastructure' },
                { country: 'GER', uni: 'Berlin Tech Institute', focus: 'Automotive IoT' },
              ].map((p, i) => (
                <div key={i} className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--color-academic-gold)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>
                      {p.country}
                    </div>
                    <div style={{ fontWeight: 700 }}>{p.uni}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-academic-gold)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>CORE RESEARCH</div>
                  <div style={{ fontSize: '15px', fontWeight: 600 }}>{p.focus}</div>
                  <button className="btn" style={{ width: '100%', marginTop: '20px' }}>View Publication</button>
                </div>
              ))}
            </div>
          </>
        )}

        {activePage === 'console' && (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.05em' }}>ICT Console</h1>
              <p style={{ color: 'var(--color-fg-muted)', margin: 0 }}>Direct institutional command interface for advanced registry queries.</p>
            </div>
            <div style={{ background: '#0d1117', borderRadius: '12px', padding: '20px', fontFamily: '"Fira Code", monospace', color: '#3fb950', height: '400px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', overflowY: 'auto' }}>
              <div style={{ color: '#8b949e', marginBottom: '8px' }}>// Nexus Global Institutional OS [Version 10.0.22621]</div>
              <div style={{ marginBottom: '16px' }}>C:\Students\Governance&gt; <span style={{ color: 'white' }}>nexus-cli --status</span></div>
              <div style={{ color: 'var(--color-academic-gold)', marginBottom: '4px' }}>[SUCCESS] Security protocols initialized.</div>
              <div style={{ color: 'var(--color-academic-gold)', marginBottom: '12px' }}>[INFO] 4,281 active nodes detected in campus cloud.</div>
              <div style={{ marginBottom: '16px' }}>C:\Students\Governance&gt; <span style={{ borderRight: '8px solid #3fb950', animation: 'blink 1s infinite' }}>_</span></div>
            </div>
            <style>{`
              @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            `}</style>
          </>
        )}

        {!['dashboard', 'fees', 'predictor', 'skills', 'bookings', 'navigator', 'console', 'international'].includes(activePage) && (
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

