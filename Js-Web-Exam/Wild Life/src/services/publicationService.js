const Publication = require('../models/Publication');

exports.createPublication = (publicationData) => Publication.create(publicationData);

exports.getAll = () => Publication.find();

exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('voteOfPost').populate('ratingOfPost');

exports.getOne = (publicationId) => Publication.findById(publicationId);

exports.update = (publicationId, publicationData) => Publication.findOneAndUpdate({_id: publicationId}, { $set: publicationData }, {runValidators: true});

exports.delete = (publicationId) => Publication.findOneAndDelete(publicationId);