window.addEventListener('load', function (event) {
	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}
	window.reinit.slider.brandsSlider = function () {
		let jsBrandsSlider = $('.js-brands-slider');
		jsBrandsSlider.each(function (i, el) {
			let slider = el;
			let length = slider.querySelectorAll('.swiper-slide').length;
			window.slam_slider({
				el: el,
				args: {
					autoHeight: false,
					lazy: true,
					loop: length > 6,
					slidesPerView: 6,
					spaceBetween: 25,
					watchOverflow: true,
					autoplay: {
						delay: 4000,
					},
					breakpoints: {
						1440: {
							loop: length > 6,
							spaceBetween: 25,
							slidesPerView: 6,
						},
						1024: {
							loop: length > 5,
							spaceBetween: 25,
							slidesPerView: 5,
						},
						768: {
							loop: length > 3,
							spaceBetween: 30,
							slidesPerView: 3,
							simulateTouch: true,
						},
						0: {
							loop: length > 2,
							simulateTouch: false,
							slidesPerView: 2,
						}
					},
					on: {
						'transitionStart': function () {
							jsBrandsSlider.find('.swiper-container').css({
								'overflow': 'hidden',
							})
							
						},
						'transitionEnd': function () {
							if ($(window).width() < 1024) return;
							jsBrandsSlider.closest('.brands-section').removeClass('moving');
							jsBrandsSlider.find('.swiper-container').css({
								'overflow': 'visible',
							})
							
						},
						'sliderMove': function () {
							jsBrandsSlider.closest('.brands-section').addClass('moving');
							jsBrandsSlider.find('.swiper-container').css({
								'overflow': 'hidden',
							})
						}
					}

				}
			})

		});
	};
	//window.reinit.slider.brandsSlider();

	window.oneevent({
		name: 'brandsSlider',
		event: {
			scroll: true,
			click: true,
			mousedown: true,
			timeout: {
				delay: 6000
			},
			mouseover: {
				trigger: 'body'
			},
			touchstart: true
		},
		callback: window.reinit.slider.brandsSlider
	});

});
