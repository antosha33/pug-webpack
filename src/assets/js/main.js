import uiInits from './init';
// import  btn_toggle from  '../../mixins/btn-toggle/script';
import lazy_img from '../../mixins/lazy-img/script';
import form from '../../mixins/forms/script';
// import scroll_to from '../../mixins/scroll_to/script';
// import lazy_video from '../../mixins/lazy_video/script';
const ready = (callback) => {
	document.readyState != "loading"
		? callback()
		: document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
	uiInits.init();
	// btn_toggle();

	lazy_img();
	form();

	// scroll_to();
	// lazy_video();
});
