const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const glob = require('glob');//дает возможность использовать */*.pug
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globImporter = require('node-sass-glob-importer');
const filename = (ext, directory) =>
	isDevMode
		? `${directory}/[name].min.${ext}`
		: `${directory}/[name].min.${ext}`;
const isDevMode = process.env.MODE === 'development';
module.exports = {
	criticalPreBuild: () => {
		return new Promise((resolve, reject) => {


			//? или получить из webpack.base.conf.js
			const isDevMode = process.env.MODE === 'development';


			let flag = true;
			if (flag) {
				fs.writeFileSync(path.resolve(__dirname, `../src/webpack_lists/critical_mixins_components.scss`), '');
				flag = false;
			}

			// массив путей до файлов крит стилей миксинов/компонентов
			let cssCriticalMixinsDirs = glob.sync("src/mixins/*/*.scss"),
				cssCriticalComponentsDirs = glob.sync("src/components/*/critical.scss"),
				cssCriticalDirs = cssCriticalMixinsDirs.concat(cssCriticalComponentsDirs);
			//формируем содержимое файла critical_mixins_components.scss
			cssCriticalDirs.map(function (fileName, index) {
				let dirFilename = fileName.replace('src/', '');
				fs.appendFileSync(`src/webpack_lists/critical_mixins_components.scss`, '@import "../' + dirFilename + '";\n');
			});

			webpack(
				{
					entry: {
						critical: path.resolve(__dirname, '../src/webpack_lists/critical_css.scss'),
					},
					output: {
						publicPath: '/',
						path: path.resolve(__dirname, '../local/templates/html/'),
						filename: filename('js', 'dev_files'),
					},
					devtool: false,
					mode: 'production',
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
											url: false
										}
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
									}
								]
							},
						]
					},
					plugins: [
						new MiniCssExtractPlugin({
							filename: 'critical.css',
						})
					]
				}, (err, stats) => { // [Stats Object](#stats-object)
					if (err || stats.hasErrors()) {
						console.error(stats);
					}
					resolve();
					console.log('CRITICAL PREBUILD');
				})
		})

	},


	criticalBuild: (callback) => {
		webpack({
			entry: {
				critical: path.resolve(__dirname, '../src/webpack_lists/critical_css.scss'),
			},
			output: {
				publicPath: '/',
				path: path.resolve(__dirname, '../local/templates/html/'),
				filename: filename('js', 'dev_files'),
			},
			devtool: false,
			mode: 'production',
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
									url: false
								}
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
							}
						]
					},
				]
			},
			plugins: [
				new MiniCssExtractPlugin({
					filename: 'critical.css',
				})
			]
		}, (err, stats) => { // [Stats Object](#stats-object)
			if (err || stats.hasErrors()) {
				console.error(stats);
			}
			console.log('CRITICAL BUILDED');
			if (callback) {
				console.log('REBUILD PUG');
				callback();
			}

		})
	}
};