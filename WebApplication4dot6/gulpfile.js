/// <binding AfterBuild='default' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
	gulputil = require('gulp-util'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	bower = require('gulp-bower'),
    sourcemaps = require('gulp-sourcemaps'),
	minifyCss = require('gulp-minify-css');

var config = {
    bowerDir: './bower_components'
}

gulp.task('default', ['bower', 'move-assets', 'scripts', 'minify-css']);

gulp.task('scripts', function () {
    gulp.src('js/lib/*.js')
        .pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
        .pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('js/min'));
});

gulp.task('bower', function () {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

gulp.task('move-assets', function () {
    gulp.src([config.bowerDir + '/bootstrap/dist/js/bootstrap.js',
        config.bowerDir + '/jquery/dist/jquery.js'
        ]).pipe(gulp.dest('js/lib'));
    gulp.src([config.bowerDir + '/bootstrap/dist/css/bootstrap.css',
        config.bowerDir + '/bootstrap/dist/css/bootstrap-theme.css'
        ]).pipe(gulp.dest('Content'));
});

gulp.task('minify-css', function () {
    return gulp.src('./Content/*.css')
      .pipe(sourcemaps.init())
      .pipe(concat('site.min.css'))
      .pipe(minifyCss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('Content'));
});