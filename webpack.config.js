const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
				from: 'node_modules/typeface-alex-brush/**/*',
				to: 'vendor',
				transformPath: (targetPath) => {
					return targetPath.replace('node_modules/', '/');
				},
			},
			{
				from: 'node_modules/typeface-raleway/**/*',
				to: 'vendor',
				transformPath: (targetPath) => {
					return targetPath.replace('node_modules/', '/');
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
		]),
		new CleanWebpackPlugin('dist'),
	],
	resolve: {
		alias: {
			bootstrap: `${__dirname}/node_modules/bootstrap/dist/js/bootstrap.min`,
			inview: `${__dirname}/node_modules/waypoints/lib/shortcuts/inview.min`,
			jquery: `${__dirname}/node_modules/jquery/src/jquery`,
			'jquery.waypoints': `${__dirname}/node_modules/waypoints/lib/jquery.waypoints.min`,
			popper: `${__dirname}/node_modules/popper.js/dist/umd/popper.min`,
		},
	},
};
