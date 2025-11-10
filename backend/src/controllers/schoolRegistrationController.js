// controllers/schoolRegistrationController.js
const { db } = require('../config/db');
const bcrypt = require('bcryptjs');
const { sendSchoolRegistrationEmail, sendSchoolApprovalEmail, sendSuperAdminNotification } = require('../utils/emailService');

// Register a new school (PUBLIC)
exports.registerSchool = async (req, res) => {
  try {
    const {
      schoolName, email, contactNumber, schoolType, boardType,
      establishmentYear, address, city, state, country, pinCode,
      principalName, principalEmail, principalPhone, description
    } = req.body;

    console.log('📝 School registration attempt:', { schoolName, email });

    // Enhanced validation
    if (!schoolName || !email) {
      return res.status(400).json({ 
        success: false,
        error: 'School name and email are required' 
      });
    }

    if (!principalName || !principalEmail) {
      return res.status(400).json({ 
        success: false,
        error: 'Principal name and email are required' 
      });
    }

    // Check if email already exists
    const checkEmailQuery = `SELECT id, status FROM schools WHERE email = ?`;
    
    db.get(checkEmailQuery, [email], async (err, existingSchool) => {
      if (err) {
        console.error('❌ Database error during email check:', err);
        return res.status(500).json({ 
          success: false,
          error: 'Database error during registration' 
        });
      }

      if (existingSchool) {
        console.log('❌ School email already exists:', email, 'Status:', existingSchool.status);
        return res.status(400).json({ 
          success: false,
          error: `School with email ${email} already exists (Status: ${existingSchool.status})` 
        });
      }

      // Create new school registration
      const insertQuery = `
        INSERT INTO schools (
          schoolName, email, contactNumber, schoolType, boardType,
          establishmentYear, address, city, state, country, pinCode,
          principalName, principalEmail, principalPhone, description, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
      `;

      const params = [
        schoolName, email, contactNumber, schoolType, boardType,
        establishmentYear, address, city, state, country, pinCode,
        principalName, principalEmail, principalPhone, description
      ];

      db.run(insertQuery, params, async function(err) {
        if (err) {
          console.error('❌ Registration database error:', err);
          return res.status(500).json({ 
            success: false,
            error: 'Registration failed. Please try again.',
            details: err.message 
          });
        }

        const registrationId = this.lastID;
        const schoolData = {
          schoolName,
          email,
          contactNumber,
          schoolType,
          boardType,
          establishmentYear,
          address,
          city,
          state,
          country,
          pinCode,
          principalName,
          principalEmail,
          principalPhone,
          description,
          registrationDate: new Date().toISOString()
        };

        console.log('✅ School registration successful!', {
          id: registrationId,
          schoolName,
          email
        });
        
        // Send registration confirmation email to school
        try {
          await sendSchoolRegistrationEmail(email, schoolName);
          console.log('📧 Confirmation email sent to school:', email);
        } catch (emailError) {
          console.error('❌ Failed to send confirmation email to school:', emailError);
        }

        // ✅ NEW: Send notification to super admins
        try {
          // Get all super admins
          const superAdminsQuery = `SELECT email, firstName FROM users WHERE role = 'super_admin' AND isActive = 1`;
          
          db.all(superAdminsQuery, [], async (err, superAdmins) => {
            if (err) {
              console.error('❌ Error fetching super admins:', err);
              // Continue with response even if notification fails
              return sendSuccessResponse();
            }

            console.log(`📧 Notifying ${superAdmins.length} super admins about new registration`);
            
            // Send notification to each super admin
            const notificationPromises = superAdmins.map(async (admin) => {
              try {
                await sendSuperAdminNotification(admin.email, schoolData);
                console.log(`✅ Notification sent to super admin: ${admin.email}`);
                return true;
              } catch (notifyError) {
                console.error(`❌ Failed to notify super admin ${admin.email}:`, notifyError.message);
                return false;
              }
            });

            // Wait for all notifications to complete
            await Promise.all(notificationPromises);
            sendSuccessResponse();
          });
        } catch (notificationError) {
          console.error('❌ Super admin notification process failed:', notificationError);
          // Still send success response
          sendSuccessResponse();
        }

        function sendSuccessResponse() {
          res.status(201).json({ 
            success: true,
            message: 'Registration submitted successfully! Our team will review and contact you within 24-48 hours.',
            data: {
              registrationId: registrationId,
              schoolName: schoolName,
              email: email
            }
          });
        }
      });
    });

  } catch (error) {
    console.error('❌ Unexpected registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Registration failed due to unexpected error.',
      details: error.message 
    });
  }
};

