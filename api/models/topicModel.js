'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
  name: String,
  desc: String,
  status: Boolean
});

module.exports = mongoose.model('Topics', TopicSchema);


/*{
    name: "Hóa học",
    desc: "Các câu hỏi về hóa học",
    status: true
}*/