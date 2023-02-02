const userRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const { response } = require('express');

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

    checkPassword(userPlainPassword, encryptedPassword)
    {
        try {
            return bcrypt.compareSync(userPlainPassword, encryptedPassword);
        } catch (error) {
            console.log('something went wrong in password check');
            throw { error };
        }
    }

    async signin(email, plainPassword) {
        try {
            //step 1 -> fetch the user using email
            const user = await this.UserRepository.getByEmail(email);

            //step 2 -> compare the plain password and encrypted password
            const passwordmatch = this.checkPassword(plainPassword, user.password);

            if (!passwordmatch)
            {
                console.log('password doesnt match');
                throw { error: 'incorrect password' };
            }
            
            //step 3 -> if password matches we will create jwt token for the user
            const jwtToken = this.createToken({ email: user.email, id: user.id });
            return jwtToken;

        } catch (error) {
            console.log('something went wrong in signIn process');
            throw { error };
        }
    }
    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if (!response) {
                console.log('Invalid token');
                throw { error: 'token is invalid or expired' };
            }
            const user = await this.UserRepository.getbyId(response.id);
            if (!user) {
                throw { error: 'no user with corresponding token exists' };
            }
            return user.id;
        } catch (error) {
            console.log('something went wrong in authentication process');
            throw { error };
        }
    }
    isAdmin(userId) {
        try {
            return this.UserRepository.isAdmin(userId);
        } catch (error) {
            console.log('something went wrong in service layer');
            throw { error };
        }
    }
}

module.exports = userService;