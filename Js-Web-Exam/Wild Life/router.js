const router = require('express').Router();

const homeController = require('./src/controllers/homeController');
const authController = require('./src/controllers/authController')
router.use('/', homeController);
router.use('/auth', authController);

module.exports = router;