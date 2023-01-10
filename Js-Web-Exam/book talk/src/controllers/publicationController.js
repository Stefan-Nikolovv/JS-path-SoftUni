const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleWare');
const publicationService = require('../services/publicationService');

const errorHelper = require('../utils/errorHelpers');


router.get('/catalog', async (req, res) => {
    const publications = await publicationService.getAll().lean();
    res.render('catalog', {publications});
})


router.get('/create', isAuth, (req, res) => {
    res.render('create')
});

router.post('/create', isAuth, async (req, res) => {
    const publication = {...req.body, owner: req.user._id};
    try {
     await publicationService.create(publication);
        res.redirect('/publication/catalog');
    } catch (error) {
        res.render('create', {error: errorHelper(error)});
    }
});

router.get('/:publicationId/details', async (req, res) => {

        const publication = await publicationService.getOneDetailed(req.params.publicationId).lean();
        const isOwner = publication.owner._id == req.user?._id;
        const isRead = publication.wishList.some(x => x._id == req.user?._id)
        res.render('details', {publication, isOwner, isRead});
});

router.get('/:publicationId/edit', isAuth, async (req, res) => {
    try {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
    res.render('edit', { ...publication });
    } catch (error) {
        res.render('edit', {error: errorHelper(error)})
    }
    
});

router.post('/:publicationId/edit', isAuth, async (req, res) => {
  
    try {
        await publicationService.update(req.params.publicationId, req.body)
        res.redirect(`/publication/${req.params.publicationId}/details`)
    } catch (error) {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
        res.render('edit', {...publication , error: errorHelper(error)})
    }
});

router.get('/:publicationId/delete', isAuth, async (req, res) => {
    try {
         await publicationService.delete(req.params.publicationId);
         res.redirect('/publication/catalog');
        
    } catch (error) {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
        res.redirect(`/publication/${req.params.publicationId}/details`, {...publication , error: error})
    }
});

router.get('/:publicationId/wish', isAuth,  async (req, res) => {
    const publication  =  await publicationService.getOneDetailed(req.params.publicationId);
        publication.wishList.push(req.user._id);
        publication.save();
    res.redirect(`/publication/${req.params.publicationId}/details`);
});

router.get('/profile', isAuth, async (req, res) => {
    const user = res.locals.user.email;
    
    const publications = await publicationService.userPublication(req.user._id).lean();
    
    res.render('profile', {user, publications})
})


module.exports = router;