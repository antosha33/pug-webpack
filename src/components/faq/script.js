window.addEventListener( 'load', function( event ) {
	$('.js-content-title').click(function(){
		$('.js-content-title').removeClass('active');
		$(this).addClass('active');
	})
	$('.js-faq-tab .faq-side__item').click(function(){
		$('.faq-side__item').removeClass('active');
		$(this).addClass('active');
		const tabIndex = $(this).attr('data-tab-index');
		$('.faq-content').removeClass('active');
		$(`.faq-content[data-tab-index=${tabIndex}]`).addClass('active');
		
	})
})