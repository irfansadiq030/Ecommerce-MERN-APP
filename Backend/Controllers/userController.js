const User = require('../Models/userModel');
const sendToken = require('../utils/jwtToken');

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

        sendToken(user,200,resp)
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