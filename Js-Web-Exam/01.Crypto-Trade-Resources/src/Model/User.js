const mongoose = require('mongoose');

const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'Incorrect Username of Email!'],
        minLength: [5, 'Username should be at least five characters.'],
    },
    email: {
        type: String,
        required: true,
        minLength: [10, 'Email should be at least ten characters.'],
        unique: [true, 'Incorrect Username of Email!'],
    }, 
    password: {
        type: String,
        required: true,
        minLength: [4, 'Password should be at least four characters.'],
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