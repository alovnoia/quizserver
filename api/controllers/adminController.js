'use strict';

var mongoose = require('mongoose'),
Admin = mongoose.model('Admin');

exports.login = function(req, res) {
  Admin.find({username: req.body.username, password: req.body.password}, function(err, admin) {
    if (err)
      res.send(err);
    res.json({count: admin.length});
  });
};

exports.create = function(req, res) {
  var new_admin = new Admin(req.body);
  new_admin.save(function(err, admin) {
    if (err)
      res.send(err);
    res.json(admin);
  });
};