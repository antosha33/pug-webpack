window.addEventListener( 'load', function( event ) {
	window.vendorLoader({
		name: 'fancybox',
		path: 'js/vendor/jquery.fancybox.min.js',
		event: {
			scroll: true,
			click: true,
			mouseover: {
				trigger: '[data-fancybox]'
			}
		}
	});
});
