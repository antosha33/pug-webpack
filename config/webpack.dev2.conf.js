//определяем страницу для dev сборки
const { pages: devPage } = require('../options');
// const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

const pug = require('pug');
const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');

const HtmlsWebpackPlugin = require('htmls-webpack-plugin');

const workerFarm = require('worker-farm');
const workers = workerFarm(require.resolve('./child.js'), ['renderHTML'])


// записываем названия папок с страницами в массив pages
const pages = fs.readdirSync(path.resolve(__dirname, '../src/pages/'));

const ASSET_PATH = process.env.ASSET_PATH || '/';
const isDevMode = false;


const asyncConfig = async () => {


	return {
		mode: 'production',
		devServer: {
			historyApiFallback: true,
			contentBase: path.join(__dirname, '../'),
			open: true,
			openPage: devPage === 'all' ? '/local/templates/html/index.html' : `/local/templates/html/${devPage}.html`,
			compress: true,
			// port: port,
			hot: false,
			writeToDisk: (filePath) => {
				if (filePath.includes('hot') ||
					filePath.includes('vendors') ||
					// filePath.includes('script.js') ||
					filePath.includes('style.js') ||
					filePath.includes('critical.js') ||
					// filePath.includes('script.min.js') ||
					filePath.includes('style.min.js')) return false;
				return true;
			},
		},
		// entry: WebpackWatchedGlobEntries.getEntries(
		// 	[
		// 		// path.resolve(__dirname, '../src/components/**/style.scss'),
		// 		// // path.resolve(__dirname, '../src/webpack_lists/critical_css.js'),
		// 		// path.resolve(__dirname, '../src/webpack_lists/critical_css.scss'),
		// 	],
		// ),
		output: {
			publicPath: '/',
			path: path.resolve(__dirname, '../local/templates/html/'),
		},
		devtool: false,
		module: {
			rules: [
				{
					test: /\.pug$/,
					exclude: /node_modules/,
					use: [

						{
							loader: "html-loader",
							options: {
								attributes: false//не учитываем default пути src для картинок и т.д.
							}
						},
						{
							loader: "pug-html-loader",
							options: {
								data: {
									dev_mode: isDevMode ? 'dev' : 'prod' //прокидываем переменную  непосредственно в PUG и включаем/выключаем подключение css, js на страницу  в зависимости от prod/dev
								},
								pretty: true//отключает компил html в одну строку
							}
						},
					]
				}
			]
		},
		optimization: {
		},
		plugins: [


			new HtmlsWebpackPlugin({
				htmls: [...pages.map(page => {
					if (page != devPage && devPage != 'all') return new Function.prototype.constructor();
					return {
						src: `./src/pages/${page}/${page}.pug`,
						filename: `${page}.html`,
						render: (file, params) => pug.renderFile(file, params)
					}
				})]
			})


			// здесь не получается распараллеливание организовать

			// new HtmlsWebpackPlugin({
			// 	htmls: [...pages.map(page => {
			// 		return new Promise(resolve => {
			// 			workers.renderHTML(page, (err, result) => {
			// 				if (err) return reject(err);
			// 				resolve(result);
			// 			});
			// 		});
			// 	})]
			// })


		]
	}
}

module.exports = asyncConfig;