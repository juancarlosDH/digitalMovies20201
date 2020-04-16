module.exports = {
    index : function(req, res, next) {
        res.render('index', { title: 'Digital Movies' });
    },
    faqs : (req, res) => {
        res.send('Aqui van las preguntas frecuentes')
    },
    contact : (req, res) => {
        res.send('formulario de contacto')
    }
}