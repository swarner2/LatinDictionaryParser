var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

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
  console.log('runs styles tasks');
});

// Watcher Tasks
// watches JS
gulp.task('watchJs',function(){
  gulp.watch('scripts/*.js', ['scripts']);
});

gulp.task('watchHTML',function(){
  gulp.watch('index.html', ['copy-index-html']);
});

gulp.task('default', ['copy-index-html','scripts', 'styles', 'watchJs', 'watchHTML']);
