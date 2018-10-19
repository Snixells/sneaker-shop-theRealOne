var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')
var csrfProtection = csrf();

router.use(csrfProtection);

// var WordSchema = require('../models/word');

/* GET home page. */
router.get('/', function (req, res, next) {
  var messages = req.flash('error');
  res.render('configurator/index', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.get('/configurator', function (req, res, next) {
  res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator" });
});

router.post('/configurator', function (req, res, next) {
  return res.render('pages/checkOrder', { configuration: req.body, csrfToken: req.csrfToken() });
});

router.post('/submit-configuration', function (req, res, next) {
  return res.render('pages/configurationSent', { configuration: req.body });
});

router.get('/analytics', function (req, res, next) {
  res.render('pages/analytics', { title: "Impressum" });
});


router.get('/registrieren', function (req, res, next) {
  var messages = req.flash('error');
  res.render('pages/register', { csrfToken: req.csrfToken(), title: "Registrierung", messages: messages, hasErrors: messages.length > 0 });
});

router.post('/registrieren', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/registrieren',
  failureFlash: true
}));

router.post('/einloggen', passport.authenticate('local.signin', {
  successRedirect: '/loggedin',
  failureRedirect: '/',
  failureFlash: true
}));

router.get('/loggedin', function (req, res, next) {
  //var user = req.params.
  res.render('pages/loggedin');
});

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
})

//Testweise -->
router.get('/profile', isLoggedIn, function (req, res, next) {
  res.render('pages/profile');
});


router.get('/contact', function (req, res, next) {
  res.render('pages/contact', { title: "Kontakt" });
});

router.get('/disclaimer', function (req, res, next) {
  res.render('pages/disclaimer', { title: "Datenschutz" });
});

router.get('/imprint', function (req, res, next) {
  res.render('pages/imprint', { title: "Impressum" });
});

module.exports = router;

// SECURITY
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
