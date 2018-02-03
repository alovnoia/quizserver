'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
  name: String,
  desc: String,
  status: Boolean 
});

module.exports = mongoose.model('Topics', TopicSchema);