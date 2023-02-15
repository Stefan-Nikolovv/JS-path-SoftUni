const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    headline:{
        type: String,
        required: true,
        minLength:[4, 'Headline should be a minimum of 4 characters long!']
    },
    location: {
        type: String,
        required: true,
        minLength:[8, 'Location should be a minimum of 8 characters long!']
    },
    companyname: {
        type: String,
        required: true,
        minLength:[3, 'Company name should be at least 3 characters!']
    },
    companydescription: {
        type: String,
        required: true,
        maxLength:[40, 'Company description should be a maximum of 40 characters long!']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'  
    },
    usersApplied:[{
        type: mongoose.Types.ObjectId,
        ref: 'User' 
    }]

});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;