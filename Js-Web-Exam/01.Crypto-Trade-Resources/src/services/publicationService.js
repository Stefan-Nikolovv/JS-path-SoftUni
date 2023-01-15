const Crypto = require('../Model/Crypto');

exports.create = (publication) => Crypto.create(publication);

exports.getAll = () => Crypto.find();

exports.getOne = (publicationId) => Crypto.findById(publicationId);

exports.getOneDetailed = (publicationId) => Crypto.findById(publicationId).populate('buyIt').populate('owner');

exports.update = (publicationId, publicationData) => Crypto.findOneAndUpdate({_id: publicationId}, { $set: publicationData }, {runValidators: true});

exports.delete = (publicationId) => Crypto.findByIdAndDelete({_id: publicationId});

exports.search = (name) => Crypto.find({name: name});