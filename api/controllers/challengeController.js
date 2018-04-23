'use strict';

var mongoose = require('mongoose'),
Challenge = mongoose.model('Challenges'),
Question = mongoose.model('Questions'),
Package = mongoose.model('Packages');
var imageHelper = require('../helper/imageHelper');

exports.list_all_challenges = function(req, res) {
  Challenge.find({}, function(err, challenge) {
    if (err)
      res.send(err);
    res.json(challenge);
  });
};

exports.create_a_challenge = function(req, res) {
  var requestJson;
  // mobile request not same with web request
  if (req.body.mobile) {
    requestJson = JSON.parse(req.body.data);
  } else {
    requestJson = req.body;
  }
  //console.log(requestJson);
  Package.aggregate([
  {
    $match: {
      'level': requestJson.level, 
      'topic.id': requestJson.topic._id,
      'deleted': false
    }
  }, 
  {
    $sample: {size: 1}
  }], 
  function(err, p) {
    Package.findOneAndUpdate({_id: p[0]._id}, {usage: p[0].usage + 1}, {new: true}, function(err, pack) {});
    var questionsList = [];
    for (var i = 0; i < p[0].questions.length; i++) {
      questionsList.push(p[0].questions[i].id);
    }
    Question.find({_id: {$in: questionsList}}, function(err, q){
      if (err) {
        res.send(err);
      } else {
        for (var i = 0; i < q.length; i++) {
          if (q[i].image) {
            q[i].base64Image = imageHelper.base64_encode(q[i].image);
          }
        }
        console.log(q);
        p[0].questions = q;
        var new_challenge = new Challenge({
          idUser1: req.body.idUser1,
          package: p[0]
        });
        res.json(new_challenge);
        /*new_challenge.save(function(err, challenge) {
          console.log(challenge);
          if (err)
            res.send(err);
          res.json(challenge);
        });*/
      }
    });
  });
};

exports.save_a_challenge = function(req, res) {
  var requestJson;
  // mobile request not same with web request
  if (req.body.mobile) {
    requestJson = JSON.parse(req.body.data);
  } else {
    requestJson = req.body;
  }
  var new_challenge = new Challenge(requestJson);
  for (var i = 0; i < new_challenge.package.questions.length; i++) {
    new_challenge.package.questions[i].base64Image = '';
  }
  new_challenge.save(function(err, challenge) {
    //console.log(challenge);
    if (err)
      res.send(err);
    res.json(challenge);
  });
};

exports.read_a_challenge = function(req, res) {
  Challenge.findById(req.params.challengeId, function(err, challenge) {
    if (err)
      res.send(err);
    res.json(challenge);
  });
};

exports.update_a_challenge = function(req, res) {
  Challenge.findOneAndUpdate({_id: req.params.challengeId}, req.body, {new: true}, function(err, challenge) {
    if (err)
      res.send(err);
    res.json(challenge);
  });
};

exports.delete_a_challenge = function(req, res) {
  //console.log(req.params.challengeId);
  //Question.updateMany({}, {$pull: {challenge: {_id: req.params.challengeId}}}, {new: true}, function(err, result){});
  Challenge.findOneAndUpdate({_id: req.params.challengeId}, {deleted: true}, {new: true}, function(err, challenge) {
    if (err) {
      res.send(err);
    } else {
      Question.updateMany({}, {$pull: {challenge: {'_id': req.params.challengeId}}}, {new: true}, function(err, result){});
      Package.updateMany({'challenge.id': req.params.challengeId}, {$set: {challenge: {}, deleted: true}}, {new: true}, function(err, result){});    
      res.json(challenge);
    }
  });
};