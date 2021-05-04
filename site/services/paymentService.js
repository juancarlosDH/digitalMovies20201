const mercadopago = require('./../externalServices/mercadoPagoService')

module.exports = {
    checkout : function () {
        //implementaré una estrategia para generar distintos por ejemplo
        //MP, DLocal, Sprite...

        //por ahora solo voy a usar el del MP
        return mercadopago.checkout()
    },

    generatePaymentlink : function () {
        //implementaré una estrategia para generar distintos por ejemplo
        //MP, DLocal, Sprite...

        //por ahora solo voy a usar el del MP
        return mercadopago.createPaymentLink()
    },
    webhookPayment : function (req, res) {
        return mercadopago.webhookNotification(req, res)
    }
}