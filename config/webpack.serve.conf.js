
const { pages: devPage } = require('../options');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const portChecker = require('./portChecker.js');
const path = require('path');
const wsLiveReload = require('./wsHMR.js');
const globImporter = require('node-sass-glob-importer');


const CopyWebpackPluginConf = () => {
	const baseConf = [
		{
			from: 'src/components/**/script.js',
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

const asyncConfig = async () => {
	// const port = await portChecker(3000, '127.0.0.1');

	// const lv = new wsLiveReload(port);

	// lv.createWatcher('styles', 'local/templates/html/**/style.css', 'styles');

	return {
		mode: 'development',
		devServer: {
			historyApiFallback: true,
			contentBase: path.join(__dirname, '../'),
			open: true,
			openPage: devPage === 'all' ? '/local/templates/html/index.html' : `/local/templates/html/${devPage}.html`,
			compress: true,
			hot: false,
			port: 3000,
			writeToDisk: (filePath) => {
				if (filePath.includes('hot') ||
					filePath.includes('vendors') ||
					filePath.includes('style.js') ||
					filePath.includes('critical.js') ||
					filePath.includes('critical_css.js') ||
					filePath.includes('style.min.js')) return false;
				return true;
			},
		},
		entry: WebpackWatchedGlobEntries.getEntries(
			[
				path.resolve(__dirname, '../src/components/**/style.scss'),
				// path.resolve(__dirname, '../src/webpack_lists/critical_css.js'),
				path.resolve(__dirname, '../src/webpack_lists/critical_css.scss'),
			],
		),
		output: {
			publicPath: '/',
			path: path.resolve(__dirname, '../local/templates/html/'),
		},
		devtool: false,
		module: {
			rules: [
				{
					test: /\.s?css$/i,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									webpackImporter: false,
									importer: globImporter(),
									import: false
								}
							}
						},
					]
				},
			]
		},
		optimization: {
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: ({ chunk }) => {
					// console.log('CHUNK =>>>>>>', chunk.name);
					if (chunk.name == 'critical_css') {
						return 'critical.css';
					} else {
						return 'components-template/[name].css';
					}
				}
			}),

			// new CopyWebpackPlugin({
			// 	patterns: CopyWebpackPluginConf()
			// }),
		]
	}
}
module.exports = asyncConfig;