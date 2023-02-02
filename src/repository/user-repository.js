const { User,role } = require('../models/index');

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
    async getByEmail(emailId) {
        try {
            const user = await User.findOne({
                where: {
                    email:emailId
                }
            });
            return user;
        } catch (error) {
            console.log('something went wrong in the repository layer');
            throw { error };
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await role.findOne({
                where: {
                    name:'ADMIN'
                }
            });
            const response = user.hasRole(adminRole);
            return response;
        } catch (error) {
            console.log('something went wrong in the repository layer');
            throw { error };
        }
    }
}

module.exports = userRepository;