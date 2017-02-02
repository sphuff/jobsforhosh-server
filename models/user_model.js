var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  password: {type: String, required: true},
  email: {type: String, required: true, index: {unique: true}},
  jobs: [{type: ObjectId, ref: 'Job'}],
  admin: Boolean,
  signupDate: Date
});

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;