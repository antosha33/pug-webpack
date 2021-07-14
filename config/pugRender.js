const pug = require('pug');

module.exports = function(page, callback){
	const render = pug.renderFile(`./src/pages/${page}/${page}.pug`, {pretty: true});
	callback(null, render);
} 