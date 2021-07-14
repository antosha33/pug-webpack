const chokidar = require('chokidar');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { pugBuilder } = require('./buildPug');


class SLAMBOX {
	constructor() {
		this.importMixins();
		this.buildCritical();
		this.buildHtml();
		this.pugWatch();
	}

	pugWatch() {
		(function () {
			const watcher = chokidar.watch(['src/components/**/*.pug', 'src/layout/**/*.pug', 'src/mixins/**/*.pug', 'src/pages/**/*.pug'], { persistent: true });
			let isReady = false
			const regExp = /.(scss|sass|js)$/;
			watcher.on('change', path => {
				if (!isReady) return;
				pugBuilder();

			})
			watcher.on('ready', () => isReady = true);
		})();
	}

	buildHtml() {
		try {
			pugBuilder();
		} catch {
			console.error('PUG BUILD ERROR')
		}
	}

	importMixins() {

		const importMixins = this.importMixins.bind(this);

		fs.writeFileSync(path.resolve(__dirname, `../src/webpack_lists/mixins.pug`), '');
		glob("src/**/mixin__*.pug", function (er, files) {
			files.map(function (fileName) {
				let dirFilename = fileName.replace('src/', '');
				fs.appendFileSync(`src/webpack_lists/mixins.pug`, 'include ../' + dirFilename + '\n');
			})
		});

		// watch for changes in components and rewrite imports

		(function () {
			const watcher = chokidar.watch('src/components/*/mixin__*.pug', {
				persistent: true
			});
			let isReady = false
			watcher.on('add', path => {
				if (!isReady) return;
				importMixins();
			})
			watcher.on('unlink', path => {
				if (!isReady) return;
				importMixins();
			})
			watcher.on('ready', () => isReady = true);
		})();
	}

	buildCritical() {

	}
}

const watcher = new SLAMBOX();

// (function () {
// 	const watcher = chokidar.watch('src/**/*.pug', { persistent: true });
// 	let isReady = false
// 	const regExp = /.(scss|sass|js)$/;
// 	watcher.on('change', path => {
// 		console.log('here');
// 		pugBuilder();
// 		// if (!isReady) return;
// 		// const newPath = path.replace(/\\/g, '/');
// 		// const noSrcPath = newPath.replace('src', '');
// 		// fs.appendFileSync(`src/webpack_lists/mixins.pug`, 'include ..' + noSrcPath + '\n');
// 	})
// 	// watcher.on('unlink', path => {
// 	// 	console.log('unlink')
// 	// 	if (!isReady) return;
// 	// 	const newPath = path.replace(/\\/g, '/');
// 	// 	const noSrcPath = newPath.replace('src', '')
// 	// 	const remove = new RegExp(`include ..${noSrcPath}`);
// 	// 	console.log(noSrcPath);
// 	// 	const pugfile = fs.readFileSync(`src/webpack_lists/mixins.pug`, { encoding: 'utf-8' });
// 	// 	const updatedPugFile = pugfile.replace(remove, '');
// 	// 	fs.writeFileSync(`src/webpack_lists/mixins.pug`, updatedPugFile, 'utf-8');
// 	// })
// 	// watcher.on('ready', () => isReady = true);
// })();