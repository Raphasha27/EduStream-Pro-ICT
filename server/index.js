require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// Database Setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Models
const Student = sequelize.define('Student', {
  name: { type: DataTypes.STRING, allowNull: false },
  major: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.STRING, allowNull: false }
});

const Attendance = sequelize.define('Attendance', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('Present', 'Absent'), allowNull: false }
});

const Assignment = sequelize.define('Assignment', {
  studentId: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  grade: { type: DataTypes.INTEGER, allowNull: false }, // 0-100
  dueDate: { type: DataTypes.DATE, allowNull: false },
  submittedAt: { type: DataTypes.DATE, allowNull: false }
});

const Challenge = sequelize.define('Challenge', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  xp: { type: DataTypes.INTEGER, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false }
});

// Relationships
Student.hasMany(Attendance, { foreignKey: 'studentId' });
Student.hasMany(Assignment, { foreignKey: 'studentId' });

// AI Predictor Logic
const calculateRisk = async (studentId) => {
  const attendance = await Attendance.findAll({ where: { studentId } });
  const assignments = await Assignment.findAll({ where: { studentId } });

  if (attendance.length === 0 && assignments.length === 0) return { score: 100, risk: 'Unknown' };

  // 1. Attendance Rate (50% weight)
  const attendanceRate = attendance.length > 0 
    ? (attendance.filter(a => a.status === 'Present').length / attendance.length) * 100 
    : 100;

  // 2. Academic Grade (30% weight)
  const avgGrade = assignments.length > 0 
    ? assignments.reduce((acc, curr) => acc + curr.grade, 0) / assignments.length 
    : 100;

  // 3. Submission Speed / Lateness (20% weight)
  // We calculate days ahead or behind due date. Negative is late.
  const submissionDelta = assignments.length > 0
    ? assignments.reduce((acc, curr) => {
        const delta = (new Date(curr.dueDate) - new Date(curr.submittedAt)) / (1000 * 60 * 60 * 24);
        return acc + delta;
      }, 0) / assignments.length
    : 0;
  
  // Normalize delta: 2 days early = 100%, On time = 80%, 2 days late = 0%
  const speedScore = Math.min(100, Math.max(0, (submissionDelta + 2) * 25));

  // AI Weighted Score Logic
  const successScore = (attendanceRate * 0.5) + (avgGrade * 0.3) + (speedScore * 0.2);
  
  let riskLevel = 'Low';
  if (successScore < 50) riskLevel = 'High';
  else if (successScore < 75) riskLevel = 'Medium';

  return {
    score: Math.round(successScore),
    risk: riskLevel,
    factors: {
      attendance: Math.round(attendanceRate),
      academic: Math.round(avgGrade),
      speed: Math.round(speedScore)
    },
    insights: submissionDelta >= 0 ? "Consistently early submissions." : "Tendency for late submissions detected."
  };
};

// Routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/predict/:id', async (req, res) => {
  try {
    const prediction = await calculateRisk(req.params.id);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/challenges', async (req, res) => {
  try {
    const challenges = await Challenge.findAll();
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', async (req, res) => {
  const studentCount = await Student.count();
  res.json([
    { label: 'Total Students', value: studentCount.toLocaleString(), icon: 'Users', color: '#1d4ed8' },
    { label: 'Active Courses', value: '84', icon: 'BookOpen', color: '#b45309' },
    { label: 'Global Campuses', value: '3', icon: 'Globe', color: '#15803d' },
    { label: 'Accreditations', value: '12', icon: 'Award', color: '#7c3aed' },
  ]);
});

// Start Server & Seed
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.sync({ force: true });
    
    // Seed Students
    const createdStudents = await Student.bulkCreate([
      { name: 'Alice Johnson', major: 'Computer Science', status: 'Enrolled', year: 'Year 2' },
      { name: 'Bob Smith', major: 'ICT Engineering', status: 'Enrolled', year: 'Year 3' },
      { name: 'Catherine Lee', major: 'Cyber Security', status: 'Pending', year: 'Year 1' },
      { name: 'David Miller', major: 'Data Science', status: 'Enrolled', year: 'Year 4' },
    ]);

    // Alice (Proactive)
    await Attendance.bulkCreate([
      { studentId: createdStudents[0].id, date: '2026-01-20', status: 'Present' },
      { studentId: createdStudents[0].id, date: '2026-01-21', status: 'Present' },
    ]);
    await Assignment.bulkCreate([
      { studentId: createdStudents[0].id, title: 'Cloud Apps', grade: 95, 
        dueDate: new Date('2026-01-25'), submittedAt: new Date('2026-01-23') }, // 2 days early
    ]);

    // Bob (Late/At Risk)
    await Attendance.bulkCreate([
      { studentId: createdStudents[1].id, date: '2026-01-20', status: 'Absent' },
    ]);
    await Assignment.bulkCreate([
      { studentId: createdStudents[1].id, title: 'Network Sec', grade: 45, 
        dueDate: new Date('2026-01-20'), submittedAt: new Date('2026-01-22') }, // 2 days late
    ]);

    // Seed Challenges
    await Challenge.bulkCreate([
      { title: 'Cloud Architecture', description: 'Design a scalable AWS VPC.', xp: 500, category: 'Cloud' },
      { title: 'Cyber Defense', description: 'Identify vulnerabilities in a mock server.', xp: 750, category: 'Security' },
      { title: 'Data Analytics', description: 'Clean a dataset of 10,000 rows.', xp: 400, category: 'AI' },
    ]);

    console.log('Institutional Intelligence Database Seeded.');
    app.listen(PORT, () => {
      console.log(`Nexus Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Core failure:', error);
  }
}

start();
