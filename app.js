const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');

const indexRouter = require('./site/routes/index');
const authRouter = require('./site/routes/auth');
const movieRouter = require('./site/routes/movies');
const userRouter = require('./site/routes/users');
const omdbRouter = require('./site/routes/omdb');

const sessionMdw = require('./site/middlewares/session');
const rememberMdw = require('./site/middlewares/remember');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , 'site', 'views'));

app.use(session({
  secret : 'Digital Movies',
  resave : false,
  saveUninitialized : false
}));

app.use(sessionMdw);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(rememberMdw);

//por defecto express me lo configura
app.use(express.static(__dirname + '/public'));

//use los method put y delete en las rutas y el formulario
app.use(methodOverride('_method'));

//middleware para las rutas
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/movies', movieRouter);
app.use('/api/users', userRouter);
app.use('/omdb', omdbRouter);


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
