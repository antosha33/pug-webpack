window.addEventListener( 'load', function( event ) {
	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}
	window.reinit.slider.sertif = function() {
		$('.js-swiper-sertif').each(function(i,el){
			var slider = el;
			var length = slider.querySelectorAll('.swiper-slide').length;
			window.slam_slider({
				el: el,
				args: {
					autoHeight: false,
					lazy: true,
					loop: length > 4,
					slidesPerView: 4,
					spaceBetween: 0,
					pagination: false,
					watchOverflow: true,
					breakpoints: {
						1024: {
							loop: length > 4,
							spaceBetween: 0,
							slidesPerView: 4,
						},
						768: {
							loop: length > 3,
							spaceBetween: 30,
							slidesPerView: 3,
							simulateTouch: true,
						},
						575: {
							loop: length > 2,
							slidesPerView: 2,
						},
						250: {
							loop: length > 1,
							simulateTouch: false,
							slidesPerView: 1,
						}
					}
				}
			})
			
		});
	};
	window.reinit.slider.sertif();

	window.reinit.slider.sertif_02 = function() {
		$('.js-swiper-sertif-narrow').each(function(i,el){
			var slider = el;
			var length = slider.querySelectorAll('.swiper-slide').length;
			window.slam_slider({
				el: el,
				args: {
					autoHeight: false,
					lazy: true,
					loop: length > 3,
					slidesPerView: 3,
					spaceBetween: 0,
					pagination: false,
					watchOverflow: true,
					centerInsufficientSlides: true,
					loopAdditionalSlides: 1,
					breakpoints: {
						1024: {
							loop: length > 3,
							slidesPerView: 3,
							spaceBetween: 0,
							simulateTouch: true,
						},
						768: {
							loop: length > 3,
							slidesPerView: 3,
							spaceBetween: 30,
						},
						575: {
							loop: length > 2,
							slidesPerView: 2,
							spaceBetween: 20,
						},
						250: {
							loop: length > 1,
							slidesPerView: 1,
							spaceBetween: 20,
							// simulateTouch: false,
						}
					}
				}
			})
			
		});
	};

	window.reinit.slider.sertif_02();
});
