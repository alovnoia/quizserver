'use strict';
module.exports = function(app) {
  var topicStuff = require('../controllers/topicController');
  var adminStuff = require('../controllers/adminController');
  var questionStuff = require('../controllers/questionController');
  var packageStuff = require('../controllers/packageController');
  var challengeStuff = require('../controllers/challengeController');
  var gameStuff = require('../controllers/gameController');

  // games ------------------------------------------------
  app.route('/games/find')
    .post(gameStuff.find_a_game);

  app.route('/games')
    .get(gameStuff.list_all_games)
    .post(gameStuff.create_a_game);


  app.route('/games/:gameId')
    .get(gameStuff.read_a_game)
    .put(gameStuff.update_a_game)
    .delete(gameStuff.delete_a_game);

  // challenges ------------------------------------------------
  app.route('/challenges/save')
    .post(challengeStuff.save_a_challenge);

  app.route('/challenges')
    .get(challengeStuff.list_all_challenges)
    .post(challengeStuff.create_a_challenge);


  app.route('/challenges/:challengeId')
    .get(challengeStuff.read_a_challenge)
    .put(challengeStuff.update_a_challenge)
    .delete(challengeStuff.delete_a_challenge);

  // package routes
  app.route('/packages')
    .get(packageStuff.list_all_packs)
    .post(packageStuff.create_a_pack);

  app.route('/packages/check-code')
    .post(packageStuff.check_code);

  app.route('/packages/generate-questions')
    .post(packageStuff.generate_questions);        

  app.route('/packages/search')
    .post(packageStuff.find_packs);

  app.route('/packages/:packId')
    .get(packageStuff.read_a_pack)
    .put(packageStuff.update_a_pack)
    .delete(packageStuff.delete_a_pack);

  // question routes
  app.route('/questions/image')
    .post(questionStuff.get_base64_image);

  app.route('/questions')
    .get(questionStuff.list_all_questions)
    .post(questionStuff.create_a_question);

  app.route('/questions/check-code')
    .post(questionStuff.check_code);  

  app.route('/questions/search')
    .post(questionStuff.find_question);

  app.route('/questions/find-by-list')
    .post(questionStuff.find_question_by_list);

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
  app.route('/topics/game')
    .get(topicStuff.list_available_topics);

  app.route('/topics')
    .get(topicStuff.list_all_topics)
    .post(topicStuff.create_a_topic);


  app.route('/topics/:topicId')
    .get(topicStuff.read_a_topic)
    .put(topicStuff.update_a_topic)
    .delete(topicStuff.delete_a_topic);
};