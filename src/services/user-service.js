const userRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');

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
    
}

module.exports = userService;