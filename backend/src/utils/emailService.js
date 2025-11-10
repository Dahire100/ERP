// utils/emailService.js
const nodemailer = require('nodemailer');

// Check if email credentials are configured
const isEmailConfigured = process.env.SMTP_USER && process.env.SMTP_PASS;
let transporter = null;

// Only create transporter if email is configured
if (isEmailConfigured) {
  // Create transporter
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
    
    // Don't verify on startup to avoid blocking - verify lazily when sending emails
    console.log('✅ Email transporter created (verification will happen on first send)');
  } catch (error) {
    console.error('❌ Email transporter configuration error:', error);
    transporter = null;
  }
  // Don't verify on startup to avoid blocking - verify lazily when sending emails
  console.log('✅ Email transporter created (verification will happen on first send)'); } else {
  console.log('⚠️  Email not configured - SMTP_USER and SMTP_PASS environment variables not set');  console.log('ℹ️  Email notifications will be disabled');nfig = async () => {
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
                <li>Login to admin dashboard</li>
                <li>Approve or reject the registration</li>
                <li>If approved, set admin credentials for the school</li>
              </ol>

              <p style="text-align: center;">
                <a href="http://localhost:3000/admin/login" class="button">Login to Admin Dashboard</a>
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

exports.sendSchoolApprovalEmail = async (toEmail, schoolName, adminEmail, adminPassword) => {
  if (!isEmailConfigured) {
    console.log('⚠️  Email not configured - Skipping approval email');
    return { success: false, message: 'Email not configured' };
  }
  
  try {
    console.log('📧 Sending approval email with credentials to:', toEmail);
    
    const mailOptions = {
      from: process.env.SMTP_FROM || `"Frontier LMS" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: '🎉 School Registration Approved - Frontier LMS',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .credentials { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb; margin: 15px 0; }
            .button { background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
            .password { font-size: 18px; font-weight: bold; color: #059669; background: #f0fdf4; padding: 8px 12px; border-radius: 4px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Frontier LMS!</h1>
            </div>
            <div class="content">
              <h2>Dear ${schoolName} Administrator,</h2>
              <p>We are pleased to inform you that your school registration has been approved!</p>
              
              <div class="credentials">
                <h3>🔐 Your Login Credentials:</h3>
                <p><strong>Login URL:</strong> <a href="http://localhost:3000/login">http://localhost:3000/login</a></p>
                <p><strong>Email:</strong> ${adminEmail}</p>
                <p><strong>Password:</strong> <span class="password">${adminPassword}</span></p>
                <p><em style="color: #dc2626;">Please change your password after first login for security.</em></p>
              </div>

              <p>You can now access your school dashboard and start managing:</p>
              <ul>
                <li>Student records and admissions</li>
                <li>Teacher management</li>
                <li>Fee collection and tracking</li>
                <li>Attendance and exam records</li>
                <li>Transport management</li>
              </ul>

              <p style="text-align: center;">
                <a href="http://localhost:3000/login" class="button">Login to Dashboard</a>
              </p>

              <p><strong>Important Security Notice:</strong></p>
              <ul>
                <li>Keep your credentials secure and confidential</li>
                <li>Change your password immediately after first login</li>
                <li>Do not share your password with anyone</li>
                <li>Contact support if you suspect any unauthorized access</li>
              </ul>

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
    console.log('✅ Credentials included:', { adminEmail, adminPassword });
    return info;
  } catch (error) {
    console.error('❌ Failed to send approval email to', toEmail, ':', error.message);
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
        <!DOCTYPE htmlSMTP_FROM
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
                <li>Our team will review your application</li>
                <li>We'll verify the provided information</li>
                <li>You'll receive approval notification within 24-48 hours</li>
                <li>Once approved, you'll get your login credentials via email</li>
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
