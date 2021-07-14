window.addEventListener('load', function (event) {

	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}



	window.reinit.slider.collectionsSlider = function () {
		let collectionsSlider = $('.js-collections-slider');
		if (collectionsSlider.length && !collectionsSlider.hasClass('inited')) {

			collectionsSlider.each(function (i, el) {
				window.slam_slider({
					el: el,
					args: {
						slidesPerView: 4,
						spaceBetween: 0,
						loop: true,
						lazy: true,

						navigation: {
							nextEl: $(el).closest('.collections-wrap ').find('.js-swiper-button-next'),
							prevEl: $(el).closest('.collections-wrap ').find('.js-swiper-button-prev'),
						},
						pagination: {
							el: $(el).closest('.collections-wrap ').find('.collections-slider-slider-pagination'),
							type: 'custom',
							renderCustom: function(swiper, current, total){
								return  `<div class="pagination-progressbar">
								<div class="pagination-progressbar-fill" style="width:${current/total*100}%"></div>
									<div class="pagination-fractions">${current}/${total}</div>
								</div>`
							}
						},
						breakpoints:{
							0: {
								slidesPerView: 1,
							},
							768: {
								slidesPerView: 2,
							},
							1024: {
								slidesPerView: 4,
							}
						},
					}
				})

			});
			collectionsSlider.addClass('inited')
		}
	};
	window.reinit.slider.collectionsSlider();
	// window.oneevent({
	// 	name: 'collectionsSlider',
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
	// 	// callback: window.reinit.slider.collectionsSlider
	// });
});
