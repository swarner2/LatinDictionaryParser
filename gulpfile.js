var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    miniCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    flatten = require('gulp-flatten'),
    clean = require('gulp-clean');

function errorLog(error) {
    console.error(error);
}

gulp.task('clean', function(){
  gulp.src('build', {read: false})
    .pipe(clean());
});

//auto-refresh browser
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    port: process.env.PORT || 8080,
  });
});

//get Index.html
gulp.task('copy-index-html', function(){
  gulp.src('index.html')
    .pipe(gulp.dest('build/'));
});

//get all other html
gulp.task('copy-html', function(){
  gulp.src('scripts/modules/**/*.html')
    .pipe(flatten())
    .pipe(gulp.dest('build/html/'));
});

// Scripts task
// Uglifies
gulp.task('scripts', function(){
  gulp.src('scripts/**/*.js')
    .pipe(uglify())
    .on('error', errorLog)
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/js'));
});

//Styles task
//Uglifies
gulp.task('styles', function(){
  gulp.src('css/*.css')
    .pipe(miniCSS())
    .on('error', errorLog)
    .pipe(gulp.dest('build/css'));
});

// Watcher Tasks
// watches JS
gulp.task('watch',['browserSync'],function(){
  gulp.watch('scripts/**/*.js', ['scripts', browserSync.reload]);
  gulp.watch('index.html', ['copy-index-html', browserSync.reload]);
  gulp.watch('scripts/modules/**/*.html', ['copy-html', browserSync.reload]);
  gulp.watch('css/*.css', ['styles', browserSync.reload]);
});

gulp.task('serveprod', function() {
  connect.server({
    root: 'build',
    port: process.env.PORT || 5000, // localhost:5000
    livereload: false
  });
});

gulp.task('build',['copy-index-html', 'copy-html' ,'scripts', 'styles', 'serveprod']);

gulp.task('default', ['copy-index-html', 'copy-html' ,'scripts', 'styles', 'watch', 'browserSync']);
