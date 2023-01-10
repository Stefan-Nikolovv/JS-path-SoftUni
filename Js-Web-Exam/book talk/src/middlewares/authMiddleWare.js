const jtw = require('jsonwebtoken');
 const { SECRET } = require('../config/env');
const { errorHelper } = require('../utils/errorHelpers');

 exports.auth = (req, res, next) => {
    const token = req.cookies['user'];

    if(token) {
        jtw.verify(token, SECRET, ((err, decodedToken) => {
            if(err) {
                res.clearCookie('user');
                res.redirect('/auth/login');
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        }));
    }else {
        next();
    }
 };

 exports.isAuth = (req, res, next) => {
    if(!req.user) {
        return  res.render('404', { error: errorHelper('You are not authorized!')});
    }
    next();
 }

 exports.isGuest = (req, res, next) => {
    if(req.user) {
        return  res.render('404', { error: errorHelper('You are not authorized!')});
    }
    next();
 }