const authRequestValidator = (req, res, next) => {
    if (!req.body.email ||
        !req.body.password) {
        return res.status(400).json({
            data: {},
            message: 'Something went wrong',
            success: false,
            err:'email or password missing in the request'
        })
    }
    next();
}
const adminRequestValidator = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            data: {},
            message: 'Something went wrong',
            success: false,
            err:'user id is missing'
        })
    }
    next();
}
module.exports = {
    authRequestValidator,
    adminRequestValidator
}