window.addEventListener( 'load', function( event ) {
	$('.js-tab-list .tab-list__item').click(function(){
		$(this).closest('.js-tab-list').find('.tab-list__item').removeClass('active');
		$(this).addClass('active');
	})
})