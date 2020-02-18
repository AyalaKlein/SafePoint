var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var usersRouter = require('./routes/users');
var sheltersRouter = require('./routes/shelters');
var newsRouter = require('./routes/news');
var citiesRouter = require('./routes/cities');
var bodyParser = require('body-parser');
var session = require('express-session');
require('dotenv').config({path: __dirname + '/.env'});

var app = express();


// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

var sessionMiddleware = session({
  secret: "blablba"
});
app.use(sessionMiddleware);
const server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.SERVER_PORT);

app.use('/users', usersRouter);
app.use('/shelters', sheltersRouter(io));
app.use('/news', newsRouter);
app.use('/cities', citiesRouter);

console.log(`listening on port ${process.env.SERVER_PORT}`);