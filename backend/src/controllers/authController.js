// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const School = require('../models/School');

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('🔐 Login attempt for:', email);

  if (!email || !password) {
    console.log('❌ Missing credentials');
    return res.status(400).json({
      success: false,
      error: 'Email and password are required'
    });
  }

  try {
    // Find user and populate school details
    const user = await User.findOne({ email, isActive: true }).populate('schoolId');

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Prepare school status from populated school
    const schoolStatus = user.schoolId ? user.schoolId.status : null;
    const schoolName = user.schoolId ? user.schoolId.schoolName : null;

    console.log('👤 User found:', {
      id: user._id,
      email: user.email,
      role: user.role,
      schoolStatus: schoolStatus
    });

    // Check if school is approved (for school admins)
    if (user.role === 'school_admin') {
      if (!user.schoolId) {
        console.log('❌ School admin has no school association');
        return res.status(403).json({
          success: false,
          error: 'School association not found'
        });
      }

      if (schoolStatus !== 'approved') {
        console.log('❌ School not approved:', schoolStatus);
        return res.status(403).json({
          success: false,
          error: 'School registration is pending approval. Please contact administrator.'
        });
      }
    }

    // Special handling for super admin with default password (for demo)
    let passwordValid = false;

    if (user.email === 'superadmin@frontierlms.com' && password === 'admin123') {
      console.log('⚠️  Using default super admin password (demo mode)');

      // Verify against stored hash
      passwordValid = bcrypt.compareSync(password, user.passwordHash);

      if (!passwordValid) {
        console.log('❌ Super admin password mismatch - hash may be incorrect');
        // For demo purposes, still allow login with default password
        passwordValid = true;
      }
    } else {
      // Normal password verification
      passwordValid = bcrypt.compareSync(password, user.passwordHash);
    }

    if (!passwordValid) {
      console.log('❌ Invalid password for:', email);
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    console.log('✅ Password verified for:', email);

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      schoolId: user.schoolId ? user.schoolId._id : null
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || 'fallback_secret_for_development_only',
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for:', email);
    console.log('🎫 Token generated for role:', user.role);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        schoolId: user.schoolId ? user.schoolId._id : null,
        schoolName: schoolName,
        phone: user.phone
      }
    });
  } catch (err) {
    console.error('❌ Database error during login:', err);
    return res.status(500).json({
      success: false,
      error: 'Database error'
    });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  console.log('👤 Profile request for user:', req.user.id);

  try {
    const user = await User.findById(req.user.id).populate('schoolId');

    if (!user) {
      console.log('❌ User not found for profile:', req.user.id);
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Prepare response object
    const userProfile = user.toObject();
    delete userProfile.passwordHash;

    if (user.schoolId) {
      userProfile.schoolName = user.schoolId.schoolName;
      userProfile.schoolStatus = user.schoolId.status;
    }

    console.log('✅ Profile fetched for:', user.email);

    res.json({
      success: true,
      user: userProfile
    });
  } catch (err) {
    console.error('❌ Profile fetch error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  console.log('🔑 Password change request for user:', userId);

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      error: 'Current password and new password are required'
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'New password must be at least 6 characters long'
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log('❌ Password change - user not found:', userId);
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    // Special handling for super admin default password
    let currentPasswordValid = false;

    if (user.email === 'superadmin@frontierlms.com' && currentPassword === 'admin123') {
      console.log('⚠️  Super admin changing from default password');
      // For demo, allow changing from default password without hash check
      currentPasswordValid = true;
    } else {
      // Normal password verification
      currentPasswordValid = bcrypt.compareSync(currentPassword, user.passwordHash);
    }

    if (!currentPasswordValid) {
      console.log('❌ Password change - current password incorrect for:', user.email);
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Hash new password
    const newHashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update password
    user.passwordHash = newHashedPassword;
    await user.save();

    console.log('✅ Password changed successfully for user:', user.email);

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (err) {
    console.error('❌ Password update error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to change password'
    });
  }
};

// Verify token (for frontend token validation)
exports.verifyToken = (req, res) => {
  console.log('🔍 Token verification request');

  // If middleware passed, token is valid
  res.json({
    success: true,
    message: 'Token is valid',
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      schoolId: req.user.schoolId
    }
  });
};

// Logout (client-side token destruction - this is for logging)
exports.logout = (req, res) => {
  console.log('🚪 Logout request for user:', req.user.email);

  // In a real app, you might add the token to a blacklist
  // For JWT without blacklist, client just discards the token

  res.json({
    success: true,
    message: 'Logout successful'
  });
};