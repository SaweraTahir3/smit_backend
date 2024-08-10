const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Question = require('../models/AdminQuestion');
const Result = require('../models/AdminResult');

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Get top 5 students
router.get('/top-students', async (req, res) => {
  try {
    const topStudents = await Student.find().sort({ marks: -1 }).limit(5);
    res.status(200).json(topStudents);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Add a new student
router.post('/add-student', async (req, res) => {
  const { name, marks, class: studentClass, subject, pass } = req.body;
  try {
    const newStudent = new Student({ name, marks, class: studentClass, subject, pass });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add student: ' + error.message });
  }
});

// Add a new question
router.post('/add-question', async (req, res) => {
  try {
    const { question, a, b, c, d, correct } = req.body;
    const newQuestion = new Question({ question, a, b, c, d, correct });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add question: ' + err.message });
  }
});

// Get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ count: questions.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get questions: ' + err.message });
  }
});

// Add a new result
router.post('/add-result', async (req, res) => {
  const { username, email, status, totalPoints, pointsEarned } = req.body;
  try {
    const newResult = new Result({ username, email, status, totalPoints, pointsEarned });
    await newResult.save();
    res.status(201).json(newResult);
  } catch (error) {
    console.error('Error adding result:', error); // Log the error
    res.status(400).json({ message: 'Failed to add result: ' + error.message });
  }
});

// Get all results


router.get('/Admin-results', async (req, res) => {
  try {
    const results = await Result.find(); // Fetch all results
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error); // Log the error
    res.status(500).json({ message: 'Error fetching results', error });
  }
});







module.exports = router;
