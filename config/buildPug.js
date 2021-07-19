const { pages: devPage } = require('../options');
const pug = require('pug');
const path = require('path');
const fs = require('fs');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const workerFarm = require('worker-farm');
const HtmlsWebpackPlugin = require('htmls-webpack-plugin');
const webpack = require('webpack');
module.exports = {
	pugBuilder: (pages = [], callback) => {
		// записываем названия папок с страницами в массив pages
		if (pages.length == 0) {
			pages = fs.readdirSync(path.resolve(__dirname, '../src/pages/')).filter((page) => {
				if (devPage === 'all') return true;
				return page == devPage;
			}).map((page) => path.parse(page).name);
		} else {
			pages = pages.map((page) => path.parse(page).name);
		}


		const smp = new SpeedMeasurePlugin();

		const workers = workerFarm(require.resolve('./pugRender.js'))


		const isDevMode = false;

		

		webpack(smp.wrap(
			{
				mode: 'production',
				entry: './src/index.js',
				output: {
					publicPath: '/',
					path: path.resolve(__dirname, '../local/templates/html/'),
				},
				cache: true,
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
						htmls: [...pages.map((page, index) => {

							try {
								if (pages.length > 1) {
									// use worker-farm for parallel pug render
									return {
										src: `./src/pages/${page}/${page}.pug`,
										filename: `${page}.html`,
										async render() {
											const string = await new Promise((resolve, reject) => {
												try {
													workers(page, (err, render) => {
														if (err) {
															reject(err);
														};
														resolve(render);
														if (index === page.length - 1) {
															workerFarm.end(workers);
														}
													})
												} catch (err) {
													console.error('ERROR =>>>>>>>', err);
													workerFarm.end(workers);
												}

											})
											return string;
										}
									}
								} else {
									// worker-farm not needed for one page
									return {
										src: `./src/pages/${page}/${page}.pug`,
										filename: `${page}.html`,
										render: (file) => {
											try {
												return pug.renderFile(file, { pretty: true })
											} catch (err) {
												console.error('ERROR =>>>>>>>', err);
											}
										}
									}
								}
							} catch {
								throw new Error('PUG BUILD ERROR');
							}

						})]
					})

				]
			}), (err, stats) => { // [Stats Object](#stats-object)
				if (err || stats.hasErrors()) {
					console.error(stats);
				}
				console.log('\x1b[36m%s\x1b[0m', 'html builded');

				if (callback) {
					callback();
				}

			})
	}
}