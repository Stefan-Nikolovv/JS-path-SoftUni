const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env');

exports.auth = (req, res, next) => {
    const token = req.cookies['user'];
    
    if(token) {
        jwt.verify(token, SECRET, ((err, verifyUser) => {
            if(err) {
                res.clearCookie('user');
                res.redirect('/auth/login');
            }
            req.user = verifyUser;
            res.locals.user = verifyUser;
            next();
        }));
    }else{
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if(!req.user) {
        return res.render('404', {error: 'You are not authorized!'});
    }
    next();
};

exports.isGuest = (req, res, next) => {
    if(req.user) {
        return res.render('404', {error: 'You are not authorized!'});
    }
    next();
};

    