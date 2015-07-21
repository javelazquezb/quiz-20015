var models = require('../models/models.js');


exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
    var v_busqueda = '%';
    if (req.query.search){
	    v_busqueda = '%' + req.query.search.replace(/\s/g,"%")  + '%';
        };

    models.Quiz.findAll({where:["upper(pregunta) like upper(?)", v_busqueda],order:'pregunta ASC'}).then(function(quizes) {
	quizes = quizes.sort();
	res.render('quizes/index.ejs',{quizes: quizes});
    }).catch(function(error){next(error);})

};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

//GET /author
exports.author = function(req,res){
	res.render('quizes/author',{title:'quiz jes 2015'});
};