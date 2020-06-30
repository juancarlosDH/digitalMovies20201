const loginService = require('../services/loginService');

module.exports = (req, res, next) => {

    res.locals.logeado = false;

    if (req.session.logeado) {
        res.locals.logeado = true;
        res.locals.user = req.session.user;
        loginService.restartSessionTime(req);
    }

    next();
}