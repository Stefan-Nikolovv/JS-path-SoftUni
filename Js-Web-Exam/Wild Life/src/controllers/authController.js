const router = require("express").Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async(req, res) => {
    const {firstName, lastName, email, password, repeatPassword} = req.body;
    console.log(firstName, lastName, email, password, repeatPassword)
    try {
        if(password !== repeatPassword){
            throw new Error("Password missmatch!");
        };

        const registerUser = await authService.createAccount({firstName, lastName, email, password});
        const token = await authService.createToken(registerUser);
        
    } catch (error) {
        
    }
})

module.exports = router;