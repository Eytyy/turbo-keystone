var keystone = require('keystone');
var Types = keystone.Field.Types;

var storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    key: process.env.AWSAccessKeyId,
    secret: process.env.AWSSecretKey,
    bucket: process.env.S3BucketName,
    region: 'us-west-2',
    path: '/posts',
  },
  schema: {
    originalname: true,
  },
});

var Space = new keystone.List('Space', {
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true,
  },
  map: {
    name: 'title',
  },
});

Space.add({
  title: {
    type: String,
    required: true,
  },
  'media type': {
    type: Types.Select,
    options: 'Images, Video',
    default: 'Images',
  },
  image: {
    type: Types.CloudinaryImages,
    folder: 'work',
    dependsOn: {
      'media type': 'Images',
    },
  },
  video: {
    type: Types.File,
    storage: storage,
    autoCleanup : true,
    dependsOn: {
      'media type': 'Video',
    },
  },
  'video image': {
    type: Types.CloudinaryImage,
    folder: 'work',
    dependsOn: {
      'media type': 'Video',
    },
  },
  description: {
    type: Types.Html,
    wysiwyg: true,
    height: 150,
  },
});

Space.schema.virtual('url').get(function() {
  return '/space/' + this.slug;
});


Space.defaultColumns = 'title';
Space.register();
