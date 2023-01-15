const router = require('express').Router();

const userService = require('../services/userService');

const { isAuth, isGuest } = require('../middlewares/authMiddleware');

router.get('/register', isGuest, (req, res) => {
    res.render('register')
});

router.post('/register', isGuest, async (req, res) => {
    const {username, email, password, repassword} = req.body;
    
    if(password !== repassword){
        res.render('register',  {error: 'Password missmatch!'});
    }
    try {
        const user = await userService.create({username, email, password});
        const token =  await userService.createToken(user);
        res.cookie('user', token, {httpOnly: true});
        res.redirect('/');
    } catch (error) {
        res.render('register', {error: error});
    }

});

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await userService.login(email, password);
        const token = await userService.createToken(user);
        res.cookie('user', token, {httpOnly: true});
        res.redirect('/');
    } catch (error) {
        res.render('login', {error: error});
    };
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});


module.exports = router;