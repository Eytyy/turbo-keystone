var keystone = require('keystone');
var Types = keystone.Field.Types;

var storage = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    key: process.env.AWSAccessKeyId,
    secret: process.env.AWSSecretKey,
    bucket: process.env.S3BucketName,
    region: 'us-west-2',
    path: '/resources/front-video',
  },
});

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
  placeholder: {
    type: Types.CloudinaryImage,
    folder: 'intro',
    autoCleanup : true,
  },
  video: { type: Types.File, storage: storage },
});

Video.defaultColumns = 'title';
Video.register();
