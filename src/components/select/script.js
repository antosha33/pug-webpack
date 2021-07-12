window.addEventListener( 'load', function( event ) {


	window.reinit.selectTrigger = function() {
		let selTrig = $('.js-select-trigger');
		if (selTrig.length && !selTrig.hasClass('init')) {
			selTrig.each(function() {
				let _this = $(this),
					select = _this.closest('.select'),
					selList = select.find('.select-list'),
					selOption = select.find('.radio-option'),
					radioInt = selList.find('.js-radio-input'),
					title = select.find('.select-head__title');
	
				_this.on('click', function() {
					if (!select.hasClass('active')) {
						select.addClass('active');
					} else {
						select.removeClass('active');
					}
				});
	
				$(document).on('click', function(e) {
					if (!select.is(e.target) && select.has(e.target).length === 0) {
						select.removeClass('active');
					}
				});
	
				radioInt.each(function() {
					let _this = $(this);
					radioInt.on('change', function() {
						if (_this.is(':checked')) {
							// console.log('input changed')
							_this.closest(selOption).addClass('selected');
							_this.siblings(selOption).removeClass('selected');
							let dataVal = _this.data('val');
							title.text(dataVal);
							select.removeClass('active');
							return false;
						} else {
							_this.closest(selOption).removeClass('selected');
						}
					});
				});
			});
			selTrig.addClass('init')
		}
		
	};

	window.reinit.selectTrigger()
});