window.addEventListener('load', function (event) {

	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}


	window.reinit.slider.skuSlider = function () {
		let skuSlider = $('.js-sku-slider');
		if (skuSlider.length && !skuSlider.hasClass('inited')) {

			skuSlider.each(function (i, el) {

				const galleryThumbs = window.slam_slider({
					el: el,
					args: {
						lazy: true,
						spaceBetween: 0,
						slidesPerView: 'auto',
						watchSlidesVisibility: true,
						navigation: {
							nextEl: $(el).closest('.sku-slider').find('.js-swiper-button-next'),
							prevEl: $(el).closest('.sku-slider').find('.js-swiper-button-prev'),
						},
						pagination: {
							el: $(el).closest('.sku-slider').find('.sku-slider-slider-pagination'),
							type: 'custom',
							renderCustom: function(swiper, current, total){
								return  `<div class="pagination-progressbar">
								<div class="pagination-progressbar-fill" style="width:${current/total*100}%"></div>
									<div class="pagination-fractions">${current}/${total}</div>
								</div>`
							}
						},
						breakpoints: {
							768: {
								slidesPerView: 'auto',
								spaceBetween: 29,
							},
							320: {
								spaceBetween: 5,
								slidesPerView: 'auto',
							},
						},
						on:{
							'transitionStart' : function (){
								skuSlider.find('.swiper-container').css({
									'overflow': 'hidden',
								})
							},
							'transitionEnd' : function (){
								if($(window).width() < 1024) return;
								skuSlider.find('.swiper-container').css({
									'overflow': 'visible',
								})
							},
							'sliderMove': function(){
								skuSlider.find('.swiper-container').css({
									'overflow': 'hidden',
								})
							}
						}
					}
				}
				)

			});
			skuSlider.addClass('inited')
		}
	};
	window.reinit.slider.skuSlider();
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
