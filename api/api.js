var mongoose = require('mongoose');
var User = require('../models/user_model');
var Job = require('../models/job_model');

module.exports = {
  getUser : (req, res) => {
    if (req.query.email == null || req.query.password == null) {
      res.status(400).send('Must send email and password');
      return;
    }
    
    var email = req.query.email;
    var password = req.query.password;
    User.findOne({email: email, password: password}, function(err, user){
      if (err || user == null) return res.status(404).send('User not found');
      
      return res.status(200).send(user);
    });
  },
  
  postUser : (req, res) => {
    if (req.body.email == null || req.body.password == null) {
      res.status(400).send('Must send email and password');
      return;
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
        res.status(409).send(); // user already added
      }
      else res.status(200).send(user);
    });
  },
  
  // only need ID of object because client will already know job IDs (they are
  // stored in the user object) 
  getJob : (req, res) => {
    if (req.query.id == null) {
      res.status(400).send('Must send job ID');
      return;
    }
    
    var id = req.query.id;
    
    Job.findById(id, function(err, job){
      if (err || job == null) return res.status(404).send('Job not found');
      
      return res.status(200).send(job);
    });
  },
  
  postJob : (req, res) => {
    if (req.body.userID == null || req.body.title == null || req.body.company == null) {
      res.status(400).send('Must send user ID, job title and company name');
      return;
    }
    var userID = req.body.userID;
    
    // populate job object
    var jobJSON = {}
    jobJSON.title = req.body.title;
    jobJSON.company = req.body.company;
    if (req.body.endDate)
      jobJSON.endDate = req.body.endDate;
    if (req.body.url)
      jobJSON.url = req.body.url;
    
    
    var newJob = new Job(jobJSON);
    
    newJob.save(function(err, job){
      if (err) {
        res.status(500).send();
      }
      
      
      User.findById(userID, function(err, user){
        if (err || user == null) return res.status(404).send('User not found');
        user.jobs.push(job);
        user.save(function(err, user){
          if (err) {
            res.status(500).send();
          }
          else res.status(200).send(job);
        });
      });
    });
    
    
  }
}