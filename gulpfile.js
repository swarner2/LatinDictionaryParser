var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    miniCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync');

function errorLog(error) {
    console.error(error);
}

//auto-refresh browser
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  });
});

//get Index.html
gulp.task('copy-index-html', function(){
  gulp.src('index.html')
    .pipe(gulp.dest('build/'));
});

// Scripts task
// Uglifies
gulp.task('scripts', function(){
  gulp.src('scripts/*.js')
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
gulp.task('watchJs',['browserSync'],function(){
  gulp.watch('scripts/*.js', ['scripts', browserSync.reload]);
});

gulp.task('watchHTML',['browserSync'],function(){
  gulp.watch('index.html', ['copy-index-html', browserSync.reload]);
});

gulp.task('watchCSS',['browserSync'],function(){
  gulp.watch('css/*.css', ['styles', browserSync.reload]);
});

gulp.task('default', ['copy-index-html','scripts', 'styles', 'watchJs', 'watchHTML', 'watchCSS','browserSync']);
