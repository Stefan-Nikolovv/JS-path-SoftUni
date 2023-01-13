const router = require('express').Router();

const userService = require('../services/userService');

router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', async (req, res) => {
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

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
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

router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
});


module.exports = router;