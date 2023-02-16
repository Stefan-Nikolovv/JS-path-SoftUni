const mongoose = require('mongoose');



const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength:[6, 'Title should be a minimum of 6 characters long!']
    },
    keyword:{
        type: String,
        required: true,
        minLength:[6, 'Keyword should be a minimum of 6 characters long!']
    },
    location :{
        type: String,
        required: true,
        max:[15, 'Locaton should be a max of 15 characters long!']
    },
    date: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
              return /(?:0[1-9]|[12][0-9]|3[01])[-/.](?:0[1-9]|1[012])[-/.](?:19\d{2}|20[01][0-9]|20[02][0-9])/gm.test(v);
            },
            message: props => `${props.value} is not a valid date format!`
          },
          required: [true, 'Date is required'] 
    },
    image: {
        type: String,
        required: [true, "Image is reqired!"],
    },
    description: {
        type: String,
        required: true,
        minLength:[8, 'Description should be a minimum of 8 characters long!']
    },
    author: {
        type: mongoose.Types.ObjectId,
    },
    voteOfPost: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    ratingOfPost:{
        role: { type: Number, default: 0 }
    }
});

publicationSchema.path('image').validate(function(image) {
    return image.startsWith('http');
}, 'Image url should be a link');

const Publication = mongoose.model('Publication', publicationSchema);


module.exports = Publication;