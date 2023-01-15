async function checkIsOwner(req, res, next) {
    let publication = await publicationService.getOne(req.params.publicationId);

    if (publication.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/publicaiton/${req.params.cryptoId}/details`);
    }
};

async function isOwner(req, res, next) {
    let publication = await publicationService.getOne(req.params.publicationId);

    if (publication.owner == req.user._id) {
        res.redirect(`/publication/${req.params.cryptoId}/details`);
    } else {
        next();
    }
};

