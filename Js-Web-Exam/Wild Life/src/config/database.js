const mongoose = require('mongoose');
const { connectionLINK } = require('./env');

mongoose.set('strictQuery', true);

exports.dataBase = () => mongoose.connect(connectionLINK);
