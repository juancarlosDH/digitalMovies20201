const express = require('express');
const router = express.Router();

router.post('/addFavourite', function (req, res) {
    return res.send('{"hola":"gente"}');
});

module.exports = router;