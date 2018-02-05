'use strict';
module.exports = function(app) {
  var topicStuff = require('../controllers/topicController');
  var adminStuff = require('../controllers/adminController');
  var questionStuff = require('../controllers/questionController');

  // question routes
  app.route('/questions')
    .get(questionStuff.list_all_questions)
    .post(questionStuff.create_a_question);


  app.route('/questions/:questionId')
    .get(questionStuff.read_a_question)
    .put(questionStuff.update_a_question)
    .delete(questionStuff.delete_a_question);

  // admin routes -------------------------------------------------
  app.route('/admin')
    .post(adminStuff.login);

  app.route('/admin/create')
    .post(adminStuff.create);

  // topics routes ------------------------------------------------
  app.route('/topics')
    .get(topicStuff.list_all_topics)
    .post(topicStuff.create_a_topic);


  app.route('/topics/:topicId')
    .get(topicStuff.read_a_topic)
    .put(topicStuff.update_a_topic)
    .delete(topicStuff.delete_a_topic);
};