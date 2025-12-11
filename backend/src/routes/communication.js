// routes/communication.js
const express = require('express');
const router = express.Router();
const communicationController = require('../controllers/communicationController');
const { verifyToken } = require('../middleware/auth');

// Send message
router.post('/', verifyToken, communicationController.sendMessage);

// Get inbox
router.get('/inbox', verifyToken, communicationController.getInbox);

// Get sent messages
router.get('/sent', verifyToken, communicationController.getSentMessages);

// Get message by ID
router.get('/:id', verifyToken, communicationController.getMessageById);

// Mark as read
router.patch('/:id/read', verifyToken, communicationController.markAsRead);

// Delete message
router.delete('/:id', verifyToken, communicationController.deleteMessage);

// Get unread count
router.get('/unread/count', verifyToken, communicationController.getUnreadCount);

module.exports = router;
