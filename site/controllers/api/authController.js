// recuerden instalar con npm: nm install bcrypjs --save
require('dotenv').config();
var jwt = require("jsonwebtoken");
var bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');

const db = require('../../database/models');
const loginService = require('../../services/loginService');
const tokenService = require('../../services/tokenService');

const User = db.User;

module.exports = {
    signup : (req, res) => {
        let validation = validationResult(req);

        if (!validation.isEmpty()) {
            const err = validation.mapped();
            const errors = [];
            for(let field in err) {
                errors.push(err[field].msg);
            };
            return res.status(400).send({
                accessToken:  null,
                errors : errors
            });
        }
        
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(400).send({
                    accessToken:  null,
                    errors : {
                        message: ["Wrong Credentials!!!"]
                    }
                });
            }
        
            var passwordIsValid = bcryptjs.compareSync(
                req.body.password,
                user.password
            );
        
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken:  null,
                    errors : {
                        message: [ "Wrong Credentials!!!!" ]
                    },
                });
            }
        
            var token = jwt.sign({ id: user.id }, (process.env.JWT_SECRET ? process.env.JWT_SECRET : 'NO_SET_JWT') , {
                expiresIn: 60*60*24 // 24 hours
            });
        

            res.status(200).send({
                id: user.id,
                email: user.email,
                accessToken: token
            });
        })
        .catch(err => {

            console.log(err);
            res.status(500).send({
                //must log in file the error
                accessToken:  null,
                errors : {
                    message: [ "Error: contact us" ]
                },
            });
        });
    },

}