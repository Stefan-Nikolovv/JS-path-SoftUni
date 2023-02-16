const router = require("express").Router();
const publicationService = require('../services/publicationService');


router.get('/catalog', (req, res) => {
    res.render('catalog')
});

router.get('/create',  (req, res) => {
    res.render('create');
});

router.post('/create', async(req, res) => {
    const {title, keyword, location, date, image, description} =  req.body;

    try {
        await publicationService.createPublication({title, keyword, location, date, image, description});
        
        res.redirect('/publication/catalog');

    } catch (error) {
        res.render('create', {error: error});
    }
});



module.exports = router;