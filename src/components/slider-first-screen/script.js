window.addEventListener( 'load', function( event ) {


	if (!window.reinit) {
		window.reinit = {};
	}
	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}



	window.reinit.slider.fsslider = function() {
		let fsSlider = $('.js-fs-slider')
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
							delay: 2000,
						},
						fadeEffect: {
							crossFade: true
						},
						on: {
							'slideChange': () => console.log('slide change'),
							'init': () => console.log('im init')
						}
					}
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
