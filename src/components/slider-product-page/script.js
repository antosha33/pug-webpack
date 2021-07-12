window.addEventListener( 'load', function( event ) {
	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	if(!$('.js-swiper-product-page').length) {
		return
	}

	window.reinit.slider.productPage = function() {
		window.slam_slider_with_nav({
			$el: $('.js-swiper-product-page'),
			args_main: {
				autoHeight: false,
				lazy: true,
				loop: false,
				slidesPerView: 1,
				spaceBetween: 0,
				watchOverflow: true,
			},
			args_nav: {
				autoHeight: false,
				lazy: true,
				loop: false,
				slidesPerView: 4,
				spaceBetween: 0,
				watchOverflow: true,
			},
		})
	};

	window.reinit.slider.productPage();
});
