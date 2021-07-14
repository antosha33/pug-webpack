window.addEventListener('load', () => {
	$('.js-casing-picker-toggle').click(function(){
		$('.product-page__header-casing').toggleClass('active');
		window.reinit.select();
	})

})