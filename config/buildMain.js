


module.exports = {

	buildJs: () => {

		const path = require('path');
		const rollup = require('rollup');
		const babel = require('@rollup/plugin-buble');
		// const {resolve} = require('@rollup/plugin-node-resolve');

		const commonjs = require('@rollup/plugin-commonjs');

		const inputOptions = {
			input: 'src/assets/js/main.js',
			plugins: [
				// resolve(),
				commonjs(),
				babel(),
			]
		};
		const outputOptions = {
			file: 'local/templates/html/js/app.min.js',
			format: 'iife'
		};

		async function build() {
			// create a bundle
			const bundle = await rollup.rollup(inputOptions);

			console.log(bundle.watchFiles); // an array of file names this bundle depends on

			// generate output specific code in-memory
			// you can call this function multiple times on the same bundle object
			const { output } = await bundle.generate(outputOptions);

			for (const chunkOrAsset of output) {
				if (chunkOrAsset.type === 'asset') {
					// For assets, this contains
					// {
					//   fileName: string,              // the asset file name
					//   source: string | Uint8Array    // the asset source
					//   type: 'asset'                  // signifies that this is an asset
					// }
					console.log('Asset', chunkOrAsset);
				} else {
					// For chunks, this contains
					// {
					//   code: string,                  // the generated JS code
					//   dynamicImports: string[],      // external modules imported dynamically by the chunk
					//   exports: string[],             // exported variable names
					//   facadeModuleId: string | null, // the id of a module that this chunk corresponds to
					//   fileName: string,              // the chunk file name
					//   implicitlyLoadedBefore: string[]; // entries that should only be loaded after this chunk
					//   imports: string[],             // external modules imported statically by the chunk
					//   importedBindings: {[imported: string]: string[]} // imported bindings per dependency
					//   isDynamicEntry: boolean,       // is this chunk a dynamic entry point
					//   isEntry: boolean,              // is this chunk a static entry point
					//   isImplicitEntry: boolean,      // should this chunk only be loaded after other chunks
					//   map: string | null,            // sourcemaps if present
					//   modules: {                     // information about the modules in this chunk
					//     [id: string]: {
					//       renderedExports: string[]; // exported variable names that were included
					//       removedExports: string[];  // exported variable names that were removed
					//       renderedLength: number;    // the length of the remaining code in this module
					//       originalLength: number;    // the original length of the code in this module
					//       code: string | null;       // remaining code in this module
					//     };
					//   },
					//   name: string                   // the name of this chunk as used in naming patterns
					//   referencedFiles: string[]      // files referenced via import.meta.ROLLUP_FILE_URL_<id>
					//   type: 'chunk',                 // signifies that this is a chunk
					// }
					console.log('Chunk', chunkOrAsset.modules);
				}
			}

			// or write the bundle to disk
			await bundle.write(outputOptions);

			// closes the bundle
			await bundle.close();
		}

		build();
	},

	buildMainJs: () => {
		const path = require('path');
		const TerserPlugin = require('terser-webpack-plugin');
		const webpack = require('webpack');
		const ASSET_PATH = process.env.ASSET_PATH || '/';
		const filename = (ext, directory) => `${directory}/[name].min.${ext}`;

		webpack({
			mode: 'production',
			entry: {
				app: ['babel-polyfill', path.resolve(__dirname, '../src/assets/js/main.js')],
			},
			output: {
				publicPath: ASSET_PATH,
				path: path.resolve(__dirname, '../local/templates/html/'),
				filename: filename('js', 'js'),
			},
			optimization: {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: {
							compress: false,
							mangle: false,
						},
					}),
				],
			},
			devtool: false,
			module: {
				rules: [
					{
						test: /\.txt$/i,//для добавления в main.js содержимого txt файлов импортом
						use: 'raw-loader',
					},
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: [
							// {
							//     loader: "apply-loader"
							// },
							{
								loader: "babel-loader",
								options: {
									presets: ['@babel/preset-env']
								}
							},
						]
					},
				]
			},
		}, (err, stats) => { // [Stats Object](#stats-object)
			if (err || stats.hasErrors()) {
				console.error(stats);
			}
		})
	}
};