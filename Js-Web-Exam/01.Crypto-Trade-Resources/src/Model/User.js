const mongoose = require('mongoose');

const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, 
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then((cryptedPasword) => {
        this.password = cryptedPasword;
        next();
    });
});


const User = mongoose.model('User', userSchema);

module.exports = User;