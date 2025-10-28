const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleComplete,
  getStats
} = require('../controllers/taskController');
const { verifyToken } = require('../middleware/auth');

// All task routes are protected
router.use(verifyToken);

// Task routes
router.get('/', getTasks);
router.get('/stats', getStats);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/toggle', toggleComplete);

module.exports = router;