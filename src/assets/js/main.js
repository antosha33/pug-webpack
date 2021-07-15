import uiInits from './init';
import  btn_toggle from  '../../mixins/btn-toggle/script';
import lazy_img from '../../mixins/lazy-img/script';
// const lazy_video = require('../../mixins/lazy-video/script');
// const scroll_to = require('../../mixins/scroll-to/script');
// const trigger_click = require('../../mixins/trigger-click/script');
import form from '../../mixins/forms/script';

const ready = (callback) => {
	document.readyState != "loading"
		? callback()
		: document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
	uiInits.init();
	btn_toggle();
	lazy_img();
	form();
});
