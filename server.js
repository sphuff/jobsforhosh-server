require('dotenv').config();
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes');
var mongoose = require('mongoose');
var api = require('./api/api');
var config = require('config');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('dev')); //'combined' outputs the Apache style LOGs
}

app.use(routes);

mongoose.Promise = global.Promise;
mongoose.connect(config.DB_URL);

app.listen(config.PORT, function(){
  console.log('Server started on ' + config.PORT);
});

module.exports = app;