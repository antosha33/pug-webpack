window.addEventListener( 'load', function( event ) {

	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	window.reinit.slider.fsslider = function() {
		let fsSlider = $('.js-slider-fs')
		if (fsSlider.length && !fsSlider.hasClass('inited')) {
			fsSlider.each(function(i,el) {
				let slider = el;
				let length = slider.querySelectorAll('.swiper-slide').length;
				let swiper = window.slam_slider({
					el: el,
					args: {
						autoHeight: false,
						lazy: true,
						spaceBetween: 0,
						watchOverflow: true,
						simulateTouch: true,
						slidesPerView: 1,
						loop: length > 1,
						effect: 'fade',
						autoplay: {
							delay: 1000,
							disableOnInteraction: false,
						},
						fadeEffect: {
							crossFade: true
						},
						on: {
							init() {
								this.el.addEventListener('mouseenter', () => {
									this.autoplay.stop();
								});
								this.el.addEventListener('mouseleave', () => {
									this.autoplay.start();
								});
							}
						},
					}
				})
				.on('init', () => {
					swiper.autoplay.delay = 5000;
					setTimeout(function(){
						swiper.autoplay.start()
					}, 3000);
				})
			});
			fsSlider.addClass('inited')
		}
	};
	// window.reinit.slider.fsslider();
	window.oneevent({
		name: 'fsslider',
		event: {
			scroll: true,
			click: true,
			touchstart: true,
			timeout: {
				delay: 3000
			},
			mouseover: {
				trigger: 'body'
			}
		},
		callback: window.reinit.slider.fsslider
	});
});
