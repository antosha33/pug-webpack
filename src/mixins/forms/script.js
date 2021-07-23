export default () => {
	window.addEventListener('load', function (event) {

		window.vendorLoader({
			name: 'formstyler',
			path: 'js/vendor/jquery.formstyler.min.js',
			event: {
				scroll: 'true',
				timeout: 'true',
			},
			timeout: '3000',
			callback: function () {
				window.reinit.select();
			}
		});
	
	
		window.reinit.select = function () {
			let select_input = $('select.custom-select');
			select_input.each(function(){
				const currSelect = $(this);
				currSelect.length &&
				currSelect.styler &&
				currSelect.styler('destroy') &&
				currSelect.styler({
					// selectSearch: true,
					onFormStyled: function(){
						currSelect.find('option').each(function(indx){
							const currColor = $(this).attr('data-color');
							const defaultOption = $(this).attr('selected');
							if(defaultOption){
								currSelect.closest('.jq-selectbox').find('.jq-selectbox__select')[0].style.setProperty('--selectColor', currColor);
							}else if(indx === 0){
								currSelect.closest('.jq-selectbox').find('.jq-selectbox__select')[0].style.setProperty('--selectColor', currColor);
							}
							const innerHtml = $(this).text();
							currSelect.closest('.jq-selectbox').find('.jq-selectbox__dropdown li').eq(indx).html(`<span class="custom-select-color" style="background-image: ${currColor}"></span><span class="text">${innerHtml}</span>`);
							// currSelect.closest('.jq-selectbox').find('.jq-selectbox__dropdown li').removeClass('sel');
						});
						currSelect.closest('.jq-selectbox').find('.jq-selectbox__dropdown li').click(function(){
							// $(this).removeClass('sel');
							currSelect.closest('.jq-selectbox').find('.jq-selectbox__select')[0].style.setProperty('--selectColor', $(this).attr('data-color'));
						})
						currSelect.closest('.jq-selectbox').find('.jq-selectbox__dropdown li').mousemove(function(){
							return;
						})
					},
				});
			})
	
		};
	
	
		// window.reinit.reinitDatepicker();
	
	
		// console.log('form')
	
		// window.reinit.reinitDatepicker = function() {
		// 	$('.js-form-control--datepicker').datepicker({
		// 		minDate: new Date(),
		// 		clearButton: true,
		// 		changeMonth: true,
		// 		changeYear: true,
		// 		showOn: "button",
		// 		buttonImage: '../images/i-calendar.svg',
		// 		buttonImageOnly: true,
		// 		buttonText: "Выбрать дату",
		// 		defaultDate: new Date(),
		// 		dateFormat: 'dd.mm.yyyy',
		// 		autoClose: true,
		// 		onSelect: function (a, b, c) {
		// 			let $el = c.$el;
		// 			let $form = $el.closest('.bv-form');
		// 			$form.data('bootstrapValidator').revalidateField($el);
		// 		}
		// 	});
		// }
		// window.reinit.reinitDatepicker()
	
		$(document).on('input', '.sidebar-filter__input', function () {
			let $this = $(this);
			let $wrap = $this.closest('.sidebar-filter__content');
			let $checkbox = $wrap.find('input[type="checkbox"]');
			let value = $this.val();
		});
	});
	
}
