var keystone = require('keystone');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'work';
  locals.landingFull = true;

  locals.data = {
    worklanding: [],
  };

  view.on('init', function(next) {
    var query = keystone.list('Landing').model.findOne({
      slug: 'work'
    });
    query.exec(function(err, results) {
      locals.data.worklanding = results;
      next(err);
    });
  });

  // Render the view
  view.render('work/landing');
};
