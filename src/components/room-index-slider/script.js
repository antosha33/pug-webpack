window.addEventListener('load', function (event) {

	const sector = (curr, total) => {
		const fill = [];
		let dashOffset = 100 / total * 2;
		// let dashOffset = 0;
		for (let i = 0; i < curr; i++) {
			fill.push(`<circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#4A4A4A" stroke-width="6" stroke-dasharray="${100 / total - 4} ${100 - (100 / total - 4)}" stroke-dashoffset="${dashOffset}"></circle>`)
			dashOffset = dashOffset - (100 / total);
		}
		return `<svg width="50px" height="50px" viewBox="0 0 42 42" class="donut">
		<circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="transparent"></circle>
		<circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="transparent" stroke-width="3"></circle>
		<circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#E7E7E7" stroke-width="6" stroke-dasharray="${100 / total - 4} 4" stroke-dashoffset="0"></circle>
		${fill.join('')}
		</svg>`
	}

	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}



	window.reinit.slider.roomIndexSlider = function () {
		let roomIndexSlider = $('.js-room-index-slider');
		if (roomIndexSlider.length && !roomIndexSlider.hasClass('inited')) {
			roomIndexSlider.each(function (i, el) {
				let slider = el;
				let length = slider.querySelectorAll('.swiper-slide').length;
				let slideChangeColldawn = false;
				let swiper = window.slam_slider({
					el: el,
					args: {
						lazy: {
							enabled: true,
						},
						autoHeight: false,
						spaceBetween: 0,
						watchOverflow: true,
						simulateTouch: true,
						slidesPerView: 'auto',
						centeredSlides: true,
						navigation: {
							prevEl: '.index-slider .js-swiper-button-prev',
							nextEl: '.index-slider .js-swiper-button-next',
						},
						pagination: {
							type: 'custom',
							el: '.js-swiper-pagination',
							renderCustom: (swiper, curr, total) => {
								return sector(curr, total);
							}
						},
						loop: length > 1,
						on: {
							'init': function () {
								if($(window).width() > 767)  return;
								const prev = $('.js-room-index-slider .swiper-slide-prev source:nth-child(2)').attr('data-srcset');
								console.log($('.js-room-index-slider .swiper-slide-prev source:nth-child(2)').attr('data-srcset'))
								const next = $('.js-room-index-slider .swiper-slide-next source:nth-child(2)').attr('data-srcset');
								$('.mob-slide-prev').css(
									{
										'background-image': `url(${prev})`,
										'background-size': 'cover',
										'background-positon': '0 0',
										'background-repeat': 'no-repeat'
									});
									$('.mob-slide-next').css(
										{
											'background-image': `url(${next})`,
											'background-size': 'cover',
											'background-positon': '0 0',
											'background-repeat': 'no-repeat'
									});
							},
							'slideChange': function () {
								if($(window).width() > 767)  return;
								if(!slideChangeColldawn){
									slideChangeColldawn = true;
									setTimeout(() => {
										setTimeout(() => slideChangeColldawn = false, 300)
										const prev = $('.js-room-index-slider .swiper-slide-prev source:nth-child(2)').attr('data-srcset');
										const next = $('.js-room-index-slider .swiper-slide-next source:nth-child(2)').attr('data-srcset');
										$('.mob-slide-prev').css(
											{
												'background-image': `url(${prev})`,
												'background-size': 'cover',
												'background-positon': '0 0',
												'background-repeat': 'no-repeat'
											}).fadeOut(0).fadeIn(300);
	
											$('.mob-slide-next').css(
												{
													'background-image': `url(${next})`,
													'background-size': 'cover',
													'background-positon': '0 0',
													'background-repeat': 'no-repeat'
											}).fadeOut(0).fadeIn(300);
									}, 200)
								}
							}
						}
					}
				})

			});
			roomIndexSlider.addClass('inited')
		}
	};
	window.reinit.slider.roomIndexSlider();

});
