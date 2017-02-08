var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
  _creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required: true},
  company: {type: String, required: true},
  url: {type: String},
  endDate: Date
});

var jobModel = mongoose.model('Job', jobSchema);

module.exports = jobModel;