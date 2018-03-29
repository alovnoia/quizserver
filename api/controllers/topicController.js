'use strict';

var mongoose = require('mongoose'),
Topic = mongoose.model('Topics'),
Question = mongoose.model('Questions'),
Package = mongoose.model('Packages');

exports.list_all_topics = function(req, res) {
  Topic.find({deleted: false}, function(err, topic) {
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