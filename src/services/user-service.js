const userRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
class userService{
    constructor() {
        this.UserRepository = new userRepository();
    }

    async create(data) {
        try {
            const user = await this.UserRepository.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw { error };
        }
    }
    async destroy(userId) {
        try {
            await this.UserRepository.destroy(userId);
            return true;
        } catch (error) {
            console.log('something went wrong in the service layer');
            throw { error };
        }
    }
    createToken(user) {
        try {
            const jwtToken = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return jwtToken;
        } catch (error) {
            console.log('something went wrong in token creation');
            throw { error };
        }
    }
    
    verifyToken(token) {
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log('something went wrong in token validation');
            throw { error };
        }
    }

}

module.exports = userService;