const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
        minLength:[3, 'Firstname should be at least 3 characters.']
    },
    lastName: {
        type: String,
        required: true,
        unique: true,
        minLength:[5, 'Lastname should be at least 3 characters.']
    },
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
        minLength:[4, 'Password should be at least 4 characters.']
    },
    myPosts: [{
        type: mongoose.Types.ObjectId,
        ref: "postModel"
    }]
});

userSchema.pre("save", function(next){
    bcrypt.hash(this.password, Salt_Rounds)
    .then((hashedPass) => {
        this.password = hashedPass
        next();
    });

});

const User = mongoose.model("User", userSchema);

module.exports = User;