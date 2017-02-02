var express = require('express');
var router = express.Router();
var api = require('./api/api');

module.exports = router;

router.get('/user', function(req, res){
  api.getUser(req, res);
});

router.post('/user', function(req, res){
  api.postUser(req, res);
});