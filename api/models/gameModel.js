'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  idUser1: String,
  idUser2: String,
  package: Object,
  result: Object,
  gameType: {
    type: String,
    default: 'normal'
  }
});

module.exports = mongoose.model('Games', GameSchema);