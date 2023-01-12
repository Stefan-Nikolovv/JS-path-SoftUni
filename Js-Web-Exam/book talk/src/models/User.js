const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { Salt_Rounds } = require('../config/env'); 

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [4, 'Usernam length is at least 4 characters!']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [10, 'E-Mail length is at least 10 characters!']
    },
    password: {
        type: String,
        required: true,
        minLength: [3, 'Password length is at least 3 characters!']
    }
});

userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, Salt_Rounds)
    .then((hashedPassword) => {
        this.password = hashedPassword;
        next();
    });

});

const User = mongoose.model('User', userSchema);


module.exports = User;