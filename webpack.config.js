const path = require('path');

module.exports = {
	mode: 'production',
	entry: './js/index.es6.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.es6.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-env']
				}
			}
		]
	}
};
