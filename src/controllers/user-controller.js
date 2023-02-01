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
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Not able to create a User',
            err:error
        })
    }
}

module.exports = {
    create
}