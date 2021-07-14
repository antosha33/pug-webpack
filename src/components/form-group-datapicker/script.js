window.addEventListener('load', function (event) {
	// console.log('datepicker-load')
	window.vendorLoader({
		name: 'datepicker',
		path: 'js/vendor/datepicker.min.js',
		event: {
			mouseover: {
				trigger: '.js-form-control--datepicker'
			},
			click: {
				trigger: '.js-form-control--datepicker'
			},
		},
		callback: function() {
			window.reinit.reinitDatepicker();
		}
	});
	window.reinit.reinitDatepicker = function() {
		// console.log('datepicker-init')
		$('.js-form-control--datepicker').datepicker({
			minDate: new Date(),
			clearButton: true,
			changeMonth: true,
			changeYear: true,
			defaultDate: new Date(),
			dateFormat: 'dd.mm.yyyy',
			autoClose: true,
			onSelect: function (a, b, c) {
				// console.log('onSelect');
				$('body').trigger('datapicker-onselect', $(this));
				let $el = c.$el;
				let $form = $el.closest('.bv-form');
				$form.data('bootstrapValidator').revalidateField($el);
			}
		});
	}
});