module.exports = function authMdw (req, res, next) {

    if (req.session.user && req.session.admin) {
		next();  
    }
    return res.redirect('/');
    
}