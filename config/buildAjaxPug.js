const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const HtmlsWebpackPlugin = require('htmls-webpack-plugin');
const pug = require('pug');
module.exports = {
	ajaxPugBuilder: (callback) => {
		// записываем названия папок с страницами в массив pages

		const runWebpack = (components) => {
			const smp = new SpeedMeasurePlugin();
			webpack(smp.wrap(
				{
					mode: 'production',
					entry: './src/index.js',
					output: {
						publicPath: '/',
						path: path.resolve(__dirname, '../local/templates/html/components-template/'),
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
							htmls: [...components.map((component, index) => {
								return {
									src: component,
									filename: component.replace('src/components/', '').replace('.pug', '.html'),
									render: (file) => {
										try {
											return pug.renderFile(file, { pretty: true })
										} catch (err) {
											console.error('ERROR =>>>>>>>', err);
										}
									}
								}
							})]
						})

					]
				}), (err, stats) => { // [Stats Object](#stats-object)
					if (err || stats.hasErrors()) {
						console.error(stats);
					}
					console.log('\x1b[36m%s\x1b[0m', 'ajax pug builded');

					if (callback) {
						callback();
					}

				})
		}


			glob("src/components/**/ajax__*.pug", function (er, files) {
				runWebpack(files);
			});

			const isDevMode = false;
	}
}