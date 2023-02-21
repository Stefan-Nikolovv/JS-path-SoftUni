const User = require('../models/User');
const jwt = require('jsonwebtoken');
const{ SECRET } = require('../config/env');
const bcrypt = require('bcrypt');


exports.createAccount = (userData) => User.create(userData);

exports.createToken = (user) => {
    const payload = { _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName};
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, {expiresIn: '2d'}, (err, signToken) => {
            if(err){
                return reject(err)
            };
            resolve(signToken);
        });
    });
    return promise;
};

exports.login = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error ('Email or password is not correct!');
    };

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Email or password is not correct!');
    };

    return user;
};

exports.getMyPosts = (email) =>
   User.findOne({ email}).populate("myPosts");
  
