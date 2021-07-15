


const chokidar = require('chokidar');
const WebSocket = require('ws');

module.exports = class wsLiveReload {
	constructor(port) {

		this.socket = null;
		this.port = port;
		this.watchers = Object.create(null);
		this.criticalReboot = false;
		wsLiveReload.createWsConnection(this.port);
	}


	static createWsConnection(port) {
		const wss = new WebSocket.Server({ port: port + 1 });
		wss.on('connection', ws => {
			this.socket = ws;
			ws.on('error', error => {
				console.log(error);
			})
		})
	}

	static getSocket() {
		return this.socket;
	}


	createWatcher(watcherName, pathes, message) {
		console.log('here');
		chokidar.watch(pathes, { persistent: true });
		// this.watchers[watcherName].on('change', path => {
		// 	// const socket = wsLiveReload.getSocket();
		// 	// try {
		// 	// 	if (socket && socket.readyState === 1) {
		// 	// 		// if (path.includes('.html')) {
		// 	// 		// 	setTimeout(() => {
		// 	// 		// 		this.criticalReboot = false
		// 	// 		// 	}, 1500)
		// 	// 		// }
		// 	// 		// if (message === 'critical') this.criticalReboot = true;
		// 	// 		if (message === 'reload' && this.criticalReboot) return;
		// 	// 		socket.send(JSON.stringify({
		// 	// 			path,
		// 	// 			message
		// 	// 		}));
		// 	// 		// if (message === 'reload') {
		// 	// 		// 	Object.keys(this.watchers).forEach((key) => {
		// 	// 		// 		this.watchers[key].close();
		// 	// 		// 	})
		// 	// 		// 	this.createWatcher(watcherName, [
		// 	// 		// 		'local/templates/html/components-template/**/script.min.js',
		// 	// 		// 		'local/templates/html/*.html',
		// 	// 		// 		'local/templates/html/js/app.min.js',
		// 	// 		// 	], 'reload')
		// 	// 		// 	this.createWatcher('styles', 'local/templates/html/**/style.css', 'styles');
		// 	// 		// 	this.createWatcher('critical', 'local/templates/html/critical.css', 'reload');
		// 	// 		// }
		// 	// 	}
		// 	// } catch (e) {
		// 	// 	console.log(e);
		// 	// }
		// });
	}
}




