// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var less = require('gulp-less');
var path = require('path');

// tasks
gulp.task('lint', function() {
  gulp.src(['./ui/**/*.js', '!./ui/bower_components/**', '!./ui/js/bundled.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('./distui/*')
      .pipe(clean({force: true, read: false}));
    gulp.src('./ui/js/bundled.js')
      .pipe(clean({force: true, read: false}));
});
gulp.task('less', function(){
   return gulp.src('./ui/css/*.less')
      .pipe(less({
         paths: [path.join(__dirname, 'less', 'includes')]
      }))
      .pipe(gulp.dest('./ui/css'));
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./ui/**/*.css', '!./ui/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./distui/'));
});
gulp.task('minify-js', function() {
  gulp.src(['./ui/**/*.js', '!./ui/bower_components/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./distui/'));
});
gulp.task('copy-bower-components', function () {
  gulp.src('./ui/bower_components/**')
    .pipe(gulp.dest('distui/bower_components'));
});
gulp.task('copy-html-files', function () {
  gulp.src('./ui/**/*.html')
    .pipe(gulp.dest('distui/'));
});
/*
gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});
gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});
*/
gulp.task('browserify', function() {
  gulp.src(['ui/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./ui/js'));
});
gulp.task('browserifyDist', function() {
  gulp.src(['ui/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./distui/js'));
});


// // *** default task *** //
// gulp.task('default',
//   ['lint', 'browserify', 'connect']
// );
// // *** build task *** //
// gulp.task('build',
//   ['lint', 'minify-css', 'browserifyDist', 'copy-html-files', 'copy-bower-components', 'connectDist']
// );

// *** default task *** //
gulp.task('default', function() {
  runSequence(
    ['clean', 'less'],
    ['lint'],
    ['browserify']
  );
});
// *** build task *** //
gulp.task('build', function() {
  runSequence(
    ['clean', 'less'],
    ['lint', 'minify-css', 'browserifyDist', 'copy-html-files', 'copy-bower-components']
  );
});
