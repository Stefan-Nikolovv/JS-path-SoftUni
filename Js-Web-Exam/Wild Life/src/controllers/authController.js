const router = require("express").Router();
const authService = require('../services/authService');


router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const loggedUser = await authService.login(email, password);
        const token = await authService.createToken(loggedUser);
        res.cookie('user', token, {httpOnly: true});
        res.redirect('/catalog');
    } catch (error) {
        res.render('login', {error: error});
    };
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async(req, res) => {
    const {firstName, lastName, email, password, repeatPassword} = req.body;
    try {
        if(password !== repeatPassword){
            throw new Error("Password missmatch!");
        };

        const registerUser = await authService.createAccount({firstName, lastName, email, password});
        const token = await authService.createToken(registerUser);
        res.cookie('user', token, {httpOnly: true});
        res.redirect('/catalog')
    } catch (error) {
        res.render('register', {error: error})
    };
});

router.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/');
})



module.exports = router;