var express = require('express');
var router = express.Router();
// var WordSchema = require('../models/word');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('configurator/index');
});

router.get('/configurator', function (req, res, next) {
  res.render('configurator/configurator', { title: "Konfigurator" });
});

router.get('/registrieren', function (req, res, next) {
  res.render('pages/register', { title: "Registrierung" });
});

router.get('/contact', function (req, res, next) {
  res.render('pages/contact', { title: "Kontakt" });
});

router.get('/disclaimer', function (req, res, next) {
  res.render('pages/disclaimer', { title: "Datenschutz"});
});

router.get('/imprint', function (req, res, next) {
  res.render('pages/imprint', { title: "Impressum" });
});


module.exports = router;