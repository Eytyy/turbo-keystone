var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
  locals.section = "front";

	// locals.section is used to set the currently selected

	// item in the header navigation.
  locals.dir = 'https://s3.amazonaws.com/eytyy.com/resources/front-video/';

  locals.data = {
    video: []
  };

  view.on('init', function(next) {
    var query = keystone.list('FrontVideo').model.findOne();
    query.exec(function(err, results) {
      locals.data.video = results;
      next(err);
    });
  });

	// Render the view
	view.render('index');
};
