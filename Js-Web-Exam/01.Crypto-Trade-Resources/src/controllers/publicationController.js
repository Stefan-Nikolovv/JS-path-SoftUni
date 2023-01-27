const router = require("express").Router();

const publicationService = require("../services/publicationService");

const { isAuth } = require('../middlewares/authMiddleware');


router.get("/catalog", async (req, res) => {
  const publications = await publicationService.getAll().lean();
  res.render("catalog", { publications });
});

router.get("/create", isAuth, (req, res) => {
  res.render("create");
});

router.post("/create",isAuth, async (req, res) => {
  const publication = { ...req.body, owner: req.user._id };
  
  try {
    await publicationService.create(publication);
    res.redirect("/publication/catalog");
  } catch (error) {
    res.render("create", { error: error});
  }
});

router.get("/:publicationId/details", async (req, res) => {
  const publication = await publicationService
    .getOne(req.params.publicationId)
    .lean();
    
  const isAuthor = publication.owner._id == req.user?._id;

  const isBougth = publication.buyIt.find(x => x._id == req.user?._id);
  res.render("details", { ...publication, isAuthor, isBougth });
});

router.get("/:publicationId/edit", isAuth, async (req, res) => {

    try {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
        res.render("edit", {...publication});
    } catch (error) {
        res.render("edit", {...publication},{error: error});
    }
});

router.post("/:publicationId/edit", isAuth, async (req, res) => {

    try {
        await publicationService.update(req.params.publicationId, req.body);
        res.redirect(`/publication/${req.params.publicationId}/details`);
    } catch (error) {
        const publication = await publicationService.getOne(req.params.publicationId).lean();
        res.render('edit', {...publication , error: error});
    }
});

router.get("/:publicationId/delete", isAuth, async (req, res) => {
    try {
        await publicationService.delete(req.params.publicationId);
        res.redirect("/publication/catalog");
    } catch (error) {
        res.render('404', { error: error});
    }
});

router.get('/search', async (req, res) => {
    try {
        const publications = await publicationService.getAll().lean();
        res.render('search', { publications })
    } catch (error) {
        res.redirect('/', {error: error})
    }
    
});

router.post('/search', async (req, res) => {
    const { name, payment} = req.body;
    
    try {
        const publication = await publicationService.search(name).lean();
      const publications =  publication.filter(x => x.paymentMethod == payment);
        res.render('search', {publications});
    } catch (error) {
        
    }
});

router.get('/:publicationId/buy', isAuth, async(req, res) => {
    try {
        const publication = await publicationService.getOneDetailed(req.params.publicationId);
        publication.buyIt.push(req.user._id);
        publication.save();
    
        res.redirect(`/publication/${req.params.publicationId}/details`);
    } catch (error) {
        
    }
});



module.exports = router;