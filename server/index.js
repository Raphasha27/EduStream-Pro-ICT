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

// Model
const Student = sequelize.define('Student', {
  name: { type: DataTypes.STRING, allowNull: false },
  major: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.STRING, allowNull: false }
});

// Routes
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
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

// Start Server
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await sequelize.sync();
    const count = await Student.count();
    if (count === 0) {
      await Student.bulkCreate([
        { name: 'Alice Johnson', major: 'Computer Science', status: 'Enrolled', year: 'Year 2' },
        { name: 'Bob Smith', major: 'ICT Engineering', status: 'Enrolled', year: 'Year 3' },
        { name: 'Catherine Lee', major: 'Cyber Security', status: 'Pending', year: 'Year 1' },
        { name: 'David Miller', major: 'Data Science', status: 'Enrolled', year: 'Year 4' },
      ]);
      console.log('Database seeded.');
    }
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

start();
