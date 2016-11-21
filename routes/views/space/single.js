var keystone = require('keystone');

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'space';
  locals.inner = true;
  locals.data = {
    spacePost: [],
  };

  view.on('init', function(next) {
    var query = keystone.list('Space').model.findOne({
      slug: req.params.id
    });
    query.exec(function(err, results) {
      locals.data.spacePost = results;
      next(err);
    });
  });

  // Render the view
  view.render('space/single');
};
