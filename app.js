const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./utils/config');
const printer = require('./utils/printer');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const groupsRouter = require('./routes/groups');
const {MODE, ORIGIN} = require("./utils/config");

const app = express();

// Remove version information for possible attackers
app.disable('x-powered-by');

//Mongoose connection
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      printer.info('Connection to MongoDB Atlas completed!');
    })
    .catch((err) => {
      printer.error('Connection error to MongoDB Atlas:', err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [ORIGIN, "moz-extension://7ecd9087-60a6-4f7b-a18b-ee054676553c"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
            console.log('Access allowed from origin: ' + origin);
        } else {
            callback(new Error('Access not allowed from origin: ' + origin + ' to the API'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/groups', groupsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = MODE === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
