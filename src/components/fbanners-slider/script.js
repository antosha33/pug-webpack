window.addEventListener( 'load', function( event ) {

	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}
	
	window.reinit.slider.fsslider = function() {
		let fsSlider = $('.js-fbanners-slider')
		if (fsSlider.length && !fsSlider.hasClass('inited')) {
			fsSlider.each(function(i,el) {
				let slider = el;
				let length = slider.querySelectorAll('.swiper-slide').length;

				let swiper = window.slam_slider({
					el: el,
					args: {
						autoHeight: false,
						lazy: true,
						//spaceBetween: 25,
						spaceBetween: 0,
						watchOverflow: true,
						simulateTouch: true,
						slidesPerView: 'auto',
						//slidesPerView: 3,
						loop: length > 3,
						autoplay: {
							delay: 4000,
						},
						breakpoints: {
							1200: {
								loop: length > 'auto',
								//spaceBetween: 25,
								//slidesPerView: 3,
							},
							1024: {
								loop: length > 'auto',
								//spaceBetween: 25,
								//slidesPerView: 2,
							},
							768: {
								loop: length > 'auto',
								//spaceBetween: 25,
								//slidesPerView: 2,
								simulateTouch: true,
							},
							0: {
								spaceBetween: 0,
								loop: length > 1,
								simulateTouch: false,
								slidesPerView: 'auto',
							}
						},
					}
				}).on('init', () => {
					swiper.autoplay.delay = 5000;
					setTimeout(function(){
						swiper.autoplay.start()
					}, 2000);
				})

			});
			fsSlider.addClass('inited')
		}
	};

	window.oneevent({
		name: 'fsslider',
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
		callback: window.reinit.slider.fsslider
	});
});
