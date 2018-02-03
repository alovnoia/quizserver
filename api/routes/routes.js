'use strict';
module.exports = function(app) {
  var topicStuff = require('../controllers/topicController');
  var adminStuff = require('../controllers/adminController');

  // admin Routes
  app.route('/admin')
    .post(adminStuff.login);

  app.route('/admin/create')
    .post(adminStuff.create);

  // topics Routes
  app.route('/topics')
    .get(topicStuff.list_all_topics)
    .post(topicStuff.create_a_topic);


  app.route('/topics/:topicId')
    .get(topicStuff.read_a_topic)
    .put(topicStuff.update_a_topic)
    .delete(topicStuff.delete_a_topic);
};