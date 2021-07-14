
module.exports = {
	pugBuilder: () => {
		const { pages: devPage } = require('../options');
		const pug = require('pug');
		const path = require('path');
		const fs = require('fs');
		const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
		const smp = new SpeedMeasurePlugin();
		const HtmlsWebpackPlugin = require('htmls-webpack-plugin');
		const workerFarm = require('worker-farm');
		const workers = workerFarm(require.resolve('./pugRender.js'))

		// записываем названия папок с страницами в массив pages
		const pages = fs.readdirSync(path.resolve(__dirname, '../src/pages/')).filter((page) => {
			if (devPage === 'all') return true;
			return page == devPage;
		});

		const isDevMode = false;

		const webpack = require('webpack');

		webpack(smp.wrap(
			{
				mode: 'production',
				entry: './src/index.js',
				output: {
					publicPath: '/',
					path: path.resolve(__dirname, '../local/templates/html/'),
				},
				cache: false,
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
							if (pages.length > 1) {
								// use worker-farm for parallel pug render
								return {
									src: `./src/pages/${page}/${page}.pug`,
									filename: `${page}.html`,
									async render() {
										const string = await new Promise((resolve, reject) => {
											workers(page, (err, render) => {
												if (err) return err;
												resolve(render);
												if (index === page.length - 1) {
													workerFarm.end(workers)
												}
											})
										})
										return string;
									}
								}
							} else {
								// worker-farm not needed for one page
								return {
									src: `../src/pages/${page}/${page}.pug`,
									filename: `${page}.html`,
									render: (file) => pug.renderFile(file, { pretty: true })
								}
							}
						})]
					})

				]
			}), (err, stats) => { // [Stats Object](#stats-object)
				if (err || stats.hasErrors()) {
					console.error(err);
				}
				console.log('html builded');
			})
	}
}