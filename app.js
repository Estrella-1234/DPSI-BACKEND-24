var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var app = express();
var sequelize = require('./models/index'); 
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/customer');
var categoryRouter = require('./routes/category');
var supplierRouter = require('./routes/supplierRoutes');
var productRouter = require('./routes/productRoutes');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      res.status(401).json({ message: 'Token is not valid' });
  } else {
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.use('/uploads', express.static('uploads')); // Middleware untuk menyajikan file statis


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/customer', customerRouter);
app.use('/category', categoryRouter);
app.use('/supplier', supplierRouter);
app.use('/product', productRouter);

sequelize.sequelize.sync().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
