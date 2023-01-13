const mongoose = require('mongoose');
const { CONNECTION_LINK } = require('./env');
mongoose.set("strictQuery", true);

exports.dataBase = () => mongoose.connect(CONNECTION_LINK);