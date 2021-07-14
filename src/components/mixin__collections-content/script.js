window.addEventListener('load', function (event) {
	$('.js-collection-toggle').click(function(){
		$('.js-collection-toggle').toggleClass('active')
		$('.collections-content .p-hidden').toggleClass('active');
	})
})