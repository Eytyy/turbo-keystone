var keystone = require('keystone');
var Types = keystone.Field.Types;

var Contact = new keystone.List('Contact', {
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  map: {
    name: 'title',
  },
});

Contact.add({
  'title': {
    type: String,
    unique: true,
  },
  'about': {
    type: Types.Html,
    height: 150,
  },
  'address': {
    type: Types.Html,
    height: 150,
  },
  'social': {
    type: Types.Html,
    wysiwyg: true,
    height: 150,
  },
  'top image': {
    type: Types.CloudinaryImage,
    autoCleanup : true,
  },
  'bottom image': {
    type: Types.CloudinaryImage,
    autoCleanup : true,
  },
});

Contact.defaultColumns = 'title';
Contact.register();
