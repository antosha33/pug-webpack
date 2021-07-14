window.addEventListener('load', function (event) {
	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	window.reinit.slider.productSlider = function () {

		$('.js-products-slider').each(function (i, el) {
			let slider = el;
			let length = slider.querySelectorAll('.swiper-slide').length;
			window.slam_slider({
				el: el,
				args: {
					autoHeight: false,
					lazy: true,
					loop: false,
					slidesPerView: 5,
					spaceBetween: 25,
					watchOverflow: true,
					slidesOffsetAfter: 180,
					breakpoints: {
						1440: {
							//loop: length > 5,
							spaceBetween: 25,
							slidesPerView: 5,
						},
						1200: {
							//loop: length > 4,
							spaceBetween: 25,
							slidesPerView: 4,
						},
						1024: {
							//loop: length > 3,
							spaceBetween: 25,
							slidesPerView: 3,
							simulateTouch: true,
						},
						768: {
							//loop: length > 2,
							spaceBetween: 15,
							slidesPerView: 2,
							// simulateTouch: true,
							simulateTouch: false,
						},
						0: {
							//loop: length > 1,
							spaceBetween: 16,
							slidesPerView: 'auto',
							// simulateTouch: true,
							simulateTouch: false,
						},
					}
				}
			})

		});
		$('.js-products-slider-four').each(function (i, el) {
			let slider = el;
			let length = slider.querySelectorAll('.swiper-slide').length;
			window.slam_slider({
				el: el,
				args: {
					autoHeight: false,
					lazy: true,
					loop: false,
					slidesPerView: 4,
					spaceBetween: 25,
					slidesOffsetAfter: 180,
					watchOverflow: true,
					breakpoints: {
						1440: {
							//loop: length > 4,
							spaceBetween: 25,
							slidesPerView: 4,
						},
						1200: {
							//loop: length > 3,
							spaceBetween: 25,
							slidesPerView: 3,
						},
						1024: {
							//loop: length > 3,
							spaceBetween: 25,
							slidesPerView: 3,
							simulateTouch: true,
						},
						768: {
							//loop: length > 2,
							spaceBetween: 15,
							slidesPerView: 2,
							// simulateTouch: true,
							simulateTouch: false,
						},
						0: {
							//loop: length > 1,
							spaceBetween: 16,
							slidesPerView: 'auto',
							// simulateTouch: true,
							simulateTouch: false,
						},
					}
				}
			})

		});
	};

	//window.reinit.slider.productSlider();


	window.oneevent({
		name: 'productSlider',
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
		callback: window.reinit.slider.productSlider
	});

});