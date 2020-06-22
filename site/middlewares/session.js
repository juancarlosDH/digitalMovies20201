const loginService = require('../services/loginService');

module.exports = (req, res, next) => {

    res.locals.logeado = false;

    if (req.session.logeado) {
        res.locals.logeado = true;
        loginService.restartSessionTime(req);
    }

    next();
}