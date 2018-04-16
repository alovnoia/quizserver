'use strict';

var mongoose = require('mongoose'),
Challenge = mongoose.model('Challenges'),
Question = mongoose.model('Questions'),
Package = mongoose.model('Packages'),
Game = mongoose.model('Games');

exports.list_all_games = function(req, res) {
  Game.find({}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

exports.find_a_game = function(req, res) {
  Challenge.aggregate([
  {
    $match: {
      'package.level': req.body.level, 
      'package.topic.id': req.body.topic._id,
      'enable': true,
      'status': true
    }
  }, 
  {
    $sample: {size: 1}
  }], 
  function(err, challenge) {
    if (err)
      res.send(err)
    // fake user 2 for test
    var newGame = {
      idUser1: challenge[0].idUser1,
      idUser2: 'b',
      package: challenge[0].package,
      result: challenge[0].result
    };
    res.json(newGame);
  });
};

exports.create_a_game = function(req, res) {
  console.log(req.body);
  var newGame = new Game(req.body);
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