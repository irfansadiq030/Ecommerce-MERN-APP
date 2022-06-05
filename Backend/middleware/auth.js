const JWT = require('jsonwebtoken');
const User = require('../Models/userModel');

exports.isAuthenticated = async (req, resp, next) => {

    const { token } = req.cookies
    // console.log(token)
    if (!token) {
        return resp.status(401).json({
            success: false,
            message: "Please Login"
        })
    }

    const decodedData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    // console.log(req.user)
    next();

}

// Authorize ROLES

exports.authorizeRoles = (...roles) => {
    return (req, resp, next) => {
        if (!roles.includes(req.user.role)) {
            return next(resp.status(403).json({
                success: false,
                message: `Role: ${req.user.role} not allowed to access this resource`
            })
            )
            // console.log('not')
        }

        next();
    }
}