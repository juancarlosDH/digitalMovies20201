// recuerden instalar con npm: nm install bcrypjs --save
const bcryptjs = require('bcryptjs');

const {check, validationResult, body} = require('express-validator')

const paymentService = require('./../services/paymentService')

module.exports = {

    checkoutForm : function (req, res, next) {
        return res.render('payment/form', {});
    },

    checkout : async function(req, res, next) {

        return paymentService.checkout();
    },

    getPaymentLink : async function(req, res, next) {

        return res.json(paymentService.generatePaymentlink());
    },

    notification : (req, res) => {
        console.log(req);
        paymentService.webhookPayment(req, res);
        return res.status(200);
    },
}