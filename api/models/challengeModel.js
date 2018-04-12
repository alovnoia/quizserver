'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChallengeSchema = new Schema({
  idUser1: String,
  status: {
    type: Boolean,
    default: true
  },
  enable: {
    type: Boolean,
    default: true
  },
  package: Object
});

module.exports = mongoose.model('Challenges', ChallengeSchema);