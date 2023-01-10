const User = require('../models/User');

const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/env');
const bcrypt = require('bcrypt');

exports.create = (userData) => User.create(userData);

exports.createToken = (user) => {
    const payload = { _id: user._id, username: user.username, email: user.email};
   

    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, {expiresIn: '2d'}, (err, decodedToken) => {
            if(err) {
                return reject(err);
            }
            resolve(decodedToken)
        });
    });
    return promise;
};

exports.login = async (email, password) => {
    const user = await User.findOne({email});
  
    if(!user) {
        throw new Error('Email or password is not correct!');
    };

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        throw new Error('Email or password is not correct!');
    };
    
    return user;
}