const router = require('express').Router();

const publicationService = require('../services/publicationService');

const{ isAuth, isGuest } = require('../middlewares/authMIddleware');
const userService = require('../services/userService');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
});

router.post('/create', isAuth,  async (req, res) => {
    const publication = {...req.body, author: req.user._id};
    try {
        await publicationService.createPublication(publication);
        res.redirect('/publication/catalog');
    } catch (error) {
        res.render('create', {error: error});
    }

});

router.get("/:publicationId/edit", isAuth, async (req, res) => {
    try {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
        res.render('edit', { ...publication })
    } catch (error) {
        res.render('edit', {error: error})
    }
});

router.post("/:publicationId/edit", isAuth,async (req, res) =>{
    try {
        await publicationService.update(req.params.publicationId, req.body);
        res.redirect(`/publication/${req.params.publicationId}/details`)
    } catch (error) {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
        res.render('edit', {...publication , error: error})
    }
});

router.get("/:publicationId/details",async (req, res) => {
    try {
        
        const publication = await publicationService.getOneDetailed(req.params.publicationId).lean();
        const author = await userService.author(publication.author);
        const usersApplied =   publication.usersApplied.length;
        const isOwner = publication.author._id == req.user?._id;
        const isUserIsApplied = publication.usersApplied.some(x => x._id == req.user?._id);
        const  usersThatIsApplied = publication.usersApplied
        res.render('details', { ...publication, ...author, isOwner, usersApplied, isUserIsApplied, usersThatIsApplied})
    } catch (error) {
        
    }
});

router.get('/:publicationId/apply', isAuth, async(req, res) => {

        const publication = await publicationService.getOneDetailed(req.params.publicationId);
        publication.usersApplied.push(req.user._id);
        publication.save();
        res.redirect(`/publication/${req.params.publicationId}/details`);

})

router.get('/:publicationId/delete', isAuth, async (req, res) => {
    try {
        await publicationService.delete(req.params.publicationId);
        res.redirect('/publication/catalog')
    } catch (error) {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
        res.redirect(`/publication/${req.params.publicationId}/details`, {...publication , error: error})
        
    }
})

router.get("/details", (req, res) => {
    res.render("details")
});

router.get("/edit", isAuth, (req, res) => {
    res.render("edit");
});

router.get("/catalog", async(req, res) => {
    const publication =  await publicationService.getAll().lean();
    res.render('catalog', {publication})
});

router.get('/search', (req, res) => { 
        res.render('search')
});

router.post('/search', async(req, res) => {
    
    try {
        const  searchedEmail  = {...req.body};
        const emailToLowerCase = (searchedEmail.search).toLowerCase()
        const publications = await publicationService.getAll().lean();
        const userEmail = await userService.getOneByEmail(emailToLowerCase);
        const ownerPublications = publications.filter(x => (x.author._id).toString() === (userEmail?._id).toString())
       res.render('search', {ownerPublications});
    } catch (error) {
        res.render('search');
    }
})

module.exports = router