const rollup = require('rollup');
const babel = require('@rollup/plugin-buble');
const commonjs = require('@rollup/plugin-commonjs');
const minify =  require('rollup-plugin-babel-minify');
const cleanup = require('rollup-plugin-cleanup');

module.exports = {

	buildJs: (params) => {

		const {input, output}  = params;

		const inputOptions = {
			input: input,
			plugins: [
				// resolve(),
				cleanup(),
				commonjs(),
				babel(),
				minify(),
			]
		};
		const outputOptions = {
			file: output,
			format: 'iife'
		};

		async function build() {
			// create a bundle
			const bundle = await rollup.rollup(inputOptions);
			const { output } = await bundle.generate(outputOptions);

			// or write the bundle to disk
			await bundle.write(outputOptions);

			// closes the bundle
			await bundle.close();
		}

		build();
	},
};