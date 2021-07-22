
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = {
	copyPlugin: async () => {
		return new Promise((resolve, reject) => {
			const CopyWebpackPluginConf = () => {
				const baseConf = [
					{
						from: './src/components/**/script.js',
						to: ({ absoluteFilename }) => {
							const output = `components-template/${absoluteFilename.split('\\').join('/').match(/(?<=components\/).*(?=script\.js)/g)[0]}script.min.js`;
							return output;
						},
					},
				]
				return [
					...baseConf,
					{
						from: 'vendor/*.js',
						context: './src/assets/js/',
						to: path.resolve(__dirname, '../local/templates/html/js/')
					},
					{
						from: 'jquery/*.js',
						context: './src/assets/js/',
						to: path.resolve(__dirname, '../local/templates/html/js/')
					},
					{
						from: '**/*',
						context: './src/assets/images/',
						to: 'images',
						noErrorOnMissing: true
					}
				]
			}
	
			webpack(
				{
					entry: './src/index.js',
					output: {
						publicPath: '/',
						path: path.resolve(__dirname, '../local/templates/html/'),
					},
					devtool: false,
					mode: 'production',
					plugins: [
						new CopyWebpackPlugin({
							patterns: CopyWebpackPluginConf()
						}),
					]
				}, (err, stats) => { // [Stats Object](#stats-object)
					if (err || stats.hasErrors()) {
						console.error(stats);
						reject(err);
					}
					console.log('\x1b[36m%s\x1b[0m', 'copyPluginEnd');
					resolve();
				})
		})

	}
}
