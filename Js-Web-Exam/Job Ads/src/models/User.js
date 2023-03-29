const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const { Salt_Rounds } = require('../config/env');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
              return /(?<name>[A-Za-z]+)@(?<domain>[a-z]+).(?<extention>[a-z]+)/g.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
          },
          required: [true, 'User phone number required']
        
    },
    password: {
        type: String,
        required: true,
        unique: true,
        min: [5, 'Password length is at least 10 characters!']
    },
    description: {
        type: String,
        required: true,
        maxLength: [40, 'Descripiton length is at least 3 characters!'],

    },
    myJobs: {
        type: mongoose.Types.ObjectId,
        ref: 'Job'  
    }
});

userSchema.pre("save", function(next){
    bcrypt.hash(this.password, Salt_Rounds)
    .then((hashedPass) => {
        this.password = hashedPass;
        next();
    });

});

const User = mongoose.model("User", userSchema);

module.exports = User;