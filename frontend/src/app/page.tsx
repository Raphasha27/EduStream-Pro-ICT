"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null);
  const [pythonData, setPythonData] = useState<{ risk_score: number; status: string; recommendation?: string } | null>(null);
  const [rData, setRData] = useState<{ mean: number; sd: number; median?: number; count?: number } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pythonStatus, setPythonStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [rStatus, setRStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [activeTab, setActiveTab] = useState<'overview' | 'campus'>('overview');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Quiz State
  const [quizActive, setQuizActive] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      q: "What is the NQF level for an ICT Bachelor's Degree?",
      options: ["Level 6", "Level 7", "Level 8", "Level 5"],
      a: 1
    },
    {
      q: "Which cloud provider has local regions in South Africa?",
      options: ["Only AWS", "Only Azure", "Both AWS & Azure", "None"],
      a: 2
    },
    {
      q: "What does SAQA regulate in South African tertiary ed?",
      options: ["Internet Access", "Bursary Payments", "Qualification Standards", "Campus Security"],
      a: 2
    }
  ];

  const handleQuizAnswer = (index: number) => {
    if (index === quizQuestions[quizStep].a) setQuizScore(quizScore + 1);
    
    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizActive(false);
    setQuizStep(0);
    setQuizScore(0);
    setQuizFinished(false);
  };

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const pResp = await fetch('http://localhost:8000/');
        if (pResp.ok) setPythonStatus('online');
      } catch { setPythonStatus('offline'); }

      try {
        const rResp = await fetch('http://localhost:8001/health');
        if (rResp.ok) setRStatus('online');
      } catch { setRStatus('offline'); }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 10000);

    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    return () => {
      clearInterval(interval);
      stopCamera();
    };
  }, [isDarkMode]);

  const fetchPythonAnalysis = async () => {
    setLoading('Python');
    try {
      const resp = await fetch('http://localhost:8000/predict_success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attendance: 85, midterm_score: 78, assignments_completed: 10 })
      });
      const data = await resp.json();
      setPythonData(data);
    } catch (e) {
      console.error("Python service offline", e);
      alert("Python Analytics Service is offline. Using mock fallback.");
      setPythonData({ 
        risk_score: 24.5, 
        status: "On Track", 
        recommendation: "Maintain high lecture attendance and join the Cloud Architecture study group." 
      });
    }
    setLoading(null);
  };

  const fetchRStatistics = async () => {
    setLoading('R');
    try {
      const resp = await fetch('http://localhost:8001/summary');
      const data = await resp.json();
      setRData(data);
    } catch (e) {
      console.error("R service offline", e);
      alert("R Statistical Engine is offline. Using mock fallback.");
      setRData({ mean: 76.4, sd: 12.8, median: 78.2, count: 1240 });
    }
    setLoading(null);
  };

  const [aiInput, setAiInput] = useState("");
  const [aiMessage, setAiMessage] = useState("Hello! I'm your SA Tertiary AI Assistant. Ask me about NSFAS, SAQA, or student success.");
  const [isListening, setIsListening] = useState(false);

  const toggleSiri = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setAiMessage("Listening for your voice...");
      setTimeout(() => {
        setIsListening(false);
        setAiMessage("Analyzing your request for NSFAS status...");
      }, 3000);
    }
  };

  const handleAiAsk = () => {
    if (!aiInput) return;
    setLoading('AI');
    setTimeout(() => {
      setAiMessage(`I've analyzed your query about "${aiInput}". Current institutional data suggests a 4.2% increase in NQF-7 completions.`);
      setAiInput("");
      setLoading(null);
    }, 1000);
  };

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const startScan = async () => {
    setIsScanning(true);
    setScanResult(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      // Simulate scanning process
      setTimeout(() => {
        stopCamera();
        setIsScanning(false);
        setScanResult("STUDENT_ID_RU7892 - ACCESS GRANTED");
      }, 5000);
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Please enable camera access to use the scanner.");
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleBursarySync = () => {
    setLoading('NSFAS Disbursement Sync');
    setTimeout(() => {
      setLoading(null);
      alert("NSFAS Disbursement Sync complete! Status: 1,420 students updated.");
    }, 2000);
  };
  return (
    <>
      <nav className="glass-nav">
        <div className="logo">
          Edu<span>Stream</span> Pro
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{ 
              fontSize: '0.85rem', 
              color: activeTab === 'overview' ? '#fff' : (isDarkMode ? '#94a3b8' : '#0ea5e9'), 
              background: activeTab === 'overview' ? '#8b5cf6' : 'transparent', 
              padding: '0.5rem 1rem', 
              borderRadius: '8px', 
              fontWeight: 600, 
              border: activeTab === 'overview' ? 'none' : '1px solid currentColor',
              cursor: 'pointer',
              transition: 'all 0.2s' 
            }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('campus')}
            style={{ 
              fontSize: '0.85rem', 
              color: activeTab === 'campus' ? '#fff' : (isDarkMode ? '#94a3b8' : '#0ea5e9'), 
              background: activeTab === 'campus' ? '#8b5cf6' : 'transparent', 
              padding: '0.5rem 1rem', 
              borderRadius: '8px', 
              fontWeight: 600, 
              border: activeTab === 'campus' ? 'none' : '1px solid currentColor',
              cursor: 'pointer',
              transition: 'all 0.2s' 
            }}
          >
            Campus Map
          </button>
          <div 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ 
              width: '64px',
              height: '32px',
              background: isDarkMode ? '#1e293b' : '#e0f2fe',
              borderRadius: '20px',
              padding: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: `1px solid ${isDarkMode ? 'rgba(99, 102, 241, 0.3)' : 'rgba(14, 165, 233, 0.3)'}`,
              boxShadow: isDarkMode ? 'none' : 'inset 0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{
              width: '26px',
              height: '26px',
              background: isDarkMode ? '#6366f1' : '#ffffff',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isDarkMode ? 'translateX(32px)' : 'translateX(0)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              {isDarkMode ? '🌙' : '☀️'}
            </div>
            <span style={{ 
              position: 'absolute', 
              right: isDarkMode ? 'auto' : '10px', 
              left: isDarkMode ? '10px' : 'auto',
              fontSize: '0.6rem',
              fontWeight: 700,
              color: isDarkMode ? '#94a3b8' : '#0ea5e9'
            }}>
              {isDarkMode ? 'DARK' : 'LIGHT'}
            </span>
          </div>
        </div>
      </nav>

      <main>
        <header style={{ marginTop: '4rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-2rem', left: 0, display: 'flex', gap: '0.5rem' }}>
             <div style={{ width: '12px', height: '12px', borderRadius: '2px', background: '#007C59' }}></div> South Africa
          </div>
          <h1>ICT Intelligent Student Hub</h1>

        </header>

        {activeTab === 'overview' ? (
          <>
            <section className="dashboard-grid">
              {/* Student Success Card (Python Integration) */}
              <div className="card">
                <div className="badge badge-python" style={{ marginBottom: '1rem' }}>
                  Python Engine {pythonStatus === 'online' ? '✅' : '❌'}
                </div>
                <h2 className="card-title">Success Predictor</h2>
                <div className="card-content">
                  <p>Utilizing machine learning models to identify at-risk students and optimize retention strategies.</p>
                  <div style={{ marginTop: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.8rem' }}>Risk Score ({pythonData?.status || 'Pending'})</span>
                      <span style={{ color: (pythonData?.risk_score || 0) > 50 ? '#ef4444' : '#10b981', fontWeight: 'bold' }}>
                        {pythonData ? `${pythonData.risk_score}%` : '84%'}
                      </span>
                    </div>
                    <div style={{ height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${pythonData ? pythonData.risk_score : 84}%`, 
                        height: '100%', 
                        background: (pythonData?.risk_score || 0) > 50 ? '#ef4444' : 'linear-gradient(90deg, #3b82f6, #10b981)',
                        transition: 'width 1s ease-in-out'
                      }}></div>
                    </div>
                    {pythonData?.recommendation && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: isDarkMode ? '#94a3b8' : '#475569', fontStyle: 'italic' }}>
                        💡 <strong>Recommendation:</strong> {pythonData.recommendation}
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  className="btn" 
                  onClick={fetchPythonAnalysis}
                  disabled={loading === 'Python' || pythonStatus !== 'online'}
                >
                  {loading === 'Python' ? 'Connecting to Python...' : pythonStatus === 'online' ? 'Optimize & Predict' : 'Python Offline'}
                </button>
              </div>

              {/* Share App Card (Expo Style QR) */}


              <div className="card" style={{ gridColumn: 'span 2' }}>
                <div className="badge badge-r" style={{ marginBottom: '1rem' }}>
                  R Stat Engine {rStatus === 'online' ? '✅' : '❌'}
                </div>
                <h2 className="card-title">Overall Student Performance</h2>
                <div className="card-content">
                  <p>Comprehensive analysis of institutional academic results based on {rData?.count || '1,240'} active student profiles.</p>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: isDarkMode ? '#fff' : '#000' }}>{rData ? rData.mean.toFixed(1) : '76.4'}%</div>
                      <div style={{ fontSize: '0.7rem', color: isDarkMode ? '#94a3b8' : '#475569', fontWeight: 'bold' }}>CLASS AVERAGE</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: isDarkMode ? '#fff' : '#000' }}>{rData?.median ? rData.median.toFixed(1) : '78.2'}%</div>
                      <div style={{ fontSize: '0.7rem', color: isDarkMode ? '#94a3b8' : '#475569', fontWeight: 'bold' }}>MEDIAN MARK</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '800', color: isDarkMode ? '#fff' : '#000' }}>{rData ? rData.sd.toFixed(1) : '12.8'}</div>
                      <div style={{ fontSize: '0.7rem', color: isDarkMode ? '#94a3b8' : '#475569', fontWeight: 'bold' }}>VARIANCE (SD)</div>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                      <span>Performance Distribution</span>
                      <span style={{ color: '#10b981', fontWeight: 'bold' }}>Strong Academic Standing</span>
                    </div>
                    <div style={{ height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', display: 'flex', overflow: 'hidden' }}>
                      <div style={{ width: '15%', height: '100%', background: '#ef4444' }}></div>
                      <div style={{ width: '25%', height: '100%', background: '#f59e0b' }}></div>
                      <div style={{ width: '60%', height: '100%', background: '#10b981' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', marginTop: '0.4rem', color: 'var(--text-muted)' }}>
                      <span>FAIL (0-49)</span>
                      <span>PASS (50-74)</span>
                      <span>DISTINCTION (75-100)</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="btn" 
                  style={{ background: 'var(--primary)', color: '#fff', border: 'none', marginTop: '1.5rem' }}
                  onClick={fetchRStatistics}
                  disabled={loading === 'R' || rStatus !== 'online'}
                >
                  {loading === 'R' ? 'Recalculating Stats...' : rStatus === 'online' ? 'Recalculate Overall Performance' : 'R Engine Offline'}
                </button>
              </div>

              {/* Student Hub Card (Node.js/Next.js Core) */}
              <div className="card">
                <div className="badge badge-node" style={{ marginBottom: '1rem' }}>Fullstack Core</div>
                <h2 className="card-title">ICT Student Portal</h2>
                <div className="card-content">
                  <p>Access your primary academic tools: track tuition fees, view your daily timetable, and download course resources.</p>
                  <ul style={{ marginTop: '1rem', listStyle: 'none', fontSize: '0.9rem' }}>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#10b981' }}>●</span> Tuition Balance: R14,250
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#6366f1' }}>●</span> Next: 09:00 - Cloud Architecture
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#f59e0b' }}>●</span> 8 New Learning Resources
                    </li>
                  </ul>
                </div>
                <button className="btn">Open Student Console</button>
              </div>

              {/* SA Specific Card (NSFAS & SAQA) */}
              <div className="card" style={{ border: '1px solid rgba(0, 124, 89, 0.3)' }}>
                <div className="badge" style={{ marginBottom: '1rem', background: 'rgba(0, 124, 89, 0.2)', color: '#00c896', border: '1px solid rgba(0, 124, 89, 0.4)' }}>
                  SA Context
                </div>
                <h2 className="card-title">NSFAS & Bursaries</h2>
                <div className="card-content">
                  <p>Tracking funding status, NSFAS disbursements, and SAQA NQF level compliance across the institution.</p>
                  <div style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                      <span>Disbursement Progress</span>
                      <span style={{ color: '#00c896' }}>72%</span>
                    </div>
                    <div style={{ height: '4px', background: '#334155', borderRadius: '2px', marginTop: '0.5rem', overflow: 'hidden' }}>
                      <div style={{ width: '72%', height: '100%', background: '#007C59' }}></div>
                    </div>
                  </div>
                </div>
                <button 
                  className="btn" 
                  style={{ background: '#007C59' }}
                  onClick={handleBursarySync}
                  disabled={loading === 'NSFAS Disbursement Sync'}
                >
                  {loading === 'NSFAS Disbursement Sync' ? 'Syncing...' : 'Bursary Desk'}
                </button>
              </div>
            </section>

            {/* ICT Skills Quiz Card */}
            <section className="dashboard-grid" style={{ marginTop: '2rem' }}>
              <div className="card" style={{ gridColumn: 'span 1', background: isDarkMode ? 'rgba(124, 58, 237, 0.1)' : 'rgba(124, 58, 237, 0.05)', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
                <div className="badge" style={{ background: '#8b5cf6', color: '#fff', marginBottom: '1rem' }}>Daily Assessment</div>
                <h2 className="card-title">Skills Challenge</h2>
                <div className="card-content" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {!quizActive ? (
                    <div style={{ textAlign: 'center' }}>
                      <p>Test your knowledge of the SA ICT landscape to boost your success predictor score.</p>
                      <button className="btn" style={{ background: '#8b5cf6', marginTop: '1.5rem', width: '100%', border: 'none', color: '#fff', padding: '0.75rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setQuizActive(true)}>Start ICT Quiz</button>
                    </div>
                  ) : quizFinished ? (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏆</div>
                      <h3 style={{ marginBottom: '0.5rem', color: isDarkMode ? '#fff' : '#000' }}>Challenge Complete!</h3>
                      <p style={{ color: isDarkMode ? '#94a3b8' : '#475569' }}>You scored <strong>{quizScore} out of {quizQuestions.length}</strong>.</p>
                      <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.5rem' }}>+5% Retention Probability added</div>
                      <button className="btn" style={{ background: 'transparent', border: '1px solid #8b5cf6', color: '#8b5cf6', marginTop: '1.5rem', width: '100%', padding: '0.75rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }} onClick={resetQuiz}>Finish Challenge</button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#8b5cf6', fontWeight: 700, marginBottom: '0.5rem' }}>QUESTION {quizStep + 1} OF {quizQuestions.length}</div>
                      <p style={{ fontWeight: 600, marginBottom: '1rem', color: isDarkMode ? '#fff' : '#000' }}>{quizQuestions[quizStep].q}</p>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {quizQuestions[quizStep].options.map((opt, i) => (
                          <button 
                            key={i} 
                            onClick={() => handleQuizAnswer(i)}
                            style={{ 
                              padding: '0.75rem', 
                              borderRadius: '8px', 
                              background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#fff',
                              border: '1px solid rgba(139, 92, 246, 0.2)',
                              color: isDarkMode ? '#fff' : '#000',
                              cursor: 'pointer',
                              textAlign: 'left',
                              fontSize: '0.8rem',
                              transition: 'all 0.2s'
                            }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card" style={{ gridColumn: 'span 1' }}>
                <div className="badge" style={{ background: '#f59e0b', color: '#fff', marginBottom: '1rem' }}>Lab Access</div>
                <h2 className="card-title">Session Bookings</h2>
                <div className="card-content">
                  <p>Secure your spot for upcoming high-demand ICT labs and tutorials.</p>
                  <ul style={{ marginTop: '1rem', listStyle: 'none', fontSize: '0.9rem' }}>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#10b981' }}>●</span> Python Data Science
                    </li>
                    <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: isDarkMode ? '#94a3b8' : '#64748b' }}>
                      Today, 14:00 - 16:00 (3 Spots Left)
                    </li>
                  </ul>
                  <button className="btn" style={{ background: '#f59e0b', width: '100%', marginTop: '1rem' }}>Book Session</button>
                </div>
              </div>
            </section>


          </>
        ) : (
          <section className="dashboard-grid" style={{ marginTop: '2rem' }}>
            {/* Campus Navigation Map */}
            <div className="card" style={{ gridColumn: 'span 3' }}>
              <h2 className="card-title">Campus Hub Navigator</h2>
              <div className="card-content" style={{ marginBottom: '1rem' }}>
                <p>Real-time directions to lecture halls, labs, and administration buildings in Johannesburg.</p>
              </div>
              <div style={{ width: '100%', height: '500px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114584.2384661848!2d28.0551!3d-26.1711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c08f335dc63%3A0x6bba3bc354c46c4!2sJohannesburg!5e0!3m2!1sen!2sza!4v1704700000000!5m2!1sen!2sza" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: isDarkMode ? 'invert(90%) hue-rotate(180deg)' : 'none' }} 
                  allowFullScreen={true} 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>
        )}

        <section style={{ marginTop: '4rem', padding: '3rem', background: 'var(--glass)', borderRadius: '32px', border: '1px solid var(--card-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Institutional Intelligence</h2>
              <p style={{ color: 'var(--text-muted)' }}>Real-time health monitoring of the EduStream cluster.</p>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PYTHON ANALYTICS</div>
                <div style={{ color: pythonStatus === 'online' ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                  ● {pythonStatus.toUpperCase()}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>R STAT ENGINE</div>
                <div style={{ color: rStatus === 'online' ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                  ● {rStatus.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* AI Assistant & Siri Floating Interface */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100,
        width: '350px',
        background: isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--primary)',
        borderRadius: '24px',
        boxShadow: isDarkMode ? '0 25px 50px -12px rgba(99, 102, 241, 0.5)' : '0 25px 50px -12px rgba(14, 165, 233, 0.2)',
        padding: '1.5rem',
        animation: 'slideUp 0.5s ease-out',
        color: 'var(--foreground)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            background: 'linear-gradient(45deg, #6366f1, #ec4899)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isListening ? 'pulse 1.5s infinite' : 'float 3s ease-in-out infinite'
          }}>
            ✨
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>ICT AI Assistant</div>
            <div style={{ fontSize: '0.7rem', color: '#10b981' }}>● Technical Support Online</div>
          </div>
        </div>
        
        <div style={{ 
          background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(14, 165, 233, 0.05)', 
          padding: '1rem', 
          borderRadius: '12px', 
          fontSize: '0.85rem', 
          color: 'var(--foreground)',
          marginBottom: '1rem',
          minHeight: '60px'
        }}>
          {aiMessage}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder="Type your question..."
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            style={{
              flex: 1,
              background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
              border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(14, 165, 233, 0.2)',
              borderRadius: '12px',
              padding: '0.75rem',
              color: 'var(--foreground)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <button 
            onClick={() => handleAiAsk()}
            style={{
              background: 'var(--primary)',
              border: 'none',
              borderRadius: '12px',
              width: '40px',
              cursor: 'pointer'
            }}
          >
            ➔
          </button>
          <button 
            onClick={toggleSiri}
            style={{
              background: isListening ? '#ef4444' : 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '12px',
              width: '40px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Siri Voice Interaction"
          >
            🎙️
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        @keyframes scanLine {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(10deg); }
        }
      `}</style>

      <footer style={{ padding: '4rem 2rem', marginTop: '4rem', borderTop: '1px solid var(--card-border)', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
        &copy; 2026 EduStream Pro. Built with Next.js, Python, and R. Built by Raphasha27
      </footer>
    </>
  );
}
