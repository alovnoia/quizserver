'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  content: String,
  image: String,
  answers: [{
  	content: String,
  	correct: Boolean
  }]
});

module.exports = mongoose.model('Questions', QuestionSchema);

/*{
	"content": "1 con vịt xòe ra 2 cái _______",
	"image": "D:/",
	"answers": [
		{"content": "cánh", "correct": true},
		{"content": "đầu", "correct": false},
        {"content": "mào", "correct": false},
        {"content": "đuôi", "correct": false}
	]
}*/