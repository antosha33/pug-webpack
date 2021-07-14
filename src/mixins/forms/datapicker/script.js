// window.addEventListener('load', function (event) {
	

// 	window.reinit.reinitDatepicker = function() {
// 		console.log('datepicker')
// 		$('.js-form-control--datepicker').datepicker({
// 			minDate: new Date(),
// 			clearButton: true,
// 			changeMonth: true,
// 			changeYear: true,
// 			showOn: "button",
// 			buttonImage: '../images/i-calendar.svg',
// 			buttonImageOnly: true,
// 			buttonText: "Выбрать дату",
// 			defaultDate: new Date(),
// 			dateFormat: 'dd.mm.yyyy',
// 			autoClose: true,
// 			onSelect: function (a, b, c) {
// 				let $el = c.$el;
// 				let $form = $el.closest('.bv-form');
// 				$form.data('bootstrapValidator').revalidateField($el);
// 			}
// 		});
// 	}
// 	window.reinit.reinitDatepicker()
// });