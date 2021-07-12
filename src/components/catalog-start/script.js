window.addEventListener('load', function (event) {


	let currentWidth = $(window).width();
	$(window).resize(function () {
		currentWidth = $(window).width();
	});

	if (currentWidth > 767) {

		window.vendorLoader({
			name: 'masonry',
			path: './js/vendor/masonry.pkgd.min.js',
			event: {
				scroll: true,
				mouseover: true,
				click: {
					trigger: 'js-mass-wrap'
				},

			},
			callback: function () {
				$('.js-mass-wrap').removeClass('no-script');
				$('.js-mass-wrap').masonry({
					columnWidth: '.js-mass-item',
					itemSelector: '.js-mass-item',
					percentPosition: true,
					gutter: 0,
				});
			}
		})

	}

})

