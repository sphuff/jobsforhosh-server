var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
  title: {type: String, required: true},
  company: {type: String, required: true},
  url: {type: String, required: false},
  endDate: Date
});

var jobModel = mongoose.model('Job', jobSchema);

module.exports = jobModel;