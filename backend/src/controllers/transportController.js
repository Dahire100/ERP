// controllers/transportController.js
const { db } = require('../config/db');

// Get all transport routes
exports.getTransportRoutes = (req, res) => {
  const { schoolId } = req.user;

  const query = `SELECT * FROM transport_routes WHERE schoolId = ? ORDER BY routeName`;

  db.all(query, [schoolId], (err, routes) => {
    if (err) {
      console.error('Error fetching transport routes:', err);
      return res.status(500).json({ error: 'Failed to fetch transport routes' });
    }
    res.json(routes);
  });
};

// Add transport route
exports.addTransportRoute = (req, res) => {
  const { schoolId } = req.user;
  const { routeName, busNumber, driverName, driverPhone, fee } = req.body;

  if (!routeName || !busNumber || !driverName || !driverPhone || !fee) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO transport_routes (routeName, busNumber, driverName, driverPhone, fee, schoolId)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [routeName, busNumber, driverName, driverPhone, fee, schoolId], function(err) {
    if (err) {
      console.error('Error adding transport route:', err);
      return res.status(500).json({ error: 'Failed to add transport route' });
    }

    res.status(201).json({
      message: 'Transport route added successfully',
      routeId: this.lastID
    });
  });
};

// Update transport route
exports.updateTransportRoute = (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;
  const updates = req.body;

  const allowedFields = ['routeName', 'busNumber', 'driverName', 'driverPhone', 'fee'];
  const setClause = [];
  const values = [];

  allowedFields.forEach(field => {
    if (updates[field] !== undefined) {
      setClause.push(`${field} = ?`);
      values.push(updates[field]);
    }
  });

  if (setClause.length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  values.push(id, schoolId);

  const query = `UPDATE transport_routes SET ${setClause.join(', ')} WHERE id = ? AND schoolId = ?`;

  db.run(query, values, function(err) {
    if (err) {
      console.error('Error updating transport route:', err);
      return res.status(500).json({ error: 'Failed to update transport route' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Transport route not found' });
    }
    res.json({ message: 'Transport route updated successfully' });
  });
};

// Delete transport route
exports.deleteTransportRoute = (req, res) => {
  const { schoolId } = req.user;
  const { id } = req.params;

  const query = `DELETE FROM transport_routes WHERE id = ? AND schoolId = ?`;

  db.run(query, [id, schoolId], function(err) {
    if (err) {
      console.error('Error deleting transport route:', err);
      return res.status(500).json({ error: 'Failed to delete transport route' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Transport route not found' });
    }
    res.json({ message: 'Transport route deleted successfully' });
  });
};

// Get students by transport route
exports.getStudentsByRoute = (req, res) => {
  const { schoolId } = req.user;
  const { route } = req.params;

  const query = `
    SELECT s.studentId, s.firstName, s.lastName, s.class, s.section, s.phone, s.parentPhone
    FROM students s
    WHERE s.schoolId = ? AND s.transportRoute = ?
    ORDER BY s.class, s.section, s.firstName
  `;

  db.all(query, [schoolId, route], (err, students) => {
    if (err) {
      console.error('Error fetching students by route:', err);
      return res.status(500).json({ error: 'Failed to fetch students' });
    }
    res.json(students);
  });
};