var keystone = require('keystone');
var Types = keystone.Field.Types;

var Video = new keystone.List('FrontVideo', {
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  map: {
    name: 'title',
  },
  plural: 'Front Video',
  nocreate: true,
  nodelete: true,
});

Video.add({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: Types.CloudinaryImage,
    folder: 'front-video',
  },
  video: { 
    type: String,
  },
});

Video.defaultColumns = 'title';
Video.register();
