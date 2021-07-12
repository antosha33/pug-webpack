window.addEventListener( 'load', function( event ) {
	window.vendorLoader({
		name: 'modal',
		path: './js/vendor/modal.min.js',
		event: {
			scroll: true,
			click: true,
			mouseover: {
				trigger: '[data-toggle="modal"]'
			}
		}
	});
});


