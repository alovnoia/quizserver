'use strict';

var mongoose = require('mongoose'),
Question = mongoose.model('Questions'),
Package = mongoose.model('Packages');
var imageHelper = require('../helper/imageHelper');

exports.list_all_questions = function(req, res) {
  Question.find({}, function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};

exports.check_code = function(req, res) {
  Question.find({code: req.body.code}, function(err, question) {
    if (err) {
      res.send(err);
    }
    if (question.length > 0) {
      res.send({result: false});
    } else {
      res.send({result: true});      
    }
  });
}

exports.find_question = function(req, res) {
  var level = req.body.level;
  var topic = req.body.topic;
  var type = req.body.type;
  var code = req.body.code;
  var answer = req.body.answer;
  var content = req.body.content;
  var queryObj = {};
  var regexp;
  if (level) {
    queryObj['level'] = level;
  }
  if (topic) {
    queryObj['topic._id'] = {$in: [topic]};
  }
  if (type == 'text') {
    queryObj['image'] = {$eq: ""};
  }
  if (type == 'image') {
    queryObj['image'] = {$ne: ""};
  }
  if (code) {
    queryObj['code'] = code;
  }
  if (answer) {
    regexp = new RegExp(answer + "");
    //queryObj.answers = {};
    queryObj['answers.content'] = {$regex: regexp};
  }
  if (content) {
    regexp = new RegExp(content + "");
    queryObj['content'] = {$regex: regexp};
  }
  queryObj['deleted'] = false;
  //console.log(queryObj);
  //Question.find(JSON.parse('{"_id": "5a786deda153c61cbc95f3cb", "level": "hard", "topic": {$in: ["5a78615b3992c7e4051c6643"]}, "image": {$ne: ""}, "content": {$regex: /số nào/}, "answers.content": {$regex: /1/}}'),
  Question.find(queryObj, function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};

exports.create_a_question = function(req, res) {
  var new_question = new Question(req.body);
  console.log(new_question.base64Image);
  imageHelper.base64_decode(new_question.base64Image.split(',')[1], new_question.image);
  new_question.base64Image = '';
  new_question.save(function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};

exports.get_base64_image = function(req, res) {
  console.log(req.body.image);
  res.json({base64Image: imageHelper.base64_encode(req.body.image)});
};

exports.read_a_question = function(req, res) {
  Question.findById(req.params.questionId, function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};

exports.update_a_question = function(req, res) {
  if (req.body.image) {
    imageHelper.base64_decode(req.body.base64Image, req.body.image);
  }
  req.body.base64Image = '';
  Question.findOneAndUpdate({_id: req.params.questionId}, req.body, {new: true}, function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};

exports.delete_a_question = function(req, res) {
  Question.findOneAndUpdate({_id: req.params.questionId}, {deleted: true}, {new: true}, function(err, question) {
    if (err) {
      res.send(err);
    } else {
      Package.updateMany({'questions.id': {$in: [req.params.questionId]}}, {deleted: true}, {new: true}, function(err, p){});
      res.json(question);    
    }

  });
/*  Question.remove({
    _id: req.params.questionId
  }, function(err, question) {
    if (err)
      res.send(err);
    res.json({ message: 'Question successfully deleted' });
  });*/
};

exports.find_question_by_list = function(req, res) {
  console.log(req.body.questionList);
  Question.find({_id: {$in: req.body.questionList}}, function(err, question) {
    if (err)
      res.send(err);
    res.json(question);
  });
};