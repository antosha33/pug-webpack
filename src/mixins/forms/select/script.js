window.addEventListener('load', function (event) {
	console.log('here');
	// console.log('select-load')

	window.vendorLoader({
		name: 'formstyler',
		path: 'js/vendor/jquery.formstyler.min.js',
		event: {
			mouseover: {
				trigger: '.form-group-select'
			},
			click: {
				trigger: '.form-group-select'
			},
		},
		callback: function () {
			window.reinit.select();
		}
	});

	window.reinit.select = function () {
		// console.log('select-init')
		console.log('init select');
		let select_input = $('select.custom-select');

		select_input.length &&
			select_input.styler &&
			select_input.styler('destroy') &&
			select_input.styler({
				callback: function(){
					console.log('init');
				}	
			});
	};
});
