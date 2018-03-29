'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PackageSchema = new Schema({
  code: String,
  questions: [{
    id: String,
    code: String
  }],
  level: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: ['easy']
  },
  topic: {
    id: String,
    name: String
  },
  usage: {
    type: Number,
    default: 0
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Packages', PackageSchema);