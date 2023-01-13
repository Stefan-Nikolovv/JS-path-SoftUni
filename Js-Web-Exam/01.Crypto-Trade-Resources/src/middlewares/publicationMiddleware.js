
exports.isPublicationAuthor = (req, res, next) => {
    if(req.publication.owner != req.user._id){
        return next({message: 'You are not authorized!'});

    }
    next();
}