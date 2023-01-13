const router = require('express').Router();

const publicationService = require('../services/publicationService');

const { preloadPublication, isPublicationAuthor } = require('../middlewares/publicationMiddleware');

router.get('/catalog', async (req, res) => {
    const publications = await publicationService.getAll().lean();
    res.render('catalog', {publications});
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const publication = {...req.body, owner: req.user._id};
    console.log(req.body)
    try {
        await publicationService.create(publication);
        res.redirect('/publication/catalog');
    } catch (error) {
        res.render('create', {error: error});
    };
});


 const preloadPublication = async (req, res) => {
    const publication = await publicationService.getOne(req.params.publicationId).lean();
    console.log(publication)
    res.publication = publication;
     next();
};

router.get('/:pulicationId/details', 
preloadPublication, 
isPublicationAuthor, 
async (req, res) => {
    const publication = 
    await publicationService.getOne(req.params.pulicationId).lean();
    res.render('details', {...publication, isPublicationAuthor});
});





module.exports = router;