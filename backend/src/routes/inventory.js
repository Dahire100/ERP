// routes/inventory.js
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

// Get statistics (before :id routes)
router.get('/stats/summary', inventoryController.getInventoryStats);

// Get low stock items (before :id routes)
router.get('/low-stock', inventoryController.getLowStockItems);

// Get items by category (before :id routes)
router.get('/category/:category', inventoryController.getItemsByCategory);

// Create inventory item
router.post('/', inventoryController.createInventoryItem);

// Get all inventory items
router.get('/', inventoryController.getAllInventoryItems);

// Get inventory item by ID
router.get('/:id', inventoryController.getInventoryItemById);

// Update inventory item
router.put('/:id', inventoryController.updateInventoryItem);

// Delete inventory item
router.delete('/:id', inventoryController.deleteInventoryItem);

// Add transaction
router.post('/:id/transaction', inventoryController.addTransaction);

// Assign item
router.post('/:id/assign', inventoryController.assignItem);

// Return item
router.post('/:id/return', inventoryController.returnItem);

module.exports = router;
