const { User } = require('../models/index');

class userRepository{
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in the repository layer');
            throw { error };
        }
    }
    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                id:userId
            }});
            return true;
        } catch (error) {
            console.log('something went wrong in the repository layer');
            throw { error };
        }
    }
    async getbyId(userId) {
        try {
            const user = await User.findByPk(userId,{
                attributes: ['email', 'id']
              });
            return user;
        } catch (error) {
            console.log('something went wrong in the repository layer');
            throw { error };
        }
    }
}

module.exports = userRepository;