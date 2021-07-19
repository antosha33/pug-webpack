const chokidar = require('chokidar');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { pugBuilder } = require('./buildPug');
const { criticalBuild } = require('./criticalPreBuild');
const { buildJs } = require('./buildMain');
const { ajaxPugBuilder } = require('./buildAjaxPug');
const { spriteBuilder } = require('./spriteBuilder');
const wsLiveReload = require('./wsHMR.js');
const dependenciesTree = require('./pugDependencies');
class SLAMBOX {
	constructor() {
		// this.ajaxWatch();
		this.spriteWatch();
		// this.criticalWatch();
		// this.importMixins();
		// this.wsHMR();
		// this.buildCritical();
	}

	async getTreePugDependencies() {
		return await dependenciesTree();
	}



	pugWatch() {

		const getPagesForRebuild = (path) => {
			const arr = [];
			const pagePath = path.split('\\').join('/');
			SLAMBOX.dependencies.forEach((item) => {
				if (item.deps.includes(path.normalize())) {
					arr.push(item.path);
				}
				if (item.path.includes(pagePath)) {
					arr.push(item.path);
				}
			})
			return arr;
		}

		(function () {
			const watcher = chokidar.watch(['src/components/**/*.pug', 'src/layout/**/*.pug', 'src/mixins/**/*.pug', 'src/pages/**/*.pug'], { persistent: true });
			let isReady = false
			watcher.on('change', path => {
				if (!isReady) return;
				const pages = getPagesForRebuild(path);
				pugBuilder(pages, async () => {
					console.log('\x1b[36m%s\x1b[0m', 'rebuild dependencies tree  =>>>>>>');
					SLAMBOX.dependencies = await dependenciesTree();
					console.log('\x1b[36m%s\x1b[0m', 'dependencies tree rebuilded');
				});
			})
			watcher.on('ready', () => isReady = true);
		})();
	}

	criticalWatch() {
		(function () {
			const watcher = chokidar.watch(['src/components/**/critical.scss', 'src/assets/**/*.scss', 'src/mixins/**/*.scss'], { persistent: true });
			let isReady = false
			watcher.on('change', () => {
				if (!isReady) return;
				criticalBuild(() => pugBuilder());
			})
			watcher.on('ready', () => isReady = true);
		})();
	}

	buildCritical() {
		criticalBuild(async () => {
			SLAMBOX.dependencies = await this.getTreePugDependencies();
			this.pugWatch()
			pugBuilder();
		});
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
	

	ajaxWatch(){
		ajaxPugBuilder();
		(function () {
			const watcher = chokidar.watch('src/components/**/ajax__*.pug', { persistent: true });
			let isReady = false
			watcher.on('change', () => {
				if (!isReady) return;
				ajaxPugBuilder();
			})
			watcher.on('ready', () => isReady = true);
		})();
	}

	spriteWatch(){
		spriteBuilder();
	}

	buildMainJs() {
		buildJs();
	}


	wsHMR() {
		const lv = new wsLiveReload(3000);
		lv.createWatcher('styles', 'local/templates/html/**/style.css', 'styles');
		lv.createWatcher('html', 'local/templates/html/*.html', 'reload');
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