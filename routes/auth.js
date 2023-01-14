const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require('../middleware/authentication');

const {
  register,
  login,
  addUser,
  verifyEmail,
} = require('../controllers/authController');
router.post('/add-user',authenticateUser,authorizeRoles('admin'), addUser);
router.post('/register-admin', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);

module.exports = router;