'use strict';

var mongoose = require('mongoose'),
Topic = mongoose.model('Topics'),
Question = mongoose.model('Questions'),
Package = mongoose.model('Packages');
var imageHelper = require('../helper/imageHelper');

exports.list_all_topics = function(req, res) {
  //imageHelper.base64_decode('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', 'test.jpg');
  //imageHelper.base64_encode('csa.png');
  Topic.find({deleted: false}, function(err, topic) {
    if (err)
      res.send(err);
    res.json(topic);
  });
};

exports.list_available_topics = function(req, res) {
  Topic.find({deleted: false, status: true}, function(err, topic) {
    if (err)
      res.send(err);
    res.json(topic);
  });
};

exports.create_a_topic = function(req, res) {
  var new_topic = new Topic(req.body);
  new_topic.save(function(err, topic) {
    if (err)
      res.send(err);
    res.json(topic);
  });
};

exports.read_a_topic = function(req, res) {
  Topic.findById(req.params.topicId, function(err, topic) {
    if (err)
      res.send(err);
    res.json(topic);
  });
};

exports.update_a_topic = function(req, res) {
  Topic.findOneAndUpdate({_id: req.params.topicId}, req.body, {new: true}, function(err, topic) {
    if (err)
      res.send(err);
    res.json(topic);
  });
};

exports.delete_a_topic = function(req, res) {
  //console.log(req.params.topicId);
  //Question.updateMany({}, {$pull: {topic: {_id: req.params.topicId}}}, {new: true}, function(err, result){});
  Topic.findOneAndUpdate({_id: req.params.topicId}, {deleted: true}, {new: true}, function(err, topic) {
    if (err) {
      res.send(err);
    } else {
      Question.updateMany({}, {$pull: {topic: {'_id': req.params.topicId}}}, {new: true}, function(err, result){});
      Package.updateMany({'topic.id': req.params.topicId}, {$set: {topic: {}, deleted: true}}, {new: true}, function(err, result){});    
      res.json(topic);
    }
  });
/*  Topic.remove({
    _id: req.params.topicId
  }, function(err, topic) {
    if (err)
      res.send(err);
    res.json({ message: 'Topic successfully deleted' });
  });*/
};