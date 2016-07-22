var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
    miniCSS = require('gulp-minify-css');

function errorLog(error) {
    console.error(error);
}
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
gulp.task('watchJs',function(){
  gulp.watch('scripts/*.js', ['scripts']);
});

gulp.task('watchHTML',function(){
  gulp.watch('index.html', ['copy-index-html']);
});

gulp.task('watchCSS',function(){
  gulp.watch('css/*.css', ['styles']);
});

gulp.task('default', ['copy-index-html','scripts', 'styles', 'watchJs', 'watchHTML']);
