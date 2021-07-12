const pug = require('pug');

module.exports = {
	renderHTML(page, callback) {
		callback(null,  {
			src: `./src/pages/${page}/${page}.pug`,
			filename: `${page}.html`,
			render: (file, params) => pug.renderFile(file, params)
		});
	}
};