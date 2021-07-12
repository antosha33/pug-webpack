window.addEventListener( 'load', function( event ) {
	if (!window.reinit) {
		window.reinit = {};
	}

	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	window.reinit.slider.brand = function() {
		$('.js-swiper-brand').each(function(i,el){
			window.slam_slider({
				el: el,
				args: {
					autoHeight: false,
					lazy: true,
					loop: true,
					loopAdditionalSlides: 1,
					slidesPerView: 5,
					spaceBetween: 0,
					pagination: false,
					watchOverflow: true,
					breakpoints: {
						1200: {
							slidesPerView: 5,
						},
						1025: {
							slidesPerView: 4,
						},
						768: {
							simulateTouch: true,
							slidesPerView: 3,
						},
						575: {
							slidesPerView: 2,
						},
						250: {
							simulateTouch: false,
							slidesPerView: 1,
							spaceBetween: 0,
						}
					}
				}
			})
			
		});
	};

	window.reinit.slider.brand();
});
