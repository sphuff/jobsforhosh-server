var mongoose = require('mongoose');
var User = require('../models/user_model');

module.exports = {
  getUser : (req, res) => {
    if (req.query.email == null || req.query.password == null) {
      res.status(400).send('Must send email and password');
    }
    
    var email = req.query.email;
    var password = req.query.password;
    User.findOne({email: email, password: password}, function(err, user){
      if (err) return res.status(404).send('User not found');
      else if (user == null) return res.status(404).send('User not found');
      // if (user.password != password) return response.status(401).send();
      return res.status(200).send(user);
    });
  },
  
  postUser : (req, res) => {
    if (req.body.email == null || req.body.password == null) {
      res.status(400).send('Must send email and password');
    }
    
    var email = req.body.email;
    var password = req.body.password;
    var jobs = []
    var newUser = new User({
      email: email,
      password: password,
      signupDate: new Date(),
      admin: false,
      jobs: jobs
    });
    
    newUser.save(function(err, user){
      if (err) {
        console.log(err);
        res.status(500).send();
      }
      else res.status(200).send();
    });
  }
}