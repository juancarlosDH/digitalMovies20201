const axios = require('axios')
require('dotenv').config();


const accessToken = process.env.MP_ACCESS_TOKEN

const mercadoPagoUrl = process.env.MP_CHECKOUT_URL; 

module.exports = {
    checkout : (req, res) => {

        var payment_data = {
          transaction_amount: Number(100),
          token: req.body.token,
          description: req.body.description,
          installments: Number(req.body.installments),
          payment_method_id: req.body.paymentMethodId,
          issuer_id: req.body.issuer,
          payer: {
            email: req.body.email,
            identification: {
              type: req.body.docType,
              number: req.body.docNumber
            }
          }
        };
      
        mercadopago.payment.save(payment_data)
          .then(function(response) {
            res.status(response.status).json({
              status: response.body.status,
              status_detail: response.body.status_detail,
              id: response.body.id
            });
          })
          .catch(function(error) {
            res.status(response.status).send(error);
          });
    },

    createPaymentLink : async function () {

        const url = `${mercadoPagoUrl}/preferences?access_token=${accessToken}`; 
        //console.log(url)

        const items = [
            {
                id: "1234", 
                // id interno (del negocio) del item
                title: 'El Negocio', 
                // nombre que viene de la prop que recibe del controller
                description: "Dispositivo movil de Tienda e-commerce",
                // descripción del producto
                picture_url: "https://courseit.com.ar/static/logo.png", 
                // url de la imágen del producto
                category_id: "1234",  
                // categoría interna del producto (del negocio)
                quantity: parseInt(1), 
                // cantidad, que tiene que ser un intiger
                currency_id: "ARS", 
                // id de la moneda, que tiene que ser en ISO 4217
                unit_price: parseFloat(1000)
                // el precio, que por su complejidad tiene que ser tipo FLOAT
            }
        ];

        const preferences = { 
            // declaramos las preferencias de pago
            items, 
            // el array de objetos, items que declaramos más arriba
            external_reference: "referencia del negocio", 
            // referencia para identificar la preferencia, puede ser practicamente cualquier valor
            payer: { 
                // información del comprador, si estan en producción tienen que //traerlos del request
                //(al igual que hicimos con el precio del item) 
                name: "TETE6007146",
                surname: "qatest194",
                email: "test_user_53858229@testuser.com",
                // si estan en sandbox, aca tienen que poner el email de SU usuario de prueba
                phone: {
                    area_code: "11",
                    number: "22223333"
                },
                address: {
                    zip_code: "1111",
                    street_name: "False",
                    street_number: "123"
                }
            }, 
            payment_methods: { 
                // declaramos el método de pago y sus restricciones
                excluded_payment_methods: [ 
                // aca podemos excluir metodos de pagos, tengan en cuenta que es un array de objetos
                    { id: "amex" }
                ],
                excluded_payment_types: [{ id: "atm" }], 
                // aca podemos excluir TIPOS de pagos, es un array de objetos
                installments: 6, 
                // limite superior de cantidad de cuotas permitidas
                default_installments: 6 
                // la cantidad de cuotas que van a aparecer por defecto
            }, 
            back_urls: {
                // declaramos las urls de redireccionamiento
                success: "http://cfe632946f25.ngrok.io/payment/success", 
                // url que va a redireccionar si sale todo bien
                pending: "http://cfe632946f25.ngrok.io/payment/pending", 
                // url a la que va a redireccionar si decide pagar en efectivo por ejemplo
                failure: "http://cfe632946f25.ngrok.io/payment/error" 
                // url a la que va a redireccionar si falla el pago
            }, 
            notification_url: "http://cfe632946f25.ngrok.io/checkout/notification", 
            // declaramos nuestra url donde recibiremos las notificaciones
            auto_return: "approved" 
            // si la compra es exitosa automaticamente redirige a "success" de back_urls
        };

        //console.log(preferences)

        try {
            const request = await axios.post(url, preferences, {
            // hacemos el POST a la url que declaramos arriba, con las preferencias
              headers: { 
            // y el header, que contiene content-Type
                "Content-Type": "application/json"
              }
            });

            console.log(request)
      
            return request.data; 
            // devolvemos la data que devuelve el POST
          } catch (e) {
            console.log(e);
            return e;
            // mostramos error en caso de que falle el POST
          }
    },

    webhookNotification : function (req, res) {
        /*
        if (req.method === "POST") { 
            let body = ""; 
            req.on("data", chunk => {  
              body += chunk.toString();
            });
            req.on("end", () => {  
              console.log(body, "webhook response"); 
              res.end("ok");
            });
          }
          return res.status(200);
        */
       return true;
    }
}