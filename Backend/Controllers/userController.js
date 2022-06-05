const User = require('../Models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');


// Register a User
exports.registerUser = async (req, resp, next) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: 'sample_id',
                url: 'sample url'
            }
        })

        // Getting JWT method which is created in userModel.js file
        const token = user.getJWTToken();

        // Sending Response back to user
        resp.status(200).json({
            success: true,
            token
        })

    } catch (error) {
        // console.log(error.message)

        // Sending Response back to user
        if (error.code === 11000) {
            return resp.status(400).json({
                success: false,
                message: 'Email already exists'
            })
        }

        if (error.name === 'TokenExpiredError') {
            return resp.status(400).json({
                success: false,
                message: 'Json web token is Expired'
            })
        }
        resp.status(500).json({
            success: false,
            message: error.message
        })
    }

}

// Login User

exports.loginUser = async (req, resp, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return resp.status(401).json({
                success: false,
                message: 'Invalid Email & Password'
            })
        }

        const user = await User.findOne({ email, }).select("+password");
        if (!user) {
            return resp.status(401).json({
                success: false,
                message: 'Invalid Email & Password'
            })
        }

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return resp.status(401).json({
                success: false,
                message: 'Invalid Email & Password'
            })
        }

        // If all above conditions are true then send success response to user

        // Getting JWT method which is created in userModel.js file
        // const token = user.getJWTToken();

        //  This token Line is now pasted into this path utils/jwtToken.js file

        sendToken(user, 200, resp)
        // return resp.status(200).json({
        //     success: true,
        //     token
        // })

    } catch (error) {
        return resp.status(500).json({
            success: false,
            message: error.message
        })
    }

}

// Logout

exports.logout = async (req, resp, next) => {
    resp.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    resp.status(200).json({
        success: true,
        message: 'Logged Out'
    })
}

// Forgot Password

exports.forgotPassword = async (req, resp, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return resp.status(404).json({
            success: false,
            message: 'User Not Found'
        })
    }

    // Get Reset Password Token

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset Token : \n\n ${resetPasswordUrl} \n\n if you have not requested this then, please ignore this email`;

    try {

        await sendEmail({

            email: user.email,
            subject: 'Ecommerce - Password Reset Recovery',
            message,

        })
        resp.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;

        await user.save({ validateBeforeSave: false })

        return next(
            resp.status(500).json({
                success: false,
                message: error.message
            })
        );
    }
}

// RESET Password

exports.resetPassword = async (req, resp, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpired: {
            $gt: Date.now()
        }
    })

    if (!user) {
        return resp.status(404).json({
            success: false,
            message: 'Reset Password Token Invalid or has been expired.'
        })
    }

    // If  user found then 
    if (req.body.password !== req.body.confirmPassword) {
        return resp.status(400).json({
            success: false,
            message: 'Password dose not matched'
        })
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;

    await user.save();
    sendToken(user, 200, resp)
}

// Get Logged In user Deatils to display in his profile page.

exports.getUserDetails = async (req, resp, next) => {
    const user = await User.findById(req.user.id);

    resp.status(200).json({
        success: true,
        user
    });
} 

// Password Update of user Profile
exports.updateUserPassword = async (req, resp, next) => {
    const user = await User.findById(req.user.id).select("+password");

    // Comparing old password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return resp.status(400).json({
            success: false,
            message: 'User Old Password not Matched.'
        })

    }

    // Comparing if newly entered password is same in both field (Password & confirm password field)
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
            resp.status(400).json({
                success: false,
                message: 'Password does not Matched.'
            })
        )
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, resp)
}

// Update User Profile

exports.updateProfile = async (req, resp, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // Have to add cloudinary later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    user.save();

    resp.status(200).json({
        success: true
    });
}

// Get All Users
exports.getAllUser = async (req, resp, next) => {
    const users = await User.find();

    resp.status(200).json({
        success: true,
        users
    })
}

// Get Single Users Details by ADMIN

exports.getSingleUser = async (req, resp, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return resp.status(404).json({
            success: false,
            message: `User Not Found with Id : ${req.params.id}`
        })
    }

    resp.status(200).json({
        success: true,
        user
    })
}

// update User Roles

exports.updateUserRoles = async (req, resp, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    if (!user) {
        return resp.status(404).json({
            success: false,
            message: `User Not Found with Id : ${req.params.id}`
        })
    }

    user.save();

    resp.status(200).json({
        success: true
    });
}
// Delete User --Admin

exports.deleteUser = async (req, resp, next) => {

    const user = await User.findById(req.params.id)

    if (!user) {
        return resp.status(404).json({
            success: false,
            message: `User Not Found with Id : ${req.params.id}`
        })
    }

    user.remove();

    resp.status(200).json({
        success: true
    });
}
