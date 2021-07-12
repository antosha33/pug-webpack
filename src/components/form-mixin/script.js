window.addEventListener('load', function (event) {


	window.vendorLoader({
		name: 'formstyler',
		path: 'js/vendor/jquery.formstyler.min.js',
		event: {
			scroll: true,
			mouseover: {
				trigger: 'body'
			},
			click: {
				trigger: 'select.custom-select'
			},
		},
		callback: function() {
			window.reinit.select();
		}
	});

	window.reinit.select =  function () {
		let select_input = $('select');
		select_input.length &&
		select_input.styler &&
		select_input.styler('destroy') &&
		select_input.styler({
			selectSearch: true
		});
	};

});