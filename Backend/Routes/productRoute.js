const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, deleteReview, getProductReviews } = require('../Controllers/productController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');


router.route('/products').get(getAllProducts);
router.route('/products/new').post(isAuthenticated, createProduct);
router.route('/products/:id').put(updateProduct);
router.route('/products/:id').delete(deleteProduct);
router.route('/products/:id').get(getProductDetails);
router.route('/reviews').put(isAuthenticated, createProductReview);
router.route('/reviews').delete(isAuthenticated, deleteReview);
router.route('/reviews').get(getProductReviews);

module.exports = router