const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const bcryptjs = require('bcryptjs');   

const controller = require('../controllers/api/authController');
const db = require('../database/models');
const authJwt = require('../middlewares/authJwt');

router.post('/signup', [
    check('password').isLength({min:4})
        .withMessage('Invalid Password, min 4 characters'),
    check('email').isEmail().withMessage('Invalid Email').bail(),
    check('email').custom((value, { req }) => {
            return db.User.findOne({where :{email : value}}).then(user => {
                if (user == null) {
                    return Promise.reject('Wrong credentials!');
                } else if (user && !bcryptjs.compareSync(req.body.password , user.password)) {
                    return Promise.reject('Wrong credentials!!');
                }
            })
        }),
],  controller.signup);

router.get('/verify', [ authJwt.verifyToken ], function(req, res) {
    return res.status(200).json({
        message : 'Tuto Bene',
    });
});

module.exports = router;