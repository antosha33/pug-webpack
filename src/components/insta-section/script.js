window.addEventListener( 'load', function( event ) {
	if (!window.reinit) {
		window.reinit = {};
	}

	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	window.reinit.slider.insta = function() {
		$('.js-swiper-insta').each(function(i,el){
			window.slam_slider({
				el: el,
				args: {
					autoHeight: false,
					lazy: true,
					loop: true,
					slidesPerView: 6,
					spaceBetween: 0,
					watchOverflow: true,
					breakpoints: {
						1200: {
							slidesPerView: 6,
						},
						1024: {
							slidesPerView: 5,
						},
						768: {
							slidesPerView: 4,
						},
						520: {
							slidesPerView: 3,
						},
						375: {
							slidesPerView: 2,
						},
						250: {
							slidesPerView: 'auto',
							slidesOffsetAfter: 150
						}
					}
				}
			})
		});
	};

	window.reinit.slider.insta();
});
