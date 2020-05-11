const express = require('express');
const router = express.Router();

const controller = require('../controllers/movieController')

router.get('/', controller.index);   

router.get('/new', controller.create); 
router.post('/new', controller.save); 

router.get('/detail/:id', controller.detail);

router.get('/edit/:id', controller.formEdit);
router.put('/edit/:id', controller.edit);

router.delete('/delete/:id', controller.delete);

module.exports = router;
