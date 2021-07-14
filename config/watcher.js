const chokidar = require('chokidar');
// watch for changes in components and rewrite imports
const {pugBuilder} = require('./buildPug');
(function () {
	const watcher = chokidar.watch('src/**/*.pug', { persistent: true });
	let isReady = false
	const regExp = /.(scss|sass|js)$/;
	watcher.on('change', path => {
		console.log('here');
		pugBuilder();
		// if (!isReady) return;
		// const newPath = path.replace(/\\/g, '/');
		// const noSrcPath = newPath.replace('src', '');
		// fs.appendFileSync(`src/webpack_lists/mixins.pug`, 'include ..' + noSrcPath + '\n');
	})
	// watcher.on('unlink', path => {
	// 	console.log('unlink')
	// 	if (!isReady) return;
	// 	const newPath = path.replace(/\\/g, '/');
	// 	const noSrcPath = newPath.replace('src', '')
	// 	const remove = new RegExp(`include ..${noSrcPath}`);
	// 	console.log(noSrcPath);
	// 	const pugfile = fs.readFileSync(`src/webpack_lists/mixins.pug`, { encoding: 'utf-8' });
	// 	const updatedPugFile = pugfile.replace(remove, '');
	// 	fs.writeFileSync(`src/webpack_lists/mixins.pug`, updatedPugFile, 'utf-8');
	// })
	// watcher.on('ready', () => isReady = true);
})();