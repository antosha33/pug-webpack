window.addEventListener( 'load', function( event ) {
	$('.form-group--delivery-form input').change(function(){
		if($(this).hasClass('js-delivery-curier')){
			$('.delivery-form__curier').removeClass('hidden');
			$('.delivery-form__self').addClass('hidden');
			$('.pickup-map').addClass('hidden');
		}else if($(this).hasClass('js-delivery-pickup')){
			$('.delivery-form__curier').addClass('hidden');
			$('.delivery-form__self').removeClass('hidden');
			$('.pickup-map').removeClass('hidden');	
		}
	})
})