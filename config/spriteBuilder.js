const path = require('path');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const webpack = require('webpack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
module.exports = {
	spriteBuilder: (callback) => {
		const smp = new SpeedMeasurePlugin();
		webpack(smp.wrap(
			{
				mode: 'production',
				entry: {
					sprite: './src/webpack_lists/sprites.js',
				},
				output: {
					// publicPath: ASSET_PATH,
					path: path.resolve(__dirname, '../local/templates/html/images/'),
					filename: '[name]/script.min.js'
				},
				module: {
					rules: [
						{
							test: /\.svg$/,
							// include: ico,
							use: [
								{
									loader: 'svg-sprite-loader',
									options: {
										extract: true,
										spriteFilename: "sprite.svg",
										runtimeCompat: true,
										// outputPath: path.resolve(__dirname, '../local/templates/html/image'),
									}
								},
								{
									loader: 'svgo-loader',
									options: {
										plugins: [
											{ removeAttrs: { attrs: '(stroke)' } },
										]
									}
								}
							]
						},
					]
				},
				plugins: [
					new SpriteLoaderPlugin({
						plainSprite: true,
					}),
				]
			}), (err, stats) => { // [Stats Object](#stats-object)
			if (err || stats.hasErrors()) {
				console.error(stats);
			}
			console.log('\x1b[36m%s\x1b[0m', 'sprite builded');

			if (callback) {
				callback();
			}

		})
	}
}