// Get all pending registrations (SUPER ADMIN ONLY)
exports.getPendingRegistrations = (req, res) => {
  console.log('📋 Fetching pending registrations...');
  
  const query = `SELECT * FROM schools WHERE status = 'pending' ORDER BY registrationDate DESC`;
  
  db.all(query, [], (err, pendingSchools) => {
    if (err) {
      console.error('❌ Error fetching pending registrations:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch pending registrations' 
      });
    }
    
    console.log(`✅ Found ${pendingSchools.length} pending registrations`);
    res.json({
      success: true,
      data: pendingSchools,
      count: pendingSchools.length
    });
  });
};

// Get all registrations (SUPER ADMIN ONLY)
exports.getAllRegistrations = (req, res) => {
  console.log('📋 Fetching all registrations...');
  
  const query = `SELECT * FROM schools ORDER BY registrationDate DESC`;
  
  db.all(query, [], (err, schools) => {
    if (err) {
      console.error('❌ Error fetching all registrations:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch registrations' 
      });
    }
    
    console.log(`✅ Found ${schools.length} total registrations`);
    res.json({
      success: true,
      data: schools,
      count: schools.length
    });
  });
};

// Approve registration (SUPER ADMIN ONLY)
exports.approveRegistration = async (req, res) => {
  try {
    const { registrationId, adminEmail, adminPassword } = req.body;
    
    console.log('✅ Approval request:', { registrationId, adminEmail, adminPassword });

    if (!registrationId || !adminEmail || !adminPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'Registration ID, admin email, and password are required' 
      });
    }

    if (adminPassword.length < 6) {
      return res.status(400).json({ 
        success: false,
        error: 'Admin password must be at least 6 characters long' 
      });
    }

    // Use serialized transactions for data consistency
    db.serialize(() => {
      // Get school details
      db.get(`SELECT * FROM schools WHERE id = ?`, [registrationId], async (err, school) => {
        if (err) {
          console.error('❌ Database error fetching school:', err);
          return res.status(500).json({ 
            success: false,
            error: 'Database error during approval' 
          });
        }

        if (!school) {
          console.log('❌ Registration not found:', registrationId);
          return res.status(404).json({ 
            success: false,
            error: 'Registration not found' 
          });
        }

        if (school.status !== 'pending') {
          console.log('❌ Registration already processed:', school.status);
          return res.status(400).json({ 
            success: false,
            error: `Registration is already ${school.status}` 
          });
        }

        // Check if admin email already exists in users table
        db.get(`SELECT id FROM users WHERE email = ?`, [adminEmail], async (err, existingUser) => {
          if (err) {
            console.error('❌ Error checking existing user:', err);
            return res.status(500).json({ 
              success: false,
              error: 'Error checking user existence' 
            });
          }

          if (existingUser) {
            console.log('❌ Admin email already exists:', adminEmail);
            return res.status(400).json({ 
              success: false,
              error: 'Admin email already exists. Please use a different email.' 
            });
          }

          // Hash password
          const hashedPassword = bcrypt.hashSync(adminPassword, 10);

          // Update school status and add admin credentials
          const updateSchoolQuery = `
            UPDATE schools 
            SET status = 'approved', adminEmail = ?, adminPassword = ?
            WHERE id = ?
          `;

          db.run(updateSchoolQuery, [adminEmail, hashedPassword, registrationId], function(err) {
            if (err) {
              console.error('❌ School update error:', err);
              return res.status(500).json({ 
                success: false,
                error: 'Failed to update school status' 
              });
            }

            console.log('✅ School status updated to approved:', school.schoolName);

            // Create school admin user
            const createUserQuery = `
              INSERT INTO users (email, passwordHash, role, firstName, schoolId, isActive, phone)
              VALUES (?, ?, 'school_admin', ?, ?, 1, ?)
            `;

            db.run(createUserQuery, [adminEmail, hashedPassword, school.principalName, registrationId, school.principalPhone], async function(err) {
              if (err) {
                console.error('❌ User creation error:', err);
                
                // Rollback school approval if user creation fails
                db.run(`UPDATE schools SET status = 'pending', adminEmail = NULL, adminPassword = NULL WHERE id = ?`, 
                  [registrationId], 
                  (rollbackErr) => {
                    if (rollbackErr) {
                      console.error('❌ Rollback failed:', rollbackErr);
                    }
                  }
                );
                
                return res.status(500).json({ 
                  success: false,
                  error: 'Failed to create admin user account',
                  details: err.message 
                });
              }

              const userId = this.lastID;
              console.log('✅ School admin user created:', {
                userId: userId,
                email: adminEmail,
                school: school.schoolName
              });

              console.log('🔑 Admin credentials created:', adminEmail, '/', adminPassword);

              // Send approval email with credentials
              try {
                console.log('📧 Sending approval email with credentials to:', school.email);
                await sendSchoolApprovalEmail(school.email, school.schoolName, adminEmail, adminPassword);
                console.log('✅ Approval email sent to:', school.email);
                
                res.json({ 
                  success: true,
                  message: 'School approved successfully! Login credentials have been sent to the school.',
                  data: {
                    schoolId: school.id,
                    schoolName: school.schoolName,
                    adminEmail: adminEmail,
                    adminPassword: adminPassword,
                    adminUserId: userId,
                    principalEmail: school.principalEmail,
                    loginUrl: 'http://localhost:3000/login'
                  }
                });
                
              } catch (emailError) {
                console.error('❌ Failed to send approval email:', emailError);
                
                // Still return success but warn about email failure
                res.json({ 
                  success: true,
                  message: 'School approved but email failed to send.',
                  warning: 'Please manually send credentials to the school.',
                  data: {
                    schoolId: school.id,
                    schoolName: school.schoolName,
                    adminEmail: adminEmail,
                    adminPassword: adminPassword,
                    adminUserId: userId,
                    loginUrl: 'http://localhost:3000/login'
                  }
                });
              }
            });
          });
        });
      });
    });

  } catch (error) {
    console.error('❌ Unexpected approval error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Approval process failed due to unexpected error',
      details: error.message 
    });
  }
};

