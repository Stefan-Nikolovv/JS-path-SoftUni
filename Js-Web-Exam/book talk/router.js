const router = require('express').Router();

const homeController = require('.//src/controllers/homeController');
const authController = require('.//src/controllers/authController');
const publicationController = require('.//src/controllers/publicationController');


router.use('/', homeController);
router.use('/auth', authController);
router.use('/publication', publicationController);

router.all("*", (req, res) => {
    res.render('404');
});


module.exports = router;