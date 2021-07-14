window.addEventListener('load', function (event) {

	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}



	window.reinit.slider.goodsSlider = function () {
		let goodsSlider = $('.js-goods-slider');
		if (goodsSlider.length && !goodsSlider.hasClass('inited')) {

			goodsSlider.each(function (i, el) {

				window.slam_slider({
					el: el,
					args: {
						slidesPerView: 4,
						spaceBetween: 0,
						loop: true,
						lazy: true,

						navigation: {
							nextEl: $(el).find('.js-swiper-button-next'),
							prevEl: $(el).find('.js-swiper-button-prev'),
						},
						pagination: {
							el: '.goods-slider-slider-pagination',
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
								spaceBetween: 10
							},

							768: {
								slidesPerView: 2,
								spaceBetween: 0,
							},
							1024:{
								slidesPerView: 3,
							},
							1470: {
								slidesPerView: 4,
							}
						},
					}
				})

			});
			goodsSlider.addClass('inited')
		}
	};
	window.reinit.slider.goodsSlider();
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
