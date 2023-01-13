const Crypto = require('../Model/Crypto');

exports.create = (publication) => Crypto.create(publication);

exports.getAll = () => Crypto.find();

exports.getOne = (publicationId) => Crypto.findById(publicationId);

exports.getOneDetailed = (publicationId) => Crypto.findById(publicationId).populate('buyIt')