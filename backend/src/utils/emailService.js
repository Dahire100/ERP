const nodemailer = require('nodemailer');

// Check if email credentials are configured
const isEmailConfigured = process.env.SMTP_USER && process.env.SMTP_PASS;
let transporter = null;

// Only create transporter if email is configured
if (isEmailConfigured) {
  try {
    // Create transporter
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 5000, // 5 second timeout
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates
      }
    });

    console.log('✅ Email transporter created (verification will happen on first send)');
  } catch (error) {
    console.error('❌ Email transporter configuration error:', error);
    transporter = null;
  }
} else {
  console.log('⚠️  Email not configured - SMTP_USER and SMTP_PASS environment variables not set');
  console.log('ℹ️  Email notifications will be disabled');
}

exports.verifyConfig = async () => {
  if (!isEmailConfigured) {
    console.log('ℹ️  Email not configured');
    return false;
  }

  try {
    await transporter.verify();
    console.log('✅ Email server configuration is correct');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
};

// Send OTP email
exports.sendOTPEmail = async (toEmail, otp, purpose = 'login') => {
  if (!isEmailConfigured) {
    console.log('⚠️  Email not configured - OTP:', otp);
    console.log(`📧 [DEV MODE] OTP for ${toEmail}: ${otp}`);
    return { success: true, message: 'Email not configured - OTP logged to console', otp };
  }

  try {
    const purposeText = {
      'login': 'Login',
      'registration': 'Registration',
      'password_reset': 'Password Reset'
    }[purpose] || 'Verification';

    const mailOptions = {
      from: process.env.SMTP_FROM || `"Frontier LMS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `🔐 Your ${purposeText} OTP - FrontierLMS`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .otp-box { background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px solid #2563eb; }
            .otp-code { font-size: 36px; font-weight: bold; color: #2563eb; letter-spacing: 8px; font-family: 'Courier New', monospace; }
            .warning { background: #fef2f2; border-left: 4px solid #dc2626; padding: 12px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎓 FrontierLMS</h1>
              <p style="margin: 10px 0 0 0;">Secure ${purposeText} Verification</p>
            </div>
            <div class="content">
              <h2 style="color: #1f2937; margin-top: 0;">Your One-Time Password</h2>
              <p>Hello,</p>
              <p>You have requested a ${purposeText.toLowerCase()} OTP for your FrontierLMS account. Please use the following code:</p>
              
              <div class="otp-box">
                <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Your OTP Code</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">Valid for 10 minutes</p>
              </div>

              <div class="warning">
                <strong>⚠️ Security Notice:</strong>
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                  <li>Never share this OTP with anyone</li>
                  <li>FrontierLMS staff will never ask for your OTP</li>
                  <li>This code expires in 10 minutes</li>
                  <li>If you didn't request this, please ignore this email</li>
                </ul>
              </div>

              <p>If you have any questions or concerns, please contact our support team.</p>
              
              <div class="footer">
                <p>Best regards,<br><strong>FrontierLMS Team</strong></p>
                <p>📧 Support: support@frontierlms.com</p>
                <p style="font-size: 12px; color: #9ca3af;">This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ OTP email sent to:', toEmail);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send OTP email to', toEmail, ':', error.message);
    // In development, still log the OTP even if email fails
    console.log(`📧 [FALLBACK] OTP for ${toEmail}: ${otp}`);
    return { success: false, error: error.message, otp }; // Include OTP in response for dev mode
  }
};

// Send notification to super admin about new registration
exports.sendSuperAdminNotification = async (superAdminEmail, schoolData) => {
  if (!isEmailConfigured) {
    console.log('⚠️  Email not configured - Skipping super admin notification');
    return { success: false, message: 'Email not configured' };
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Frontier LMS" <${process.env.SMTP_USER}>`,
      to: superAdminEmail,
      subject: '🚨 New School Registration Requires Approval - Frontier LMS',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .school-info { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 15px 0; }
            .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            .urgent { background: #fef2f2; color: #dc2626; padding: 10px; border-radius: 4px; text-align: center; margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New School Registration</h1>
            </div>
            <div class="content">
              <div class="urgent">
                <strong>ACTION REQUIRED:</strong> A new school has registered and needs your approval.
              </div>
              
              <h2>School Registration Details:</h2>
              
              <div class="school-info">
                <h3>🏫 ${schoolData.schoolName}</h3>
                <p><strong>Email:</strong> ${schoolData.email}</p>
                <p><strong>Contact:</strong> ${schoolData.contactNumber}</p>
                <p><strong>Address:</strong> ${schoolData.address}, ${schoolData.city}, ${schoolData.state} - ${schoolData.pinCode}</p>
                <p><strong>School Type:</strong> ${schoolData.schoolType} | <strong>Board:</strong> ${schoolData.boardType}</p>
                <p><strong>Principal:</strong> ${schoolData.principalName} (${schoolData.principalEmail})</p>
                <p><strong>Established:</strong> ${schoolData.establishmentYear}</p>
                <p><strong>Description:</strong> ${schoolData.description}</p>
                <p><strong>Registration Date:</strong> ${new Date().toLocaleString()}</p>
              </div>

              <p><strong>Next Steps:</strong></p>
              <ol>
                <li>Review the school information above</li>
                <li>Contact the school for payment details</li>
                <li>Verify payment receipt</li>
                <li>Login to admin dashboard to approve registration</li>
              </ol>

              <p style="text-align: center;">
                <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Login to Admin Dashboard</a>
              </p>

              <p><em>This is an automated notification. Please do not reply to this email.</em></p>
              
              <div class="footer">
                <p>Best regards,<br><strong>Frontier LMS System</strong></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Super admin notification sent to:', superAdminEmail);
    return info;
  } catch (error) {
    console.error('❌ Failed to send super admin notification to', superAdminEmail, ':', error.message);
    throw error;
  }
};

// Send school approval email with login credentials
exports.sendSchoolApprovalEmail = async (toEmail, schoolName, adminEmail, adminPassword) => {
  if (!isEmailConfigured) {
    console.log('⚠️  Email not configured - Skipping approval email');
    return { success: false, message: 'Email not configured' };
  }

  try {
    console.log('📧 Sending approval email with credentials to:', toEmail);

    const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`;

    const mailOptions = {
      from: process.env.SMTP_FROM || `"Frontier LMS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: '✅ School Registration Approved - Login Credentials - Frontier LMS',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .credentials-box { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 15px 0; }
            .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Registration Approved!</h1>
            </div>
            <div class="content">
              <h2>Dear ${schoolName} Administrator,</h2>
              <p>Congratulations! Your school registration has been approved and your ERP is now active.</p>
              
              <div class="credentials-box">
                <h3>🔐 Your Admin Login Credentials:</h3>
                <p><strong>Login URL:</strong> <a href="${loginUrl}">${loginUrl}</a></p>
                <p><strong>Email (ID):</strong> ${adminEmail}</p>
                <p><strong>Password:</strong> ${adminPassword}</p>
              </div>

              <p><strong>Next Steps:</strong></p>
              <ol>
                <li>Go to the login page using the link above.</li>
                <li>Search for your school in the school list.</li>
                <li>Login using the email and password provided above.</li>
                <li>We recommend changing your password after the first login.</li>
              </ol>

              <p style="text-align: center; margin-top: 20px;">
                <a href="${loginUrl}" class="button">Login to Dashboard</a>
              </p>

              <p>If you have any questions, please contact our support team.</p>
              
              <div class="footer">
                <p>Best regards,<br><strong>Frontier LMS Team</strong></p>
                <p>📞 Support: support@frontierlms.com</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Approval email sent to:', toEmail);
    return info;
  } catch (error) {
    console.error('❌ Failed to send approval email to', toEmail, ':', error.message);
    throw error;
  }
};

// Send account activation email with credentials
exports.sendAccountActivationEmail = async (toEmail, schoolName, adminEmail, loginUrl) => {
  if (!isEmailConfigured) {
    console.log('⚠️  Email not configured - Skipping activation email');
    return { success: false, message: 'Email not configured' };
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Frontier LMS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: '🎉 Account Activated - Welcome to FrontierLMS',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
            .credentials { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #059669; margin: 20px 0; }
            .button { background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎓 Welcome to FrontierLMS!</h1>
            </div>
            <div class="content">
              <h2 style="color: #1f2937;">Dear ${schoolName} Administrator,</h2>
              <p>Your payment has been confirmed and your account is now <strong>ACTIVE</strong>!</p>
              
              <div class="credentials">
                <h3 style="color: #059669; margin-top: 0;">🔐 Your Login Details:</h3>
                <p><strong>Login URL:</strong> <a href="${loginUrl}">${loginUrl}</a></p>
                <p><strong>Email:</strong> ${adminEmail}</p>
                <p><strong>Authentication:</strong> OTP-based (sent to your email)</p>
              </div>

              <p><strong>How to Login:</strong></p>
              <ol>
                <li>Visit the login page using the URL above</li>
                <li>Enter your email address</li>
                <li>Click "Send OTP" to receive a one-time password</li>
                <li>Enter the OTP to access your dashboard</li>
              </ol>

              <p style="text-align: center; margin: 30px 0;">
                <a href="${loginUrl}" class="button">Login to Dashboard</a>
              </p>

              <p><strong>What you can do now:</strong></p>
              <ul>
                <li>✅ Add students and manage admissions</li>
                <li>✅ Add teachers and staff</li>
                <li>✅ Manage fees and payments</li>
                <li>✅ Track attendance</li>
                <li>✅ Manage exams and results</li>
                <li>✅ Handle transport routes</li>
              </ul>

              <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 12px; margin: 20px 0; border-radius: 4px;">
                <strong>🔒 Security Reminder:</strong>
                <ul style="margin: 10px 0 0 0;">
                  <li>Keep your email secure - it's your login credential</li>
                  <li>Never share OTP codes with anyone</li>
                  <li>Contact support immediately if you notice suspicious activity</li>
                </ul>
              </div>

              <p>If you need any assistance, our support team is here to help!</p>
              
              <div class="footer">
                <p>Best regards,<br><strong>FrontierLMS Team</strong></p>
                <p>📧 Support: support@frontierlms.com | 📞 Phone: +91-XXXXXXXXXX</p>
                <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Account activation email sent to:', toEmail);
    return info;
  } catch (error) {
    console.error('❌ Failed to send activation email to', toEmail, ':', error.message);
    throw error;
  }
};

exports.sendSchoolRegistrationEmail = async (toEmail, schoolName) => {
  if (!isEmailConfigured) {
    console.log('⚠️  Email not configured - Skipping registration confirmation email');
    return { success: false, message: 'Email not configured' };
  }

  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Frontier LMS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: '📋 School Registration Received - Frontier LMS',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Registration Received!</h1>
            </div>
            <div class="content">
              <h2>Dear ${schoolName},</h2>
              <p>Thank you for choosing <strong>Frontier LMS</strong> for your school management needs!</p>
              
              <p>We have successfully received your registration application and it is currently under review by our team.</p>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your application within 24 hours</li>
                <li>You'll receive payment details via email</li>
                <li>After payment confirmation, your account will be activated</li>
                <li>Login credentials will be sent to your registered email</li>
              </ul>

              <p>If you have any urgent questions, feel free to contact our support team.</p>
              
              <div class="footer">
                <p>Best regards,<br><strong>Frontier LMS Team</strong></p>
                <p>📞 Support: support@frontierlms.com</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Registration confirmation email sent to:', toEmail);
    return info;
  } catch (error) {
    console.error('❌ Failed to send registration email to', toEmail, ':', error.message);
    throw error;
  }
};

// Send student credentials
exports.sendStudentCredentials = async (toEmail, studentName, studentId, password) => {
  if (!isEmailConfigured) {
    console.log('⚠️  Email not configured - Skipping student credentials email');
    return { success: false, message: 'Email not configured' };
  }

  try {
    const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`;
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Frontier LMS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: '📚 Welcome to Frontier LMS - Your Student Credentials',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .credentials-box { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; margin: 15px 0; }
            .button { background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome, Student!</h1>
            </div>
            <div class="content">
              <h2>Dear ${studentName},</h2>
              <p>Your student profile has been created in Frontier LMS. Here are your login credentials:</p>
              
              <div class="credentials-box">
                <h3>🔐 Login Details:</h3>
                <p><strong>URL:</strong> <a href="${loginUrl}">${loginUrl}</a></p>
                <p><strong>Student ID:</strong> ${studentId}</p>
                <p><strong>Email:</strong> ${toEmail}</p>
                <p><strong>Password:</strong> ${password}</p>
              </div>

              <p>Please login and change your password immediately.</p>
              
              <p style="text-align: center; margin-top: 20px;">
                <a href="${loginUrl}" class="button">Login to Portal</a>
              </p>
              
              <div class="footer">
                <p>Best regards,<br><strong>Frontier LMS Team</strong></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Student credentials email sent to:', toEmail);
    return info;
  } catch (error) {
    console.error('❌ Failed to send student credentials to', toEmail, ':', error.message);
    throw error;
  }
};

// Send teacher credentials
exports.sendTeacherCredentials = async (toEmail, teacherName, teacherId, password) => {
  if (!isEmailConfigured) {
    console.log('⚠️  Email not configured - Skipping teacher credentials email');
    return { success: false, message: 'Email not configured' };
  }

  try {
    const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`;
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Frontier LMS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: '🍎 Welcome to Frontier LMS - Your Faculty Credentials',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8b5cf6; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .credentials-box { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #8b5cf6; margin: 15px 0; }
            .button { background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome, Faculty!</h1>
            </div>
            <div class="content">
              <h2>Dear ${teacherName},</h2>
              <p>Your teacher profile has been created in Frontier LMS. Here are your login credentials:</p>
              
              <div class="credentials-box">
                <h3>🔐 Login Details:</h3>
                <p><strong>URL:</strong> <a href="${loginUrl}">${loginUrl}</a></p>
                <p><strong>Teacher ID:</strong> ${teacherId}</p>
                <p><strong>Email:</strong> ${toEmail}</p>
                <p><strong>Password:</strong> ${password}</p>
              </div>

              <p>Please login and update your profile information if needed.</p>
              
              <p style="text-align: center; margin-top: 20px;">
                <a href="${loginUrl}" class="button">Login to Portal</a>
              </p>
              
              <div class="footer">
                <p>Best regards,<br><strong>Frontier LMS Team</strong></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Teacher credentials email sent to:', toEmail);
    return info;
  } catch (error) {
    console.error('❌ Failed to send teacher credentials to', toEmail, ':', error.message);
    throw error;
  }
};

// Send parent credentials
exports.sendParentCredentials = async (toEmail, parentName, username, password) => {
  if (!isEmailConfigured) {
    console.log('⚠️  Email not configured - Skipping parent credentials email');
    return { success: false, message: 'Email not configured' };
  }

  try {
    const loginUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login`;
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Frontier LMS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: '👨‍👩‍👧‍👦 Welcome to Frontier LMS - Your Parent Portal Access',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0891b2; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .credentials-box { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #0891b2; margin: 15px 0; }
            .button { background: #0891b2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to the Parent Portal!</h1>
            </div>
            <div class="content">
              <h2>Dear ${parentName},</h2>
              <p>Your parent account has been created in Frontier LMS. You can now track your child's progress, pay fees, and more.</p>
              
              <div class="credentials-box">
                <h3>🔐 Login Details:</h3>
                <p><strong>URL:</strong> <a href="${loginUrl}">${loginUrl}</a></p>
                <p><strong>Username/Email:</strong> ${username}</p>
                <p><strong>Password:</strong> ${password}</p>
              </div>

              <p>Please login and change your password immediately for security.</p>
              
              <p style="text-align: center; margin-top: 20px;">
                <a href="${loginUrl}" class="button">Login to Portal</a>
              </p>
              
              <div class="footer">
                <p>Best regards,<br><strong>Frontier LMS Team</strong></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Parent credentials email sent to:', toEmail);
    return info;
  } catch (error) {
    console.error('❌ Failed to send parent credentials to', toEmail, ':', error.message);
    throw error;
  }
};
