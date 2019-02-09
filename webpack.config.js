const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const removeNodeModulesDir = targetPath => targetPath.replace('node_modules/', '/');

module.exports = {
	mode: 'production',
	devtool: false,
	entry: {
		main: './js/index.es6.js',
		'conditional-polyfill': './js/conditional-polyfill.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'web/dist')
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true
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
				test: /\.js$/,
				exclude: [/node_modules/, /\.es6.js$/],
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
		new StyleLintPlugin(),
		new CopyWebpackPlugin([
			{
				from: 'node_modules/@babel/polyfill/dist/*',
				to: 'vendor',
				transformPath: removeNodeModulesDir,
			},
			{
				from: 'node_modules/typeface-alex-brush/**/*',
				to: 'vendor',
				transformPath: removeNodeModulesDir,
			},
			{
				from: 'node_modules/typeface-raleway/**/*',
				to: 'vendor',
				transformPath: removeNodeModulesDir,
			},
			{
				from: 'node_modules/font-awesome/**/*',
				to: 'vendor',
				ignore: [
					'node_modules/font-awesome/**/*.map',
					'node_modules/font-awesome/*',
					'node_modules/font-awesome/less/*',
					'node_modules/font-awesome/scss/*',
				],
				transformPath: removeNodeModulesDir,
			},
		]),
		new CleanWebpackPlugin('web/dist'),
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
