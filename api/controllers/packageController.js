'use strict';

var mongoose = require('mongoose'),
Package = mongoose.model('Packages'),
Question = mongoose.model('Questions');

exports.list_all_packs = function(req, res) {
  Package.find({}, function(err, pack) {
    if (err)
      res.send(err);
    res.json(pack);
  });
};

exports.check_code = function(req, res) {
  Package.find({code: req.body.code}, function(err, pack) {
    if (err) {
      res.send(err);
    }
    if (pack.length > 0) {
      res.send({result: false});
    } else {
      res.send({result: true});      
    }
  });
}

exports.find_packs = function(req, res) {
  var level = req.body.level;
  var topic = req.body.topic;
  var code = req.body.code;
  var questionCode = req.body.questionCode;
  var usage = req.body.usage;
  var usageCondition = req.body.usageCondition;
  var queryObj = {};
  if (level) {
    queryObj['level'] = level;
  }
  if (topic) {
    queryObj['topic.id'] = topic;
  }
  if (code) {
    queryObj['code'] = code;
  }
  if (questionCode) {
    queryObj['questions.code'] = questionCode;
  } 
  if (usage >= 0 && usageCondition) {
    if (usageCondition === 'greater') {
      queryObj['usage'] = {$gte: usage};
    } else {
      queryObj['usage'] = {$lte: usage};
    }
  }
  console.log(queryObj);
  Package.find(queryObj, function(err, pack) {
    if (err)
      res.send(err);
    res.json(pack);
  });
};

exports.generate_questions = function(req, res) {
  Question.aggregate([
    {
      $match: {
        'level': req.body.level, 
        'topic._id': {$in: [req.body.topic]}
      }
    }, 
    {
      $sample: {size: 2}
    }], 
    function(err, q) {
      if (err)
        res.send(err);
      res.send(q);
  });
};

exports.create_a_pack = function(req, res) {
  var new_pack = new Package(req.body);
  console.log(req.body);
  new_pack.save(function(err, pack) {
    if (err)
      res.send(err);
    res.json(pack);
  });
};

exports.read_a_pack = function(req, res) {
  Package.findById(req.params.packId, function(err, pack) {
    if (err)
      res.send(err);
    res.json(pack);
  });
};

exports.update_a_pack = function(req, res) {
  Package.findOneAndUpdate({_id: req.params.packId}, req.body, {new: true}, function(err, pack) {
    if (err)
      res.send(err);
    res.json(pack);
  });
};

exports.delete_a_pack = function(req, res) {
  console.log(req.params.packageId);
  Package.remove({
    _id: req.params.packageId
  }, function(err, pack) {
    if (err)
      res.send(err);
    res.json({ message: 'Package successfully deleted' });
  });
};