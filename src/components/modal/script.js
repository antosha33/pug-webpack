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

	$('.js-modal-titles .modal-title').on('click touch', function (){
		let _this = $(this),
			activeIndex = _this.index();

		$('.js-modal-titles .modal-title').removeClass('active');
		_this.addClass('active');
		$('.modal-tabs-body .modal-tab-body').removeClass('active');
		$('.modal-tabs-body .modal-tab-body').eq(activeIndex).addClass('active');
	});
	$('[data-forget]').on('click touch', function (){
		$('.modal-title').css('display','none');
		$('.modal-title--forget').css('display','block');
		$('.modal-tab-body').removeClass('active');
		$('.modal-tab-body--forget').addClass('active');

	});
	$(document).on('click touch', function (e){
		let target = $(e.target);
		if(
			target.hasClass('modal-login') ||
			target.closest('.modal-login').length ||
			target.hasClass('datepicker--nav-action') ||
			target.closest('.datepicker').length
		){
			return
		} else {
			$('.modal-tab-body--forget').removeClass('active');
			$('.js-modal-titles .modal-title').css('display','block');
			$('.modal-title--forget').css('display','none');
		}
	});
	$(`[data-target="#modal-login"]`).on('click touch', function (){
		$('.modal-tab-body--forget').removeClass('active');
		$('.modal-title--forget').css('display','none');
		$('.js-modal-titles .modal-title').css('display','block');
		$('.js-modal-titles .modal-title').removeClass('active');
		$('.js-modal-titles .modal-title').eq(0).addClass('active');
		$('.modal-tabs-body .modal-tab-body').removeClass('active');
		$('.modal-tabs-body .modal-tab-body').eq(0).addClass('active');
	})

	//рейтинг
	$('.mr-rating__inputs .mr-rating__label').on('click touch', function (){
		$('.mr-rating__inputs .mr-rating__label').removeClass('active');
		$(this).addClass('active').nextAll().addClass('active');
	});
});


