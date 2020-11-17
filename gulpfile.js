const gulp = require('gulp');
const jshint = require('gulp-jshint');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function(){
    return gulp.src("scss/main.scss")
    .pipe(sass({
        outputStyle: 'nested',
        sourceComments: 'map'
    }).on("error", sass.logError))

    .pipe(gulp.dest("css"))
});

gulp.task("watch", function(){
  gulp.watch("scss/*.scss", gulp.series("sass"));
});


gulp.task('sass', function() {
    return gulp.src('scss/main.scss')
             .pipe(sourcemaps.init())
             .pipe(sass({errLogToConsole: true}))
             .pipe(sourcemaps.write())
             .pipe(gulp.dest('css'))
    });