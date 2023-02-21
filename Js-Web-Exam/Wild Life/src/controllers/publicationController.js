const router = require("express").Router();
const publicationService = require('../services/publicationService');
const authPublication = require('../services/authService');



router.get('/create',  (req, res) => {
    res.render('create');
});

router.post('/create', async(req, res) => {
    const {title, keyword, location, date, image, description} =  req.body;

    try {
        await publicationService.createPublication({title, keyword, location, date, image, description});
        const userData = await authPublication.getMyPosts(req.user.email)
        console.log(userData);

        res.redirect('/publication/catalog');

    } catch (error) {
        res.render('create', {error: error});
    }
});

router.get('/catalog',  async(req, res) =>{
        const publications = await publicationService.getAll().lean();
        res.render('catalog', {publications});
});

router.get('/:publicationId/details', async(req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.publicationId).lean();
    console.log(publication);
    res.render('details', {...publication});
});

router.get('/:publicationId/edit', async(req, res) => {
    try {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
        res.render('edit', {...publication});
    } catch (error) {
        res.render('edit', {error: error});
    };
});

router.post('/:publicationId/edit', async(req, res) => {

    try {
        await publicationService.update(req.params.publicationId, req.body).lean();
        res.redirect(`/publication/${req.params.publicationId}/details`)
    } catch (error) {
        res.render('edit', {error: error});
    };
});

router.get('/:publicationId/delete', async(req, res) => {
    try {
        await publicationService.delete(req.params.publicationId);
        res.redirect('/publication/catalog')
    } catch (error) {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
        res.redirect(`/publication/${req.params.publicationId}/details`, {...publication , error: error})
    };
});

router.get('/myposts', async(req, res) => {
    try {
        const publications = await publicationService.getAll();
       
    } catch (error) {
        
    }
})

module.exports = router;