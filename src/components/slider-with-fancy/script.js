window.addEventListener('load', function (event) {

	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	window.vendorLoader({
		name: 'reel',
		path: '/js/vendor/jquery.reel.min.js',
		event: {
			// scroll: true,
			// click: true,
			mouseover: {
				trigger: 'body'
			}
		}
	});

	window.reinit.slider.fancySlider = function () {
		let fancySlider = $('.js-gallery-fancy-top');
		if (fancySlider.length && !fancySlider.hasClass('inited')) {

			fancySlider.each(function (i, el) {

				const galleryThumbs = window.slam_slider({
					el: $(el).closest('.slider-with-fancy').find('.js-gallery-fancy-thumbs'),
					args: {
						lazy: true,
						spaceBetween: 29,
						slidesPerView: 5,
						// freeMode: true,
						// watchSlidesVisibility: true,
						// watchSlidesProgress: true,
						breakpoints: {
							768: {
								spaceBetween: 29,
								slidesPerView: 5
							},
							320: {
								spaceBetween: 9,
								slidesPerView: 5
							},
						}
					}
				}
				)

				window.slam_slider({
					el: el,
					args: {
						lazy: true,
						spaceBetween: 10,
						navigation: {
							nextEl: '.slider-with-fancy .js-swiper-button-next',
							prevEl: '.slider-with-fancy .js-swiper-button-prev',
						},
						pagination: {
							el: '.fancy-slider-pagination',
							type: 'custom',
							renderCustom: function(swiper, current, total){
								return  `<div class="pagination-progressbar">
								<div class="pagination-progressbar-fill" style="width:${current/total*100}%"></div>
									<div class="pagination-fractions">${current}/${total}</div>
								</div>`
							}
						},
						thumbs: {
							swiper: galleryThumbs
						}
					}
				})

			});
			fancySlider.addClass('inited')
		}
	};
	window.reinit.slider.fancySlider();
	// window.oneevent({
	// 	name: 'fancySlider',
	// 	event: {
	// 		scroll: true,
	// 		click: true,
	// 		timeout: {
	// 			delay: 3000
	// 		},
	// 		mouseover: {
	// 			trigger: 'body'
	// 		}
	// 	},
	// 	callback: window.reinit.slider.fancySlider
	// });
});
