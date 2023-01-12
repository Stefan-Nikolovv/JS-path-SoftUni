const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is reqired!"],
        minLength: [2,'Title length is at least 2 characters!']
    },
    author: {
        type: String,
        required: [true, "Author is reqired!"],
        minLength: [5,'Author length is at least 5 characters!']
    },
    imageUrl: {
        type: String,
        required: [true, "Image is reqired!"],
        minLength: [3, 'Image length is at least 3 characters!']
    },
    bookReview: {
       type: String,
        required: [true, "Review is reqired!"],
        minLength: [10, 'Review length is at least 10 characters!']
    },
    genre: {
        type: String,
        required: [true, "Genre is reqired!"],
    },
    stars: {
        type: Number,
        required: [true, "Stars is reqired!"],
        min: [1, 'Should be number between 1 and 5'],
        max: [5, 'Should be number between 1 and 5'],
    },
    wishList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

publicationSchema.path('imageUrl').validate(function(imageUrl) {
    return imageUrl.startsWith('http');
}, 'Image url should be a link');


const Publication = mongoose.model('Publication', publicationSchema);


module.exports = Publication;