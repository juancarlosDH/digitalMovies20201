
module.exports = (req, res, next) => {

    //cookie sencilla de mantenerme logeado
    if (req.cookies['_rememberUser_']) {
        //TO_DO verificar el token
        
        //lo logeo si la cookie esta buena
        req.session.logeado = true;
        //remember check in DB
        req.session.userEmail = req.cookies['_rememberUser_'];
    }

    next();
}