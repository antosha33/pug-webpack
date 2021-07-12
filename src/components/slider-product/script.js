window.addEventListener( 'load', function( event ) {
	if (!window.reinit) {
		window.reinit = {};
	}

	if (!window.reinit.slider) {
		window.reinit.slider = {};
	}

	window.reinit.slider.product = function() {
		$('.js-swiper-product').each(function(i,el){
			let slider = el;
			function init() {
				var length = slider.querySelectorAll('.swiper-slide').length;
				window.slam_slider({
					el: slider,
					args: {
						autoHeight: false,
						lazy: true,
						loop: length > 1,
						slidesPerGroup: 1,
						initialSlide: 0,
						loopFillGroupWithBlank: false,
						slidesPerView: 4,
						spaceBetween: 30,
						pagination: false,
						watchOverflow: true,
						breakpoints: {
							1200: {
								loop: length > 4,
								slidesPerView: 4,
								spaceBetween: 30,
							},
							768: {
								loop: length > 2,
								slidesPerView: 2,
								spaceBetween: 30,
							},
							250: {
								loop: length > 1,
								slidesPerView: 1,
								spaceBetween: 15,
							}
						}
					}
				})
			}
			
			
			if(slider.classList.contains('swiper-product-ajax')) {
				let isInit = false;
				document.addEventListener('scroll', function(ev) {
					if(ev.target.documentElement.scrollTop / ev.target.documentElement.clientHeight > 0.1 && isInit === false) {
						isInit = true;
						let src = slider.getAttribute('ajax-src');
						let wrapper = slider.querySelector('.swiper-wrapper');
						$.ajax({
							url: src,
							success: function (values) {
								wrapper.innerHTML = values;
								init()
								if(typeof(buyScriptInit) == 'function'){
									buyScriptInit();
								}
							},
							error: function (jqXHR, exception) {
								console.error(slider, 'ошибка загрузки')
							},
						});
					}
				})
			} else {
				init()
			}
			
		});
	};

	window.reinit.slider.product();
});
