var express = require('express');
var router = express.Router();

/* Renderiza el html  */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
