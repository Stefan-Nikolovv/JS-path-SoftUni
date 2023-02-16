const Publication = require('../models/Publication');

exports.createPublication = (publicationData) => Publication.create(publicationData);