const mongoose = require('mongoose');
const { connectionLink } = require('./env');

mongoose.set("strictQuery", true);

exports.dataBase = () => mongoose.connect(connectionLink);