import uiInits from './init';

const ready = (callback) => {
	document.readyState != "loading"
		? callback()
		: document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
	uiInits.init();

	const btn_toggle = require('../../mixins/btn-toggle/script');
	const lazy_img = require('../../mixins/lazy-img/script');
	const lazy_video = require('../../mixins/lazy-video/script');
	const scroll_to = require('../../mixins/scroll-to/script');
	const trigger_click = require('../../mixins/trigger-click/script');

});
