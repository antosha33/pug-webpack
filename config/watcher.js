const chokidar = require('chokidar');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { pugBuilder } = require('./buildPug');
const { criticalBuild } = require('./criticalPreBuild');
const { buildJs } = require('./buildMain');
const { ajaxPugBuilder } = require('./buildAjaxPug');
const { copyPlugin } = require('./copyPlugin');
const wsLiveReload = require('./wsHMR.js');
const dependenciesTree = require('./pugDependencies');
const { exec } = require('child_process');
class SLAMBOX {
	constructor() {
		this.init()
	}

	async init() {
		await copyPlugin();
		this.importMixins();
		this.ajaxWatch();
		// this.spriteWatch();
		this.criticalWatch();
		this.spriteWatcher();
		this.wsHMR();
		this.buildCritical();
		this.jsWatch();
		this.buildMainJs();
		exec('npm run ndSprite');
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
				if(path.includes('ajax')) return;
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
				console.log('here');
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


	ajaxWatch() {
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

	// spriteWatch(){
	// 	spriteBuilder();
	// }

	buildMainJs() {
		buildJs({
			input: path.resolve(__dirname, '../src/assets/js/main.js'),
			output: path.resolve(__dirname, '../local/templates/html/js/app.min.js')
		});
	}

	jsWatch() {
		(function () {
			const watcher = chokidar.watch('src/components/**/script.js', { persistent: true });
			let isReady = false
			watcher.on('change', link => {
				if (!isReady) return;
				link = link.split('\\').join('/')
				const input = path.resolve(__dirname, `../${link}`);
				const output = path.resolve(__dirname, `../local/templates/html/components-template/${link.replace('src/components/', '')}`);
				buildJs({
					input,
					output
				})
			})
			watcher.on('ready', () => isReady = true);
		})();
	}

	wsHMR() {
		const lv = new wsLiveReload(3000);
		lv.createWatcher('styles', 'local/templates/html/**/style.css', 'styles');
		lv.createWatcher('html', 'local/templates/html/*.html', 'reload');
	}

	spriteWatcher() {
		const watcher = chokidar.watch('src/assets/sprites/svg/*.svg', { persistent: true });
		let isReady = false
		watcher.on('add', () => {
			if (!isReady) return;
				fs.appendFileSync(`src/webpack_lists/sprites.js`, ' ');
		})
		watcher.on('ready', () => isReady = true);
	}
}

const watcher = new SLAMBOX();