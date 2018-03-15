'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  content: String,
  image: String,
  code: String,
  level: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: ['easy']
  },
  topic: [{}],
  answers: [{
  	content: String,
  	correct: Boolean
  }]
});

module.exports = mongoose.model('Questions', QuestionSchema);

/*{
  "level": "hard",
  "topic": [
  {
  "_id": "5a78615b3992c7e4051c6643",
  "name": "Toán học"
  }
  ],
  "answers": [
    {
    "content": "51",
    "correct": "false"
    },
    {
    "content": "5",
    "correct": "true"
    },
    {
    "content": "99",
    "correct": "false"
    },
    {
    "content": "44",
    "correct": "false"
    }
  ],
  "content": "Biến số nào của Hà Nội?",
  "image": "D:/"
}*/

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

/*{
    "_id": "5a7860de3992c7e4051c660e",
    "name": "Văn học"
},
{
    "_id": "5a7861733992c7e4051c6654",
    "name": "Hóa học"       
}*/