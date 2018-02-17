'use-strict';

var gulp = require('gulp'),
	$ = require('gulp-load-plugins')({ lazy: true });

var paths = require('../../paths.js'),
	config = require('../../config.js')();

gulp.task('es-lint', function() {
	console.log('-> Running eslint');

	// Select files
	gulp.src(`${paths.js}/**/*.js`)
	// Check for errors
	.pipe($.eslint())
	// Format errors
	.pipe($.eslint.format())
});

gulp.task('jslint', function() {
	console.log('-> Running JSLint');

	// Select files
	gulp.src(`${paths.js}/**/*.js`)
	// Check for errors
	.pipe($.jshint())
	// Format errors
	.pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
	.pipe($.jshint.reporter('fail'));
});

gulp.task('js', ['es-lint', 'jslint'], function() {
	var env = ((config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');

	console.log('-> Compiling Javascript for ' + config.environment);

	if (env) {
		// Select files
		gulp.src(`${paths.to.js.in}/*.js`)
		// Concatenate includes
		.pipe($.include())
		// Transpile
		.pipe($.babel())
		// Save unminified file
		.pipe(gulp.dest(`${paths.to.js.out}`))
	} else {
		// Select files
		gulp.src(`${paths.to.js.in}/*.js`)
		// Concatenate includes
		.pipe($.include())
		// Transpile
		.pipe($.babel())
		// Save unminified file
		.pipe(gulp.dest(`${paths.to.js.out}`))
		// Show file-size before compression
		.pipe($.size({ title: 'Javascript In Size' }))
		// Optimize and minify
		.pipe($.uglify())
		// Show file-size after compression
		.pipe($.size({ title: 'Javascript Out Size' }))
		// Append suffix
		.pipe($.rename({
			suffix: '.min',
		}))
		// Save minified file
		.pipe(gulp.dest(`${paths.to.js.out}`))
	}

});
