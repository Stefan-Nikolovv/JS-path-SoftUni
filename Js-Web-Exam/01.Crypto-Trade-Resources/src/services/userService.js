const User = require('../Model/User');

const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env');

const bcrypt = require('bcrypt');

exports.create = (userData) => User.create(userData);

exports.createToken = (user) => {
    const payload = {_id: user._id, username: user.username, email: user.email};


    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, {expiresIn: '2d'}, (err, decodedToken) => {
            if(err) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
    return promise;
};

exports.login = async (email, password) => {
   const user = await User.findOne({email})

   if(!user) {
    throw ('Email or Password is not correct.');
   }

   const isValid = await bcrypt.compare(password, user.password);

   if(!isValid) { 
    throw ('Email or Password is not correct.');
   };

   return user;
};