// Reject registration (SUPER ADMIN ONLY)
exports.rejectRegistration = (req, res) => {
  const { registrationId, reason } = req.body;
  
  console.log('❌ Rejection request:', { registrationId, reason });

  if (!registrationId) {
    return res.status(400).json({ 
      success: false,
      error: 'Registration ID is required' 
    });
  }

  const query = `UPDATE schools SET status = 'rejected' WHERE id = ?`;
  
  db.run(query, [registrationId], function(err) {
    if (err) {
      console.error('❌ Rejection database error:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to reject registration' 
      });
    }

    if (this.changes === 0) {
      console.log('❌ Registration not found for rejection:', registrationId);
      return res.status(404).json({ 
        success: false,
        error: 'Registration not found' 
      });
    }

    console.log('✅ School registration rejected:', registrationId);
    
    // Get school name for response
    db.get(`SELECT schoolName, email FROM schools WHERE id = ?`, [registrationId], (err, school) => {
      if (err) {
        console.error('❌ Error fetching school details after rejection:', err);
      }

      res.json({ 
        success: true,
        message: reason ? `Registration rejected: ${reason}` : 'Registration rejected',
        data: {
          registrationId: registrationId,
          schoolName: school?.schoolName || 'Unknown',
          email: school?.email || 'Unknown',
          rejectedAt: new Date().toISOString()
        }
      });
    });
  });
};

// Get registration by ID (SUPER ADMIN ONLY)
exports.getRegistrationById = (req, res) => {
  const { id } = req.params;
  
  console.log('📋 Fetching registration by ID:', id);

  const query = `SELECT * FROM schools WHERE id = ?`;
  
  db.get(query, [id], (err, school) => {
    if (err) {
      console.error('❌ Error fetching registration:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch registration' 
      });
    }

    if (!school) {
      return res.status(404).json({ 
        success: false,
        error: 'Registration not found' 
      });
    }

    console.log('✅ Registration found:', school.schoolName);
    
    res.json({
      success: true,
      data: school
    });
  });
};

// Get registration statistics (SUPER ADMIN ONLY)
exports.getRegistrationStats = (req, res) => {
  console.log('📊 Fetching registration statistics...');
  
  const query = `
    SELECT 
      status,
      COUNT(*) as count
    FROM schools 
    GROUP BY status
  `;
  
  db.all(query, [], (err, stats) => {
    if (err) {
      console.error('❌ Error fetching statistics:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch statistics' 
      });
    }

    const total = stats.reduce((sum, item) => sum + item.count, 0);
    console.log('✅ Registration statistics:', { total, stats });
    
    res.json({
      success: true,
      data: {
        total,
        byStatus: stats
      }
    });
  });
};