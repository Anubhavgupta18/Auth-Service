const userService = require('../services/user-service');

const User = new userService();

const create = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: user,
            success: true,
            message: 'sucessfully created a User',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err:error.explanation
        })
    }
}

const signin = async (req,res) => {
    try {
        const response = await User.signin(req.body.email,req.body.password);
        return res.status(200).json({
            data: response,
            message: 'Successfully signed in',
            success: true,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to sign in',
            err:error
        })
    }
}
const isAuthenticated = async (req, res) => {
    try {
        const response = await User.isAuthenticated(req.headers['token']);
        return res.status(200).json({
            data: response,
            message: 'User is authenticated and token is valid',
            success: true,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to authenticate a user',
            err: error
        })
    }
}

const isAdmin = async (req, res) => {
    try {
        const response = await User.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            message: 'successfully checked whether user is admin or not',
            success: true,
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Something went wrong',
            err: error
        })
    }
}
module.exports = {
    create,
    signin,
    isAuthenticated,
    isAdmin
}