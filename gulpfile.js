const { src, dest, series } = require('gulp');
const del = require('del');
const merge = require('merge-stream');

const clean = () =>
	del([
		'vendor/**/*',
	]);

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
	copyFiles
);
