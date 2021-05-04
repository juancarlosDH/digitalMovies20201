const express = require('express');
const router = express.Router();
//me traigo muylter para trabajar con subida de archivos
const multer = require('multer');
const path = require('path');

const controller = require('../controllers/paymentController')

router.get('/checkout', controller.checkoutForm);

router.post('/checkout', controller.checkout);

router.post('/get-payment-link', controller.getPaymentLink);

router.post('/checkout/notification', controller.notification);

router.get('/payment/success', function(req, res) {
    return res.send(req);
});
router.get('/payment/pending', function(req, res) {
    return res.send(req);
});
router.get('/payment/error', function(req, res) {
    return res.send(req);
});

module.exports = router;
