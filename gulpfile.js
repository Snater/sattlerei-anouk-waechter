const { src, dest, series, parallel } = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');

const clean = () =>
	del([
		'css/*',
		'js/*.js',
		'vendor/**/*',
	]);

const compileSass = () =>
	src('scss/*.scss')
		.pipe(sass())
		.pipe(dest('css'));

const minifyCss = () =>
	src(['css/*.css', '!css/*.min.css'])
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(dest('css'));

const compileJs = () =>
	src([
		'js/*.es6'
	])
		.pipe(babel({presets: ['@babel/env']}))
		.pipe(concat('main.js'))
		.pipe(dest('js'));

const minifyJs = () =>
	src(['js/*.js', '!js/*.min.js'])
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(dest('js'));

const copyFiles = () =>
	merge(
		src([
			'node_modules/@babel/polyfill/dist/*',
		])
			.pipe(dest('vendor/@babel/polyfill')),

		src([
			'node_modules/bootstrap/dist/**/*',
			'!**/*.map'
		])
			.pipe(dest('vendor/bootstrap')),

		src([
			'node_modules/font-awesome/**/*',
			'!node_modules/font-awesome/**/*.map',
			'!node_modules/font-awesome/*',
			'!node_modules/font-awesome/less/*',
			'!node_modules/font-awesome/scss/*',
		])
			.pipe(dest('vendor/font-awesome')),

		src('node_modules/jquery/dist/jquery.*js')
			.pipe(dest('vendor/jquery')),

		src('node_modules/jquery.easing/*.js')
			.pipe(dest('vendor/jquery-easing')),

		src('node_modules/popper.js/dist/umd/popper.*js')
			.pipe(dest('vendor/popper')),

		src([
			'node_modules/waypoints/lib/**/*',
			'!node_modules/waypoints/lib/*',
			'node_modules/waypoints/lib/**/jquery.waypoints.*',
		])
			.pipe(dest('vendor/waypoints'))
	);

exports.default = series(
	clean,
	parallel(
		series(compileSass, minifyCss),
		series(compileJs, minifyJs),
		copyFiles
	)
);
