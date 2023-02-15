const User = require("../models/User");

const jwt = require('jsonwebtoken');

const bcrypt =require('bcrypt');

const { SECRET } = require('../config/env');

exports.createAccount = (userData) => User.create(userData);

exports.createToken = (user) => {
    const payload = { _id: user._id, email: user.email};
    const promise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, {expiresIn: '2d'}, (err, decodedToken) => {
            if(err){
                return reject(err);
            }
            resolve(decodedToken)
        });
    });
    return promise;
};

exports.login = async (email, password) => {
    const user = await User.findOne({email});
    console.log(user);
    if(!user){
        throw new Error ('Email or password is not correct!');
    };

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error('Email or password is not correct!');
    };

    return user;
};

exports.author = (userId) => User.findById(userId);

exports.getOneByEmail = (email) => User.findOne({email: email});