// controllers/communicationController.js
const Message = require('../models/Communication');

// Send message
exports.sendMessage = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { recipientId, recipientType, subject, message, attachments, priority } = req.body;

    const newMessage = new Message({
      schoolId,
      senderId: userId,
      senderType: req.user.role,
      recipientId,
      recipientType,
      subject,
      message,
      attachments: attachments || [],
      priority: priority || 'medium'
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
};

// Get inbox messages
exports.getInbox = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { isRead } = req.query;

    const query = {
      schoolId,
      recipientId: userId
    };

    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }

    const messages = await Message.find(query)
      .populate('senderId', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: messages
    });
  } catch (err) {
    console.error('Error fetching inbox:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
};

// Get sent messages
exports.getSentMessages = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;

    const messages = await Message.find({
      schoolId,
      senderId: userId
    })
    .populate('recipientId', 'firstName lastName email')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: messages
    });
  } catch (err) {
    console.error('Error fetching sent messages:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
};

// Get message by ID
exports.getMessageById = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;

    const message = await Message.findOne({
      _id: id,
      schoolId,
      $or: [
        { senderId: userId },
        { recipientId: userId }
      ]
    })
    .populate('senderId', 'firstName lastName email')
    .populate('recipientId', 'firstName lastName email');

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    // Mark as read if recipient is viewing
    if (message.recipientId._id.toString() === userId && !message.isRead) {
      message.isRead = true;
      message.readAt = new Date();
      await message.save();
    }

    res.json({
      success: true,
      data: message
    });
  } catch (err) {
    console.error('Error fetching message:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch message'
    });
  }
};

// Mark message as read
exports.markAsRead = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;

    const message = await Message.findOneAndUpdate(
      {
        _id: id,
        schoolId,
        recipientId: userId,
        isRead: false
      },
      {
        $set: {
          isRead: true,
          readAt: new Date()
        }
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (err) {
    console.error('Error marking message as read:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to update message'
    });
  }
};

// Delete message
exports.deleteMessage = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;
    const { id } = req.params;

    const message = await Message.findOneAndDelete({
      _id: id,
      schoolId,
      $or: [
        { senderId: userId },
        { recipientId: userId }
      ]
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to delete message'
    });
  }
};

// Get unread count
exports.getUnreadCount = async (req, res) => {
  try {
    const { userId, schoolId } = req.user;

    const count = await Message.countDocuments({
      schoolId,
      recipientId: userId,
      isRead: false
    });

    res.json({
      success: true,
      data: { unreadCount: count }
    });
  } catch (err) {
    console.error('Error fetching unread count:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch unread count'
    });
  }
};
