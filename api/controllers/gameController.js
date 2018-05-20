'use strict';

var mongoose = require('mongoose'),
Challenge = mongoose.model('Challenges'),
Question = mongoose.model('Questions'),
Package = mongoose.model('Packages'),
Game = mongoose.model('Games'),
User = mongoose.model('Users');
var imageHelper = require('../helper/imageHelper');

exports.list_all_games = function(req, res) {
  Game.find({}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

exports.get_game_by_user = function(req, res) {
  Game.find({$or: [{idUser1: req.body.user}, {idUser2: req.body.user}]}, function(err, game) {
    if (err)
      res.send(err);
    console.log(game);
    res.json(game);
  });
};

exports.find_a_game = function(req, res) {
  var requestJson;
  var filter;
  // mobile request not same with web request
  if (req.body.mobile) {
    requestJson = JSON.parse(req.body.data);
    filter = {
      'package.level': requestJson.level, 
      'package.topic.id': requestJson.topic._id,
      'idUser1': {$ne: requestJson.userId},
      'enable': true
    }
  } else {
    requestJson = req.body;
    filter = {
      'package.level': requestJson.level, 
      'package.topic.id': requestJson.topic._id,
      'idUser1': {$ne: 'dttung195@gmail.com'},
      'enable': true
    }
  }
  console.log(requestJson);
  Challenge.aggregate([
  {
    $match: filter
  }, 
  {
    $sample: {size: 1}
  }], 
  function(err, challenge) {
    if (err)
      res.send(err)
    if (!challenge.length) {
      res.send(null);
    } else {
      for (var i = 0; i < challenge[0].package.questions.length; i++) {
        if (challenge[0].package.questions[i].image) {
          challenge[0].package.questions[i].base64Image = imageHelper.base64_encode(challenge[0].package.questions[i].image);
        }
      }    
      // fake user 2 for test
      var newGame = {
        idUser1: challenge[0].idUser1,
        idUser2: 'alovnoia@gmail.com',
        package: challenge[0].package,
        result: challenge[0].result
      };
      res.json(newGame);
    }
  });
};

exports.save_game = function(req, res) {
  //console.log(req.body);
  var requestJson;
  // mobile request not same with web request
  if (req.body.mobile) {
    requestJson = JSON.parse(req.body.data);
  } else {
    requestJson = req.body;
  }
  var newGame = new Game(requestJson);
  for (var i = 0; i < newGame.package.questions.length; i++) {
    newGame.package.questions[i].base64Image = '';
  }
  if (newGame.result.winner === newGame.idUser1) {
    User.findOneAndUpdate({email: newGame.idUser1}, {$inc: {win: 1}}, function(user, err) {});
    User.findOneAndUpdate({email: newGame.idUser2}, {$inc: {lose: 1}}, function(user, err) {});
  } else if (newGame.result.winner === newGame.idUser2) {
    User.findOneAndUpdate({email: newGame.idUser1}, {$inc: {lose: 1}}, function(user, err) {});
    User.findOneAndUpdate({email: newGame.idUser2}, {$inc: {win: 1}}, function(user, err) {});    
  } else {
    User.findOneAndUpdate({email: newGame.idUser1}, {$inc: {draw: 1}}, function(user, err) {});
    User.findOneAndUpdate({email: newGame.idUser2}, {$inc: {draw: 1}}, function(user, err) {});  
  }
  Challenge.updateMany({idUser1: requestJson.idUser1}, {$set: {enable: false}}, function (err, updated) {});
  newGame.save(function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
    console.log(game);
  });
}

exports.read_a_game = function(req, res) {
  Game.findById(req.params.gameId, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

exports.update_a_game = function(req, res) {
  Game.findOneAndUpdate({_id: req.params.gameId}, req.body, {new: true}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

exports.delete_a_game = function(req, res) {
  //console.log(req.params.gameId);
  //Question.updateMany({}, {$pull: {game: {_id: req.params.gameId}}}, {new: true}, function(err, result){});
  Game.findOneAndUpdate({_id: req.params.gameId}, {deleted: true}, {new: true}, function(err, game) {
    if (err) {
      res.send(err);
    } else {
      Question.updateMany({}, {$pull: {game: {'_id': req.params.gameId}}}, {new: true}, function(err, result){});
      Package.updateMany({'game.id': req.params.gameId}, {$set: {game: {}, deleted: true}}, {new: true}, function(err, result){});    
      res.json(game);
    }
  });
};