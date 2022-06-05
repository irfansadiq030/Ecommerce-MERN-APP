const express = require('express');
const router = express.Router();

// Importing Controllers

const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../Controllers/orderController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

// Creating Routes

router.route('/order/new').post(isAuthenticated, newOrder);
router.route('/order/:id').get(isAuthenticated, authorizeRoles('admin'), getSingleOrder);
router.route('/orders/me').get(isAuthenticated, myOrders);
router.route('/admin/orders/').get(isAuthenticated, authorizeRoles('admin'), getAllOrders)
router.route('/admin/order/:id').put(isAuthenticated, authorizeRoles('admin'), updateOrderStatus).delete(isAuthenticated, authorizeRoles('admin'), deleteOrder)

module.exports = router;