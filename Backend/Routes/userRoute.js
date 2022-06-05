const express = require('express');
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updateUserPassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRoles,
    deleteUser
    } = require('../Controllers/userController');

const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

const router = express.Router();



router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticated, getUserDetails);

router.route('/password/update').put(isAuthenticated, updateUserPassword);

router.route('/me/update').put(isAuthenticated, updateProfile);

router.route('/admin/users').get(isAuthenticated, getAllUser);

router.route('/admin/user/:id').get(isAuthenticated, getSingleUser);

router.route('/admin/user/:id').delete(isAuthenticated, deleteUser);

module.exports = router