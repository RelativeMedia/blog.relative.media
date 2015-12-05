var gulp     = require('gulp');
var es       = require('event-stream');
var plugins  = require('gulp-load-plugins')();
var pngquant = require('imagemin-pngquant');
var pkg      = require('./package.json');

gulp.task('clean', function (){
  return gulp.src(['.tmp', 'dist'], {read: false})
  .pipe( plugins.clean() );
});

gulp.task('inject', function (){
  var target = gulp.src('./src/default.hbs');
  var source = gulp.src([
    './src/assets/css/**/*.css',
    './src/assets/js/jquery.min.js',
    './src/assets/js/**/*.js'
  ], { read: false });
  return target.pipe( plugins.inject(source) )
  .pipe(gulp.dest('./src'));
});

gulp.task('img:optimize', function (){
  return gulp.src(['src/assets/img/*'])
  .pipe( plugins.imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('.tmp/assets/img'));
});

gulp.task('concat:css', function (){
  return gulp.src([
    'src/assets/css/**/*.css'
  ])
  .pipe( plugins.concatCss('all.css') )
  .pipe( plugins.cssmin() )
  .pipe( gulp.dest('.tmp/assets/css/') )
});

gulp.task('concat:js', function (){
  return gulp.src([
    'src/assets/js/jquery.min.js',
    'src/assets/js/**/*.js'
  ])
  .pipe( plugins.concat('all.js') )
  .pipe( gulp.dest('.tmp/assets/js') )
});


gulp.task('copy', ['clean'], function () {
  gulp.src(['src/assets/fonts/**/*'])
    .pipe( gulp.dest( '.tmp/assets/fonts') );
  gulp.src(['./package.json'])
    .pipe( gulp.dest( '.tmp/') );
  gulp.src(['src/*.hbs'])
    .pipe( gulp.dest( '.tmp/') );
});

gulp.task('inject:prod', ['concat:css', 'concat:js'], function (){
  var target = gulp.src('.tmp/default.hbs');
  var sources = gulp.src(['.tmp/assets/css/**/*.css', '.tmp/assets/js/**/*.js']);
  return target.pipe( plugins.inject(sources, {
    relative: true,
    addRootSlash: true
  }) )
  .pipe(gulp.dest('.tmp'));
});


gulp.task('bump:major', function (){
  gulp.src(['./package.json'])
    .pipe( plugins.bump({type:'major'}) )
    .pipe(gulp.dest('./'));
});
gulp.task('bump:minor', function (){
  gulp.src(['./package.json'])
    .pipe( plugins.bump({type:'minor'}) )
    .pipe(gulp.dest('./'));
});
gulp.task('bump:patch', function (){
  gulp.src(['./package.json'])
    .pipe( plugins.bump({type:'patch'}) )
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['copy', 'inject:prod', 'img:optimize'], function () {
  return gulp.src('.tmp/**/*')
    .pipe( plugins.tar('build-latest.tar') )
    .pipe( plugins.gzip() )
    .pipe( gulp.dest('./dist') );
});
