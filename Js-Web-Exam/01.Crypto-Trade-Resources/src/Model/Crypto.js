const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name should be at least five characters'],
    },
    image: {
        type: String,
        required: true,
        
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price should be possitive number.'],
    },
    cryptoDescription: {
        type: String,
        required: true,
        minLength: [10, 'Description should be at least ten characters'],
    },
    paymentMethod: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: true
    },
    buyIt: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

cryptoSchema.path('image').validate(function(image){
    return image.startsWith('http');
}, 'Image url should be a link');


const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;

