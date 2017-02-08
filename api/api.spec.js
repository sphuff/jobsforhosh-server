process.env.NODE_ENV = 'test';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var mongoose = require('mongoose');
var app = require('../server');
var User = require('../models/user_model');
var Job = require('../models/job_model');
var faker = require('faker');

chai.use(chaiHttp);


/*
              User tests 
                                    */
describe('User', function(){
  var email = null;
  var password = null;
  before(function(done) {
    User.remove({}, function(){
      email = faker.internet.email();
      password = faker.internet.password();
      var newUser = new User({
        email: email,
        password: password,
        signupDate: new Date(),
        admin: false,
        jobs: []
      });
      
      newUser.save(function(err, user) {
        if (err) done(err);
        done();
      });
      
    });
  });
  describe('GET - Fail', function(){
    it('No query', function(done){
      chai.request(app)
        .get('/user')
        .end(function(err, res) {
          res.should.have.status(400);
          done();
        });
    });
    
    it('Incorrect email', function(done){
      chai.request(app)
        .get('/user')
        .query({
          email: 'wrong-email',
          password: password
        })
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });
    
    it('Incorrect password', function(done){
      chai.request(app)
        .get('/user')
        .query({
          email: email,
          password: 'incorrect-password'
        })
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });
  
  describe('GET - Pass', function() {
    it('Valid user', function(done) {
      chai.request(app)
        .get('/user')
        .query({
          email: email,
          password: password
        })
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          (res.body.email).should.equal(email);
          done();
        });
    });
  });
  
  describe('POST - Pass', function(){
    it('Valid user', function(done) {
      chai.request(app)
        .post('/user')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'test-email',
          password: 'test-pass'
        })
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          (res.body.email).should.equal('test-email');
          done();
        });
    });
  });
  
  describe('POST - Fail', function(){
    it('No email', function(done) {
      chai.request(app)
        .post('/user')
        .end(function(err, res) {
          res.should.have.status(400);
          done();
        });
    });
    
    it('User already added', function(done) {
      chai.request(app)
        .post('/user')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'test-email',
          password: 'test-pass'
        })
        .end(function(err, res) {
          res.should.have.status(409);
          done();
        });
    });
  });
  
  after(function(done){
    User.remove({}, function(){
      done();
    });
  });
});

  

/*
              Job tests 
                                    */
describe('Job', function(){
  var title = null;
  var company = null;
  var userID = null;
  var jobID = null;
  before(function(done) {
    User.remove({}, function(){
      var email = faker.internet.email();
      var password = faker.internet.password();
      var newUser = new User({
        email: email,
        password: password,
        signupDate: new Date(),
        admin: false,
        jobs: []
      });
      
      newUser.save(function(err, user) {
        if (err) done(err);
        userID = user.id;
        done();
      });
    });
  });
  
  describe('POST - Fail', function(){
    it('No query', function(done){
      chai.request(app)
        .post('/job')
        .end(function(err, res) {
          res.should.have.status(400);
          done();
        });
    });
    
    it('No userID', function(done){
      chai.request(app)
        .post('/job')
        .query({
          title: 'job-title',
          company: 'company-name'
        })
        .end(function(err, res) {
          res.should.have.status(400);
          done();
        });
    });
  });
  
  describe('POST - Pass', function(){
    it('Valid job', function(done){
      chai.request(app)
        .post('/job')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          title: 'job-title',
          company: 'company-name',
          userID: userID
        })
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          (res.body.title).should.equal('job-title');
          jobID = res.body._id;
          done();
        });
    });
  });
  
  describe('GET - Fail', function(){
    it('No query', function(done){
      chai.request(app)
        .get('/job')
        .end(function(err, res) {
          res.should.have.status(400);
          done();
        });
    });
  });
  
  describe('GET - Pass', function(){
    it('Valid job', function(done){
      chai.request(app)
        .get('/job')
        .query({
          id: jobID
        })
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.have.property('_id');
          (res.body.title).should.equal('job-title');
          done();
        });
    });
  });
  
  describe('GET All Jobs', function(){
    describe('length 1 - Pass', function(){
      
      it('Valid job', function(done){
        chai.request(app)
          .get('/jobsforuser')
          .query({
            userID: userID
          })
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.have.length(1);
            done();
          });
      });
    });
    
    describe('length 2 - Pass', function(){
      before(function(done) {
        chai.request(app)
          .post('/job')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send({
            title: 'job-title2',
            company: 'company-name2',
            userID: userID
          })
          .end(
            done()
          )
      });
      
      it('Valid job', function(done){
        chai.request(app)
          .get('/jobsforuser')
          .query({
            userID: userID
          })
          .end(function(err, res) {
            console.log(res.body);
            res.should.have.status(200);
            res.body.should.have.length(2);
            done();
          });
      });
    });
  });
  
  // after(function(done){
  //   User.remove({}, function(){
  //     Job.remove({}, function(){
  //       done();
  //     });
  //   });
  // });
});

