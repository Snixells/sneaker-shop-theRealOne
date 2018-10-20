var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport')
var csrfProtection = csrf();
var MetaData = require('../models/metadata');
var MetaDataorders = require('../models/metadataorders');
var Order = require('../models/orders');

router.use(csrfProtection);

/* GET home page. */
router.get('/', function (req, res, next) {
  var messages = req.flash('error');
  if (req.isAuthenticated()) {
    res.render('configurator/index', { csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin, messages: messages, hasErrors: messages.length > 0 });
  }
  else {
    res.render('configurator/index', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
  }
});

// ALL THE ROUTES FOR NOT LOGGED IN USERS

router.get('/configurator', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator", loggedin: true, username: req.user.username, isadmin: req.user.admin, });
  } else {
    res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator" });
  }
});

// router.get('/configurator', isLoggedIn, function (req, res, next) {
//   res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator -> LoggedIn" });
// });

// ALL THE ROUTES FOR LOGGED IN USERS

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// router.get('/configurator', function (req, res, next) {
//   res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator" });
// });

router.post('/configurator', function (req, res, next) {

  var price = 50;
  if (req.body.print != "Keine Angabe") {
    price += 5;

  }
  if (req.body.pattern != "Keine Angabe") {
    price += 5;
  }

  if (req.isAuthenticated()) {
    res.render('pages/checkOrder', { configuration: req.body, price: price, csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin, useradress: req.user });
  } else {
    res.render('pages/checkOrder', { configuration: req.body, price: price, csrfToken: req.csrfToken(), });
  }

  // return res.render('pages/checkOrder', { configuration: req.body, csrfToken: req.csrfToken() });
});

router.post('/submit-configuration', function (req, res, next) {
  
  

   MetaData.findOne({'metadataorders':true},function(err,metadataorders){
    if (err){
        return done(err);
    }
    if (!metadataorders) {
      return done(err);
    }
    
    if(metadataorders){
      if(req.body.shoelace=="Weiß") {metadataorders.configuration.shoelace.Weiß=metadataorders.configuration.shoelace.Weiß+1;}
      if (req.body.shoelace=="Rosa") {metadataorders.configuration.shoelace.Rosa=metadataorders.configuration.shoelace.Rosa+1;}
      if (req.body.shoelace=="Grau") {metadataorders.configuration.shoelace.Grau=metadataorders.configuration.shoelace.Grau+1;}
      if (req.body.shoelace=="Hellblau") {metadataorders.configuration.shoelace.Hellblau=metadataorders.configuration.shoelace.Hellblau+1;}

      if(req.body.seam=="Weiß") {metadataorders.configuration.seam.Weiß=metadataorders.configuration.seam.Weiß+1;}
      if (req.body.seam=="Rot") {metadataorders.configuration.seam.Rot=metadataorders.configuration.seam.Rot+1;}
      if (req.body.seam=="Grün") {metadataorders.configuration.seam.Grün=metadataorders.configuration.seam.Grün+1;}
      if (req.body.seam=="Blau")  {metadataorders.configuration.seam.Blau=metadataorders.configuration.seam.Blau+1;}
      
      if (req.body.pattern=="Keine Angabe") {metadataorders.configuration.pattern.Standard=metadataorders.configuration.pattern.Standard+1;}
      if (req.body.pattern=="Zick-Zack") {metadataorders.configuration.pattern.ZickZack=metadataorders.configuration.pattern.ZickZack+1;}
      if (req.body.patter=="Diamanten")  {metadataorders.configuration.pattern.Diamanten=metadataorders.configuration.pattern.Diamanten+1;}

      if (req.body.print=="Kein Angaben") {metadataorders.configuration.print.Standard=metadataorders.configuration.print.Standard+1;}
      if (req.body.print=="Flammen") {metadataorders.configuration.print.Flammen=metadataorders.configuration.print.Flammen+1;}
      if (req.body.print=="Musik") {metadataorders.configuration.print.Musik=metadataorders.configuration.print.Musik+1;}
      if (req.body.print=="Planet")  {metadataorders.configuration.print.Planet=metadataorders.configuration.print.Planet+1;}

      metadataorders.save(function(err){
        if (err)
         console.log('error')
        else
        console.log('success')
    })
}
})

  if (req.isAuthenticated()) {
    var order = new Order({
      date: getDate(),
      user: {
        userID: req.user._id,
      },
      price: req.body.price,
      paymentMethod: "Rechnung",

      configuration: {
        shoelace: req.body.shoelace,
        pattern: req.body.pattern,
        seam: req.body.seam,
        print: req.body.print
      }
    }).save();
    res.render('pages/configurationSent', { configuration: req.body, csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin, useradress: req.user });
  } else {
    var order = new Order({
      date: getDate(),
      user: {
        guest: {
          email: req.body.email,
          forename: req.body.forename,
          surname: req.body.surname,
          adress: {
            street: req.body.street,
            streetnumber: req.body.streetnumber,
            postcode: req.body.postcode,
            location: req.body.location
          }
        }
      },
      price: req.body.price,
      paymentMethod: "Rechnung",

      configuration: {
        shoelace: req.body.shoelace,
        pattern: req.body.pattern,
        seam: req.body.seam,
        print: req.body.print
      }
    }).save();
    res.render('pages/configurationSent', { configuration: req.body, csrfToken: req.csrfToken(), });
  }

  // return res.render('pages/configurationSent', { configuration: req.body });
});

router.get('/analytics', function (req, res, next) {
  if (req.isAuthenticated()) {

    
    MetaData.find({}, function (err, metadata) {
      if (err) {
        return done(err);
      }
      if (!metadata) {
        return done(err);
      }
      if(metadata){
        res.render('pages/analytics', { metadata: metadata, title: "Analytics", csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin });
      }
    });
  }
  else {
  }


});


router.get('/registrieren', function (req, res, next) {
  var messages = req.flash('error');
  res.render('pages/register', { csrfToken: req.csrfToken(), title: "Registrierung", messages: messages, hasErrors: messages.length > 0 });
});

router.post('/registrieren', passport.authenticate('local.signup', {
  successRedirect: '/',
  failureRedirect: '/registrieren',
  failureFlash: true
}));

router.post('/einloggen', passport.authenticate('local.signin', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true
}));

// router.get('/loggedin', function (req, res, next) {
//   //var user = req.params.
//   if (req.isAuthenticated()) {
//     res.render('configurator/configurator', { csrfToken: req.csrfToken(), title: "Konfigurator -> LoggedIn", loggedin: true });
//   }
// });

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
})



router.get('/contact', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pages/contact', { title: "Kontakt", csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin });
  } else {
    res.render('pages/contact', { title: "Kontakt", csrfToken: req.csrfToken(), });
  }


});

router.get('/disclaimer', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pages/disclaimer', { title: "Datenschutz", csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin });
  } else {
    res.render('pages/disclaimer', { title: "Datenschutz", csrfToken: req.csrfToken(), });
  }

});

router.get('/imprint', function (req, res, next) {

  if (req.isAuthenticated()) {
    res.render('pages/imprint', { title: "Impressum", csrfToken: req.csrfToken(), loggedin: true, username: req.user.username, isadmin: req.user.admin });
  } else {
    res.render('pages/imprint', { title: "Impressum", csrfToken: req.csrfToken(), });
  }


});

module.exports = router;

// SECURITY
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}


// GET DATE

function getDate() {
  var date = new Date();

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return year + month + day;
}