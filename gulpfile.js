var _gulp = require('gulp');
var gulpHelp = require('gulp-help');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var Del = require('del');

const gulp = gulpHelp(_gulp);
const reload = browserSync.reload;

// Paths config
const paths = {
  src: [
    './models/**/*.js',
    './routes/**/*.js',
    'keystone.js',
    'package.json',
  ],
  style: {
    all: './public/styles/**/*.scss',
    output: './public/styles/',
    dev: './public/styles/**/*.css',
    dest: './dist/styles/'
  },
  js: {
    all: './.tmp/*.js',
    dest: './dist/js/',
  },
  vendor: {
    all: [
      './public/js/vendor/*.js',
      './public/js/jquery/jquery-1.11.3.min.js'
    ],
    dest: './dist/js/vendor/',
  },
  fonts: {
    all: './public/fonts/**/*',
    dest: './dist/fonts/',
  },
};


gulp.task('sass', 'Compile sass files', function() {
  gulp.src(paths.style.all)
    .pipe(watch(paths.style.all))
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.style.dest))
    .pipe(reload({ stream: true }));
});


// Production tasks
gulp.task('prod css', 'production css files', function() {
  return gulp.src(paths.style.dev)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest(paths.style.dest));
});

gulp.task('prod js', 'production javascript files', function(cb) {
  pump([
      gulp.src(paths.js.all),
      uglify(),
      rename({
        suffix: '.min'
      }),
      gulp.dest(paths.js.dest)
    ],
    cb
  );
});

gulp.task('clean', 'clean dist folder', function(cb) {
  Del([
    './dist/**/*',
  ], cb);
});

gulp.task('prod vendor', 'copy vendor scripts to dist folder', function() {
  return gulp.src(paths.vendor.all)
    .pipe(gulp.dest(paths.vendor.dest))
});

gulp.task('prod fonts', 'copy fonts to dist folder', function() {
  return gulp.src(paths.fonts.all)
    .pipe(gulp.dest(paths.fonts.dest))
});


gulp.task('runKeystone', shell.task('node keystone.js'));

gulp.task('default', ['sass', 'runKeystone']);
gulp.task('production', ['clean', 'prod css', 'prod js', 'prod fonts', 'prod vendor']);
