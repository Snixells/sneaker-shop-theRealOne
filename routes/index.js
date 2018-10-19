var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')
var csrfProtection = csrf();

router.use(csrfProtection);

// var WordSchema = require('../models/word');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('configurator/index');
});

router.get('/configurator', function (req, res, next) {
  res.render('configurator/configurator', { title: "Konfigurator" });
});

router.get('/analytics', function (req, res, next) {
  res.render('pages/analytics', { title: "Impressum" });
});


router.get('/registrieren', function (req, res, next) {
  res.render('pages/register', {csrfToken: req.csrfToken(), title: "Registrierung" });
});

router.post('/registrieren',passport.authenticate('local.signup',{
  successRedirect: '/profile',
  failureRedirect:'/registrieren',
  failureFlash: true
}));

//Testweise -->
router.get('/profile', function (req, res, next) {
  res.render('pages/profile');
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