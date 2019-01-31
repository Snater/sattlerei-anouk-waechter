const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	mode: 'production',
	entry: './js/index.es6.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: false
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	module: {
		rules: [
			{
				test: /\.es6.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-env']
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader', options: {url: false}
					},
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new CopyWebpackPlugin([
			{
				from: 'node_modules/@babel/polyfill/dist/*',
				to: 'vendor/@babel/polyfill',
				transformPath: (targetPath) => {
					return targetPath.replace('node_modules/@babel/polyfill/dist/', '/');
				},
			},
			{
				from: 'node_modules/bootstrap/dist/**/*',
				to: 'vendor/bootstrap',
				ignore: [
					'**/*.map',
				],
				transformPath: (targetPath) => {
					return targetPath.replace('node_modules/bootstrap/dist/', '/');
				},
			},
			{
				from: 'node_modules/font-awesome/**/*',
				to: 'vendor/font-awesome',
				ignore: [
					'node_modules/font-awesome/**/*.map',
					'node_modules/font-awesome/*',
					'node_modules/font-awesome/less/*',
					'node_modules/font-awesome/scss/*',
				],
				transformPath: (targetPath) => {
					return targetPath.replace('node_modules/font-awesome/', '/');
				},
			},
			{
				from: 'node_modules/jquery/dist/jquery.*js',
				to: 'vendor/jquery',
				transformPath: (targetPath,) => {
					return targetPath.replace('node_modules/jquery/dist/', '/');
				},
			},
			{
				from: 'node_modules/jquery.easing/*.js',
				to: 'vendor/jquery-easing',
				transformPath: (targetPath) => {
					return targetPath.replace('node_modules/jquery.easing/', '/');
				},
			},
			{
				from: 'node_modules/popper.js/dist/umd/popper.*js',
				to: 'vendor/popper',
				transformPath: (targetPath) => {
					return targetPath.replace('node_modules/popper.js/dist/umd/', '/');
				},
			},
			{
				from: 'node_modules/waypoints/lib/**/*',
				to: 'vendor/waypoints',
				ignore: [
					'node_modules/waypoints/lib/*',
				],
				transformPath: (targetPath) => {
					return targetPath.replace('node_modules/waypoints/lib/', '/');
				},
			},
			{
				from: 'node_modules/waypoints/lib/**/jquery.waypoints.*',
				to: 'vendor/waypoints',
				transformPath: (targetPath) => {
					return targetPath.replace('node_modules/waypoints/lib/', '/');
				},
			},
		]),
		new CleanWebpackPlugin('dist'),
	]
};
