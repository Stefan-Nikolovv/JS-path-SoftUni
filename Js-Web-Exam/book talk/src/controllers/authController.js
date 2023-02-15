const User = require('../models/User');

const router = require('express').Router();

const userService = require('../services/authService');

const { errorHelper } = require('../utils/errorHelpers');

const {isAuth, isGuest} = require('../middlewares/authMiddleWare');


router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userService.login(email, password);
        const token = await userService.createToken(user);
        res.cookie('user', token, {httpOnly: true});
        res.redirect('/')
    } catch (error) {
        res.render('login', {error: errorHelper(error)})
    }

});

router.get('/register', isGuest, (req, res) => {
    res.render('register')
});

router.post('/register', isGuest, async (req, res) => {
    const {email, username,password, repassword} = req.body;
    
    if(password != repassword){
        res.render('register', {error: 'Password missmatch!'})
        }
    try {
      const createdUser = await userService.create({email, username, password, repassword});
    
      const token = await userService.createToken(createdUser);

      res.cookie('user', token, {httpOnly: true});
      res.redirect('/');

    } catch (error) {
        res.render('register', {error: errorHelper(error)})
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
})



module.exports = router;