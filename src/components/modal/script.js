window.addEventListener( 'load', function( event ) {
	window.vendorLoader({
		name: 'modal',
		path: '/js/vendor/modal.min.js',
		event: {
			scroll: true,
			click: true,
			mouseover: {
				trigger: '[data-toggle="modal"]'
			}
		}
	});

	// $('.modal-login .modal-tabs__item').click(function(){
	// 	if($(this).hasClass('active')) return;
	// 	$('.modal-login .modal-tabs__item').removeClass('active');
	// 	$(this).toggleClass('active');
	// 	$('.modal-tabs-page .bv-form').each(function(){
	// 		if($(this).hasClass('active')){
	// 			$(this).removeClass('active');
	// 		}else{
	// 			$(this).addClass('active');
	// 		}
	// 	})
	// })

	// $('#modal-login .reset-password').click(function(){
	// 	$('#modal-login').modal('hide');
	// 	setTimeout(() => $('#modal-reset-password').modal(), 500);
	// })

	// $('#modal-reset-password .remembered-password').click(function(){
	// 	$('#modal-reset-password').modal('hide');
	// 	setTimeout(() => $('#modal-login').modal(), 500);
	// })
	// $('.js-ok').click(function(){
	// 	$(this).closest('.modal').modal('hide');
	// })
});


