const Job = require('../models/Job');

exports.createPublication = (publicationData) => Job.create(publicationData);

exports.getAll = () => Job.find();

exports.getOne = (publicationId) => Job.findById(publicationId);

exports.update = (publicationId, publicationData) => Job.findOneAndUpdate({_id: publicationId}, {$set:  publicationData}, {runValidators: true});

exports.getOneDetailed = (publicationId) => Job.findById(publicationId).populate('author').populate('usersApplied');

exports.delete = (publicationId) => Job.findByIdAndDelete(publicationId);
