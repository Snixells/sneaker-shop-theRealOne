var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);



var indexRouter = require('./routes/index');

var app = express();


connectionUrl = "mongodb+srv://Snixells:qouH6xQdnPt6Nsbd@cluster0-8j2qj.mongodb.net/krueger";
mongoose.connect(connectionUrl);

require('./config/passport');

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'Kruegerid',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooceConnection: mongoose.connection}),
  cookie: { maxAge:180 * 60 * 1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session= res.session;
  next();
  
})


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
