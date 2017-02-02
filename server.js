require('dotenv').config();
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes');
var mongoose = require('mongoose');
var api = require('./api/api');

var app = express();

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));

app.use(routes);

mongoose.connect('mongodb://localhost:27017/j4htest');

app.listen(12345, function(){
  console.log('listening');
});
