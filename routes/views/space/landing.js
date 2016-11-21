var keystone = require('keystone');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'space';
  locals.landingFull = true;
  
  locals.data = {
    spacelanding: [],
  };

  view.on('init', function(next) {
    var query = keystone.list('Landing').model.findOne({
      slug: 'space'
    });
    query.exec(function(err, results) {
      locals.data.spacelanding = results;
      next(err);
    });
  });

  // Render the view
  view.render('space/landing');
};
