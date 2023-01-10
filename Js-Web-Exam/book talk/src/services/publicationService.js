const Publication  = require('../models/Publication');

exports.create = (publication) => Publication.create(publication);

exports.getAll = () => Publication.find();

exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('wishList').populate('owner');

exports.getOne = (publicationId) => Publication.findById(publicationId);

exports.update = (publicationId, publicationData) => Publication.findOneAndUpdate({_id: publicationId}, { $set: publicationData }, {runValidators: true});

exports.delete = (publicationId) => Publication.findByIdAndDelete({_id: publicationId});

exports.userPublication = (userId) => Publication.find({wishList: userId});