var keystone = require('keystone');
var Types = keystone.Field.Types;

var Landing = new keystone.List('Landing', {
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  map: {
    name: 'title',
  },
});

Landing.add({
  'title': {
    type: String,
    unique: true,
  },
  'image': {
    type: Types.CloudinaryImages,
    folder: 'landing',
  },
});

Landing.defaultColumns = 'title';
Landing.register();
