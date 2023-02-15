const router = require("express").Router();



const userService = require('../services/userService')

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const loggedUser =  await userService.login(email, password);
        const token = await userService.createToken(loggedUser);
        res.cookie("user", token, {httpOnly: true});
        res.redirect('/');
    } catch (error) {
        res.render("login", {error: error});
    }
});


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const {email, password, repassword, description} =  req.body;
    if(password != repassword){
        res.render('register', {error: 'Password missmatch!'})
        }

    try {
        const createdUser = await userService.createAccount({email, password, description});
        const token = await userService.createToken(createdUser);
        res.cookie("user", token, {httpOnly: true});
        res.redirect('/');

    } catch (error) {
        res.render('register', {error: error})
    }
});

    router.get('/logout', (req, res) => {
        res.clearCookie('user');
        res.redirect('/');
    });


module.exports = router;